import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Divider, Loading, toast } from '@affine/component';
import { Button, IconButton } from '@affine/component/ui/button';
import { useAsyncCallback } from '@affine/core/components/hooks/affine-async-hooks';
import { ArrowLeftSmallIcon, ArrowRightSmallIcon, CloseIcon, CopyIcon, DeleteIcon, DownloadIcon, MinusIcon, PlusIcon, ViewBarIcon, } from '@blocksuite/icons/rc';
import { useService } from '@toeverything/infra';
import clsx from 'clsx';
import { forwardRef, useCallback, useEffect, useMemo, useRef, useState, } from 'react';
import useSWR from 'swr';
import { downloadResourceWithUrl, resourceUrlToBlob, } from '../../../../utils/resource';
import { PeekViewService } from '../../services/peek-view';
import { useEditor } from '../utils';
import { useZoomControls } from './hooks/use-zoom';
import * as styles from './index.css';
async function copyImageToClipboard(url) {
    const blob = await resourceUrlToBlob(url);
    if (!blob) {
        return;
    }
    try {
        await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
        console.log('Image copied to clipboard');
        toast('Copied to clipboard.');
    }
    catch (error) {
        console.error('Error copying image to clipboard', error);
    }
}
const GenericImagePreview = forwardRef(function GenericImagePreview(props, ref) {
    if (!props.src) {
        return _jsx(Loading, { size: 24 });
    }
    return _jsx("img", { "data-testid": "image-content", ref: ref, ...props });
});
export const GenericImagePreviewModal = ({ image, total, onClose, blobId, }) => {
    const zoomRef = useRef(null);
    const imageRef = useRef(null);
    const { isZoomedBigger, handleDrag, handleDragStart, handleDragEnd, resetZoom, zoomIn, zoomOut, resetScale, currentScale, } = useZoomControls({ zoomRef, imageRef });
    const downloadHandler = useAsyncCallback(async () => {
        if (!image.url)
            return;
        const filename = image.caption || 'image';
        await downloadResourceWithUrl(image.url, filename);
    }, [image]);
    const copyHandler = useAsyncCallback(async () => {
        if (!image.url)
            return;
        await copyImageToClipboard(image.url);
    }, [image.url]);
    useEffect(() => {
        const handleKeyUp = (event) => {
            if (event.key === 'ArrowLeft' && image.previous) {
                image.previous();
            }
            else if (event.key === 'ArrowRight' && image.next) {
                image.next();
            }
            else {
                return;
            }
            event.preventDefault();
            event.stopPropagation();
        };
        const onCopyEvent = (event) => {
            event.preventDefault();
            event.stopPropagation();
            copyHandler();
        };
        document.addEventListener('keyup', handleKeyUp);
        document.addEventListener('copy', onCopyEvent);
        return () => {
            document.removeEventListener('keyup', handleKeyUp);
            document.removeEventListener('copy', onCopyEvent);
        };
    }, [copyHandler, image]);
    return (_jsxs("div", { "data-testid": "image-preview-modal", className: styles.imagePreviewModalStyle, children: [_jsx("div", { className: styles.imagePreviewTrap, onClick: onClose }), _jsx("div", { className: styles.imagePreviewModalContainerStyle, children: _jsx("div", { className: clsx('zoom-area', { 'zoomed-bigger': isZoomedBigger }), ref: zoomRef, children: _jsxs("div", { className: styles.imagePreviewModalCenterStyle, children: [_jsx(GenericImagePreview, { "data-blob-id": blobId, src: image.url, alt: image.caption, "data-testid": "image-content", tabIndex: 0, ref: imageRef, draggable: isZoomedBigger, onMouseDown: handleDragStart, onMouseMove: handleDrag, onMouseUp: handleDragEnd, onLoad: resetZoom }), isZoomedBigger ? null : (_jsx("p", { "data-testid": "image-caption-zoomedout", className: styles.imagePreviewModalCaptionStyle, children: image.caption }))] }) }) }), _jsxs("div", { className: styles.imageBottomContainerStyle, children: [isZoomedBigger && image.caption ? (_jsx("p", { "data-testid": "image-caption-zoomedin", className: styles.captionStyle, children: image.caption })) : null, _jsxs("div", { className: styles.imagePreviewActionBarStyle, children: [_jsx(IconButton, { "data-testid": "previous-image-button", tooltip: "Previous", icon: _jsx(ArrowLeftSmallIcon, {}), disabled: !image.previous, onClick: image.previous }), image.index != null && total != null && (_jsx("div", { className: styles.cursorStyle, children: `${image.index + 1}/${total}` })), _jsx(IconButton, { "data-testid": "next-image-button", tooltip: "Next", icon: _jsx(ArrowRightSmallIcon, {}), disabled: !image.next, onClick: image.next }), _jsx(Divider, { size: "thinner", orientation: "vertical" }), _jsx(IconButton, { "data-testid": "fit-to-screen-button", tooltip: "Fit to screen", icon: _jsx(ViewBarIcon, {}), onClick: () => resetZoom() }), _jsx(IconButton, { "data-testid": "zoom-out-button", tooltip: "Zoom out", icon: _jsx(MinusIcon, {}), onClick: zoomOut }), _jsx(Button, { "data-testid": "reset-scale-button", tooltip: "Reset scale", onClick: resetScale, variant: "plain", children: `${(currentScale * 100).toFixed(0)}%` }), _jsx(IconButton, { "data-testid": "zoom-in-button", tooltip: "Zoom in", icon: _jsx(PlusIcon, {}), onClick: zoomIn }), _jsx(Divider, { size: "thinner", orientation: "vertical" }), _jsx(IconButton, { "data-testid": "download-button", tooltip: "Download", icon: _jsx(DownloadIcon, {}), onClick: downloadHandler }), _jsx(IconButton, { "data-testid": "copy-to-clipboard-button", tooltip: "Copy to clipboard", icon: _jsx(CopyIcon, {}), onClick: copyHandler }), image.onDelete && (_jsxs(_Fragment, { children: [_jsx(Divider, { size: "thinner", orientation: "vertical" }), _jsx(IconButton, { "data-testid": "delete-button", tooltip: "Delete", icon: _jsx(DeleteIcon, {}), onClick: image.onDelete, variant: "danger" })] }))] })] })] }));
};
const useImageBlob = (docCollection, docId, blockId) => {
    const { data, error, isLoading } = useSWR(['workspace', 'image', docId, blockId], {
        fetcher: async ([_, __, pageId, blockId]) => {
            const page = docCollection.getDoc(pageId)?.getStore();
            const block = page?.getBlock(blockId);
            if (!block) {
                return null;
            }
            const blockModel = block.model;
            return await docCollection.blobSync.get(blockModel.props.sourceId);
        },
        suspense: false,
    });
    return { data, error, isLoading };
};
const ImagePreviewModalImpl = ({ docId, blockId, onBlockIdChange, onClose, }) => {
    const { doc, workspace } = useEditor(docId);
    const blocksuiteDoc = doc?.blockSuiteDoc;
    const docCollection = workspace.docCollection;
    const blockModel = useMemo(() => {
        const block = blocksuiteDoc?.getBlock(blockId);
        if (!block) {
            return null;
        }
        return block.model;
    }, [blockId, blocksuiteDoc]);
    const { data: blobData, error, isLoading, } = useImageBlob(docCollection, docId, blockId);
    const [blobUrl, setBlobUrl] = useState(null);
    useEffect(() => {
        let blobUrl = null;
        if (blobData) {
            blobUrl = URL.createObjectURL(blobData);
            setBlobUrl(blobUrl);
        }
        return () => {
            if (blobUrl) {
                URL.revokeObjectURL(blobUrl);
            }
        };
    }, [blobData]);
    const [blocks, setBlocks] = useState([]);
    const [cursor, setCursor] = useState(0);
    useEffect(() => {
        if (!blockModel || !blocksuiteDoc) {
            return;
        }
        const prevs = blocksuiteDoc.getPrevs(blockModel).filter(filterImageBlock);
        const nexts = blocksuiteDoc.getNexts(blockModel).filter(filterImageBlock);
        const blocks = [...prevs, blockModel, ...nexts];
        setBlocks(blocks);
        setCursor(blocks.length ? prevs.length : 0);
    }, [blockModel, blocksuiteDoc]);
    if (error || !blobUrl || isLoading || !blockModel) {
        return null;
    }
    const createImageData = (index) => {
        const prevBlock = blocks[index - 1];
        const nextBlock = blocks[index + 1];
        return {
            index,
            url: blobUrl,
            caption: blockModel.props.caption,
            onDelete: !blockModel.store.readonly
                ? () => {
                    handleDelete();
                }
                : undefined,
            previous: prevBlock
                ? () => {
                    onBlockIdChange(prevBlock.id);
                    return createImageData(index - 1);
                }
                : undefined,
            next: nextBlock
                ? () => {
                    onBlockIdChange(nextBlock.id);
                    return createImageData(index + 1);
                }
                : undefined,
        };
    };
    const imageData = createImageData(cursor);
    const handleDelete = () => {
        if (!blocksuiteDoc) {
            return;
        }
        const currentBlock = blocks[cursor];
        if (!currentBlock)
            return;
        const newBlocks = blocks.toSpliced(cursor, 1);
        setBlocks(newBlocks);
        blocksuiteDoc.deleteBlock(currentBlock);
        let nextBlock = newBlocks[cursor];
        if (!nextBlock) {
            const prevIndex = cursor - 1;
            nextBlock = newBlocks[prevIndex];
            if (!nextBlock) {
                onClose();
                return;
            }
            setCursor(prevIndex);
        }
        onBlockIdChange(nextBlock.id);
    };
    return (_jsx(GenericImagePreviewModal, { total: blocks.length, image: imageData, onClose: onClose, blobId: blockId }));
};
const filterImageBlock = (block) => {
    return block.flavour === 'affine:image';
};
export const ImagePreviewPeekView = (props) => {
    const [blockId, setBlockId] = useState(props.blockId);
    const peekView = useService(PeekViewService).peekView;
    const onClose = useCallback(() => peekView.close(), [peekView]);
    const buttonRef = useRef(null);
    useEffect(() => {
        setBlockId(props.blockId);
    }, [props.blockId]);
    return (_jsxs(_Fragment, { children: [blockId ? (_jsx(ImagePreviewModalImpl, { ...props, onClose: onClose, blockId: blockId, onBlockIdChange: setBlockId })) : null, _jsx("button", { ref: buttonRef, "data-testid": "image-preview-close-button", onClick: onClose, className: styles.imagePreviewModalCloseButtonStyle, children: _jsx(CloseIcon, {}) })] }));
};
export const GenericImagePreviewModalWithClose = (props) => {
    const peekViewService = useService(PeekViewService);
    const handleClose = useCallback(() => {
        peekViewService.peekView.close();
    }, [peekViewService]);
    const [image, setImage] = useState(props.image);
    const prevImage = useCallback(() => {
        const prev = image.previous?.();
        if (!prev)
            return;
        setImage(prev);
        return prev;
    }, [image]);
    const nextImage = useCallback(() => {
        const next = image.next?.();
        if (!next)
            return;
        setImage(next);
        return next;
    }, [image]);
    return (_jsxs(_Fragment, { children: [_jsx(GenericImagePreviewModal, { total: props.total, image: {
                    index: image.index,
                    url: image.url,
                    caption: image.caption,
                    onDelete: image.onDelete,
                    previous: prevImage,
                    next: nextImage,
                }, onClose: handleClose }), _jsx("button", { "data-testid": "image-preview-close-button", onClick: handleClose, className: styles.imagePreviewModalCloseButtonStyle, children: _jsx(CloseIcon, {}) })] }));
};
//# sourceMappingURL=index.js.map