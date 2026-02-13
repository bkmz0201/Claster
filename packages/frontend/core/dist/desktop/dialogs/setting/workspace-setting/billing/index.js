import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, Loading } from '@affine/component';
import { SettingHeader, SettingRow, SettingWrapper, } from '@affine/component/setting-components';
import { WorkspaceSubscriptionService } from '@affine/core/modules/cloud';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback, useEffect, useState } from 'react';
import { TeamResumeAction } from '../../general-setting/plans/actions';
import { BillingHistory } from './billing-history';
import { PaymentMethodUpdater } from './payment-method';
import { TeamCard } from './team-card';
import { TypeformLink } from './typeform-link';
export const WorkspaceSettingBilling = () => {
    const workspace = useService(WorkspaceService).workspace;
    const t = useI18n();
    const subscriptionService = workspace?.scope.get(WorkspaceSubscriptionService);
    const subscription = useLiveData(subscriptionService?.subscription.subscription$);
    useEffect(() => {
        subscriptionService?.subscription.revalidate();
    }, [subscriptionService?.subscription]);
    if (workspace === null) {
        return null;
    }
    if (!subscription) {
        return _jsx(Loading, {});
    }
    return (_jsxs(_Fragment, { children: [_jsx(SettingHeader, { title: t['com.affine.payment.billing-setting.title'](), subtitle: t['com.affine.payment.billing-setting.subtitle']() }), _jsxs(SettingWrapper, { title: t['com.affine.payment.billing-setting.information'](), children: [_jsx(TeamCard, {}), _jsx(TypeformLink, {}), _jsx(PaymentMethodUpdater, {}), subscription?.end && subscription.canceledAt ? (_jsx(ResumeSubscription, { expirationDate: subscription.end })) : null] }), _jsx(SettingWrapper, { title: t['com.affine.payment.billing-setting.history'](), children: _jsx(BillingHistory, {}) })] }));
};
const ResumeSubscription = ({ expirationDate }) => {
    const t = useI18n();
    const [open, setOpen] = useState(false);
    const handleClick = useCallback(() => {
        setOpen(true);
    }, []);
    return (_jsx(SettingRow, { name: t['com.affine.payment.billing-setting.expiration-date'](), desc: t['com.affine.payment.billing-setting.expiration-date.description']({
            expirationDate: new Date(expirationDate).toLocaleDateString(),
        }), children: _jsx(TeamResumeAction, { open: open, onOpenChange: setOpen, children: _jsx(Button, { onClick: handleClick, variant: "primary", children: t['com.affine.payment.billing-setting.resume-subscription']() }) }) }));
};
//# sourceMappingURL=index.js.map