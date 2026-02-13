import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, notify } from '@affine/component';
import { SettingHeader, SettingRow, } from '@affine/component/setting-components';
import { getUpgradeQuestionnaireLink } from '@affine/core/components/hooks/affine/use-subscription-notify';
import { useAsyncCallback } from '@affine/core/components/hooks/affine-async-hooks';
import { useMutation } from '@affine/core/components/hooks/use-mutation';
import { AuthService, SelfhostLicenseService, WorkspaceSubscriptionService, } from '@affine/core/modules/cloud';
import { WorkspacePermissionService } from '@affine/core/modules/permissions';
import { UrlService } from '@affine/core/modules/url';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { UserFriendlyError } from '@affine/error';
import { createSelfhostCustomerPortalMutation, SubscriptionPlan, SubscriptionRecurring, SubscriptionVariant, } from '@affine/graphql';
import { useI18n } from '@affine/i18n';
import { FrameworkScope, useLiveData, useService } from '@toeverything/infra';
import { useCallback, useEffect, useState } from 'react';
import { EnableCloudPanel } from '../preference/enable-cloud';
import { SelfHostTeamCard } from './self-host-team-card';
import { SelfHostTeamPlan } from './self-host-team-plan';
import * as styles from './styles.css';
import { UploadLicenseModal } from './upload-license-modal';
export const WorkspaceSettingLicense = ({ onCloseSetting, }) => {
    const workspace = useService(WorkspaceService).workspace;
    const t = useI18n();
    if (workspace === null) {
        return null;
    }
    return (_jsxs(FrameworkScope, { scope: workspace.scope, children: [_jsx(SettingHeader, { title: t['com.affine.settings.workspace.license'](), subtitle: t['com.affine.settings.workspace.license.description']() }), _jsx(SelfHostTeamPlan, {}), workspace.flavour === 'local' ? (_jsx(EnableCloudPanel, { onCloseSetting: onCloseSetting })) : (_jsxs(_Fragment, { children: [_jsx(SelfHostTeamCard, {}), _jsx(ReplaceLicenseModal, {}), _jsx(TypeFormLink, {}), _jsx(PaymentMethodUpdater, {})] }))] }));
};
const ReplaceLicenseModal = () => {
    const t = useI18n();
    const selfhostLicenseService = useService(SelfhostLicenseService);
    const license = useLiveData(selfhostLicenseService.license$);
    const isOneTimePurchase = license?.variant === SubscriptionVariant.Onetime;
    const permission = useService(WorkspacePermissionService).permission;
    const isTeam = useLiveData(permission.isTeam$);
    const [openUploadModal, setOpenUploadModal] = useState(false);
    const handleClick = useCallback(() => {
        setOpenUploadModal(true);
    }, []);
    useEffect(() => {
        selfhostLicenseService.revalidate();
    }, [selfhostLicenseService]);
    if (!isTeam || !isOneTimePurchase) {
        return null;
    }
    return (_jsxs(_Fragment, { children: [_jsx(SettingRow, { className: styles.paymentMethod, name: t['com.affine.settings.workspace.license.self-host-team.replace-license.title'](), desc: t['com.affine.settings.workspace.license.self-host-team.replace-license.description'](), children: _jsx(Button, { onClick: handleClick, children: t['com.affine.settings.workspace.license.self-host-team.replace-license.upload']() }) }), _jsx(UploadLicenseModal, { open: openUploadModal, onOpenChange: setOpenUploadModal })] }));
};
const TypeFormLink = () => {
    const t = useI18n();
    const workspaceSubscriptionService = useService(WorkspaceSubscriptionService);
    const authService = useService(AuthService);
    const workspaceSubscription = useLiveData(workspaceSubscriptionService.subscription.subscription$);
    const account = useLiveData(authService.session.account$);
    if (!account)
        return null;
    const link = getUpgradeQuestionnaireLink({
        name: account.info?.name,
        id: account.id,
        email: account.email,
        recurring: workspaceSubscription?.recurring ?? SubscriptionRecurring.Yearly,
        plan: SubscriptionPlan.SelfHostedTeam,
    });
    return (_jsx(SettingRow, { className: styles.paymentMethod, name: t['com.affine.payment.billing-type-form.title'](), desc: t['com.affine.payment.billing-type-form.description'](), children: _jsx("a", { target: "_blank", href: link, rel: "noreferrer", children: _jsx(Button, { children: t['com.affine.payment.billing-type-form.go']() }) }) }));
};
const PaymentMethodUpdater = () => {
    const workspace = useService(WorkspaceService).workspace;
    const permission = useService(WorkspacePermissionService).permission;
    const isTeam = useLiveData(permission.isTeam$);
    const { isMutating, trigger } = useMutation({
        mutation: createSelfhostCustomerPortalMutation,
    });
    const urlService = useService(UrlService);
    const t = useI18n();
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
    if (!isTeam) {
        return null;
    }
    return (_jsx(SettingRow, { className: styles.paymentMethod, name: t['com.affine.payment.billing-setting.payment-method'](), desc: t['com.affine.payment.billing-setting.payment-method.description'](), children: _jsx(Button, { onClick: update, loading: isMutating, disabled: isMutating, children: t['com.affine.payment.billing-setting.payment-method.go']() }) }));
};
//# sourceMappingURL=index.js.map