import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useI18n } from '@affine/i18n';
import { ArrowLeftSmallIcon } from '@blocksuite/icons/rc';
import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import { useCallback, useContext, useEffect, useImperativeHandle, useState, } from 'react';
import { observeResize } from '../../../utils';
import { Button } from '../../button';
import { Modal } from '../../modal';
import { Scrollable } from '../../scrollbar';
import { MobileMenuContext, useMobileSubMenuHelper, } from './context';
import * as styles from './styles.css';
import { MobileMenuSubRaw } from './sub';
export const MobileMenu = ({ children, items, title, contentOptions: { className, onPointerDownOutside, onInteractOutside, 
// ignore the following props
sideOffset: _sideOffset, side: _side, align: _align, ...otherContentOptions } = {}, contentWrapperStyle, rootOptions, ref, }) => {
    const [subMenus, setSubMenus] = useState([]);
    const [open, setOpen] = useState(false);
    const mobileContextValue = {
        subMenus,
        setSubMenus,
        setOpen,
    };
    const { removeSubMenu, removeAllSubMenus } = useMobileSubMenuHelper(mobileContextValue);
    const [sliderHeight, setSliderHeight] = useState(0);
    const [sliderElement, setSliderElement] = useState(null);
    const { setOpen: pSetOpen } = useContext(MobileMenuContext);
    const finalOpen = rootOptions?.open ?? open;
    // always show the last submenu, if any
    const activeIndex = subMenus.length;
    // dynamic height for slider
    useEffect(() => {
        if (sliderElement && finalOpen) {
            const active = sliderElement.querySelector(`.${styles.menuContent}[data-index="${activeIndex}"]`);
            if (!active)
                return;
            // for the situation that content is loaded asynchronously
            return observeResize(active, entry => {
                setSliderHeight(entry.borderBoxSize[0].blockSize);
            });
        }
        return;
    }, [activeIndex, finalOpen, sliderElement]);
    const onOpenChange = useCallback((open) => {
        if (!open) {
            // a workaround to hack the onPointerDownOutside event
            onPointerDownOutside?.({});
            onInteractOutside?.({});
            removeAllSubMenus();
        }
        setOpen(open);
        rootOptions?.onOpenChange?.(open);
        if (!open) {
            rootOptions?.onClose?.();
        }
    }, [onInteractOutside, onPointerDownOutside, removeAllSubMenus, rootOptions]);
    useImperativeHandle(ref, () => ({
        changeOpen: (open) => {
            onOpenChange(open);
        },
    }), [onOpenChange]);
    const onItemClick = useCallback((e) => {
        e.preventDefault();
        onOpenChange(!open);
    }, [onOpenChange, open]);
    const t = useI18n();
    /**
     * For cascading menu usage
     * ```tsx
     * <Menu
     *  items={
     *    <Menu>Click me</Menu>
     *  }
     * >
     *  Root
     * </Menu>
     * ```
     */
    if (pSetOpen) {
        return (_jsx(MobileMenuSubRaw, { title: title, items: items, subOptions: rootOptions, children: children }));
    }
    return (_jsxs(_Fragment, { children: [_jsx(Slot, { onClick: onItemClick, children: children }), _jsx(MobileMenuContext.Provider, { value: { subMenus, setSubMenus, setOpen: onOpenChange }, children: _jsx(Modal, { open: finalOpen, onOpenChange: onOpenChange, width: "100%", animation: "slideBottom", withoutCloseButton: true, contentOptions: {
                        className: clsx(className, styles.mobileMenuModal),
                        ...otherContentOptions,
                    }, contentWrapperStyle: contentWrapperStyle, disableAutoFocus: true, children: _jsxs("div", { ref: setSliderElement, className: styles.slider, style: {
                            transform: `translateX(-${100 * activeIndex}%)`,
                            height: sliderHeight,
                        }, children: [_jsx("div", { "data-index": 0, className: styles.menuContent, children: items }), subMenus.map((sub, index) => (_jsxs("div", { "data-index": index + 1, className: styles.menuContent, children: [_jsx(Button, { "data-testid": "mobile-menu-back-button", variant: "plain", className: styles.backButton, prefix: _jsx(ArrowLeftSmallIcon, {}), onClick: () => {
                                            removeSubMenu(sub.id);
                                        }, prefixStyle: { width: 24, height: 24 }, children: sub.title || t['com.affine.backButton']() }), _jsxs(Scrollable.Root, { children: [_jsx(Scrollable.Viewport, { className: styles.scrollArea, children: sub.items }), _jsx(Scrollable.Scrollbar, {})] })] }, sub.id)))] }) }) })] }));
};
//# sourceMappingURL=root.js.map