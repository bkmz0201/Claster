import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ConfirmModal, Input } from '@affine/component';
import { useI18n } from '@affine/i18n';
import { cssVar } from '@toeverything/theme';
import * as styles from './styles.css';
export const ConfirmAssignModal = ({ open, setOpen, member, inputValue, placeholder, setInputValue, isEquals, onConfirm, }) => {
    const t = useI18n();
    return (_jsx(ConfirmModal, { childrenContentClassName: styles.confirmAssignModalContent, open: open, onOpenChange: setOpen, title: t['com.affine.payment.member.team.assign.confirm.title'](), confirmText: t['com.affine.payment.member.team.assign.confirm.button'](), onConfirm: onConfirm, confirmButtonOptions: { disabled: !isEquals, variant: 'error' }, children: _jsxs("div", { className: styles.confirmAssignModalContent, children: [_jsx("p", { children: t['com.affine.payment.member.team.assign.confirm.description']({
                        name: member.name || member.email || member.id,
                    }) }), _jsxs("div", { className: styles.descriptions, children: [_jsxs("div", { className: styles.description, children: [_jsx("span", { className: styles.prefixDot }), _jsx("span", { children: t['com.affine.payment.member.team.assign.confirm.description-1']() })] }), _jsxs("div", { className: styles.description, children: [_jsx("span", { className: styles.prefixDot }), _jsx("span", { children: t['com.affine.payment.member.team.assign.confirm.description-2']() })] }), _jsxs("div", { className: styles.description, children: [_jsx("span", { className: styles.prefixDot }), _jsx("span", { children: t['com.affine.payment.member.team.assign.confirm.description-3']() })] })] }), _jsxs("div", { className: styles.confirmInputContainer, children: [t['com.affine.payment.member.team.assign.confirm.description-4'](), _jsx(Input, { value: inputValue, inputStyle: { fontSize: cssVar('fontSm') }, onChange: setInputValue, placeholder: placeholder })] })] }) }));
};
//# sourceMappingURL=confirm-assign-modal.js.map