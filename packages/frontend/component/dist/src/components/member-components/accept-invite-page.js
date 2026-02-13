import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AuthPageContainer } from '@affine/component/auth-components';
import { useI18n } from '@affine/i18n';
import { Avatar } from '../../ui/avatar';
import { Button } from '../../ui/button';
import * as styles from './styles.css';
export const AcceptInvitePage = ({ onOpenWorkspace, inviteInfo, }) => {
    const t = useI18n();
    return (_jsx(AuthPageContainer, { title: t['Successfully joined!'](), subtitle: _jsxs("div", { className: styles.content, children: [_jsxs("div", { className: styles.userWrapper, children: [_jsx(Avatar, { url: inviteInfo.user.avatarUrl || '', name: inviteInfo.user.name, size: 20 }), _jsx("span", { className: styles.inviteName, children: inviteInfo.user.name })] }), _jsx("div", { children: t['invited you to join']() }), _jsxs("div", { className: styles.userWrapper, children: [_jsx(Avatar, { url: `data:image/png;base64,${inviteInfo.workspace.avatar}`, name: inviteInfo.workspace.name, size: 20, style: { marginLeft: 4 }, colorfulFallback: true }), _jsx("span", { className: styles.inviteName, children: inviteInfo.workspace.name })] })] }), children: _jsx(Button, { variant: "primary", size: "large", onClick: onOpenWorkspace, children: t['Visit Workspace']() }) }));
};
//# sourceMappingURL=accept-invite-page.js.map