import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AuthPageContainer, } from '@affine/component/auth-components';
import { WorkspaceMemberStatus, } from '@affine/graphql';
import { useI18n } from '@affine/i18n';
import { SignOutIcon } from '@blocksuite/icons/rc';
import { Avatar } from '../../ui/avatar';
import { Button, IconButton } from '../../ui/button';
import * as styles from './styles.css';
export const RequestToJoinPage = ({ user, inviteInfo, requestToJoin, onSignOut, }) => {
    const t = useI18n();
    return (_jsxs(AuthPageContainer, { subtitle: _jsxs("div", { className: styles.content, children: [_jsxs("div", { className: styles.userWrapper, children: [_jsx(Avatar, { url: inviteInfo?.user.avatarUrl || '', name: inviteInfo?.user.name, size: 20 }), _jsx("span", { className: styles.inviteName, children: inviteInfo?.user.name })] }), _jsx("div", { children: t['invited you to join']() }), _jsxs("div", { className: styles.userWrapper, children: [_jsx(Avatar, { url: `data:image/png;base64,${inviteInfo?.workspace.avatar}`, name: inviteInfo?.workspace.name, size: 20, style: { marginLeft: 4 }, colorfulFallback: true }), _jsx("span", { className: styles.inviteName, children: inviteInfo?.workspace.name })] })] }), children: [_jsx(Button, { variant: "primary", size: "large", onClick: requestToJoin, children: inviteInfo?.status === WorkspaceMemberStatus.Pending
                    ? t['com.affine.notification.invitation.accept']()
                    : t['com.affine.request-to-join-workspace.button']() }), user ? (_jsxs("div", { className: styles.userInfoWrapper, children: [_jsx(Avatar, { url: user.avatar ?? user.image, name: user.label }), _jsx("span", { children: user.email }), _jsx(IconButton, { onClick: onSignOut, size: "20", tooltip: t['404.signOut'](), children: _jsx(SignOutIcon, {}) })] })) : null] }));
};
//# sourceMappingURL=request-to-join-page.js.map