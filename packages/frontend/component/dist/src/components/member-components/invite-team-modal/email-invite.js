import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useI18n } from '@affine/i18n';
import { cssVar } from '@toeverything/theme';
import Input from '../../../ui/input';
import * as styles from './styles.css';
export const EmailInvite = ({ inviteEmail, setInviteEmail, handleConfirm, importCSV, isMutating, isValidEmail, }) => {
    const t = useI18n();
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: styles.modalSubTitle, children: t['com.affine.payment.member.team.invite.email-invite']() }), _jsxs("div", { children: [_jsx(Input, { inputStyle: { fontSize: cssVar('fontXs') }, disabled: isMutating, placeholder: t['com.affine.payment.member.team.invite.email-placeholder'](), value: inviteEmail, onChange: setInviteEmail, onEnter: handleConfirm, size: "large" }), !isValidEmail ? (_jsx("div", { className: styles.errorHint, children: t['com.affine.auth.sign.email.error']() })) : null] }), _jsx("div", { children: importCSV })] }));
};
//# sourceMappingURL=email-invite.js.map