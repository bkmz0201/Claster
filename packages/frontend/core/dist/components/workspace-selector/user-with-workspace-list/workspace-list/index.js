import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { IconButton, Menu, MenuItem } from '@affine/component';
import { Divider } from '@affine/component/ui/divider';
import { useEnableCloud } from '@affine/core/components/hooks/affine/use-enable-cloud';
import { useSignOut } from '@affine/core/components/hooks/affine/use-sign-out';
import { useAsyncCallback } from '@affine/core/components/hooks/affine-async-hooks';
import { useNavigateHelper } from '@affine/core/components/hooks/use-navigate-helper';
import { AuthService, ServersService } from '@affine/core/modules/cloud';
import { GlobalDialogService } from '@affine/core/modules/dialogs';
import { GlobalContextService } from '@affine/core/modules/global-context';
import { WorkspaceService, WorkspacesService, } from '@affine/core/modules/workspace';
import { useI18n } from '@affine/i18n';
import { AccountIcon, CloudWorkspaceIcon, DeleteIcon, LocalWorkspaceIcon, MoreHorizontalIcon, SelfhostIcon, SignOutIcon, } from '@blocksuite/icons/rc';
import { FrameworkScope, useLiveData, useService, useServiceOptional, } from '@toeverything/infra';
import { useCallback, useMemo } from 'react';
import { WorkspaceCard } from '../../workspace-card';
import { AddServer } from '../add-server';
import * as styles from './index.css';
const WorkspaceServerInfo = ({ server, name, account, accountStatus, onDeleteServer, onSignOut, }) => {
    const t = useI18n();
    const isCloud = server !== 'local';
    const isAffineCloud = server === 'affine-cloud';
    const Icon = isAffineCloud
        ? CloudWorkspaceIcon
        : isCloud
            ? SelfhostIcon
            : LocalWorkspaceIcon;
    const menuItems = useMemo(() => [
        server !== 'affine-cloud' && server !== 'local' && (_jsx(MenuItem, { prefixIcon: _jsx(DeleteIcon, {}), type: "danger", onClick: onDeleteServer, children: t['com.affine.server.delete']() }, "delete-server")),
        accountStatus === 'authenticated' && (_jsx(MenuItem, { prefixIcon: _jsx(SignOutIcon, {}), onClick: onSignOut, type: "danger", children: t['Sign out']() }, "sign-out")),
    ].filter(Boolean), [accountStatus, onDeleteServer, onSignOut, server, t]);
    return (_jsxs("div", { className: styles.workspaceServer, children: [_jsx("div", { className: styles.workspaceServerIcon, children: _jsx(Icon, {}) }), _jsxs("div", { className: styles.workspaceServerContent, children: [_jsx("div", { className: styles.workspaceServerName, children: name }), isCloud ? (_jsx("div", { className: styles.workspaceServerAccount, children: account ? account.email : 'Not signed in' })) : null] }), _jsx("div", { className: styles.workspaceServerSpacer }), menuItems.length ? (_jsx(Menu, { items: menuItems, children: _jsx(IconButton, { icon: _jsx(MoreHorizontalIcon, { className: styles.infoMoreIcon }) }) })) : null] }));
};
const CloudWorkSpaceList = ({ server, workspaces, onClickWorkspace, onClickEnableCloud, }) => {
    const t = useI18n();
    const globalContextService = useService(GlobalContextService);
    const globalDialogService = useService(GlobalDialogService);
    const serverName = useLiveData(server.config$.selector(c => c.serverName));
    const authService = useService(AuthService);
    const serversService = useService(ServersService);
    const account = useLiveData(authService.session.account$);
    const accountStatus = useLiveData(authService.session.status$);
    const navigateHelper = useNavigateHelper();
    const currentWorkspaceFlavour = useLiveData(globalContextService.globalContext.workspaceFlavour.$);
    const handleDeleteServer = useCallback(() => {
        serversService.removeServer(server.id);
        if (currentWorkspaceFlavour === server.id) {
            const otherWorkspace = workspaces.find(w => w.flavour !== server.id);
            if (otherWorkspace) {
                navigateHelper.openPage(otherWorkspace.id, 'all');
            }
        }
    }, [
        currentWorkspaceFlavour,
        navigateHelper,
        server.id,
        serversService,
        workspaces,
    ]);
    const handleSignOut = useSignOut();
    const handleSignIn = useAsyncCallback(async () => {
        globalDialogService.open('sign-in', {
            server: server.baseUrl,
        });
    }, [globalDialogService, server.baseUrl]);
    return (_jsxs(_Fragment, { children: [_jsx(WorkspaceServerInfo, { server: server.id, name: serverName, account: account, accountStatus: accountStatus, onDeleteServer: handleDeleteServer, onSignOut: handleSignOut }), accountStatus === 'unauthenticated' ? (_jsx(MenuItem, { onClick: handleSignIn, children: _jsxs("div", { className: styles.signInMenuItemContent, children: [_jsx("div", { className: styles.signInIconWrapper, children: _jsx(AccountIcon, {}) }), _jsx("div", { className: styles.signInText, children: t['Sign in']() })] }) }, "sign-in")) : null, _jsx(WorkspaceList, { items: workspaces, onClick: onClickWorkspace, onEnableCloudClick: onClickEnableCloud })] }));
};
const LocalWorkspaces = ({ workspaces, onClickWorkspace, onClickWorkspaceSetting, onClickEnableCloud, }) => {
    const t = useI18n();
    if (workspaces.length === 0) {
        return null;
    }
    return (_jsxs(_Fragment, { children: [_jsx(WorkspaceServerInfo, { server: "local", name: t['com.affine.workspaceList.workspaceListType.local']() }), _jsx(WorkspaceList, { items: workspaces, onClick: onClickWorkspace, onSettingClick: onClickWorkspaceSetting, onEnableCloudClick: onClickEnableCloud })] }));
};
export const AFFiNEWorkspaceList = ({ onEventEnd, onClickWorkspace, showEnableCloudButton, }) => {
    const workspacesService = useService(WorkspacesService);
    const workspaces = useLiveData(workspacesService.list.workspaces$);
    const confirmEnableCloud = useEnableCloud();
    const serversService = useService(ServersService);
    const servers = useLiveData(serversService.servers$);
    const affineCloudServer = useMemo(() => servers.find(s => s.id === 'affine-cloud'), [servers]);
    const selfhostServers = useMemo(() => servers.filter(s => s.id !== 'affine-cloud'), [servers]);
    const cloudWorkspaces = useMemo(() => workspaces.filter(({ flavour }) => flavour !== 'local'), [workspaces]);
    const localWorkspaces = useMemo(() => workspaces.filter(({ flavour }) => flavour === 'local'), [workspaces]);
    const onClickEnableCloud = useCallback((meta) => {
        const { workspace, dispose } = workspacesService.open({ metadata: meta });
        confirmEnableCloud(workspace, {
            onFinished: () => {
                dispose();
            },
        });
    }, [confirmEnableCloud, workspacesService]);
    const handleClickWorkspace = useCallback((workspaceMetadata) => {
        onClickWorkspace?.(workspaceMetadata);
        onEventEnd?.();
    }, [onClickWorkspace, onEventEnd]);
    return (_jsxs(_Fragment, { children: [_jsx(FrameworkScope, { scope: affineCloudServer.scope, children: _jsx(CloudWorkSpaceList, { server: affineCloudServer, workspaces: cloudWorkspaces.filter(({ flavour }) => flavour === affineCloudServer.id), onClickWorkspace: handleClickWorkspace }) }, affineCloudServer.id), (localWorkspaces.length > 0 || selfhostServers.length > 0) && (_jsx(Divider, { size: "thinner", className: styles.serverDivider })), _jsx(LocalWorkspaces, { workspaces: localWorkspaces, onClickWorkspace: handleClickWorkspace, onClickEnableCloud: showEnableCloudButton ? onClickEnableCloud : undefined }), selfhostServers.length > 0 && (_jsx(Divider, { size: "thinner", className: styles.serverDivider })), selfhostServers.map((server, index) => (_jsxs(FrameworkScope, { scope: server.scope, children: [_jsx(CloudWorkSpaceList, { server: server, workspaces: cloudWorkspaces.filter(({ flavour }) => flavour === server.id), onClickWorkspace: handleClickWorkspace }), index !== selfhostServers.length - 1 && (_jsx(Divider, { size: "thinner", className: styles.serverDivider }))] }, server.id))), _jsx(AddServer, {}), _jsx(Divider, { size: "thinner" })] }));
};
const SortableWorkspaceItem = ({ workspaceMetadata, onClick, onSettingClick, onEnableCloudClick, }) => {
    const handleClick = useCallback(() => {
        onClick(workspaceMetadata);
    }, [onClick, workspaceMetadata]);
    const currentWorkspace = useServiceOptional(WorkspaceService)?.workspace;
    return (_jsx(WorkspaceCard, { className: styles.workspaceCard, infoClassName: styles.workspaceCardInfoContainer, workspaceMetadata: workspaceMetadata, onClick: handleClick, avatarSize: 22, active: currentWorkspace?.id === workspaceMetadata.id, onClickOpenSettings: onSettingClick, onClickEnableCloud: onEnableCloudClick }));
};
export const WorkspaceList = (props) => {
    const workspaceList = props.items;
    return workspaceList.map(item => (_jsx(SortableWorkspaceItem, { ...props, workspaceMetadata: item }, item.id)));
};
//# sourceMappingURL=index.js.map