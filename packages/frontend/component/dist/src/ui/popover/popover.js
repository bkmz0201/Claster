import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as PopoverPrimitive from '@radix-ui/react-popover';
import clsx from 'clsx';
import { useMemo } from 'react';
import * as styles from './styles.css';
export const Popover = ({ content, children, portalOptions, contentOptions: { className: contentClassName, style: contentStyle, ...otherContentOptions } = {}, ...props }) => {
    return (_jsxs(PopoverPrimitive.Root, { ...props, children: [_jsx(PopoverPrimitive.Trigger, { asChild: true, children: children }), _jsx(PopoverPrimitive.Portal, { ...portalOptions, children: _jsx(PopoverPrimitive.Content, { className: useMemo(() => clsx(styles.popoverContent, contentClassName), [contentClassName]), sideOffset: 5, align: "start", style: { zIndex: 'var(--affine-z-index-popover)', ...contentStyle }, ...otherContentOptions, children: content }) })] }));
};
Popover.displayName = 'Popover';
//# sourceMappingURL=popover.js.map