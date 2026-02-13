import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DialogTrigger } from '@radix-ui/react-dialog';
import { cssVar } from '@toeverything/theme';
import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../button';
import { Modal } from './modal';
import * as styles from './overlay-modal.css';
const defaultContentOptions = {
    style: {
        padding: 0,
        overflow: 'hidden',
        boxShadow: cssVar('menuShadow'),
    },
};
const defaultOverlayOptions = {
    style: {
        background: cssVar('white80'),
        backdropFilter: 'blur(2px)',
    },
};
export const OverlayModal = memo(function OverlayModal({ open, topImage, onOpenChange, title, description, onConfirm, to, external, confirmButtonOptions, cancelButtonOptions, withoutCancelButton, contentOptions = defaultContentOptions, overlayOptions = defaultOverlayOptions, 
// FIXME: we need i18n
cancelText = 'Cancel', confirmText = 'Confirm', width = 400, }) {
    const handleConfirm = useCallback(() => {
        onOpenChange?.(false);
        onConfirm?.();
    }, [onOpenChange, onConfirm]);
    return (_jsxs(Modal, { contentOptions: contentOptions, overlayOptions: overlayOptions, open: open, width: width, onOpenChange: onOpenChange, withoutCloseButton: true, children: [topImage, _jsx("div", { className: styles.title, children: title }), _jsx("div", { className: styles.content, children: description }), _jsxs("div", { className: styles.footer, children: [!withoutCancelButton ? (_jsx(DialogTrigger, { asChild: true, children: _jsx(Button, { ...cancelButtonOptions, children: cancelText }) })) : null, to ? (external ? (
                    //FIXME: we need a more standardized way to implement this link with other click events
                    _jsx("a", { href: to, target: "_blank", rel: "noreferrer", children: _jsx(Button, { onClick: handleConfirm, ...confirmButtonOptions, children: confirmText }) })) : (_jsx(Link, { to: to, children: _jsx(Button, { onClick: handleConfirm, ...confirmButtonOptions, children: confirmText }) }))) : (_jsx(Button, { onClick: handleConfirm, ...confirmButtonOptions, children: confirmText }))] })] }));
});
//# sourceMappingURL=overlay-modal.js.map