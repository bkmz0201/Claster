import { jsx as _jsx } from "react/jsx-runtime";
import clsx from 'clsx';
import { forwardRef } from 'react';
import { emptyChildren } from './empty-node-children.css';
export const EmptyNodeChildren = forwardRef(function EmptyNodeChildren({ children, className, ...attrs }, ref) {
    return (_jsx("div", { className: clsx(emptyChildren, className), ref: ref, ...attrs, children: children }));
});
//# sourceMappingURL=empty-node-children.js.map