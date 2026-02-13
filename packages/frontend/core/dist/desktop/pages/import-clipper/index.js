import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button } from '@affine/component';
import { AuthHeader } from '@affine/component/auth-components';
import { useAsyncCallback } from '@affine/core/components/hooks/affine-async-hooks';
import { useWorkspaceName } from '@affine/core/components/hooks/use-workspace-info';
import { WorkspaceSelector } from '@affine/core/components/workspace-selector';
import { AuthService, ServerService } from '@affine/core/modules/cloud';
import { ImportClipperService, } from '@affine/core/modules/import-clipper';
import { WorkspacesService, } from '@affine/core/modules/workspace';
import { useI18n } from '@affine/i18n';
import track from '@affine/track';
import { AllDocsIcon } from '@blocksuite/icons/rc';
import { LiveData, useLiveData, useService } from '@toeverything/infra';
import { cssVar } from '@toeverything/theme';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as styles from './style.css';
const clipperInput$ = new LiveData(null);
const port$ = new LiveData(null);
window.addEventListener('message', event => {
    if (typeof event.data === 'object' &&
        event.data.type === 'affine-clipper:import') {
        clipperInput$.value = event.data.payload;
        if (event.ports.length > 0) {
            port$.value = event.ports[0];
        }
    }
});
export const Component = () => {
    const importClipperService = useService(ImportClipperService);
    const t = useI18n();
    const session = useService(AuthService).session;
    const notLogin = useLiveData(session.status$) === 'unauthenticated';
    const [importing, setImporting] = useState(false);
    const [importingError, setImportingError] = useState(null);
    const clipperInput = useLiveData(clipperInput$);
    const [clipperInputSnapshot, setClipperInputSnapshot] = useState(null);
    const isMissingInput = !clipperInputSnapshot;
    const workspaceStrategy = clipperInputSnapshot?.workspace ?? 'select-by-user';
    const serverService = useService(ServerService);
    const workspacesService = useService(WorkspacesService);
    const serverConfig = useLiveData(serverService.server.config$);
    const workspaces = useLiveData(workspacesService.list.workspaces$);
    const [rawSelectedWorkspace, setSelectedWorkspace] = useState(null);
    const [lastOpenedWorkspaceId] = useState(() => localStorage.getItem('last_workspace_id'));
    const selectedWorkspace = rawSelectedWorkspace ??
        workspaces.find(w => w.id === lastOpenedWorkspaceId) ??
        workspaces.find(w => w.flavour !== 'local') ??
        workspaces.at(0);
    const selectedWorkspaceName = useWorkspaceName(selectedWorkspace);
    const noWorkspace = workspaces.length === 0;
    useEffect(() => {
        workspacesService.list.revalidate();
    }, [workspacesService]);
    useEffect(() => {
        session.revalidate();
    }, [session]);
    useEffect(() => {
        if (!clipperInputSnapshot) {
            setClipperInputSnapshot(clipperInput);
        }
    }, [clipperInput, clipperInputSnapshot]);
    const handleSelectedWorkspace = useCallback((workspaceMetadata) => {
        return setSelectedWorkspace(workspaceMetadata);
    }, []);
    const handleCreatedWorkspace = useCallback((payload) => {
        return setSelectedWorkspace(payload.metadata);
    }, []);
    const handleSuccess = useCallback(() => {
        const arg = { type: 'affine-clipper:import:success' };
        const port = port$.value;
        track.clipper.$.$.createDoc();
        if (port) {
            port.postMessage(arg);
        }
        else {
            window.postMessage(arg);
        }
        window.close();
    }, []);
    const handleImportToSelectedWorkspace = useAsyncCallback(async () => {
        if (clipperInputSnapshot && selectedWorkspace) {
            // save the last opened workspace id
            localStorage.setItem('last_workspace_id', selectedWorkspace.id);
            setImporting(true);
            try {
                await importClipperService.importToWorkspace(selectedWorkspace, clipperInputSnapshot);
                handleSuccess();
            }
            catch (err) {
                setImportingError(err);
            }
            finally {
                setImporting(false);
            }
        }
    }, [
        clipperInputSnapshot,
        handleSuccess,
        importClipperService,
        selectedWorkspace,
    ]);
    const handleImportToNewWorkspace = useAsyncCallback(async () => {
        if (!clipperInputSnapshot) {
            return;
        }
        setImporting(true);
        try {
            await importClipperService.importToNewWorkspace('affine-cloud', 'Workspace', clipperInputSnapshot);
            handleSuccess();
        }
        catch (err) {
            setImportingError(err);
        }
        finally {
            setImporting(false);
        }
    }, [clipperInputSnapshot, handleSuccess, importClipperService]);
    const handleClickSignIn = useCallback(() => {
        window.open(`/sign-in?redirect_uri=${encodeURIComponent('CLOSE_POPUP')}`, '_blank', 'popup');
    }, []);
    const autoImportTriggered = useRef(false);
    useEffect(() => {
        if (isMissingInput) {
            return;
        }
        // use ref to avoid multiple auto import
        // and make sure the following code only runs once
        if (autoImportTriggered.current) {
            return;
        }
        autoImportTriggered.current = true;
        // if not login, we don't auto import
        if (notLogin) {
            return;
        }
        // if the workspace strategy is last-open-workspace, we automatically click the import button
        if (workspaceStrategy === 'last-open-workspace' &&
            selectedWorkspace?.id === lastOpenedWorkspaceId) {
            handleImportToSelectedWorkspace();
        }
    }, [
        workspaceStrategy,
        selectedWorkspace,
        handleImportToSelectedWorkspace,
        lastOpenedWorkspaceId,
        isMissingInput,
        notLogin,
    ]);
    const disabled = isMissingInput || importing || notLogin;
    if (notLogin) {
        // not login
        return (_jsxs("div", { className: styles.container, children: [_jsx(AuthHeader, { className: styles.authHeader, title: t['com.affine.auth.sign.in'](), subTitle: serverConfig.serverName }), _jsx(Button, { className: styles.mainButton, variant: "primary", onClick: handleClickSignIn, children: t['com.affine.auth.sign.in']() })] }));
    }
    return (_jsxs("div", { className: styles.container, children: [_jsx(AllDocsIcon, { className: styles.mainIcon }), _jsx("h6", { className: styles.mainTitle, children: t['com.affine.import-clipper.dialog.createDocFromClipper']() }), noWorkspace ? (_jsx("p", { className: styles.desc, children: "A new workspace will be created." })) : (_jsxs(_Fragment, { children: [_jsx("p", { className: styles.desc, children: "Choose a workspace." }), _jsx(WorkspaceSelector, { workspaceMetadata: selectedWorkspace, onSelectWorkspace: handleSelectedWorkspace, onCreatedWorkspace: handleCreatedWorkspace, className: styles.workspaceSelector, showArrowDownIcon: true, disable: disabled, menuContentOptions: {
                            side: 'top',
                            style: {
                                maxHeight: 'min(600px, calc(50vh + 50px))',
                                width: 352,
                                maxWidth: 'calc(100vw - 20px)',
                            },
                        } })] })), _jsxs("div", { className: styles.buttonContainer, children: [importingError && (_jsx("span", { style: { color: cssVar('warningColor') }, children: t['com.affine.import-clipper.dialog.errorImport']() })), isMissingInput ? (_jsx("span", { style: { color: cssVar('warningColor') }, children: t['com.affine.import-clipper.dialog.errorLoad']() })) : selectedWorkspace ? (_jsx(Button, { className: styles.mainButton, variant: disabled ? 'secondary' : 'primary', loading: disabled, disabled: disabled, onClick: handleImportToSelectedWorkspace, "data-testid": "import-clipper-to-workspace-btn", children: selectedWorkspaceName &&
                            t['com.affine.import-clipper.dialog.createDocToWorkspace']({
                                workspace: selectedWorkspaceName,
                            }) })) : (_jsx(Button, { className: styles.mainButton, variant: "primary", loading: disabled, disabled: disabled, onClick: handleImportToNewWorkspace, children: t['com.affine.import-clipper.dialog.createDocToNewWorkspace']() }))] })] }));
};
//# sourceMappingURL=index.js.map