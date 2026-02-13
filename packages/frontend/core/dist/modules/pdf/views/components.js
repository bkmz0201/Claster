import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Scrollable } from '@affine/component';
import clsx from 'clsx';
import { forwardRef, memo } from 'react';
import * as styles from './styles.css';
export const Scroller = forwardRef(({ context: _, ...props }, ref) => {
    return (_jsxs(Scrollable.Root, { children: [_jsx(Scrollable.Viewport, { ref: ref, ...props }), _jsx(Scrollable.Scrollbar, {})] }));
});
Scroller.displayName = 'pdf-virtuoso-scroller';
export const ScrollSeekPlaceholder = forwardRef(({ context, index }, ref) => {
    const className = context?.pageClassName;
    const isThumbnail = context?.isThumbnail;
    const size = context?.meta.pageSizes[index];
    const maxSize = context?.meta.maxSize;
    const height = size?.height ?? 759;
    const style = context?.viewportInfo && size && maxSize
        ? context.resize(context.viewportInfo, size, maxSize, isThumbnail)
        : undefined;
    return (_jsx(Item, { "data-index": index, "data-known-size": height, "data-item-index": index, style: { overflowAnchor: 'none' }, ref: ref, children: _jsx("div", { className: className, style: style, children: _jsx(LoadingSvg, {}) }) }));
});
ScrollSeekPlaceholder.displayName = 'pdf-virtuoso-scroll-seek-placeholder';
export const List = forwardRef(({ context: _, className, ...props }, ref) => {
    return (_jsx("div", { className: clsx([styles.virtuosoList, className]), ref: ref, ...props }));
});
List.displayName = 'pdf-virtuoso-list';
export const ListWithSmallGap = forwardRef(({ context: _, className, ...props }, ref) => {
    return (_jsx(List, { className: clsx([className, 'small-gap']), ref: ref, ...props }));
});
ListWithSmallGap.displayName = 'pdf-virtuoso-small-gap-list';
export const Item = forwardRef(({ context: _, ...props }, ref) => {
    return _jsx("div", { className: styles.virtuosoItem, ref: ref, ...props });
});
Item.displayName = 'pdf-virtuoso-item';
export const ListPadding = () => (_jsx("div", { style: { width: '100%', height: '20px' } }));
export const LoadingSvg = memo(({ className, style }) => {
    return (_jsxs("svg", { className: clsx([styles.pdfLoading, className]), style: style, width: "16", height: "24", viewBox: "0 0 537 759", xmlns: "http://www.w3.org/2000/svg", fill: "currentColor", fillOpacity: "0.07", children: [_jsx("rect", { x: "32", y: "82", width: "361", height: "30", rx: "4" }), _jsx("rect", { x: "32", y: "142", width: "444", height: "30", rx: "4" }), _jsx("rect", { x: "32", y: "202", width: "387", height: "30", rx: "4" }), _jsx("rect", { x: "32", y: "262", width: "461", height: "30", rx: "4" }), _jsx("rect", { x: "32", y: "322", width: "282", height: "30", rx: "4" }), _jsx("rect", { x: "32", y: "382", width: "361", height: "30", rx: "4" }), _jsx("rect", { x: "32", y: "442", width: "444", height: "30", rx: "4" }), _jsx("rect", { x: "32", y: "502", width: "240", height: "30", rx: "4" }), _jsx("rect", { x: "32", y: "562", width: "201", height: "30", rx: "4" }), _jsx("rect", { x: "32", y: "622", width: "224", height: "30", rx: "4" }), _jsx("rect", { x: "314", y: "502", width: "191", height: "166", rx: "4" })] }));
});
LoadingSvg.displayName = 'pdf-loading';
export const PDFPageCanvas = forwardRef(({ style, ...props }, ref) => {
    return (_jsx("canvas", { className: styles.pdfPageCanvas, ref: ref, style: style, ...props }));
});
PDFPageCanvas.displayName = 'pdf-page-canvas';
//# sourceMappingURL=components.js.map