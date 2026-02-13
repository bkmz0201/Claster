import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Skeleton } from '@affine/component';
import { SettingHeader, SettingWrapper, } from '@affine/component/setting-components';
import { SubscriptionService } from '@affine/core/modules/cloud';
import { useI18n } from '@affine/i18n';
import { track } from '@affine/track';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback, useEffect } from 'react';
import { AIPlanCard } from './ai-plan-card';
import { BelieverIdentifier } from './biliever-identifier';
import { BillingHistory } from './billing-history';
import { PaymentMethod } from './payment-method';
import { ProPlanCard } from './pro-plan-card';
import * as styles from './style.css';
import { TypeformLink } from './typeform-link';
export const BillingSettings = ({ onChangeSettingState, }) => {
    const t = useI18n();
    return (_jsxs(_Fragment, { children: [_jsx(SettingHeader, { title: t['com.affine.payment.billing-setting.title'](), subtitle: t['com.affine.payment.billing-setting.subtitle']() }), _jsx(SettingWrapper, { title: t['com.affine.payment.billing-setting.information'](), children: _jsx(SubscriptionSettings, { onChangeSettingState: onChangeSettingState }) }), _jsx(SettingWrapper, { title: t['com.affine.payment.billing-setting.history'](), children: _jsx(BillingHistory, {}) })] }));
};
const SubscriptionSettings = ({ onChangeSettingState, }) => {
    const subscriptionService = useService(SubscriptionService);
    useEffect(() => {
        subscriptionService.subscription.revalidate();
        subscriptionService.prices.revalidate();
    }, [subscriptionService]);
    const proSubscription = useLiveData(subscriptionService.subscription.pro$);
    const isBeliever = useLiveData(subscriptionService.subscription.isBeliever$);
    const openPlans = useCallback((scrollAnchor) => {
        track.$.settingsPanel.billing.viewPlans();
        onChangeSettingState({
            activeTab: 'plans',
            scrollAnchor: scrollAnchor,
        });
    }, [onChangeSettingState]);
    const gotoCloudPlansSetting = useCallback(() => openPlans('cloudPricingPlan'), [openPlans]);
    const gotoAiPlanSetting = useCallback(() => openPlans('aiPricingPlan'), [openPlans]);
    return (_jsxs("div", { className: styles.subscription, children: [_jsx(AIPlanCard, { onClick: gotoAiPlanSetting }), proSubscription !== null ? (isBeliever ? (_jsx(BelieverIdentifier, { onOpenPlans: gotoCloudPlansSetting })) : (_jsx(ProPlanCard, { gotoCloudPlansSetting: gotoCloudPlansSetting }))) : (_jsx(SubscriptionSettingSkeleton, {})), _jsx(TypeformLink, {}), proSubscription !== null ? (proSubscription && _jsx(PaymentMethod, {})) : (_jsx(SubscriptionSettingSkeleton, {}))] }));
};
const SubscriptionSettingSkeleton = () => {
    const t = useI18n();
    return (_jsx(SettingWrapper, { title: t['com.affine.payment.billing-setting.information'](), children: _jsxs("div", { className: styles.subscriptionSettingSkeleton, children: [_jsx(Skeleton, { variant: "rounded", height: "104px" }), _jsx(Skeleton, { variant: "rounded", height: "46px" })] }) }));
};
//# sourceMappingURL=index.js.map