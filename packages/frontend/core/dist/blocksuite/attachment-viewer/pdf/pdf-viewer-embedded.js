import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconButton, observeIntersection } from '@affine/component';
import { PDFService, PDFStatus, } from '@affine/core/modules/pdf';
import { LoadingSvg, PDFPageCanvas } from '@affine/core/modules/pdf/views';
import { PeekViewService } from '@affine/core/modules/peek-view/services/peek-view';
import { stopPropagation } from '@affine/core/utils';
import { ArrowDownSmallIcon, ArrowUpSmallIcon, AttachmentIcon, CenterPeekIcon, } from '@blocksuite/icons/rc';
import { LiveData, useLiveData, useService } from '@toeverything/infra';
import clsx from 'clsx';
import { debounce } from 'lodash-es';
import { useCallback, useEffect, useMemo, useRef, useState, } from 'react';
import * as styles from './styles.css';
function defaultMeta() {
    return {
        pageCount: 0,
        pageSizes: [],
        maxSize: { width: 0, height: 0 },
    };
}
export function PDFViewerEmbedded({ model }) {
    const scale = window.devicePixelRatio;
    const peekView = useService(PeekViewService).peekView;
    const pdfService = useService(PDFService);
    const [pdfEntity, setPdfEntity] = useState(null);
    const [pageEntity, setPageEntity] = useState(null);
    const [pageSize, setPageSize] = useState(null);
    const meta = useLiveData(useMemo(() => {
        return pdfEntity
            ? pdfEntity.pdf.state$.map(s => {
                return s.status === PDFStatus.Opened ? s.meta : defaultMeta();
            })
            : new LiveData(defaultMeta());
    }, [pdfEntity]));
    const img = useLiveData(useMemo(() => (pageEntity ? pageEntity.page.bitmap$ : null), [pageEntity]));
    const name = useLiveData(useMemo(() => LiveData.fromSignal(model.props.name$), [model]));
    const blobId = useLiveData(useMemo(() => LiveData.fromSignal(model.props.sourceId$), [model]));
    const [cursor, setCursor] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [visibility, setVisibility] = useState(false);
    const viewerRef = useRef(null);
    const canvasRef = useRef(null);
    const peek = useCallback(() => {
        const target = model.store.getBlock(model.id);
        if (!target)
            return;
        peekView.open({ element: target }).catch(console.error);
    }, [peekView, model]);
    const navigator = useMemo(() => {
        const p = cursor - 1;
        const n = cursor + 1;
        return {
            prev: {
                disabled: p < 0,
                onClick: (e) => {
                    e.stopPropagation();
                    setCursor(p);
                },
            },
            next: {
                disabled: n >= meta.pageCount,
                onClick: (e) => {
                    e.stopPropagation();
                    setCursor(n);
                },
            },
            peek: {
                onClick: (e) => {
                    e.stopPropagation();
                    peek();
                },
            },
        };
    }, [cursor, meta, peek]);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas)
            return;
        if (!img)
            return;
        const ctx = canvas.getContext('2d');
        if (!ctx)
            return;
        setIsLoading(false);
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
    }, [img]);
    useEffect(() => {
        if (!visibility)
            return;
        if (!pageEntity)
            return;
        if (!pageSize)
            return;
        const { width, height } = pageSize;
        pageEntity.page.render({ width, height, scale });
        return () => {
            pageEntity.page.render.unsubscribe();
        };
    }, [visibility, pageEntity, pageSize, scale]);
    useEffect(() => {
        if (!visibility)
            return;
        if (!pdfEntity)
            return;
        const size = meta.pageSizes[cursor];
        if (!size)
            return;
        const { width, height } = size;
        const pageEntity = pdfEntity.pdf.page(cursor, `${width}:${height}:${scale}`);
        setPageEntity(pageEntity);
        setPageSize(size);
        return () => {
            pageEntity.release();
            setPageSize(null);
            setPageEntity(null);
        };
    }, [visibility, pdfEntity, cursor, meta, scale]);
    useEffect(() => {
        if (!visibility)
            return;
        if (!blobId)
            return;
        const pdfEntity = pdfService.get(blobId);
        setPdfEntity(pdfEntity);
        return () => {
            pdfEntity.release();
            setPdfEntity(null);
        };
    }, [blobId, pdfService, visibility]);
    useEffect(() => {
        const viewer = viewerRef.current;
        if (!viewer)
            return;
        return observeIntersection(viewer, debounce(entry => {
            setVisibility(entry.isIntersecting);
        }, 377, {
            trailing: true,
        }));
    }, []);
    return (_jsxs("div", { ref: viewerRef, className: styles.pdfContainer, children: [_jsxs("main", { className: styles.pdfViewer, children: [_jsxs("div", { className: styles.pdfPage, style: {
                            position: 'relative',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            minHeight: '253px',
                        }, children: [_jsx(PDFPageCanvas, { ref: canvasRef }), _jsx(LoadingSvg, { style: {
                                    position: 'absolute',
                                    visibility: isLoading ? 'visible' : 'hidden',
                                } })] }), _jsxs("div", { className: styles.pdfControls, children: [_jsx(IconButton, { size: 16, icon: _jsx(ArrowUpSmallIcon, {}), className: styles.pdfControlButton, onDoubleClick: stopPropagation, "aria-label": "Prev", ...navigator.prev }), _jsx(IconButton, { size: 16, icon: _jsx(ArrowDownSmallIcon, {}), className: styles.pdfControlButton, onDoubleClick: stopPropagation, "aria-label": "Next", ...navigator.next }), _jsx(IconButton, { size: 16, icon: _jsx(CenterPeekIcon, {}), className: styles.pdfControlButton, onDoubleClick: stopPropagation, ...navigator.peek })] })] }), _jsxs("footer", { className: styles.pdfFooter, children: [_jsxs("div", { className: clsx([styles.pdfFooterItem, { truncate: true }]), children: [_jsx(AttachmentIcon, {}), _jsx("span", { className: clsx([styles.pdfTitle, 'pdf-name']), children: name })] }), _jsxs("div", { className: clsx([styles.pdfFooterItem, styles.pdfPageCount]), children: [_jsx("span", { className: "page-cursor", children: meta.pageCount > 0 ? cursor + 1 : '-' }), "/", _jsx("span", { className: "page-count", children: meta.pageCount > 0 ? meta.pageCount : '-' })] })] })] }));
}
//# sourceMappingURL=pdf-viewer-embedded.js.map