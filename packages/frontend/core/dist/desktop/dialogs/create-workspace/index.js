import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, ConfirmModal, notify, RowInput } from '@affine/component';
import { useAsyncCallback } from '@affine/core/components/hooks/affine-async-hooks';
import { AuthService, ServersService, } from '@affine/core/modules/cloud';
import { GlobalDialogService, } from '@affine/core/modules/dialogs';
import { WorkspacesService } from '@affine/core/modules/workspace';
import { buildShowcaseWorkspace } from '@affine/core/utils/first-app-data';
import { useI18n } from '@affine/i18n';
import track from '@affine/track';
import { FrameworkScope, useLiveData, useService } from '@toeverything/infra';
import { useCallback, useState } from 'react';
import * as styles from './index.css';
import { ServerSelector } from './server-selector';
const FormSection = ({ label, input, }) => {
    return (_jsxs("section", { className: styles.section, children: [_jsx("label", { className: styles.label, children: label }), input] }));
};
export const CreateWorkspaceDialog = ({ serverId, close, ...props }) => {
    const t = useI18n();
    const [workspaceName, setWorkspaceName] = useState('');
    const [inputServerId, setInputServerId] = useState(serverId ?? 'affine-cloud');
    const serversService = useService(ServersService);
    const server = useLiveData(inputServerId ? serversService.server$(inputServerId) : null);
    const onOpenChange = useCallback((open) => {
        if (!open)
            close();
    }, [close]);
    return (_jsxs(ConfirmModal, { open: true, onOpenChange: onOpenChange, title: t['com.affine.nameWorkspace.title'](), description: t['com.affine.nameWorkspace.description'](), cancelText: t['com.affine.nameWorkspace.button.cancel'](), closeButtonOptions: {
            ['data-testid']: 'create-workspace-close-button',
        }, contentOptions: {}, childrenContentClassName: styles.content, customConfirmButton: () => {
            return (_jsx(FrameworkScope, { scope: server?.scope, children: _jsx(CustomConfirmButton, { workspaceName: workspaceName, server: server, onCreated: res => close({ metadata: res.meta, defaultDocId: res.defaultDocId }) }) }));
        }, ...props, children: [_jsx(FormSection, { label: t['com.affine.nameWorkspace.subtitle.workspace-name'](), input: _jsx(RowInput, { autoFocus: true, className: styles.input, "data-testid": "create-workspace-input", placeholder: t['com.affine.nameWorkspace.placeholder'](), maxLength: 64, minLength: 0, onChange: setWorkspaceName }) }), _jsx(FormSection, { label: t['com.affine.nameWorkspace.subtitle.workspace-type'](), input: _jsx(ServerSelector, { className: styles.select, selectedId: inputServerId, onChange: setInputServerId }) })] }));
};
const CustomConfirmButton = ({ workspaceName, server, onCreated, }) => {
    const t = useI18n();
    const [loading, setLoading] = useState(false);
    const session = useService(AuthService).session;
    const loginStatus = useLiveData(session.status$);
    const globalDialogService = useService(GlobalDialogService);
    const workspacesService = useService(WorkspacesService);
    const openSignInModal = useCallback(() => {
        globalDialogService.open('sign-in', { server: server?.baseUrl });
    }, [globalDialogService, server?.baseUrl]);
    const handleConfirm = useAsyncCallback(async () => {
        if (loading)
            return;
        setLoading(true);
        track.$.$.$.createWorkspace({
            flavour: !server ? 'local' : 'affine-cloud',
        });
        // this will be the last step for web for now
        // fix me later
        try {
            const res = await buildShowcaseWorkspace(workspacesService, server?.id ?? 'local', workspaceName);
            onCreated(res);
        }
        catch (e) {
            console.error(e);
            notify.error({
                title: 'Failed to create workspace',
                message: 'please try again later.',
            });
        }
        finally {
            setLoading(false);
        }
    }, [loading, onCreated, server, workspaceName, workspacesService]);
    const handleCheckSessionAndConfirm = useCallback(() => {
        if (server && loginStatus !== 'authenticated') {
            return openSignInModal();
        }
        handleConfirm();
    }, [handleConfirm, loginStatus, openSignInModal, server]);
    return (_jsx(Button, { disabled: !workspaceName, "data-testid": "create-workspace-create-button", variant: "primary", onClick: handleCheckSessionAndConfirm, loading: loading, children: t['com.affine.nameWorkspace.button.create']() }));
};
//# sourceMappingURL=index.js.map