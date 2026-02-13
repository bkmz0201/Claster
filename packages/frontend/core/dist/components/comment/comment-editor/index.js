import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconButton, notify, toast } from '@affine/component';
import { LitDocEditor } from '@affine/core/blocksuite/editors';
import { SnapshotHelper } from '@affine/core/modules/comment/services/snapshot-helper';
import { PeekViewService } from '@affine/core/modules/peek-view';
import { downloadResourceWithUrl } from '@affine/core/utils/resource';
import { DebugLogger } from '@affine/debug';
import { getAttachmentFileIconRC } from '@blocksuite/affine/components/icons';
import { selectTextModel } from '@blocksuite/affine/rich-text';
import { ViewportElementExtension } from '@blocksuite/affine/shared/services';
import { openFilesWith } from '@blocksuite/affine/shared/utils';
import { nanoid, Store } from '@blocksuite/affine/store';
import { ArrowUpBigIcon, AttachmentIcon, CloseIcon, } from '@blocksuite/icons/rc';
import { useFramework, useService } from '@toeverything/infra';
import bytes from 'bytes';
import clsx from 'clsx';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState, } from 'react';
import { useAsyncCallback } from '../../hooks/affine-async-hooks';
import { getCommentEditorViewManager } from './specs';
import * as styles from './style.css';
const MAX_ATTACHMENT_COUNT = 10;
const logger = new DebugLogger('CommentEditor');
const usePatchSpecs = (readonly) => {
    const framework = useFramework();
    // const confirmModal = useConfirmModal();
    const patchedSpecs = useMemo(() => {
        const manager = getCommentEditorViewManager(framework);
        return manager
            .get(readonly ? 'preview-page' : 'page')
            .concat([ViewportElementExtension('.comment-editor-viewport')]);
    }, [framework, readonly]);
    return patchedSpecs;
};
// todo: get rid of circular data changes
const useSnapshotDoc = (defaultSnapshotOrDoc, readonly) => {
    const snapshotHelper = useService(SnapshotHelper);
    const [doc, setDoc] = useState(defaultSnapshotOrDoc instanceof Store ? defaultSnapshotOrDoc : undefined);
    useEffect(() => {
        if (defaultSnapshotOrDoc instanceof Store) {
            return;
        }
        snapshotHelper
            .createStore(defaultSnapshotOrDoc)
            .then(d => {
            if (d) {
                setDoc(d);
                d.readonly = readonly ?? false;
            }
        })
            .catch(e => {
            console.error(e);
        });
    }, [defaultSnapshotOrDoc, readonly, snapshotHelper]);
    return doc;
};
const isImageAttachment = (att) => {
    const type = att.mimeType || att.file?.type || '';
    if (type)
        return type.startsWith('image/');
    return !!att.url && /\.(png|jpe?g|gif|webp|svg)$/i.test(att.url);
};
const AttachmentPreviewItem = ({ attachment, index, readonly, handleAttachmentClick, handleAttachmentRemove, }) => {
    const isImg = isImageAttachment(attachment);
    const Icon = !isImg
        ? getAttachmentFileIconRC(attachment.mimeType ||
            attachment.file?.type ||
            attachment.filename?.split('.').pop() ||
            'none')
        : undefined;
    return (_jsxs("div", { className: isImg ? styles.previewBox : styles.filePreviewBox, style: {
            backgroundImage: isImg
                ? `url(${attachment.localUrl ?? attachment.url})`
                : undefined,
        }, onClick: e => handleAttachmentClick(e, index), children: [!isImg && Icon && _jsx(Icon, { className: styles.fileIcon }), !isImg && (_jsxs("div", { className: styles.fileInfo, children: [_jsx("span", { className: styles.fileName, children: attachment.filename || attachment.file?.name || 'File' }), _jsx("span", { className: styles.fileSize, children: attachment.size ? bytes(attachment.size) : '' })] })), !readonly && (_jsx(IconButton, { size: 12, className: styles.attachmentButton, loading: attachment.status === 'uploading', variant: "danger", onClick: e => {
                    e.stopPropagation();
                    handleAttachmentRemove(attachment.id);
                }, icon: _jsx(CloseIcon, {}) }))] }, attachment.id));
};
export const CommentEditor = forwardRef(function CommentEditor({ readonly, defaultSnapshot, doc: userDoc, onChange, onCommit, uploadCommentAttachment, autoFocus, attachments, onAttachmentsChange, }, ref) {
    const defaultSnapshotOrDoc = defaultSnapshot ?? userDoc;
    if (!defaultSnapshotOrDoc) {
        throw new Error('Either defaultSnapshot or doc must be provided');
    }
    const specs = usePatchSpecs(!!readonly);
    const doc = useSnapshotDoc(defaultSnapshotOrDoc, readonly);
    const snapshotHelper = useService(SnapshotHelper);
    const peekViewService = useService(PeekViewService);
    const editorRef = useRef(null);
    const [empty, setEmpty] = useState(true);
    const setAttachments = useCallback((updater) => {
        const next = updater(attachments ?? []);
        onAttachmentsChange?.(next);
    }, [attachments, onAttachmentsChange]);
    const isUploadDisabled = (attachments?.length ?? 0) >= MAX_ATTACHMENT_COUNT;
    const uploadingAttachments = attachments?.some(att => att.status === 'uploading');
    const commitDisabled = (empty && (attachments?.length ?? 0) === 0) || uploadingAttachments;
    const addAttachments = useAsyncCallback(async (files) => {
        if (!uploadCommentAttachment)
            return;
        const remaining = MAX_ATTACHMENT_COUNT - (attachments?.length ?? 0);
        const valid = files.slice(0, remaining);
        if (!valid.length)
            return;
        logger.info('addAttachments', { files: valid });
        const pendingAttachments = valid.map(f => ({
            id: nanoid(),
            file: f,
            localUrl: URL.createObjectURL(f),
            status: 'uploading',
            filename: f.name,
            mimeType: f.type,
        }));
        setAttachments(prev => [...prev, ...pendingAttachments]);
        for (const pending of pendingAttachments) {
            if (!pending.file)
                continue; // should not happen
            try {
                const remoteUrl = await uploadCommentAttachment(pending.id, pending.file);
                logger.info('uploadCommentAttachment success', {
                    remoteUrl,
                });
                pending.localUrl && URL.revokeObjectURL(pending.localUrl);
                setAttachments(prev => {
                    const index = prev.findIndex(att => att.id === pending.id);
                    if (index === -1)
                        return prev;
                    // create a shallow copy to trigger re-render
                    const next = [...prev];
                    next[index] = {
                        ...next[index],
                        status: 'success',
                        url: remoteUrl,
                    };
                    return next;
                });
            }
            catch (e) {
                logger.error('uploadCommentAttachment failed', { error: e });
                notify.error({
                    title: 'Failed to upload attachment',
                    message: e.message,
                });
                pending.localUrl && URL.revokeObjectURL(pending.localUrl);
                setAttachments(prev => {
                    const index = prev.findIndex(att => att.id === pending.id);
                    if (index === -1)
                        return prev;
                    const next = [...prev];
                    next[index] = { ...next[index], status: 'error' };
                    return next;
                });
            }
        }
    }, [attachments?.length, setAttachments, uploadCommentAttachment]);
    const handlePaste = useCallback((event) => {
        const items = event.clipboardData?.items;
        if (!items)
            return;
        const files = [];
        for (const index in items) {
            const item = items[index];
            if (item.kind === 'file') {
                const blob = item.getAsFile();
                if (blob)
                    files.push(blob);
            }
        }
        if (files.length) {
            event.preventDefault();
            addAttachments(files);
        }
    }, [addAttachments]);
    const handleDragOver = useCallback((e) => {
        if (readonly)
            return;
        // Prevent default to allow drop
        e.preventDefault();
    }, [readonly]);
    const handleDrop = useCallback((e) => {
        if (readonly)
            return;
        e.preventDefault();
        e.stopPropagation();
        const files = Array.from(e.dataTransfer?.files ?? []);
        if (files.length) {
            addAttachments(files);
        }
    }, [addAttachments, readonly]);
    const openFilePicker = useAsyncCallback(async () => {
        if (isUploadDisabled)
            return;
        const files = await openFilesWith('Any');
        if (files) {
            addAttachments(files);
        }
    }, [isUploadDisabled, addAttachments]);
    const handleAttachmentRemove = useCallback((id) => {
        setAttachments(prev => {
            const att = prev.find(att => att.id === id);
            if (att?.localUrl)
                URL.revokeObjectURL(att.localUrl);
            return prev.filter(att => att.id !== id);
        });
    }, [setAttachments]);
    const handleImagePreview = useCallback((index) => {
        if (!attachments)
            return;
        const imageAttachments = attachments.filter(isImageAttachment);
        if (index >= imageAttachments.length)
            return;
        const getImageData = (currentIndex) => {
            const attachment = imageAttachments[currentIndex];
            if (!attachment)
                return undefined;
            return {
                index: currentIndex,
                url: attachment.url || attachment.localUrl || '',
                caption: attachment.file?.name || `Image ${currentIndex + 1}`,
                previous: currentIndex > 0
                    ? () => getImageData(currentIndex - 1)
                    : undefined,
                next: currentIndex < imageAttachments.length - 1
                    ? () => getImageData(currentIndex + 1)
                    : undefined,
            };
        };
        const imageData = getImageData(index);
        if (!imageData)
            return;
        peekViewService.peekView
            .open({
            type: 'image-list',
            data: {
                image: imageData,
                total: imageAttachments.length,
            },
        })
            .catch(error => {
            console.error('Failed to open image preview', error);
        });
    }, [attachments, peekViewService]);
    const handleAttachmentClick = useCallback((e, index) => {
        e.stopPropagation();
        if (!attachments)
            return;
        const att = attachments[index];
        if (!att)
            return;
        if (isImageAttachment(att)) {
            // translate attachment index to image index
            const imageAttachments = attachments.filter(isImageAttachment);
            const imageIndex = imageAttachments.findIndex(i => i.id === att.id);
            if (imageIndex >= 0) {
                handleImagePreview(imageIndex);
            }
        }
        else if (att.url) {
            // todo: open attachment preview. for now, just download it
            downloadResourceWithUrl(att.url, att.filename ?? att.file?.name ?? 'attachment').catch(e => {
                console.error('Failed to download attachment', e);
                notify.error({
                    title: 'Failed to download attachment',
                    message: e.message,
                });
            });
            toast('The attachment is being downloaded to your computer.');
        }
    }, [attachments, handleImagePreview]);
    // upload attachments and call original onCommit
    const handleCommit = useAsyncCallback(async () => {
        if (readonly || commitDisabled)
            return;
        onCommit?.();
        setAttachments(prev => {
            prev.forEach(att => att.localUrl && URL.revokeObjectURL(att.localUrl));
            return [];
        });
    }, [readonly, commitDisabled, onCommit, setAttachments]);
    const focusEditor = useAsyncCallback(async () => {
        if (editorRef.current) {
            const selectionService = editorRef.current.std.selection;
            const selection = selectionService.value.at(-1);
            editorRef.current.std.event.active = true;
            await editorRef.current.host?.updateComplete;
            if (selection) {
                selectTextModel(editorRef.current.std, selection.blockId, selection.from.index, selection.from.length);
            }
            else {
                const richTexts = Array.from(editorRef.current?.querySelectorAll('rich-text') ?? []);
                const lastRichText = richTexts.at(-1);
                if (lastRichText) {
                    lastRichText.inlineEditor?.focusEnd();
                }
            }
        }
    }, [editorRef]);
    useImperativeHandle(ref, () => ({
        getSnapshot: () => {
            if (!doc) {
                return null;
            }
            return snapshotHelper.getSnapshot(doc);
        },
        focus: focusEditor,
    }), [doc, focusEditor, snapshotHelper]);
    useEffect(() => {
        let cancel = false;
        if (autoFocus && editorRef.current && doc) {
            // Wait for editor to be fully loaded before focusing
            editorRef.current.updateComplete
                .then(async () => {
                if (cancel)
                    return;
                const richText = editorRef.current?.querySelector('rich-text');
                if (!richText)
                    return;
                richText.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
                // Finally focus the inline editor
                richText.focus();
                focusEditor();
            })
                .catch(console.error);
        }
        return () => {
            cancel = true;
        };
    }, [autoFocus, doc, focusEditor]);
    useEffect(() => {
        if (doc) {
            const subscription = doc.slots.blockUpdated.subscribe(() => {
                if (onChange) {
                    const snapshot = snapshotHelper.getSnapshot(doc);
                    if (snapshot) {
                        onChange?.(snapshot);
                    }
                }
                setEmpty(snapshotHelper.isDocEmpty(doc));
            });
            return () => {
                subscription?.unsubscribe();
            };
        }
        return;
    }, [doc, onChange, snapshotHelper]);
    // Add keydown handler to commit on Enter key
    const handleKeyDown = useCallback((e) => {
        if (readonly)
            return;
        // Only handle Enter if focus is within the editor
        const activeElement = document.activeElement;
        if (!editorRef.current?.contains(activeElement))
            return;
        // If Enter is pressed without CMD/CTRL key, commit the comment
        if (e.key === 'Enter' && !(e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            e.stopPropagation();
            handleCommit();
        }
    }, [handleCommit, readonly]);
    const handleClickEditor = useCallback((e) => {
        e.stopPropagation();
        focusEditor();
    }, [focusEditor]);
    useEffect(() => {
        return () => {
            // Cleanup any remaining local URLs on unmount
            attachments?.forEach(att => {
                if (att.localUrl)
                    URL.revokeObjectURL(att.localUrl);
            });
        };
    }, [attachments]);
    return (_jsxs("div", { onClick: readonly ? undefined : handleClickEditor, onKeyDown: handleKeyDown, onPaste: handlePaste, onDragOver: handleDragOver, onDrop: handleDrop, "data-readonly": !!readonly, className: clsx(styles.container, 'comment-editor-viewport'), children: [attachments?.length && attachments.length > 0 ? (_jsx("div", { className: styles.previewRow, "data-testid": "comment-attachment-preview", children: attachments.map((att, index) => (_jsx(AttachmentPreviewItem, { attachment: att, index: index, readonly: readonly, handleAttachmentClick: handleAttachmentClick, handleAttachmentRemove: handleAttachmentRemove }, att.id))) })) : null, doc && (_jsx(LitDocEditor, { ref: editorRef, specs: specs, doc: doc }, doc.id)), !readonly && (_jsxs("div", { className: styles.footer, children: [_jsx(IconButton, { icon: _jsx(AttachmentIcon, {}), onClick: openFilePicker, disabled: isUploadDisabled }), _jsx("button", { onClick: handleCommit, className: styles.commitButton, disabled: commitDisabled, children: _jsx(ArrowUpBigIcon, {}) })] }))] }));
});
//# sourceMappingURL=index.js.map