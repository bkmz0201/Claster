import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Modal, notify, useConfirmModal } from '@affine/component';
import { useAsyncCallback } from '@affine/core/components/hooks/affine-async-hooks';
import { Upload } from '@affine/core/components/pure/file-upload';
import { SelfhostLicenseService, WorkspaceSubscriptionService, } from '@affine/core/modules/cloud';
import { WorkspacePermissionService } from '@affine/core/modules/permissions';
import { WorkspaceQuotaService } from '@affine/core/modules/quota';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { copyTextToClipboard } from '@affine/core/utils/clipboard';
import { UserFriendlyError } from '@affine/error';
import { Trans, useI18n } from '@affine/i18n';
import { CopyIcon, FileIcon } from '@blocksuite/icons/rc';
import { useService } from '@toeverything/infra';
import { useCallback, useEffect, useState } from 'react';
import * as styles from './upload-license-modal.css';
export const UploadLicenseModal = ({ open, onOpenChange, }) => {
    const t = useI18n();
    const workspaceService = useService(WorkspaceService);
    const workspace = workspaceService.workspace;
    const licenseService = useService(SelfhostLicenseService);
    const quotaService = useService(WorkspaceQuotaService);
    const workspaceSubscriptionService = useService(WorkspaceSubscriptionService);
    const permission = useService(WorkspacePermissionService).permission;
    const { openConfirmModal } = useConfirmModal();
    const [isInstalling, setIsInstalling] = useState(false);
    const revalidate = useCallback(() => {
        permission.revalidate();
        quotaService.quota.revalidate();
        workspaceSubscriptionService.subscription.revalidate();
        licenseService.revalidate();
    }, [licenseService, permission, quotaService, workspaceSubscriptionService]);
    const handleInstallLicense = useAsyncCallback(async (file) => {
        setIsInstalling(true);
        try {
            await licenseService.installLicense(workspace.id, file);
            revalidate();
            onOpenChange(false);
            openConfirmModal({
                title: t['com.affine.settings.workspace.license.self-host-team.upload-license-file.success.title'](),
                description: t['com.affine.settings.workspace.license.self-host-team.upload-license-file.success.description'](),
                confirmText: t['Confirm'](),
                cancelButtonOptions: {
                    style: {
                        display: 'none',
                    },
                },
                confirmButtonOptions: {
                    variant: 'primary',
                },
            });
        }
        catch (e) {
            const err = UserFriendlyError.fromAny(e);
            onOpenChange(false);
            console.error(err);
            openConfirmModal({
                title: t['com.affine.settings.workspace.license.self-host-team.upload-license-file.failed'](),
                description: err.message,
                confirmText: t['Confirm'](),
                cancelButtonOptions: {
                    style: {
                        display: 'none',
                    },
                },
                confirmButtonOptions: {
                    variant: 'primary',
                },
            });
        }
        setIsInstalling(false);
    }, [
        licenseService,
        onOpenChange,
        openConfirmModal,
        revalidate,
        t,
        workspace.id,
    ]);
    const handleOpenChange = useCallback((open) => {
        onOpenChange(open);
    }, [onOpenChange]);
    const copyWorkspaceId = useCallback(() => {
        copyTextToClipboard(workspace.id)
            .then(success => {
            if (success) {
                notify.success({ title: t['Copied link to clipboard']() });
            }
        })
            .catch(err => {
            console.error(err);
        });
    }, [t, workspace.id]);
    useEffect(() => {
        revalidate();
    }, [revalidate]);
    return (_jsx(Modal, { width: 480, open: open, onOpenChange: handleOpenChange, title: t['com.affine.settings.workspace.license.self-host-team.upload-license-file'](), description: t['com.affine.settings.workspace.license.self-host-team.upload-license-file.description'](), children: _jsxs("div", { className: styles.activateModalContent, children: [_jsxs("div", { className: styles.tipsContainer, children: [_jsx("div", { className: styles.tipsTitle, children: t['com.affine.settings.workspace.license.self-host-team.upload-license-file.tips.title']() }), _jsx("div", { className: styles.tipsContent, children: _jsx(Trans, { i18nKey: "com.affine.settings.workspace.license.self-host-team.upload-license-file.tips.content", components: {
                                    1: (_jsx("a", { href: `${BUILD_CONFIG.requestLicenseUrl}?usp=pp_url&entry.1000023=${workspace.id}`, target: "_blank", rel: "noreferrer", className: styles.textLink })),
                                } }) }), _jsxs("div", { className: styles.workspaceIdContainer, children: [_jsx("div", { className: styles.workspaceIdLabel, children: t['com.affine.settings.workspace.license.self-host-team.upload-license-file.tips.workspace-id']() }), _jsx(Button, { variant: "secondary", onClick: copyWorkspaceId, className: styles.copyButton, children: _jsxs("span", { className: styles.copyButtonContent, children: [_jsx("span", { className: styles.copyButtonText, title: workspace.id, children: workspace.id }), _jsx(CopyIcon, { className: styles.copyIcon })] }) })] })] }), _jsx(Upload, { accept: ".lic, .license", fileChange: handleInstallLicense, children: _jsx(Button, { variant: "primary", className: styles.uploadButton, loading: isInstalling, disabled: isInstalling, children: _jsxs("span", { className: styles.uploadButtonContent, children: [_jsx(FileIcon, { className: styles.uploadButtonIcon }), t['com.affine.settings.workspace.license.self-host-team.upload-license-file.click-to-upload']()] }) }) }), _jsx("div", { className: styles.footer, children: t['com.affine.settings.workspace.license.self-host-team.upload-license-file.help']() })] }) }));
};
//# sourceMappingURL=upload-license-modal.js.map