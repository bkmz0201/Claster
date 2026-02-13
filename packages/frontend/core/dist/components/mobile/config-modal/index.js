import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Modal } from '@affine/component';
import { PageHeader } from '@affine/core/mobile/components/page-header';
import { useI18n } from '@affine/i18n';
import clsx from 'clsx';
import { forwardRef, } from 'react';
import * as styles from './styles.css';
/**
 * A modal with a page header for configuring something on mobile (preferable to be fullscreen)
 */
export const ConfigModal = ({ onBack, onDone, open, onOpenChange, title, children, variant = 'page', }) => {
    const t = useI18n();
    return (_jsxs(Modal, { onOpenChange: onOpenChange, open: open, fullScreen: variant === 'page', width: "100%", minHeight: 0, animation: "slideBottom", withoutCloseButton: true, contentOptions: {
            className: variant === 'page'
                ? styles.pageModalContent
                : styles.popupModalContent,
        }, children: [variant === 'page' ? (_jsx(PageHeader, { back: !!onBack, backAction: onBack, suffix: onDone ? (_jsx(Button, { style: {
                        fontSize: 17,
                        fontWeight: 600,
                    }, className: styles.doneButton, variant: "plain", onClick: onDone, children: t['Done']() })) : undefined, children: _jsx("div", { className: styles.pageTitle, children: title }) })) : null, _jsxs("div", { className: variant === 'page' ? styles.pageContent : styles.popupContent, children: [variant === 'page' ? null : (_jsx("div", { className: styles.popupTitle, children: title })), children, variant === 'popup' && onDone ? (_jsx("div", { className: styles.bottomDoneButtonContainer, children: _jsx(Button, { variant: "primary", className: styles.bottomDoneButton, onClick: onDone, children: t['Done']() }) })) : null] })] }));
};
export const ConfigRow = forwardRef(function ConfigRow({ children, className, ...attrs }, ref) {
    return (_jsx("div", { className: clsx(styles.rowItem, className), ref: ref, ...attrs, children: children }));
});
export const ConfigRowGroup = forwardRef(function ConfigRowGroup({ children, title, className, contentClassName, contentStyle, ...attrs }, ref) {
    return (_jsxs("div", { className: clsx(styles.group, className), ref: ref, ...attrs, children: [title ? _jsx("div", { className: styles.groupTitle, children: title }) : null, _jsx("div", { className: clsx(styles.groupContent, contentClassName), style: contentStyle, children: children })] }));
});
ConfigModal.RowGroup = ConfigRowGroup;
ConfigModal.Row = ConfigRow;
//# sourceMappingURL=index.js.map