import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useI18n } from '@affine/i18n';
import { EmailIcon, LinkIcon } from '@blocksuite/icons/rc';
import { RadioGroup } from '../../../ui/radio';
import { EmailInvite } from './email-invite';
import { LinkInvite } from './link-invite';
import * as styles from './styles.css';
export const ModalContent = ({ inviteEmail, setInviteEmail, inviteMethod, onInviteMethodChange, handleConfirm, isMutating, isValidEmail, copyTextToClipboard, onGenerateInviteLink, onRevokeInviteLink, importCSV, invitationLink, }) => {
    const t = useI18n();
    return (_jsxs("div", { className: styles.modalContent, children: [_jsx("div", { children: t['com.affine.payment.member.team.invite.description']() }), _jsx(RadioGroup, { width: '100%', value: inviteMethod, onChange: onInviteMethodChange, items: [
                    {
                        label: (_jsx(RadioItem, { icon: _jsx(EmailIcon, { className: styles.iconStyle }), label: t['com.affine.payment.member.team.invite.email-invite']() })),
                        value: 'email',
                    },
                    {
                        label: (_jsx(RadioItem, { icon: _jsx(LinkIcon, { className: styles.iconStyle }), label: t['com.affine.payment.member.team.invite.invite-link']() })),
                        value: 'link',
                    },
                ] }), inviteMethod === 'email' ? (_jsx(EmailInvite, { inviteEmail: inviteEmail, setInviteEmail: setInviteEmail, handleConfirm: handleConfirm, isMutating: isMutating, isValidEmail: isValidEmail, importCSV: importCSV })) : (_jsx(LinkInvite, { invitationLink: invitationLink, copyTextToClipboard: copyTextToClipboard, generateInvitationLink: onGenerateInviteLink, revokeInvitationLink: onRevokeInviteLink }))] }));
};
const RadioItem = ({ icon, label, }) => {
    return (_jsxs("div", { className: styles.radioItem, children: [icon, _jsx("div", { children: label })] }));
};
//# sourceMappingURL=modal-content.js.map