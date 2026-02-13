import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Scrollable } from '@affine/component';
import { Avatar } from '@affine/component/ui/avatar';
import { UserPlanButton } from '@affine/core/components/affine/auth/user-plan-button';
import { useCatchEventCallback } from '@affine/core/components/hooks/use-catch-event-hook';
import { AuthService } from '@affine/core/modules/cloud';
import { GlobalDialogService } from '@affine/core/modules/dialogs';
import {} from '@affine/core/modules/workspace';
import { useI18n } from '@affine/i18n';
import { track } from '@affine/track';
import { Logo1Icon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import clsx from 'clsx';
import { Suspense, useCallback, useMemo, } from 'react';
import { useGeneralSettingList } from '../general-setting';
import { useWorkspaceSettingList } from '../workspace-setting';
import * as style from './style.css';
export const UserInfo = ({ onAccountSettingClick, onTabChange, active, }) => {
    const account = useLiveData(useService(AuthService).session.account$);
    const onClick = useCatchEventCallback(() => {
        onTabChange('plans', null);
    }, [onTabChange]);
    if (!account) {
        // TODO(@eyhn): loading ui
        return;
    }
    return (_jsxs("div", { "data-testid": "user-info-card", className: clsx(style.accountButton, {
            active: active,
        }), onClick: onAccountSettingClick, children: [_jsx(Avatar, { size: 28, rounded: 2, name: account.label, url: account.avatar, className: "avatar" }), _jsxs("div", { className: "content", children: [_jsxs("div", { className: "name-container", children: [_jsx("div", { className: "name", title: account.label, children: account.label }), _jsx(UserPlanButton, { onClick: onClick })] }), _jsx("div", { className: "email", title: account.email, children: account.email })] })] }));
};
export const SignInButton = () => {
    const t = useI18n();
    const globalDialogService = useService(GlobalDialogService);
    return (_jsxs("div", { className: style.accountButton, onClick: useCallback(() => {
            globalDialogService.open('sign-in', {});
        }, [globalDialogService]), children: [_jsx("div", { className: "avatar not-sign", children: _jsx(Logo1Icon, {}) }), _jsxs("div", { className: "content", children: [_jsx("div", { className: "name", title: t['com.affine.settings.sign'](), children: t['com.affine.settings.sign']() }), _jsx("div", { className: "email", title: t['com.affine.setting.sign.message'](), children: t['com.affine.setting.sign.message']() })] })] }));
};
const SettingSidebarItem = ({ isActive, icon, title, testId, beta, ...props }) => {
    return (_jsxs("div", { ...props, title: title, "data-testid": testId, className: clsx(style.sidebarSelectItem, {
            active: isActive,
        }), children: [_jsx("div", { className: style.sidebarSelectItemIcon, children: icon }), _jsx("div", { className: style.sidebarSelectItemName, children: title }), beta ? _jsx("div", { className: style.sidebarSelectItemBeta, children: "Beta" }) : null] }));
};
const SettingSidebarGroup = ({ title, items, }) => {
    return (_jsxs("div", { className: style.sidebarGroup, children: [_jsx("div", { className: style.sidebarSubtitle, children: title }), _jsx("div", { className: style.sidebarItemsWrapper, children: items.map(({ key, ...props }) => (_jsx(SettingSidebarItem, { ...props }, key))) })] }));
};
export const SettingSidebar = ({ activeTab, onTabChange, }) => {
    const t = useI18n();
    const loginStatus = useLiveData(useService(AuthService).session.status$);
    const generalList = useGeneralSettingList();
    const workspaceSettingList = useWorkspaceSettingList();
    const gotoTab = useCallback((tab) => {
        track.$.settingsPanel.menu.openSettings({ to: tab });
        onTabChange(tab);
    }, [onTabChange]);
    const onAccountSettingClick = useCallback(() => {
        track.$.settingsPanel.menu.openSettings({ to: 'account' });
        onTabChange('account');
    }, [onTabChange]);
    const groups = useMemo(() => {
        const res = [
            {
                key: 'setting:general',
                title: t['com.affine.settingSidebar.settings.general'](),
                items: generalList,
            },
            {
                key: 'setting:workspace',
                title: t['com.affine.settingSidebar.settings.workspace'](),
                items: workspaceSettingList,
            },
        ].map(group => {
            return {
                ...group,
                items: group.items.map(item => {
                    return {
                        ...item,
                        isActive: item.key === activeTab,
                        'data-event-arg': item.key,
                        onClick: () => gotoTab(item.key),
                    };
                }),
            };
        });
        return res;
    }, [activeTab, generalList, gotoTab, t, workspaceSettingList]);
    return (_jsxs("div", { className: style.settingSlideBar, "data-testid": "settings-sidebar", children: [_jsx("div", { className: style.sidebarTitle, children: t['com.affine.settingSidebar.title']() }), loginStatus === 'unauthenticated' ? _jsx(SignInButton, {}) : null, loginStatus === 'authenticated' ? (_jsx(Suspense, { children: _jsx(UserInfo, { onAccountSettingClick: onAccountSettingClick, active: activeTab === 'account', onTabChange: onTabChange }) })) : null, _jsx(Scrollable.Root, { children: _jsxs(Scrollable.Viewport, { children: [groups.map(group => (_jsx(SettingSidebarGroup, { title: group.title, items: group.items }, group.key))), _jsx(Scrollable.Scrollbar, {})] }) })] }));
};
//# sourceMappingURL=index.js.map