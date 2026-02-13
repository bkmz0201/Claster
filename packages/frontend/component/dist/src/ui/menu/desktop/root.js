import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';
import React, { useCallback, useImperativeHandle, useState } from 'react';
import * as styles from '../styles.css';
import { DesktopMenuContext } from './context';
import * as desktopStyles from './styles.css';
const MenuContextValue = {
    type: 'dropdown-menu',
};
export const DesktopMenu = ({ children, items, noPortal, portalOptions, rootOptions: { defaultOpen, modal, open, onOpenChange, onClose, ...rootOptions } = {}, contentOptions: { className = '', style: contentStyle = {}, ...otherContentOptions } = {}, ref, }) => {
    const [innerOpen, setInnerOpen] = useState(defaultOpen);
    const finalOpen = open ?? innerOpen;
    const handleOpenChange = useCallback((open) => {
        setInnerOpen(open);
        onOpenChange?.(open);
        if (!open) {
            onClose?.();
        }
    }, [onOpenChange, onClose]);
    useImperativeHandle(ref, () => ({
        changeOpen: (open) => {
            setInnerOpen(open);
            onOpenChange?.(open);
        },
    }), [onOpenChange]);
    const ContentWrapper = noPortal ? React.Fragment : DropdownMenu.Portal;
    return (_jsx(DesktopMenuContext.Provider, { value: MenuContextValue, children: _jsxs(DropdownMenu.Root, { modal: modal ?? false, open: finalOpen, onOpenChange: handleOpenChange, ...rootOptions, children: [_jsx(DropdownMenu.Trigger, { asChild: true, onClick: e => {
                        e.stopPropagation();
                        e.preventDefault();
                    }, children: children }), _jsx(ContentWrapper, { ...portalOptions, children: _jsx(DropdownMenu.Content, { className: clsx(styles.menuContent, desktopStyles.contentAnimation, className), sideOffset: 4, align: "start", style: { zIndex: 'var(--affine-z-index-popover)', ...contentStyle }, ...otherContentOptions, children: items }) })] }) }));
};
//# sourceMappingURL=root.js.map