import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@affine/component';
import { SettingRow } from '@affine/component/setting-components';
import { SubscriptionService } from '@affine/core/modules/cloud';
import { SubscriptionPlan, SubscriptionRecurring, SubscriptionStatus, } from '@affine/graphql';
import { i18nTime, Trans, useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { useEffect } from 'react';
import { RedeemCode } from '../plans/plan-card';
import { CardNameLabelRow } from './card-name-label-row';
import { PaymentMethodUpdater } from './payment-method';
import * as styles from './style.css';
const DescriptionI18NKey = {
    Basic: 'com.affine.payment.billing-setting.current-plan.description',
    Monthly: 'com.affine.payment.billing-setting.current-plan.description.monthly',
    Yearly: 'com.affine.payment.billing-setting.current-plan.description.yearly',
    Lifetime: 'com.affine.payment.billing-setting.current-plan.description.lifetime',
};
const getMessageKey = (plan, recurring) => {
    if (plan !== SubscriptionPlan.Pro) {
        return DescriptionI18NKey.Basic;
    }
    return DescriptionI18NKey[recurring];
};
export const ProPlanCard = ({ gotoCloudPlansSetting, }) => {
    const t = useI18n();
    const subscriptionService = useService(SubscriptionService);
    useEffect(() => {
        subscriptionService.subscription.revalidate();
        subscriptionService.prices.revalidate();
    }, [subscriptionService]);
    const proSubscription = useLiveData(subscriptionService.subscription.pro$);
    const proPrice = useLiveData(subscriptionService.prices.proPrice$);
    const currentPlan = proSubscription?.plan ?? SubscriptionPlan.Free;
    const currentRecurring = proSubscription?.recurring ?? SubscriptionRecurring.Monthly;
    const amount = proSubscription
        ? proPrice
            ? proSubscription.recurring === SubscriptionRecurring.Monthly
                ? String((proPrice.amount ?? 0) / 100)
                : String((proPrice.yearlyAmount ?? 0) / 100)
            : '?'
        : '0';
    return (_jsxs("div", { className: styles.planCard, children: [_jsx("div", { className: styles.currentPlan, children: _jsx(SettingRow, { spreadCol: false, name: _jsx(CardNameLabelRow, { cardName: t['com.affine.payment.billing-setting.current-plan'](), status: proSubscription?.status }), desc: _jsxs(_Fragment, { children: [_jsx(Trans, { i18nKey: getMessageKey(currentPlan, currentRecurring), values: {
                                    planName: currentPlan,
                                }, components: {
                                    1: (_jsx("span", { onClick: gotoCloudPlansSetting, className: styles.currentPlanName })),
                                } }), _jsx(CloudExpirationInfo, {}), _jsx(PlanAction, { plan: currentPlan, subscriptionStatus: proSubscription?.status, gotoPlansSetting: gotoCloudPlansSetting })] }) }) }), _jsxs("p", { className: styles.planPrice, children: ["$", amount, _jsxs("span", { className: styles.billingFrequency, children: ["/", currentRecurring === SubscriptionRecurring.Monthly
                                ? t['com.affine.payment.billing-setting.month']()
                                : t['com.affine.payment.billing-setting.year']()] })] })] }));
};
const CloudExpirationInfo = () => {
    const t = useI18n();
    const subscriptionService = useService(SubscriptionService);
    const subscription = useLiveData(subscriptionService.subscription.pro$);
    let text = '';
    if (subscription?.status === SubscriptionStatus.PastDue) {
        text = t['com.affine.payment.billing-tip.past-due']({
            due: i18nTime(subscription.nextBillAt, {
                absolute: { accuracy: 'day' },
            }),
        });
    }
    else if (subscription?.nextBillAt) {
        text = t['com.affine.payment.billing-setting.renew-date.description']({
            renewDate: i18nTime(subscription.nextBillAt, {
                absolute: { accuracy: 'day' },
            }),
        });
    }
    else if (subscription?.end) {
        text = t['com.affine.payment.billing-setting.due-date.description']({
            dueDate: i18nTime(subscription.end, {
                absolute: { accuracy: 'day' },
            }),
        });
    }
    return text ? (_jsxs(_Fragment, { children: [_jsx("br", {}), text] })) : null;
};
const PlanAction = ({ plan, subscriptionStatus, gotoPlansSetting, }) => {
    const t = useI18n();
    const subscription = useService(SubscriptionService).subscription;
    const isOnetimePro = useLiveData(subscription.isOnetimePro$);
    if (isOnetimePro) {
        return _jsx(RedeemCode, { variant: "primary", className: styles.planAction });
    }
    return (_jsxs("div", { className: styles.planActionContainer, children: [_jsx(Button, { className: styles.planAction, variant: subscriptionStatus === SubscriptionStatus.PastDue
                    ? 'secondary'
                    : 'primary', onClick: gotoPlansSetting, children: plan === SubscriptionPlan.Pro
                    ? t['com.affine.payment.billing-setting.change-plan']()
                    : t['com.affine.payment.billing-setting.upgrade']() }), subscriptionStatus === SubscriptionStatus.PastDue ? (_jsx(PaymentMethodUpdater, { inCardView: true, className: styles.managementInCard, variant: "primary" })) : null] }));
};
//# sourceMappingURL=pro-plan-card.js.map