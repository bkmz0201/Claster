import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, ConfirmModal, Input, Modal, notify } from '@affine/component';
import { SettingRow } from '@affine/component/setting-components';
import { useEnableCloud } from '@affine/core/components/hooks/affine/use-enable-cloud';
import { useAsyncCallback } from '@affine/core/components/hooks/affine-async-hooks';
import { useMutation } from '@affine/core/components/hooks/use-mutation';
import { SelfhostLicenseService, WorkspaceSubscriptionService, } from '@affine/core/modules/cloud';
import { WorkspacePermissionService } from '@affine/core/modules/permissions';
import { WorkspaceQuotaService } from '@affine/core/modules/quota';
import { UrlService } from '@affine/core/modules/url';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { UserFriendlyError } from '@affine/error';
import { createSelfhostCustomerPortalMutation, SubscriptionVariant, } from '@affine/graphql';
import { Trans, useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { cssVarV2 } from '@toeverything/theme/v2';
import clsx from 'clsx';
import { useCallback, useEffect, useMemo, useState } from 'react';
import * as styles from './styles.css';
import { UploadLicenseModal } from './upload-license-modal';
export const SelfHostTeamCard = () => {
    const t = useI18n();
    const workspace = useService(WorkspaceService).workspace;
    const workspaceQuotaService = useService(WorkspaceQuotaService);
    const workspaceSubscriptionService = useService(WorkspaceSubscriptionService);
    const permission = useService(WorkspacePermissionService).permission;
    const isTeam = useLiveData(permission.isTeam$);
    const workspaceQuota = useLiveData(workspaceQuotaService.quota.quota$);
    const confirmEnableCloud = useEnableCloud();
    const isLocalWorkspace = workspace.flavour === 'local';
    const [openModal, setOpenModal] = useState(false);
    const [openUploadModal, setOpenUploadModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const selfhostLicenseService = useService(SelfhostLicenseService);
    const license = useLiveData(selfhostLicenseService.license$);
    const isOneTimePurchase = license?.variant === SubscriptionVariant.Onetime;
    const revalidate = useCallback(() => {
        permission.revalidate();
        workspaceQuotaService.quota.revalidate();
        workspaceSubscriptionService.subscription.revalidate();
        selfhostLicenseService.revalidate();
    }, [
        permission,
        selfhostLicenseService,
        workspaceQuotaService,
        workspaceSubscriptionService,
    ]);
    useEffect(() => {
        revalidate();
    }, [revalidate]);
    const description = useMemo(() => {
        if (isTeam) {
            return (_jsxs("div", { children: [_jsx("p", { children: t['com.affine.settings.workspace.license.self-host-team.team.description']({
                            expirationDate: new Date(license?.expiredAt || 0).toLocaleDateString(),
                            leftDays: Math.floor((new Date(license?.expiredAt || 0).getTime() - Date.now()) /
                                (1000 * 60 * 60 * 24)).toLocaleString(),
                        }) }), isOneTimePurchase ? (_jsx("p", { children: _jsx(Trans, { i18nKey: "com.affine.settings.workspace.license.self-host-team.team.license", components: { 1: _jsx("strong", {}) } }) })) : null] }));
        }
        return t['com.affine.settings.workspace.license.self-host-team.free.description']({
            memberCount: workspaceQuota?.humanReadable.memberLimit || '10',
        });
    }, [isOneTimePurchase, isTeam, license, t, workspaceQuota]);
    const handleClick = useCallback(() => {
        if (isLocalWorkspace) {
            confirmEnableCloud(workspace);
            return;
        }
        setOpenModal(true);
    }, [confirmEnableCloud, isLocalWorkspace, workspace]);
    const handleOpenUploadModal = useCallback(() => {
        setOpenUploadModal(true);
    }, []);
    const onActivate = useCallback((license) => {
        setLoading(true);
        selfhostLicenseService
            .activateLicense(workspace.id, license)
            .then(() => {
            setLoading(false);
            setOpenModal(false);
            revalidate();
            notify.success({
                title: t['com.affine.settings.workspace.license.activate-success'](),
            });
        })
            .catch(e => {
            setLoading(false);
            console.error(e);
            const error = UserFriendlyError.fromAny(e);
            notify.error({
                title: error.name,
                message: error.message,
            });
        });
    }, [revalidate, selfhostLicenseService, t, workspace.id]);
    const onDeactivate = useCallback(() => {
        setLoading(true);
        selfhostLicenseService
            .deactivateLicense(workspace.id)
            .then(() => {
            setLoading(false);
            setOpenModal(false);
            revalidate();
            notify.success({
                title: t['com.affine.settings.workspace.license.deactivate-success'](),
            });
        })
            .catch(e => {
            setLoading(false);
            console.error(e);
            const error = UserFriendlyError.fromAny(e);
            notify.error({
                title: error.name,
                message: error.message,
            });
        });
    }, [revalidate, selfhostLicenseService, t, workspace.id]);
    const handleConfirm = useCallback((license) => {
        if (isTeam) {
            onDeactivate();
        }
        else {
            onActivate(license);
        }
    }, [isTeam, onActivate, onDeactivate]);
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: styles.planCard, children: [_jsxs("div", { className: styles.container, children: [_jsx("div", { className: styles.currentPlan, children: _jsx(SettingRow, { spreadCol: false, name: t[`com.affine.settings.workspace.license.self-host${isTeam ? '-team' : ''}`](), desc: description }) }), _jsxs("div", { className: clsx(styles.planPrice, {
                                    hidden: isLocalWorkspace,
                                }), children: [_jsx("span", { className: styles.seat, children: t['com.affine.settings.workspace.license.self-host-team.seats']() }), _jsx("span", { children: isTeam && !isOneTimePurchase
                                            ? license?.quantity || ''
                                            : `${workspaceQuota?.memberCount}/${workspaceQuota?.memberLimit}` })] })] }), _jsxs("div", { className: clsx(styles.buttonContainer, {
                            left: isTeam || isLocalWorkspace,
                        }), children: [!isTeam && !isLocalWorkspace ? (_jsx(Button, { variant: "plain", className: styles.uploadButton, onClick: handleOpenUploadModal, children: t['com.affine.settings.workspace.license.self-host-team.upload-license-file']() })) : null, _jsx(Button, { variant: "primary", className: styles.activeButton, onClick: handleClick, children: t[`com.affine.settings.workspace.license.self-host-team.${isTeam ? 'deactivate-license' : 'use-purchased-key'}`]() })] })] }), _jsx(ActionModal, { open: openModal, onOpenChange: setOpenModal, isTeam: !!isTeam, loading: loading, onConfirm: handleConfirm, isOneTimePurchase: isOneTimePurchase }), _jsx(UploadLicenseModal, { open: openUploadModal, onOpenChange: setOpenUploadModal })] }));
};
const ActionModal = ({ open, onOpenChange, isTeam, onConfirm, loading, isOneTimePurchase, }) => {
    const t = useI18n();
    const [key, setKey] = useState('');
    const workspace = useService(WorkspaceService).workspace;
    const { isMutating, trigger } = useMutation({
        mutation: createSelfhostCustomerPortalMutation,
    });
    const urlService = useService(UrlService);
    const update = useAsyncCallback(async () => {
        await trigger({
            workspaceId: workspace.id,
        }, {
            onSuccess: data => {
                urlService.openExternal(data.createSelfhostWorkspaceCustomerPortal);
            },
        }).catch(e => {
            const userFriendlyError = UserFriendlyError.fromAny(e);
            notify.error(userFriendlyError);
        });
    }, [trigger, urlService, workspace.id]);
    const handleConfirm = useCallback(() => {
        onConfirm(key);
        setKey('');
    }, [key, onConfirm]);
    const handleOpenChange = useCallback((open) => {
        setKey('');
        onOpenChange(open);
    }, [onOpenChange]);
    const handleCancel = useCallback(() => {
        setKey('');
        onOpenChange(false);
    }, [onOpenChange]);
    if (isTeam && isOneTimePurchase) {
        return (_jsx(ConfirmModal, { width: 480, open: open, onOpenChange: handleOpenChange, title: t[`com.affine.settings.workspace.license.deactivate-modal.title`](), description: t['com.affine.settings.workspace.license.deactivate-modal.description-license'](), cancelText: t['Cancel'](), cancelButtonOptions: {
                variant: 'secondary',
            }, confirmText: t['Confirm'](), confirmButtonOptions: {
                loading: loading,
                disabled: loading,
                variant: 'primary',
            }, onConfirm: handleConfirm, childrenContentClassName: styles.activateModalContent }));
    }
    if (isTeam) {
        return (_jsx(Modal, { width: 480, open: open, onOpenChange: handleOpenChange, title: t[`com.affine.settings.workspace.license.deactivate-modal.title`](), description: _jsx(Trans, { i18nKey: "com.affine.settings.workspace.license.deactivate-modal.description", components: {
                    1: _jsx("strong", {}),
                } }), children: _jsxs("div", { className: styles.footer, children: [_jsx(Button, { variant: "secondary", onClick: update, loading: isMutating, disabled: isMutating, children: t['com.affine.settings.workspace.license.deactivate-modal.manage-payment']() }), _jsxs("div", { className: styles.rightActions, children: [_jsx(Button, { variant: "secondary", onClick: handleCancel, children: t['Cancel']() }), _jsx(Button, { variant: "primary", onClick: handleConfirm, children: t['Confirm']() })] })] }) }));
    }
    return (_jsxs(ConfirmModal, { width: 480, open: open, onOpenChange: handleOpenChange, title: t['com.affine.settings.workspace.license.activate-modal.title'](), description: t['com.affine.settings.workspace.license.activate-modal.description'](), cancelText: t['Cancel'](), cancelButtonOptions: {
            variant: 'secondary',
        }, contentOptions: {
            ['data-testid']: 'license-modal',
            style: {
                padding: '20px 24px',
            },
        }, confirmText: t['Confirm'](), confirmButtonOptions: {
            loading: loading,
            variant: 'primary',
            disabled: loading || (!isTeam && !key),
        }, onConfirm: handleConfirm, childrenContentClassName: styles.activateModalContent, children: [_jsx(Input, { value: key, onChange: setKey, placeholder: "AAAA-AAAA-AAAA-AAAA-AAAA" }), _jsx("span", { className: styles.tips, children: _jsx(Trans, { i18nKey: "com.affine.settings.workspace.license.activate-modal.tips", components: {
                        1: (_jsx("a", { href: "https://affine.pro/pricing/?type=selfhost#table", target: "_blank", rel: "noreferrer", style: { color: cssVarV2('text/link') } })),
                    } }) })] }));
};
//# sourceMappingURL=self-host-team-card.js.map