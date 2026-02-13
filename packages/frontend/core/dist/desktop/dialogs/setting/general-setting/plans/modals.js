import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@affine/component/ui/button';
import { ConfirmModal, Modal } from '@affine/component/ui/modal';
import { useI18n } from '@affine/i18n';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { useEffect, useRef } from 'react';
import * as styles from './style.css';
/**
 *
 * @param param0
 * @returns
 */
export const ConfirmLoadingModal = ({ type, loading, open, content, onOpenChange, onConfirm, ...props }) => {
    const t = useI18n();
    const confirmed = useRef(false);
    const title = t[`com.affine.payment.modal.${type}.title`]();
    const confirmText = t[`com.affine.payment.modal.${type}.confirm`]();
    const cancelText = t[`com.affine.payment.modal.${type}.cancel`]();
    const contentText = type !== 'change' ? t[`com.affine.payment.modal.${type}.content`]() : '';
    useEffect(() => {
        if (!loading && open && confirmed.current) {
            onOpenChange?.(false);
            confirmed.current = false;
        }
    }, [loading, open, onOpenChange]);
    return (_jsx(ConfirmModal, { title: title, cancelText: cancelText, confirmText: confirmText, confirmButtonOptions: {
            variant: 'primary',
            loading,
        }, open: open, onOpenChange: onOpenChange, onConfirm: () => {
            confirmed.current = true;
            onConfirm?.()?.catch(console.error);
        }, ...props, children: content ?? contentText }));
};
/**
 * Downgrade modal, confirm & cancel button are reversed
 * @param param0
 */
export const DowngradeModal = ({ open, loading, onOpenChange, onCancel, }) => {
    const t = useI18n();
    const canceled = useRef(false);
    useEffect(() => {
        if (!loading && open && canceled.current) {
            onOpenChange?.(false);
            canceled.current = false;
        }
    }, [loading, open, onOpenChange]);
    return (_jsxs(Modal, { title: t['com.affine.payment.modal.downgrade.title'](), open: open, contentOptions: {}, width: 480, onOpenChange: onOpenChange, children: [_jsxs("div", { className: styles.downgradeContentWrapper, children: [_jsx("p", { className: styles.downgradeContent, children: t['com.affine.payment.modal.downgrade.content']() }), _jsx("p", { className: styles.downgradeCaption, children: t['com.affine.payment.modal.downgrade.caption']() })] }), _jsxs("footer", { className: styles.downgradeFooter, children: [_jsx(Button, { onClick: () => {
                            canceled.current = true;
                            onCancel?.();
                        }, loading: loading, children: t['com.affine.payment.modal.downgrade.cancel']() }), _jsx(DialogTrigger, { asChild: true, children: _jsx(Button, { disabled: loading, onClick: () => onOpenChange?.(false), variant: "primary", children: t['com.affine.payment.modal.downgrade.confirm']() }) })] })] }));
};
export const DowngradeTeamModal = ({ open, loading, onOpenChange, onCancel, }) => {
    const t = useI18n();
    const canceled = useRef(false);
    useEffect(() => {
        if (!loading && open && canceled.current) {
            onOpenChange?.(false);
            canceled.current = false;
        }
    }, [loading, open, onOpenChange]);
    return (_jsxs(Modal, { title: t['com.affine.payment.modal.downgrade.title'](), open: open, contentOptions: {}, width: 480, onOpenChange: onOpenChange, children: [_jsx("div", { className: styles.downgradeContentWrapper, children: _jsx("p", { className: styles.downgradeContent, children: t['com.affine.payment.modal.downgrade.content']() }) }), _jsxs("footer", { className: styles.downgradeFooter, children: [_jsx(Button, { onClick: () => {
                            canceled.current = true;
                            onCancel?.();
                        }, loading: loading, children: t['com.affine.payment.modal.downgrade.cancel']() }), _jsx(DialogTrigger, { asChild: true, children: _jsx(Button, { disabled: loading, onClick: () => onOpenChange?.(false), variant: "primary", children: t['com.affine.payment.modal.downgrade.team-confirm']() }) })] })] }));
};
//# sourceMappingURL=modals.js.map