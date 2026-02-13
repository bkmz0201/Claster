import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Modal, notify } from '@affine/component';
import { useAsyncCallback } from '@affine/core/components/hooks/affine-async-hooks';
import { useNavigateHelper } from '@affine/core/components/hooks/use-navigate-helper';
import { ServerSelector } from '@affine/core/components/server-selector';
import { AuthService, ServersService, } from '@affine/core/modules/cloud';
import { GlobalDialogService, } from '@affine/core/modules/dialogs';
import { WorkspacesService } from '@affine/core/modules/workspace';
import { useI18n } from '@affine/i18n';
import { CloudWorkspaceIcon } from '@blocksuite/icons/rc';
import { FrameworkScope, useLiveData, useService } from '@toeverything/infra';
import { useCallback, useState } from 'react';
import * as styles from './dialog.css';
const Dialog = ({ workspaceId, close, selectedServer, setSelectedServer, serverList, openPageId, }) => {
    const t = useI18n();
    const authService = useService(AuthService);
    const account = useLiveData(authService.session.account$);
    const loginStatus = useLiveData(useService(AuthService).session.status$);
    const globalDialogService = useService(GlobalDialogService);
    const workspacesService = useService(WorkspacesService);
    const workspaceMeta = useLiveData(workspacesService.list.workspace$(workspaceId));
    const { workspace } = workspaceMeta
        ? workspacesService.open({ metadata: workspaceMeta })
        : { workspace: undefined };
    const { jumpToPage } = useNavigateHelper();
    const enableCloud = useCallback(async () => {
        try {
            if (!workspace)
                return;
            if (!account)
                return;
            const { id: newId } = await workspacesService.transformLocalToCloud(workspace, account.id, selectedServer.id);
            jumpToPage(newId, openPageId || 'all');
            close?.();
        }
        catch (e) {
            console.error(e);
            notify.error({
                title: t['com.affine.workspace.enable-cloud.failed'](),
            });
        }
    }, [
        workspace,
        account,
        workspacesService,
        selectedServer.id,
        jumpToPage,
        openPageId,
        close,
        t,
    ]);
    const openSignIn = useCallback(() => {
        globalDialogService.open('sign-in', {
            server: selectedServer.baseUrl,
        });
    }, [globalDialogService, selectedServer.baseUrl]);
    const signInOrEnableCloud = useAsyncCallback(async () => {
        // not logged in, open login modal
        if (loginStatus === 'unauthenticated') {
            openSignIn();
        }
        if (loginStatus === 'authenticated') {
            await enableCloud();
        }
    }, [enableCloud, loginStatus, openSignIn]);
    return (_jsxs("div", { className: styles.root, children: [_jsx(CloudWorkspaceIcon, { width: '36px', height: '36px' }), _jsxs("div", { className: styles.textContainer, children: [_jsx("div", { className: styles.title, children: t['com.affine.enableAffineCloudModal.custom-server.title']({
                            workspaceName: workspace?.name$.value || 'untitled',
                        }) }), _jsx("div", { className: styles.description, children: t['com.affine.enableAffineCloudModal.custom-server.description']() })] }), _jsx("div", { className: styles.serverSelector, children: _jsx(ServerSelector, { servers: serverList, selectedSeverName: `${selectedServer.config$.value.serverName} (${selectedServer.baseUrl})`, onSelect: setSelectedServer }) }), _jsx(Button, { className: styles.button, onClick: signInOrEnableCloud, size: "extraLarge", variant: "primary", children: t['com.affine.enableAffineCloudModal.custom-server.enable']() })] }));
};
export const EnableCloudDialog = ({ workspaceId, openPageId, serverId, close, }) => {
    const serversService = useService(ServersService);
    const serverList = useLiveData(serversService.servers$);
    const [selectedServer, setSelectedServer] = useState(serverList[0]);
    return (_jsx(Modal, { open: true, modal: true, persistent: true, contentOptions: {
            className: styles.modal,
        }, onOpenChange: () => close(), children: _jsx(FrameworkScope, { scope: selectedServer.scope, children: _jsx(Dialog, { workspaceId: workspaceId, openPageId: openPageId, serverId: serverId, close: close, serverList: serverList, selectedServer: selectedServer, setSelectedServer: setSelectedServer }) }, selectedServer.id) }));
};
//# sourceMappingURL=index.js.map