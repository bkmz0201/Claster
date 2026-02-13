import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar } from '@affine/component';
import { useSignOut } from '@affine/core/components/hooks/affine/use-sign-out';
import { AuthService } from '@affine/core/modules/cloud';
import { GlobalDialogService } from '@affine/core/modules/dialogs';
import { ArrowRightSmallIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import {} from 'react';
import { UserPlanTag } from '../../../components';
import { SettingGroup } from '../group';
import * as styles from './style.css';
export const UserProfile = () => {
    const session = useService(AuthService).session;
    const loginStatus = useLiveData(session.status$);
    return loginStatus === 'authenticated' ? (_jsx(AuthorizedUserProfile, {})) : (_jsx(UnauthorizedUserProfile, {}));
};
const BaseLayout = ({ avatar, title, caption, onClick, }) => {
    return (_jsx(SettingGroup, { contentStyle: { padding: '10px 8px 10px 10px' }, children: _jsxs("div", { className: styles.profile, onClick: onClick, children: [_jsx("div", { className: styles.avatarWrapper, children: avatar }), _jsxs("div", { className: styles.content, children: [_jsx("div", { className: styles.title, children: title }), _jsx("div", { className: styles.caption, children: caption })] }), _jsx(ArrowRightSmallIcon, { className: styles.suffixIcon })] }) }));
};
const AuthorizedUserProfile = () => {
    const session = useService(AuthService).session;
    const account = useLiveData(session.account$);
    const confirmSignOut = useSignOut();
    return (_jsx(BaseLayout, { avatar: _jsx(Avatar, { size: 48, rounded: 4, url: account?.avatar, name: account?.label }), caption: _jsx("span", { className: styles.emailInfo, children: account?.email }), title: _jsxs("div", { className: styles.nameWithTag, children: [_jsx("span", { className: styles.name, children: account?.label }), _jsx(UserPlanTag, {})] }), onClick: confirmSignOut }));
};
const UnauthorizedUserProfile = () => {
    const globalDialogService = useService(GlobalDialogService);
    return (_jsx(BaseLayout, { onClick: () => globalDialogService.open('sign-in', {}), avatar: _jsx(Avatar, { size: 48, rounded: 4 }), title: "Sign up / Sign in", caption: "Sync with AFFiNE Cloud" }));
};
//# sourceMappingURL=index.js.map