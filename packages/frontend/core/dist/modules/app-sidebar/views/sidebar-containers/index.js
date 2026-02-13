import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useHasScrollTop } from '@affine/component';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import clsx from 'clsx';
import {} from 'react';
import * as styles from './index.css';
export function SidebarContainer({ children, className, }) {
    return (_jsx("div", { className: clsx([styles.baseContainer, className]), children: children }));
}
export function SidebarScrollableContainer({ children, className, }) {
    const [setContainer, hasScrollTop] = useHasScrollTop();
    return (_jsxs(ScrollArea.Root, { className: clsx([styles.scrollableContainerRoot, className]), children: [_jsx("div", { "data-has-scroll-top": hasScrollTop, className: styles.scrollTopBorder }), _jsx(ScrollArea.Viewport, { className: clsx([styles.scrollableViewport]), ref: setContainer, children: _jsx("div", { className: clsx([styles.scrollableContainer]), children: children }) }), _jsx(ScrollArea.Scrollbar, { forceMount: true, orientation: "vertical", className: styles.scrollbar, children: _jsx(ScrollArea.Thumb, { className: styles.scrollbarThumb }) })] }));
}
//# sourceMappingURL=index.js.map