import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Popover, uniReactRoot } from '@affine/component';
import { Button } from '@affine/component/ui/button';
import { Menu, MenuItem } from '@affine/component/ui/menu';
import { PeekViewService } from '@affine/core/modules/peek-view';
import { createIcon, EditorHostKey, } from '@blocksuite/affine/blocks/database';
import { openFilesWith } from '@blocksuite/affine/shared/utils';
import { DeleteIcon, DownloadIcon, FileIcon, MoreHorizontalIcon, PlusIcon, } from '@blocksuite/icons/rc';
import { computed, signal, } from '@preact/signals-core';
import { generateFractionalIndexingKeyBetween, useService, } from '@toeverything/infra';
import { fileTypeFromBuffer } from 'file-type';
import { nanoid } from 'nanoid';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, } from 'react';
import { WorkspaceDialogService } from '../../../../modules/dialogs';
import { useSignalValue } from '../../../../modules/doc-info/utils';
import { CircularProgress } from '../../components/loading';
import { progressIconContainer } from '../../components/loading.css';
import { filePropertyModelConfig } from './define';
import * as styles from './style.css';
class FileUploadManager {
    constructor(blobSync) {
        this.blobSync = blobSync;
        this.uploadProgressMap = new Map();
        this.fileLoadMap = new Map();
    }
    uploadFile(file, onComplete) {
        const tempId = nanoid();
        const progress = signal({
            progress: 0,
            name: file.name,
        });
        this.uploadProgressMap.set(tempId, progress);
        this.startUpload(file, tempId)
            .then(blobId => {
            this.uploadProgressMap.delete(tempId);
            onComplete?.(blobId);
        })
            .catch(() => {
            this.uploadProgressMap.delete(tempId);
            onComplete?.();
        });
        return tempId;
    }
    async startUpload(file, fileId) {
        let progress = this.uploadProgressMap.get(fileId);
        if (!progress) {
            return;
        }
        progress.value = {
            ...progress.value,
            progress: 10,
        };
        const arrayBuffer = await file.arrayBuffer();
        progress = this.uploadProgressMap.get(fileId);
        if (!progress) {
            return;
        }
        progress.value = {
            ...progress.value,
            progress: 30,
        };
        const blob = new Blob([arrayBuffer], {
            type: file.type,
        });
        this.simulateUploadProgress(fileId);
        const uploadedId = await this.blobSync.set(blob);
        progress = this.uploadProgressMap.get(fileId);
        if (!progress) {
            return;
        }
        progress.value = {
            ...progress.value,
            progress: 100,
        };
        return uploadedId;
    }
    getUploadProgress(fileId) {
        return this.uploadProgressMap.get(fileId);
    }
    async getFileBlob(blobId) {
        return this.blobSync?.get(blobId);
    }
    getFileInfo(blobId) {
        let fileLoadData = this.fileLoadMap.get(blobId);
        if (fileLoadData) {
            return fileLoadData;
        }
        const blobPromise = this.getFileBlob(blobId);
        fileLoadData = signal(undefined);
        this.fileLoadMap.set(blobId, fileLoadData);
        blobPromise
            .then(async (blob) => {
            if (!blob) {
                return;
            }
            const fileType = await fileTypeFromBuffer(await blob.arrayBuffer());
            fileLoadData.value = {
                blob,
                url: URL.createObjectURL(blob),
                fileType,
            };
        })
            .catch(() => { });
        return fileLoadData;
    }
    simulateUploadProgress(fileId) {
        setTimeout(() => {
            const progress = this.uploadProgressMap.get(fileId);
            if (!progress || progress.value.progress >= 100)
                return;
            const next = (100 - progress.value.progress) / 10 + progress.value.progress;
            progress.value = {
                ...progress.value,
                progress: Math.min(next, 100),
            };
            this.simulateUploadProgress(fileId);
        }, 10);
    }
    dispose() {
        this.fileLoadMap.forEach(fileLoadData => {
            const url = fileLoadData.value?.url;
            if (url) {
                URL.revokeObjectURL(url);
            }
        });
        this.uploadProgressMap.clear();
        this.fileLoadMap.clear();
    }
}
class FileCellManager {
    get readonly() {
        return this.cell.property.readonly$;
    }
    constructor(props, peekViewService) {
        this.peekViewService = peekViewService;
        this.uploadingFiles = signal({});
        this.doneFiles = computed(() => this.cell.value$.value ?? {});
        this.removeFile = (file, e) => {
            e?.stopPropagation();
            if (file.type === 'uploading') {
                const newTemp = { ...this.uploadingFiles.value };
                delete newTemp[file.id];
                this.uploadingFiles.value = newTemp;
                return;
            }
            const value = { ...this.cell.value$.value };
            delete value[file.id];
            this.cell.valueSet(value);
        };
        this.uploadFile = (file) => {
            if (!this.fileUploadManager) {
                return;
            }
            const lastFile = this.fileList.value[this.fileList.value.length - 1];
            const order = generateFractionalIndexingKeyBetween(lastFile?.order || null, null);
            const fileId = this.fileUploadManager.uploadFile(file, blobId => {
                if (blobId) {
                    this.cell.valueSet({
                        ...this.cell.value$.value,
                        [blobId]: {
                            name: file.name,
                            id: blobId,
                            order,
                            mime: this.fileUploadManager?.getFileInfo(blobId).value?.fileType
                                ?.mime,
                        },
                    });
                }
                this.removeFile(tempFile);
            });
            const tempFile = {
                id: fileId,
                type: 'uploading',
                name: file.name,
                order,
            };
            this.uploadingFiles.value = {
                ...this.uploadingFiles.value,
                [fileId]: tempFile,
            };
        };
        this.fileList = computed(() => {
            const uploadingList = Object.values(this.uploadingFiles.value);
            const doneList = Object.values(this.doneFiles.value).map(file => ({
                ...file,
                type: 'done',
            }));
            return [...doneList, ...uploadingList].sort((a, b) => a.order > b.order ? 1 : -1);
        });
        this.openPreview = (id) => {
            const imageList = this.fileList.value
                .filter(v => v.type === 'done')
                .map(v => ({
                ...v,
                ...this.fileUploadManager?.getFileInfo(v.id).value,
            }))
                .filter(v => SUPPORTED_IMAGE_MIME_TYPES.has(v?.fileType?.mime ?? ''));
            const getImageData = (index) => {
                const file = imageList[index];
                if (!file)
                    return;
                const previousIndex = index - 1;
                const nextIndex = index + 1;
                const hasPrevious = previousIndex >= 0;
                const hasNext = nextIndex < imageList.length;
                return {
                    index,
                    url: file.url ?? '',
                    caption: file.name,
                    previous: hasPrevious ? () => getImageData(previousIndex) : undefined,
                    next: hasNext ? () => getImageData(nextIndex) : undefined,
                };
            };
            const currentIndex = imageList.findIndex(v => v.id === id);
            if (currentIndex === -1)
                return;
            const imageData = getImageData(currentIndex);
            if (!imageData)
                return;
            this.peekViewService.peekView
                .open({
                type: 'image-list',
                data: {
                    image: imageData,
                    total: imageList.length,
                },
            })
                .catch(error => {
                console.error('Failed to open image list', error);
            });
        };
        this.cell = props.cell;
        this.selectCurrentCell = props.selectCurrentCell;
        this.isEditing = props.isEditing$;
        this.blobSync = this.cell?.view?.serviceGet
            ? this.cell.view.serviceGet(EditorHostKey)?.store.blobSync
            : undefined;
        this.fileUploadManager = this.blobSync
            ? new FileUploadManager(this.blobSync)
            : undefined;
    }
    dispose() {
        this.fileUploadManager?.dispose();
    }
}
const SUPPORTED_IMAGE_MIME_TYPES = new Set([
    'image/apng',
    'image/avif',
    'image/gif',
    'image/jpeg',
    'image/png',
    'image/svg+xml',
    'image/webp',
    'image/tiff',
    'image/bmp',
    'image/vnd.microsoft.icon',
]);
const FileCellComponent = (props, ref) => {
    const peekView = useService(PeekViewService);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const manager = useMemo(() => new FileCellManager(props, peekView), []);
    useEffect(() => {
        return () => {
            manager.dispose();
        };
    }, [manager]);
    useImperativeHandle(ref, () => ({
        beforeEnterEditMode: () => {
            return true;
        },
        beforeExitEditingMode: () => { },
        afterEnterEditingMode: () => { },
        focusCell: () => true,
        blurCell: () => true,
        forceUpdate: () => { },
    }), []);
    const fileList = useSignalValue(manager.fileList);
    const isEditing = useSignalValue(manager.isEditing);
    const workspaceDialogService = useService(WorkspaceDialogService);
    const jumpToPricePlan = useCallback(() => {
        workspaceDialogService.open('setting', {
            activeTab: 'plans',
            scrollAnchor: 'cloudPricingPlan',
        });
    }, [workspaceDialogService]);
    const renderPopoverContent = () => {
        if (fileList.length === 0) {
            return (_jsxs("div", { "data-peek-view-wrapper": "true", className: styles.uploadPopoverContainer, children: [_jsx(Button, { onClick: () => {
                            openFilesWith()
                                .then(files => {
                                files?.forEach(file => {
                                    manager.uploadFile(file);
                                });
                            })
                                .catch(e => {
                                console.error(e);
                            });
                        }, variant: "primary", className: styles.uploadButton, children: "Choose a file" }), _jsxs("div", { className: styles.fileInfoContainer, children: [_jsx("div", { className: styles.fileSizeInfo, children: "The maximum size per file is 100MB" }), _jsx("a", { className: styles.upgradeLink, onClick: jumpToPricePlan, children: "Upgrade to Pro" })] })] }));
        }
        return (_jsxs("div", { "data-peek-view-wrapper": "true", className: styles.filePopoverContainer, children: [_jsx("div", { className: styles.fileListContainer, children: fileList.map(file => (_jsx(FileListItem, { file: file, handleRemoveFile: manager.removeFile, manager: manager }, file.id))) }), _jsx("div", { className: styles.uploadContainer, children: _jsxs("div", { onClick: () => {
                            openFilesWith()
                                .then(files => {
                                files?.forEach(file => {
                                    manager.uploadFile(file);
                                });
                            })
                                .catch(e => {
                                console.error(e);
                            });
                        }, className: styles.uploadButtonStyle, children: [_jsx(PlusIcon, { className: styles.iconPrimary, width: 20, height: 20 }), _jsx("span", { children: "Add a file or image" })] }) })] }));
    };
    return (_jsxs("div", { style: { overflow: 'hidden' }, children: [_jsx(Popover, { open: isEditing, onOpenChange: open => {
                    manager.selectCurrentCell(open);
                }, contentOptions: {
                    className: styles.filePopoverContent,
                }, content: renderPopoverContent(), children: _jsx("div", {}) }), _jsx("div", { className: styles.cellContainer, children: fileList.map(file => (_jsx("div", { className: styles.fileItemCell, children: _jsx(FilePreview, { file: file, manager: manager }) }, file.id))) })] }));
};
const useFilePreview = (file, manager) => {
    const fileUploadManager = manager.fileUploadManager;
    const uploadProgress = useSignalValue(file.type === 'uploading'
        ? fileUploadManager?.getUploadProgress(file.id)
        : undefined);
    const loadFileData = useSignalValue(file.type === 'done' ? fileUploadManager?.getFileInfo(file.id) : undefined);
    if (uploadProgress != null) {
        return {
            preview: (_jsx("div", { className: progressIconContainer, children: _jsx(CircularProgress, { progress: uploadProgress.progress }) })),
            fileType: 'uploading',
        };
    }
    const mime = loadFileData?.fileType?.mime ??
        (file.type === 'done' ? file.mime : undefined);
    if (mime && SUPPORTED_IMAGE_MIME_TYPES.has(mime)) {
        if (loadFileData == null) {
            return {
                preview: null,
                fileType: 'loading',
            };
        }
        const onPreview = () => {
            manager.openPreview(file.id);
        };
        return {
            onPreview,
            preview: (_jsx("img", { onClick: (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onPreview();
                }, className: styles.imagePreviewIcon, src: loadFileData.url, alt: file.name })),
            fileType: 'image',
        };
    }
    return {
        preview: _jsx(FileIcon, { className: styles.iconPrimary, width: 18, height: 18 }),
        fileType: 'file',
    };
};
export const FileListItem = (props) => {
    const { file, handleRemoveFile, manager } = props;
    const { preview, fileType, onPreview } = useFilePreview(file, manager);
    const fileUploadManager = manager.fileUploadManager;
    const handleDownloadFile = useCallback(async (fileId, e) => {
        e?.stopPropagation();
        try {
            const blob = await fileUploadManager?.getFileBlob(fileId);
            if (!blob) {
                console.error('Failed to download: blob not found');
                return;
            }
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = file.name;
            document.body.append(a);
            a.click();
            setTimeout(() => {
                a.remove();
                URL.revokeObjectURL(url);
            }, 100);
        }
        catch (error) {
            console.error('Download failed', error);
        }
    }, [fileUploadManager, file.name]);
    const menuItems = (_jsxs(_Fragment, { children: [fileType === 'image' && (_jsx(MenuItem, { onClick: onPreview, prefixIcon: _jsx(FileIcon, { width: 20, height: 20 }), children: "Preview" })), (fileType === 'file' || fileType === 'image') && (_jsx(MenuItem, { onClick: e => {
                    void handleDownloadFile(file.id, e).catch(error => {
                        console.error('Download failed:', error);
                    });
                }, prefixIcon: _jsx(DownloadIcon, { width: 20, height: 20 }), children: "Download" })), _jsx(MenuItem, { onClick: e => {
                    handleRemoveFile(file, e);
                }, type: 'danger', prefixIcon: _jsx(DeleteIcon, { width: 20, height: 20 }), children: "Delete" })] }));
    return (_jsxs("div", { className: styles.fileItem, children: [_jsx("div", { className: styles.fileItemContent, style: fileType === 'image' ? { cursor: 'pointer' } : undefined, children: fileType === 'image' ? (_jsx("div", { className: styles.fileItemImagePreview, children: preview })) : (_jsxs(_Fragment, { children: [preview, _jsx("div", { className: styles.fileNameStyle, children: file.name })] })) }), _jsx(Menu, { items: menuItems, rootOptions: { modal: false }, children: _jsx("div", { className: styles.menuButton, onClick: (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                    }, children: _jsx(MoreHorizontalIcon, { width: 16, height: 16 }) }) })] }));
};
const FilePreview = (props) => {
    const { file, manager } = props;
    const { preview, fileType } = useFilePreview(file, manager);
    if (fileType === 'file') {
        return _jsx("div", { className: styles.filePreviewContainer, children: file.name });
    }
    if (fileType === 'image') {
        return (_jsx("div", { className: styles.imagePreviewContainer, style: { cursor: 'pointer' }, children: preview }));
    }
    return preview;
};
const FileCell = forwardRef(FileCellComponent);
export const filePropertyConfig = filePropertyModelConfig.createPropertyMeta({
    icon: createIcon('FileIcon'),
    cellRenderer: {
        view: uniReactRoot.createUniComponent(FileCell),
    },
});
//# sourceMappingURL=view.js.map