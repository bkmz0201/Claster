import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowRightSmallIcon } from '@blocksuite/icons/rc';
import * as ContextMenu from '@radix-ui/react-context-menu';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';
import { useContext, useMemo } from 'react';
import * as styles from '../styles.css';
import { useMenuItem } from '../use-menu-item';
import { DesktopMenuContext } from './context';
export const DesktopMenuSub = ({ children: propsChildren, items, portalOptions, subOptions: { defaultOpen, ...otherSubOptions } = {}, triggerOptions, subContentOptions: { className: subContentClassName = '', style: contentStyle, ...otherSubContentOptions } = {}, }) => {
    const { type } = useContext(DesktopMenuContext);
    const { className, children, otherProps } = useMenuItem({
        children: propsChildren,
        suffixIcon: _jsx(ArrowRightSmallIcon, {}),
        ...triggerOptions,
    });
    const contentClassName = useMemo(() => clsx(styles.menuContent, subContentClassName), [subContentClassName]);
    if (type === 'context-menu') {
        return (_jsxs(ContextMenu.Sub, { defaultOpen: defaultOpen, ...otherSubOptions, children: [_jsx(ContextMenu.SubTrigger, { className: className, ...otherProps, children: children }), _jsx(ContextMenu.Portal, { ...portalOptions, children: _jsx(ContextMenu.SubContent, { className: contentClassName, style: { zIndex: 'var(--affine-z-index-popover)', ...contentStyle }, ...otherSubContentOptions, children: items }) })] }));
    }
    return (_jsxs(DropdownMenu.Sub, { defaultOpen: defaultOpen, ...otherSubOptions, children: [_jsx(DropdownMenu.SubTrigger, { className: className, ...otherProps, children: children }), _jsx(DropdownMenu.Portal, { ...portalOptions, children: _jsx(DropdownMenu.SubContent, { className: contentClassName, style: { zIndex: 'var(--affine-z-index-popover)', ...contentStyle }, ...otherSubContentOptions, children: items }) })] }));
};
//# sourceMappingURL=sub.js.map