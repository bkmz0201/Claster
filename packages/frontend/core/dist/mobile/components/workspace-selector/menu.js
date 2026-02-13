import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Divider, IconButton, Menu, MenuItem } from '@affine/component';
import { useAsyncCallback } from '@affine/core/components/hooks/affine-async-hooks';
import { useNavigateHelper } from '@affine/core/components/hooks/use-navigate-helper';
import { useWorkspaceInfo } from '@affine/core/components/hooks/use-workspace-info';
import { WorkspaceAvatar } from '@affine/core/components/workspace-avatar';
import { AuthService, ServersService, } from '@affine/core/modules/cloud';
import { GlobalDialogService } from '@affine/core/modules/dialogs';
import { GlobalContextService } from '@affine/core/modules/global-context';
import { WorkspacesService, } from '@affine/core/modules/workspace';
import { useI18n } from '@affine/i18n';
import { AccountIcon, CloseIcon, CollaborationIcon, DeleteIcon, MoreHorizontalIcon, SelfhostIcon, SignOutIcon, } from '@blocksuite/icons/rc';
import { FrameworkScope, useLiveData, useService } from '@toeverything/infra';
import clsx from 'clsx';
import { useCallback, useMemo } from 'react';
import * as styles from './menu.css';
const WorkspaceItem = ({ workspace, className, ...attrs }) => {
    const info = useWorkspaceInfo(workspace);
    const name = info?.name;
    const isOwner = info?.isOwner;
    return (_jsx("li", { className: styles.wsItem, children: _jsxs("button", { className: clsx(styles.wsCard, className), ...attrs, children: [_jsx(WorkspaceAvatar, { meta: workspace, rounded: 6, "data-testid": "workspace-avatar", size: 32, name: name, colorfulFallback: true }, workspace.id), _jsx("div", { className: styles.wsName, children: name }), !isOwner ? _jsx(CollaborationIcon, { fontSize: 24 }) : null] }) }));
};
export const WorkspaceList = (props) => {
    const workspaceList = props.items;
    return workspaceList.map(item => (_jsx(WorkspaceItem, { workspace: item, onClick: () => props.onClick(item) }, item.id)));
};
const CloudSignIn = ({ onClick }) => {
    const t = useI18n();
    return (_jsx("li", { className: styles.wsItem, children: _jsxs("button", { className: styles.wsCard, onClick: onClick, children: [_jsx("div", { className: styles.signInIcon, children: _jsx(AccountIcon, {}) }), _jsx("div", { className: styles.wsName, children: t['Sign in']() })] }) }));
};
const WorkspaceServerInfo = ({ server, name, account, accountStatus, onDeleteServer, onSignOut, }) => {
    const t = useI18n();
    const isCloud = server !== 'local';
    const menuItems = useMemo(() => [
        server !== 'affine-cloud' && server !== 'local' && (_jsx(MenuItem, { prefixIcon: _jsx(DeleteIcon, {}), type: "danger", onClick: onDeleteServer, children: t['com.affine.server.delete']() }, "delete-server")),
        accountStatus === 'authenticated' && (_jsx(MenuItem, { prefixIcon: _jsx(SignOutIcon, {}), onClick: onSignOut, type: "danger", children: t['Sign out']() }, "sign-out")),
    ].filter(Boolean), [accountStatus, onDeleteServer, onSignOut, server, t]);
    return (_jsxs("div", { className: styles.serverInfo, children: [_jsx("div", { className: styles.serverName, children: name }), isCloud ? (_jsxs("div", { className: styles.serverAccount, children: ["- ", account ? account.email : 'Not signed in'] })) : null, _jsx("div", { className: styles.spaceX }), menuItems.length ? (_jsx(Menu, { items: menuItems, children: _jsx(IconButton, { icon: _jsx(MoreHorizontalIcon, {}) }) })) : null] }));
};
const LocalWorkspaces = ({ workspaces, onClickWorkspace, onClickWorkspaceSetting, onClickEnableCloud, }) => {
    const t = useI18n();
    if (workspaces.length === 0) {
        return null;
    }
    return (_jsxs(_Fragment, { children: [_jsx(WorkspaceServerInfo, { server: "local", name: t['com.affine.workspaceList.workspaceListType.local']() }), _jsx(WorkspaceList, { items: workspaces, onClick: onClickWorkspace, onSettingClick: onClickWorkspaceSetting, onEnableCloudClick: onClickEnableCloud })] }));
};
const CloudWorkSpaceList = ({ server, workspaces, onClickWorkspace, onClickEnableCloud, }) => {
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
    const handleSignOut = useAsyncCallback(async () => {
        await authService.signOut();
        navigateHelper.jumpToSignIn();
    }, [authService, navigateHelper]);
    const handleSignIn = useAsyncCallback(async () => {
        globalDialogService.open('sign-in', {
            server: server.baseUrl,
        });
    }, [globalDialogService, server.baseUrl]);
    return (_jsxs(_Fragment, { children: [_jsx(WorkspaceServerInfo, { server: server.id, name: serverName, account: account, accountStatus: accountStatus, onDeleteServer: handleDeleteServer, onSignOut: handleSignOut }), accountStatus === 'unauthenticated' ? (_jsx(CloudSignIn, { onClick: handleSignIn })) : (_jsx(WorkspaceList, { items: workspaces, onClick: onClickWorkspace, onEnableCloudClick: onClickEnableCloud }))] }));
};
const AddServer = () => {
    const globalDialogService = useService(GlobalDialogService);
    const onAddServer = useCallback(() => {
        globalDialogService.open('sign-in', { step: 'addSelfhosted' });
    }, [globalDialogService]);
    if (!BUILD_CONFIG.isNative) {
        return null;
    }
    return _jsx(IconButton, { onClick: onAddServer, size: "24", icon: _jsx(SelfhostIcon, {}) });
};
export const SelectorMenu = ({ onClose }) => {
    const workspacesService = useService(WorkspacesService);
    const workspaces = useLiveData(workspacesService.list.workspaces$);
    const serversService = useService(ServersService);
    const { jumpToPage } = useNavigateHelper();
    const servers = useLiveData(serversService.servers$);
    const affineCloudServer = useMemo(() => servers.find(s => s.id === 'affine-cloud'), [servers]);
    const selfhostServers = useMemo(() => servers.filter(s => s.id !== 'affine-cloud'), [servers]);
    const cloudWorkspaces = useMemo(() => workspaces.filter(({ flavour }) => flavour !== 'local'), [workspaces]);
    const localWorkspaces = useMemo(() => workspaces.filter(({ flavour }) => flavour === 'local'), [workspaces]);
    const handleClickWorkspace = useCallback((workspaceMetadata) => {
        const id = workspaceMetadata.id;
        if (id !== currentWorkspace?.id) {
            jumpToPage(id, 'home');
        }
        onClose?.();
    }, [onClose, jumpToPage]);
    return (_jsxs("div", { className: styles.root, children: [_jsxs("header", { className: styles.head, children: ["Workspace", _jsxs("div", { className: styles.headActions, children: [_jsx(AddServer, {}), _jsx(IconButton, { onClick: onClose, size: "24", icon: _jsx(CloseIcon, {}) })] })] }), _jsx("div", { className: styles.divider }), _jsxs("main", { className: styles.body, children: [_jsx(FrameworkScope, { scope: affineCloudServer.scope, children: _jsx(CloudWorkSpaceList, { server: affineCloudServer, workspaces: cloudWorkspaces.filter(({ flavour }) => flavour === affineCloudServer.id), onClickWorkspace: handleClickWorkspace }) }, affineCloudServer.id), (localWorkspaces.length > 0 || selfhostServers.length > 0) && (_jsx(Divider, { size: "thinner" })), _jsx(LocalWorkspaces, { workspaces: localWorkspaces, onClickWorkspace: handleClickWorkspace }), selfhostServers.length > 0 && _jsx(Divider, { size: "thinner" }), selfhostServers.map((server, index) => (_jsxs(FrameworkScope, { scope: server.scope, children: [_jsx(CloudWorkSpaceList, { server: server, workspaces: cloudWorkspaces.filter(({ flavour }) => flavour === server.id), onClickWorkspace: handleClickWorkspace }), index !== selfhostServers.length - 1 && _jsx(Divider, { size: "thinner" })] }, server.id)))] })] }));
};
//# sourceMappingURL=menu.js.map