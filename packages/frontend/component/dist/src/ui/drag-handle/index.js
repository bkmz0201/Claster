import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import * as styles from './index.css';
export const DragHandle = forwardRef(({ className, dragging, width = 10, height = 22, ...props }, ref) => {
    return (_jsx("div", { ...props, ref: ref, "data-dragging": dragging, className: clsx(styles.root, className), children: _jsxs("svg", { width: width, height: height, viewBox: "0 0 10 22", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: styles.svg, children: [_jsx("circle", { cx: "3", cy: "7", r: "1", fill: "currentColor" }), _jsx("circle", { cx: "7", cy: "7", r: "1", fill: "currentColor" }), _jsx("circle", { cx: "3", cy: "11", r: "1", fill: "currentColor" }), _jsx("circle", { cx: "7", cy: "11", r: "1", fill: "currentColor" }), _jsx("circle", { cx: "3", cy: "15", r: "1", fill: "currentColor" }), _jsx("circle", { cx: "7", cy: "15", r: "1", fill: "currentColor" })] }) }));
});
DragHandle.displayName = 'DragHandle';
//# sourceMappingURL=index.js.map