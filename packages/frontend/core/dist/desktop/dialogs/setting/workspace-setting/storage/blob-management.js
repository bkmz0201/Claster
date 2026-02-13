import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, Checkbox, Loading, templateToString, useConfirmModal, useDisposable, } from '@affine/component';
import { Pagination } from '@affine/component/setting-components';
import { BlobManagementService } from '@affine/core/modules/blob-management/services';
import { useI18n } from '@affine/i18n';
import track from '@affine/track';
import { getAttachmentFileIcon } from '@blocksuite/affine/components/icons';
import { DeleteIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import bytes from 'bytes';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as styles from './style.css';
const Empty = () => {
    const t = useI18n();
    return (_jsx("div", { className: styles.empty, children: t['com.affine.settings.workspace.storage.unused-blobs.empty']() }));
};
const useBlob = (blobRecord) => {
    const unusedBlobsEntity = useService(BlobManagementService).unusedBlobs;
    return useDisposable((abortSignal) => unusedBlobsEntity.hydrateBlob(blobRecord, abortSignal), [blobRecord]);
};
const BlobPreview = ({ blobRecord }) => {
    const { data, loading, error } = useBlob(blobRecord);
    const element = useMemo(() => {
        if (loading)
            return _jsx(Loading, { size: 24 });
        if (!data?.url || !data.type)
            return null;
        const { url, type, mime } = data;
        const icon = templateToString(getAttachmentFileIcon(type));
        if (error) {
            return (_jsx("div", { className: styles.unknownBlobIcon, dangerouslySetInnerHTML: { __html: icon } }));
        }
        if (mime?.startsWith('image/')) {
            return (_jsx("img", { className: styles.blobImagePreview, src: url, alt: blobRecord.key }));
        }
        else {
            return (_jsx("div", { className: styles.unknownBlobIcon, dangerouslySetInnerHTML: { __html: icon } }));
        }
    }, [loading, data, error, blobRecord.key]);
    return (_jsxs("div", { className: styles.blobPreviewContainer, children: [_jsx("div", { className: styles.blobPreview, children: element }), _jsxs("div", { className: styles.blobPreviewFooter, children: [_jsx("div", { className: styles.blobPreviewName, children: blobRecord.key }), _jsxs("div", { className: styles.blobPreviewInfo, children: [data?.type ? `${data.type} · ` : '', bytes(blobRecord.size)] })] })] }));
};
const BlobCard = ({ blobRecord, onClick, selected, }) => {
    return (_jsxs("div", { "data-testid": "blob-preview-card", className: styles.blobCard, "data-selected": selected, onClick: onClick, children: [_jsx(Checkbox, { className: styles.blobGridItemCheckbox, checked: selected }), _jsx(BlobPreview, { blobRecord: blobRecord })] }));
};
const PAGE_SIZE = 9;
export const BlobManagementPanel = () => {
    const t = useI18n();
    const unusedBlobsEntity = useService(BlobManagementService).unusedBlobs;
    const originalUnusedBlobs = useLiveData(unusedBlobsEntity.unusedBlobs$);
    const isLoading = useLiveData(unusedBlobsEntity.isLoading$);
    const [pageNum, setPageNum] = useState(0);
    const [skip, setSkip] = useState(0);
    const [selectionAnchor, setSelectionAnchor] = useState(null);
    const [unusedBlobs, setUnusedBlobs] = useState([]);
    const unusedBlobsPage = useMemo(() => {
        return unusedBlobs.slice(skip, skip + PAGE_SIZE);
    }, [unusedBlobs, skip]);
    useEffect(() => {
        setUnusedBlobs(originalUnusedBlobs);
    }, [originalUnusedBlobs]);
    useEffect(() => {
        unusedBlobsEntity.revalidate();
    }, [unusedBlobsEntity]);
    const [selectedBlobs, setSelectedBlobs] = useState([]);
    const [deleting, setDeleting] = useState(false);
    const handleSelectBlob = useCallback((blob) => {
        setSelectedBlobs(prev => {
            if (prev.includes(blob)) {
                return prev;
            }
            return [...prev, blob];
        });
    }, []);
    const handleUnselectBlob = useCallback((blob) => {
        setSelectedBlobs(prev => prev.filter(b => b.key !== blob.key));
    }, []);
    const handleBlobClick = useCallback((blob, event) => {
        const isMetaKey = event.metaKey || event.ctrlKey;
        if (event.shiftKey && selectionAnchor) {
            // Shift+click: Select range from anchor to current
            const anchorIndex = unusedBlobsPage.findIndex(b => b.key === selectionAnchor.key);
            const currentIndex = unusedBlobsPage.findIndex(b => b.key === blob.key);
            if (anchorIndex !== -1 && currentIndex !== -1) {
                const start = Math.min(anchorIndex, currentIndex);
                const end = Math.max(anchorIndex, currentIndex);
                const blobsToSelect = unusedBlobsPage.slice(start, end + 1);
                setSelectedBlobs(prev => {
                    // If meta/ctrl is also pressed, add to existing selection
                    const baseSelection = isMetaKey ? prev : [];
                    const newSelection = new Set([...baseSelection, ...blobsToSelect]);
                    return Array.from(newSelection);
                });
            }
        }
        else {
            if (selectedBlobs.includes(blob)) {
                handleUnselectBlob(blob);
            }
            else {
                handleSelectBlob(blob);
            }
            if (selectedBlobs.length === 0) {
                setSelectionAnchor(selectedBlobs.includes(blob) ? null : blob);
            }
        }
    }, [
        selectionAnchor,
        unusedBlobsPage,
        selectedBlobs,
        handleSelectBlob,
        handleUnselectBlob,
    ]);
    const handleSelectAll = useCallback((e) => {
        e.stopPropagation();
        unusedBlobsPage.forEach(blob => handleSelectBlob(blob));
    }, [unusedBlobsPage, handleSelectBlob]);
    const showSelectAll = !unusedBlobsPage.every(blob => selectedBlobs.includes(blob));
    const { openConfirmModal } = useConfirmModal();
    const handleDeleteSelectedBlobs = useCallback((e) => {
        e.stopPropagation();
        const currentSelectedBlobs = selectedBlobs;
        openConfirmModal({
            title: t['com.affine.settings.workspace.storage.unused-blobs.delete.title'](),
            children: t['com.affine.settings.workspace.storage.unused-blobs.delete.warning'](),
            onConfirm: async () => {
                setDeleting(true);
                track.$.settingsPanel.workspace.deleteUnusedBlob();
                for (const blob of currentSelectedBlobs) {
                    await unusedBlobsEntity.deleteBlob(blob.key, true);
                    handleUnselectBlob(blob);
                    setUnusedBlobs(prev => prev.filter(b => b.key !== blob.key));
                }
                setDeleting(false);
            },
            confirmText: t['Delete'](),
            cancelText: t['Cancel'](),
            confirmButtonOptions: {
                variant: 'error',
            },
        });
    }, [selectedBlobs, openConfirmModal, t, unusedBlobsEntity, handleUnselectBlob]);
    const blobPreviewGridRef = useRef(null);
    useEffect(() => {
        if (blobPreviewGridRef.current) {
            const unselectBlobs = (e) => {
                const target = e.target;
                if (!blobPreviewGridRef.current?.contains(target)) {
                    setSelectedBlobs([]);
                }
            };
            document.addEventListener('click', unselectBlobs);
            return () => {
                document.removeEventListener('click', unselectBlobs);
            };
        }
        return;
    }, [unusedBlobs]);
    const isEmpty = (unusedBlobs.length === 0 || !unusedBlobs) && !isLoading;
    return (_jsxs(_Fragment, { children: [selectedBlobs.length > 0 ? (_jsxs("div", { className: styles.blobManagementControls, children: [_jsx("div", { className: styles.blobManagementName, children: `${selectedBlobs.length} ${t['com.affine.settings.workspace.storage.unused-blobs.selected']()}` }), _jsx("div", { className: styles.spacer }), showSelectAll && (_jsx(Button, { onClick: handleSelectAll, variant: "primary", children: t['com.affine.keyboardShortcuts.selectAll']() })), _jsx(Button, { loading: deleting, onClick: handleDeleteSelectedBlobs, prefix: _jsx(DeleteIcon, {}), disabled: deleting, children: t['Delete']() })] })) : (_jsx("div", { className: styles.blobManagementNameInactive, children: `${t['com.affine.settings.workspace.storage.unused-blobs']()} (${unusedBlobs.length})` })), isEmpty ? (_jsx(Empty, {})) : (_jsx("div", { className: styles.blobManagementContainer, children: isLoading ? (_jsx("div", { className: styles.loadingContainer, children: _jsx(Loading, { size: 32 }) })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: styles.blobPreviewGrid, ref: blobPreviewGridRef, children: unusedBlobsPage.map(blob => {
                                const selected = selectedBlobs.includes(blob);
                                return (_jsx(BlobCard, { blobRecord: blob, onClick: e => handleBlobClick(blob, e), selected: selected }, blob.key));
                            }) }), unusedBlobs.length > PAGE_SIZE && (_jsx(Pagination, { pageNum: pageNum, totalCount: unusedBlobs.length, countPerPage: PAGE_SIZE, onPageChange: (_, pageNum) => {
                                setPageNum(pageNum);
                                setSkip(pageNum * PAGE_SIZE);
                            } }))] })) }))] }));
};
//# sourceMappingURL=blob-management.js.map