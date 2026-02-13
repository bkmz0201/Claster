import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { IconButton, Menu, observeResize } from '@affine/component';
import { PDFService, PDFStatus } from '@affine/core/modules/pdf';
import { Item, List, ListPadding, ListWithSmallGap, LoadingSvg, PDFPageRenderer, Scroller, ScrollSeekPlaceholder, } from '@affine/core/modules/pdf/views';
import track from '@affine/track';
import { CollapseIcon, ExpandIcon, InformationIcon, } from '@blocksuite/icons/rc';
import { LiveData, useLiveData, useService } from '@toeverything/infra';
import { cssVar } from '@toeverything/theme';
import clsx from 'clsx';
import { nanoid } from 'nanoid';
import { useCallback, useEffect, useMemo, useRef, useState, } from 'react';
import { Virtuoso, } from 'react-virtuoso';
import * as styles from './styles.css';
import { fitToPage } from './utils';
const THUMBNAIL_WIDTH = 94;
function calculatePageNum(el, pageCount) {
    const { scrollTop, scrollHeight } = el;
    const pageHeight = scrollHeight / pageCount;
    const n = scrollTop / pageHeight;
    const t = n / pageCount;
    const index = Math.floor(n + t);
    const cursor = Math.min(index, pageCount - 1);
    return cursor;
}
export const PDFViewerInner = ({ pdf, meta }) => {
    const [cursor, setCursor] = useState(0);
    const [collapsed, setCollapsed] = useState(true);
    const [viewportInfo, setViewportInfo] = useState({ width: 0, height: 0 });
    const viewerRef = useRef(null);
    const pagesScrollerRef = useRef(null);
    const pagesScrollerHandleRef = useRef(null);
    const thumbnailsScrollerHandleRef = useRef(null);
    const updateScrollerRef = useCallback((scroller) => {
        pagesScrollerRef.current = scroller;
    }, []);
    const onScroll = useCallback(() => {
        const el = pagesScrollerRef.current;
        if (!el)
            return;
        const { pageCount } = meta;
        if (!pageCount)
            return;
        const cursor = calculatePageNum(el, pageCount);
        setCursor(cursor);
    }, [pagesScrollerRef, meta]);
    const onPageSelect = useCallback((index) => {
        const scroller = pagesScrollerHandleRef.current;
        if (!scroller)
            return;
        scroller.scrollToIndex({
            index,
            align: 'center',
            behavior: 'smooth',
        });
    }, [pagesScrollerHandleRef]);
    const pageContent = useCallback((index, _, { viewportInfo, meta, onPageSelect, pageClassName, resize, isThumbnail, }) => {
        return (_jsx(PDFPageRenderer, { pdf: pdf, pageNum: index, className: pageClassName, viewportInfo: viewportInfo, actualSize: meta.pageSizes[index], maxSize: meta.maxSize, onSelect: onPageSelect, resize: resize, isThumbnail: isThumbnail }, `${pageClassName}-${index}`));
    }, [pdf]);
    const thumbnailsConfig = useMemo(() => {
        const { height: vh } = viewportInfo;
        const { pageCount, pageSizes, maxSize } = meta;
        const t = Math.min(maxSize.width / maxSize.height, 1);
        const pw = THUMBNAIL_WIDTH / t;
        const newMaxSize = {
            width: pw,
            height: pw * (maxSize.height / maxSize.width),
        };
        const newPageSizes = pageSizes.map(({ width, height }) => {
            const w = newMaxSize.width * (width / maxSize.width);
            return {
                width: w,
                height: w * (height / width),
            };
        });
        const height = Math.min(vh - 60 - 24 - 24 - 2 - 8, newPageSizes.reduce((h, { height }) => h + height * t, 0) +
            (pageCount - 1) * 12);
        return {
            context: {
                onPageSelect,
                viewportInfo: {
                    width: pw,
                    height,
                },
                meta: {
                    pageCount,
                    maxSize: newMaxSize,
                    pageSizes: newPageSizes,
                },
                resize: fitToPage,
                isThumbnail: true,
                pageClassName: styles.pdfThumbnail,
            },
            style: { height },
        };
    }, [meta, viewportInfo, onPageSelect]);
    // 1. works fine if they are the same size
    // 2. uses the `observeIntersection` when targeting different sizes
    const scrollSeekConfig = useMemo(() => {
        return {
            enter: velocity => Math.abs(velocity) > 1024,
            exit: velocity => Math.abs(velocity) < 10,
        };
    }, []);
    useEffect(() => {
        const viewer = viewerRef.current;
        if (!viewer)
            return;
        return observeResize(viewer, ({ contentRect: { width, height } }) => setViewportInfo({ width, height }));
    }, []);
    return (_jsxs("div", { ref: viewerRef, "data-testid": "pdf-viewer", className: clsx([styles.viewer, { gridding: true, scrollable: true }]), children: [_jsx(Virtuoso, { ref: pagesScrollerHandleRef, scrollerRef: updateScrollerRef, onScroll: onScroll, className: styles.virtuoso, totalCount: meta.pageCount, itemContent: pageContent, components: {
                    Item,
                    List,
                    Scroller,
                    Header: ListPadding,
                    Footer: ListPadding,
                    ScrollSeekPlaceholder,
                }, context: {
                    viewportInfo: {
                        width: viewportInfo.width - 40,
                        height: viewportInfo.height - 40,
                    },
                    meta,
                    resize: fitToPage,
                    pageClassName: styles.pdfPage,
                }, scrollSeekConfiguration: scrollSeekConfig }, pdf.id), _jsxs("div", { className: clsx(['thumbnails', styles.pdfThumbnails]), children: [_jsx("div", { className: clsx([styles.pdfThumbnailsList, { collapsed }]), children: _jsx(Virtuoso, { ref: thumbnailsScrollerHandleRef, className: styles.virtuoso, totalCount: meta.pageCount, itemContent: pageContent, components: {
                                Item,
                                List: ListWithSmallGap,
                                Scroller,
                                ScrollSeekPlaceholder,
                            }, style: thumbnailsConfig.style, context: thumbnailsConfig.context, scrollSeekConfiguration: scrollSeekConfig }, `${pdf.id}-thumbnail`) }), _jsxs("div", { className: clsx(['indicator', styles.pdfIndicator]), children: [_jsxs("div", { children: [_jsx("span", { className: "page-cursor", children: meta.pageCount > 0 ? cursor + 1 : 0 }), "/", _jsx("span", { className: "page-count", children: meta.pageCount })] }), _jsx(IconButton, { icon: collapsed ? _jsx(CollapseIcon, {}) : _jsx(ExpandIcon, {}), onClick: () => setCollapsed(!collapsed) })] })] })] }));
};
function PDFViewerStatusMenuItems({ message, reload }) {
    const onClick = useCallback((e) => {
        e.stopPropagation();
        reload();
    }, [reload]);
    return (_jsxs("div", { className: styles.pdfStatusMenu, children: [_jsx("div", { children: message }), _jsx("div", { className: styles.pdfStatusMenuFooter, children: _jsx("button", { "data-testid": "pdf-viewer-reload", className: styles.pdfReloadButton, onClick: onClick, children: "Reload" }) })] }));
}
function PDFViewerStatus(props) {
    return (_jsx("div", { className: styles.pdfStatus, "data-testid": "pdf-viewer-status-wrapper", children: _jsx(Menu, { items: _jsx(PDFViewerStatusMenuItems, { ...props }), contentWrapperStyle: {
                padding: '8px',
                boxShadow: cssVar('overlayShadow'),
            }, contentOptions: {
                sideOffset: 8,
            }, children: _jsx("button", { "data-testid": "pdf-viewer-status", className: styles.pdfStatusButton, children: _jsx(InformationIcon, {}) }) }) }));
}
function PDFViewerContainer({ model, reload, ...props }) {
    const pdfService = useService(PDFService);
    const [pdf, setPdf] = useState(null);
    const state = useLiveData(useMemo(() => pdf?.state$ ??
        new LiveData({ status: PDFStatus.IDLE }), [pdf]));
    const blobId = useLiveData(useMemo(() => LiveData.fromSignal(model.props.sourceId$), [model]));
    useEffect(() => {
        if (state.status !== PDFStatus.Error)
            return;
        track.$.attachment.$.openPDFRendererFail();
    }, [state]);
    useEffect(() => {
        if (!blobId)
            return;
        const { pdf, release } = pdfService.get(blobId);
        setPdf(pdf);
        return () => {
            release();
        };
    }, [blobId, pdfService, setPdf]);
    if (pdf && state.status === PDFStatus.Opened) {
        return _jsx(PDFViewerInner, { ...props, pdf: pdf, meta: state.meta });
    }
    return (_jsxs(_Fragment, { children: [_jsx(PDFLoading, {}), state.status === PDFStatus.Error && (_jsx(PDFViewerStatus, { message: state.error.message, reload: reload }))] }));
}
const PDFLoading = () => (_jsx("div", { className: styles.pdfLoadingWrapper, children: _jsx(LoadingSvg, {}) }));
export function PDFViewer(props) {
    const [refreshKey, setRefreshKey] = useState(null);
    const reload = useCallback(() => setRefreshKey(nanoid()), []);
    return _jsx(PDFViewerContainer, { reload: reload, ...props }, refreshKey);
}
//# sourceMappingURL=pdf-viewer.js.map