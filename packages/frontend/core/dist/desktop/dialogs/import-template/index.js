import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Modal } from '@affine/component';
import { useAsyncCallback } from '@affine/core/components/hooks/affine-async-hooks';
import { useNavigateHelper } from '@affine/core/components/hooks/use-navigate-helper';
import { useWorkspaceName } from '@affine/core/components/hooks/use-workspace-info';
import { WorkspaceSelector } from '@affine/core/components/workspace-selector';
import { AuthService } from '@affine/core/modules/cloud';
import {} from '@affine/core/modules/dialogs';
import { ImportTemplateService, TemplateDownloaderService, } from '@affine/core/modules/import-template';
import { WorkspacesService, } from '@affine/core/modules/workspace';
import { useI18n } from '@affine/i18n';
import { AllDocsIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { cssVar } from '@toeverything/theme';
import { useCallback, useEffect, useState } from 'react';
import * as styles from './dialog.css';
const Dialog = ({ templateName, templateMode, snapshotUrl, onClose, }) => {
    const t = useI18n();
    const session = useService(AuthService).session;
    const notLogin = useLiveData(session.status$) === 'unauthenticated';
    const isSessionRevalidating = useLiveData(session.isRevalidating$);
    const [importing, setImporting] = useState(false);
    const [importingError, setImportingError] = useState(null);
    const workspacesService = useService(WorkspacesService);
    const templateDownloaderService = useService(TemplateDownloaderService);
    const importTemplateService = useService(ImportTemplateService);
    const templateDownloader = templateDownloaderService.downloader;
    const isDownloading = useLiveData(templateDownloader.isDownloading$);
    const downloadError = useLiveData(templateDownloader.error$);
    const workspaces = useLiveData(workspacesService.list.workspaces$);
    const [rawSelectedWorkspace, setSelectedWorkspace] = useState(null);
    const selectedWorkspace = rawSelectedWorkspace ??
        workspaces.find(w => w.flavour !== 'local') ??
        workspaces.at(0);
    const selectedWorkspaceName = useWorkspaceName(selectedWorkspace);
    const { openPage, jumpToSignIn } = useNavigateHelper();
    const noWorkspace = workspaces.length === 0;
    useEffect(() => {
        workspacesService.list.revalidate();
    }, [workspacesService]);
    useEffect(() => {
        session.revalidate();
    }, [session]);
    useEffect(() => {
        if (!isSessionRevalidating && notLogin) {
            jumpToSignIn('/template/import?' +
                '&name=' +
                templateName +
                '&mode=' +
                templateMode +
                '&snapshotUrl=' +
                snapshotUrl);
            onClose?.();
        }
    }, [
        isSessionRevalidating,
        jumpToSignIn,
        notLogin,
        onClose,
        snapshotUrl,
        templateName,
        templateMode,
    ]);
    useEffect(() => {
        templateDownloader.download({ snapshotUrl });
    }, [snapshotUrl, templateDownloader]);
    const handleSelectedWorkspace = useCallback((workspaceMetadata) => {
        return setSelectedWorkspace(workspaceMetadata);
    }, []);
    const handleCreatedWorkspace = useCallback((payload) => {
        return setSelectedWorkspace(payload.metadata);
    }, []);
    const handleImportToSelectedWorkspace = useAsyncCallback(async () => {
        if (templateDownloader.data$.value && selectedWorkspace) {
            setImporting(true);
            try {
                const docId = await importTemplateService.importToWorkspace(selectedWorkspace, templateDownloader.data$.value, templateMode);
                openPage(selectedWorkspace.id, docId);
                onClose?.();
            }
            catch (err) {
                setImportingError(err);
            }
            finally {
                setImporting(false);
            }
        }
    }, [
        importTemplateService,
        onClose,
        openPage,
        selectedWorkspace,
        templateDownloader.data$.value,
        templateMode,
    ]);
    const handleImportToNewWorkspace = useAsyncCallback(async () => {
        if (!templateDownloader.data$.value) {
            return;
        }
        setImporting(true);
        try {
            const { workspaceId, docId } = await importTemplateService.importToNewWorkspace(
            // TODO: support selfhosted
            'affine-cloud', 'Workspace', templateDownloader.data$.value);
            openPage(workspaceId, docId);
            onClose?.();
        }
        catch (err) {
            setImportingError(err);
        }
        finally {
            setImporting(false);
        }
    }, [
        importTemplateService,
        onClose,
        openPage,
        templateDownloader.data$.value,
    ]);
    const disabled = isDownloading || importing || notLogin;
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: styles.dialogContainer, children: [_jsx(AllDocsIcon, { className: styles.mainIcon }), _jsx("h6", { className: styles.mainTitle, children: t['com.affine.import-template.dialog.createDocWithTemplate']({
                            templateName,
                        }) }), noWorkspace ? (_jsx("p", { className: styles.desc, children: "A new workspace will be created." })) : (_jsxs(_Fragment, { children: [_jsx("p", { className: styles.desc, children: "Choose a workspace." }), _jsx(WorkspaceSelector, { workspaceMetadata: selectedWorkspace, onSelectWorkspace: handleSelectedWorkspace, onCreatedWorkspace: handleCreatedWorkspace, className: styles.workspaceSelector, showArrowDownIcon: true, disable: disabled, menuContentOptions: {
                                    side: 'top',
                                    style: {
                                        maxHeight: 'min(600px, calc(50vh + 50px))',
                                        width: 352,
                                        maxWidth: 'calc(100vw - 20px)',
                                    },
                                } })] }))] }), importingError && (_jsx("span", { style: { color: cssVar('warningColor') }, children: t['com.affine.import-template.dialog.errorImport']() })), downloadError ? (_jsx("span", { style: { color: cssVar('warningColor') }, children: t['com.affine.import-template.dialog.errorLoad']() })) : selectedWorkspace ? (_jsx(Button, { className: styles.mainButton, variant: disabled ? 'secondary' : 'primary', loading: disabled, disabled: disabled, onClick: handleImportToSelectedWorkspace, "data-testid": "import-template-to-workspace-btn", children: selectedWorkspaceName &&
                    t['com.affine.import-template.dialog.createDocToWorkspace']({
                        workspace: selectedWorkspaceName,
                    }) })) : (_jsx(Button, { className: styles.mainButton, variant: "primary", loading: disabled, disabled: disabled, onClick: handleImportToNewWorkspace, children: t['com.affine.import-template.dialog.createDocToNewWorkspace']() }))] }));
};
export const ImportTemplateDialog = ({ close, snapshotUrl, templateName, templateMode, }) => {
    return (_jsx(Modal, { open: true, modal: true, persistent: true, withoutCloseButton: true, contentOptions: {
            className: styles.modal,
        }, onOpenChange: () => close(), children: _jsx(Dialog, { templateName: templateName, templateMode: templateMode, snapshotUrl: snapshotUrl, onClose: () => close() }) }));
};
//# sourceMappingURL=index.js.map