import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Avatar } from '@affine/component/ui/avatar';
import { Menu, MenuItem, MenuSeparator } from '@affine/component/ui/menu';
import { useAsyncCallback } from '@affine/core/components/hooks/affine-async-hooks';
import { useI18n } from '@affine/i18n';
import { SignOutIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { useEffect, useMemo } from 'react';
import { AuthService, SubscriptionService } from '../../../modules/cloud';
import { useNavigateHelper } from '../../hooks/use-navigate-helper';
import * as styles from './styles.css';
const UserInfo = () => {
    const authService = useService(AuthService);
    const user = useLiveData(authService.session.account$);
    const subscription = useService(SubscriptionService).subscription;
    useEffect(() => {
        subscription.revalidate();
    }, [subscription]);
    const plan = useLiveData(subscription.pro$)?.plan;
    if (!user) {
        // TODO(@eyhn): loading UI
        return null;
    }
    return (_jsxs("div", { className: styles.accountCard, children: [_jsx(Avatar, { size: 28, name: user.label, url: user.avatar, className: styles.avatar }), _jsxs("div", { className: styles.content, children: [_jsxs("div", { className: styles.nameContainer, children: [_jsx("div", { className: styles.userName, title: user.label, children: user.label }), plan && _jsx("div", { className: styles.userPlanButton, children: plan })] }), _jsx("div", { className: styles.userEmail, title: user.email, children: user.email })] })] }));
};
export const PublishPageUserAvatar = () => {
    const authService = useService(AuthService);
    const user = useLiveData(authService.session.account$);
    const t = useI18n();
    const navigateHelper = useNavigateHelper();
    const handleSignOut = useAsyncCallback(async () => {
        await authService.signOut();
        navigateHelper.jumpToSignIn();
    }, [authService, navigateHelper]);
    const menuItem = useMemo(() => {
        return (_jsxs(_Fragment, { children: [_jsx(UserInfo, {}), _jsx(MenuSeparator, {}), _jsx(MenuItem, { prefixIcon: _jsx(SignOutIcon, {}), "data-testid": "share-page-sign-out-option", onClick: handleSignOut, children: t['com.affine.workspace.cloud.account.logout']() })] }));
    }, [handleSignOut, t]);
    if (!user) {
        return null;
    }
    return (_jsx(Menu, { items: menuItem, contentOptions: {
            align: 'end',
        }, children: _jsx("div", { className: styles.iconWrapper, "data-testid": "share-page-user-avatar", children: _jsx(Avatar, { size: 24, url: user.avatar, name: user.label }) }) }));
};
//# sourceMappingURL=user-avatar.js.map