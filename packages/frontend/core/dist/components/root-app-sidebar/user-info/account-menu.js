import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { MenuItem } from '@affine/component';
import { ServerService, UserFeatureService } from '@affine/core/modules/cloud';
import { WorkspaceDialogService } from '@affine/core/modules/dialogs';
import { useI18n } from '@affine/i18n';
import { track } from '@affine/track';
import { AccountIcon, AdminIcon, SignOutIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback, useEffect } from 'react';
import { useSignOut } from '../../hooks/affine/use-sign-out';
export const AccountMenu = () => {
    const workspaceDialogService = useService(WorkspaceDialogService);
    const openSignOutModal = useSignOut();
    const serverService = useService(ServerService);
    const userFeatureService = useService(UserFeatureService);
    const isAFFiNEAdmin = useLiveData(userFeatureService.userFeature.isAdmin$);
    const onOpenAccountSetting = useCallback(() => {
        track.$.navigationPanel.profileAndBadge.openSettings({ to: 'account' });
        workspaceDialogService.open('setting', {
            activeTab: 'account',
        });
    }, [workspaceDialogService]);
    const onOpenAdminPanel = useCallback(() => {
        window.open(`${serverService.server.baseUrl}/admin`, '_blank');
    }, [serverService.server.baseUrl]);
    const t = useI18n();
    useEffect(() => {
        userFeatureService.userFeature.revalidate();
    }, [userFeatureService]);
    return (_jsxs(_Fragment, { children: [_jsx(MenuItem, { prefixIcon: _jsx(AccountIcon, {}), "data-testid": "workspace-modal-account-settings-option", onClick: onOpenAccountSetting, children: t['com.affine.workspace.cloud.account.settings']() }), isAFFiNEAdmin ? (_jsx(MenuItem, { prefixIcon: _jsx(AdminIcon, {}), "data-testid": "workspace-modal-account-admin-option", onClick: onOpenAdminPanel, children: t['com.affine.workspace.cloud.account.admin']() })) : null, _jsx(MenuItem, { prefixIcon: _jsx(SignOutIcon, {}), "data-testid": "workspace-modal-sign-out-option", onClick: openSignOutModal, children: t['com.affine.workspace.cloud.account.logout']() })] }));
};
//# sourceMappingURL=account-menu.js.map