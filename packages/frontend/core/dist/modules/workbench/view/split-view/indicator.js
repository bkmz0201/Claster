import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Menu, Tooltip } from '@affine/component';
import { useI18n } from '@affine/i18n';
import clsx from 'clsx';
import { forwardRef, memo, useCallback, useMemo, useState } from 'react';
import * as styles from './indicator.css';
export const SplitViewDragHandle = memo(forwardRef(function SplitViewDragHandle({ className, active, open, onOpenMenu, dragging, onClick, ...attrs }, ref) {
    const handleOnClick = useCallback(e => {
        !open && onOpenMenu?.();
        onClick?.(e);
    }, [onOpenMenu, open, onClick]);
    return (_jsxs("div", { ref: ref, "data-active": active, "data-dragging": dragging, "data-testid": "split-view-indicator", className: clsx(className, styles.indicator), onClick: handleOnClick, ...attrs, children: [_jsx("div", { className: styles.indicatorGradient }), _jsxs("div", { className: styles.indicatorInnerWrapper, children: [_jsx("div", { "data-idx": 0, className: styles.indicatorDot }), _jsx("div", { "data-idx": 1, className: styles.indicatorDot }), _jsx("div", { "data-idx": 2, className: styles.indicatorDot })] })] }));
}));
export const SplitViewIndicator = memo(forwardRef(function SplitViewIndicator({ isActive, menuItems, isDragging, dragHandleRef }, ref) {
    const [menuOpen, setMenuOpen] = useState(false);
    // prevent menu from opening when dragging
    const setOpenMenuManually = useCallback((open) => {
        if (open)
            return;
        setMenuOpen(open);
    }, []);
    const openMenu = useCallback(() => {
        setMenuOpen(true);
    }, []);
    const menuRootOptions = useMemo(() => ({
        open: menuOpen,
        onOpenChange: setOpenMenuManually,
    }), [menuOpen, setOpenMenuManually]);
    const menuContentOptions = useMemo(() => ({
        align: 'center',
    }), []);
    const t = useI18n();
    return (_jsxs("div", { ref: ref, "data-is-dragging": isDragging, className: styles.indicatorWrapper, children: [_jsx(Menu, { contentOptions: menuContentOptions, items: menuItems, rootOptions: menuRootOptions, children: _jsx("div", { className: styles.menuTrigger }) }), _jsx(Tooltip, { content: t['com.affine.split-view-drag-handle.tooltip'](), side: "bottom", children: _jsx(SplitViewDragHandle, { ref: dragHandleRef, open: menuOpen, onOpenMenu: openMenu, active: isActive, dragging: isDragging }) })] }));
}));
//# sourceMappingURL=indicator.js.map