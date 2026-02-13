import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Scrollable } from '@affine/component';
import { forwardRef } from 'react';
import * as styles from './scroller.css';
export const Scroller = forwardRef(({ children, ...props }, ref) => {
    return (_jsxs(Scrollable.Root, { children: [_jsx(Scrollable.Viewport, { ...props, className: styles.result, ref: ref, children: children }), _jsx(Scrollable.Scrollbar, {})] }));
});
Scroller.displayName = 'Scroller';
//# sourceMappingURL=scroller.js.map