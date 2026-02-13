import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ConfirmModal } from '@affine/component/ui/modal';
import { useI18n } from '@affine/i18n';
import { useCallback } from 'react';
import * as styles from './member-limit-modal.css';
export const MemberLimitModal = ({ isFreePlan, open, plan, quota, setOpen, onConfirm, }) => {
    const t = useI18n();
    const handleConfirm = useCallback(() => {
        setOpen(false);
        onConfirm();
    }, [onConfirm, setOpen]);
    return (_jsx(ConfirmModal, { open: open, onOpenChange: setOpen, title: t['com.affine.payment.member-limit.title'](), description: _jsx(ConfirmDescription, { plan: plan, quota: quota, isFreePlan: isFreePlan }), confirmText: t['com.affine.payment.upgrade'](), confirmButtonOptions: {
            variant: 'primary',
        }, onConfirm: handleConfirm }));
};
export const ConfirmDescription = ({ isFreePlan, plan, quota, }) => {
    const t = useI18n();
    return (_jsxs("div", { children: [t['com.affine.payment.member-limit.description']({
                planName: plan,
                quota: quota,
            }), _jsxs("ul", { className: styles.ulStyle, children: [isFreePlan && (_jsxs("li", { className: styles.liStyle, children: [_jsx("div", { className: styles.prefixDot }), t['com.affine.payment.member-limit.description.tips-for-free-plan']()] })), _jsxs("li", { className: styles.liStyle, children: [_jsx("div", { className: styles.prefixDot }), t['com.affine.payment.member-limit.description.tips-1']()] }), _jsxs("li", { className: styles.liStyle, children: [_jsx("div", { className: styles.prefixDot }), t['com.affine.payment.member-limit.description.tips-2']()] })] })] }));
};
//# sourceMappingURL=member-limit-modal.js.map