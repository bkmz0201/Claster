import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as ScrollArea from '@radix-ui/react-scroll-area';
import clsx from 'clsx';
import { forwardRef } from 'react';
import * as styles from './index.css';
export const ScrollableRoot = forwardRef(({ children, className, ...props }, ref) => {
    return (_jsx(ScrollArea.Root, { ...props, ref: ref, className: clsx(className, styles.scrollableContainerRoot), children: children }));
});
ScrollableRoot.displayName = 'ScrollableRoot';
export const ScrollableViewport = forwardRef(({ children, className, ...props }, ref) => {
    return (_jsx(ScrollArea.Viewport, { ...props, ref: ref, className: clsx(className, styles.scrollableViewport), children: children }));
});
ScrollableViewport.displayName = 'ScrollableViewport';
export const ScrollableScrollbar = forwardRef(({ children, className, ...props }, ref) => {
    return (_jsxs(ScrollArea.Scrollbar, { orientation: "vertical", ...props, ref: ref, className: clsx(className, BUILD_CONFIG.isMobileEdition ? styles.mobileScrollbar : styles.scrollbar), children: [_jsx(ScrollArea.Thumb, { className: styles.scrollbarThumb }), children] }));
});
ScrollableScrollbar.displayName = 'ScrollableScrollbar';
export const Scrollable = {
    Root: ScrollableRoot,
    Viewport: ScrollableViewport,
    Scrollbar: ScrollableScrollbar,
};
//# sourceMappingURL=scrollable.js.map