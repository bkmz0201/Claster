import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Skeleton } from '@affine/component';
import { SettingRow } from '@affine/component/setting-components';
import { SubscriptionService } from '@affine/core/modules/cloud';
import { SubscriptionStatus } from '@affine/graphql';
import { i18nTime, Trans, useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { useEffect, useMemo } from 'react';
import { AICancel, AIResume, AISubscribe } from '../plans/ai/actions';
import { AIRedeemCodeButton } from '../plans/ai/actions/redeem';
import { CardNameLabelRow } from './card-name-label-row';
import { PaymentMethodUpdater } from './payment-method';
import * as styles from './style.css';
export const AIPlanCard = ({ onClick }) => {
    const t = useI18n();
    const subscriptionService = useService(SubscriptionService);
    useEffect(() => {
        subscriptionService.subscription.revalidate();
        subscriptionService.prices.revalidate();
    }, [subscriptionService]);
    const price = useLiveData(subscriptionService.prices.aiPrice$);
    const subscription = useLiveData(subscriptionService.subscription.ai$);
    const isOnetime = useLiveData(subscriptionService.subscription.isOnetimeAI$);
    const priceReadable = price?.yearlyAmount
        ? `$${(price.yearlyAmount / 100).toFixed(2)}`
        : '?';
    const priceFrequency = t['com.affine.payment.billing-setting.year']();
    const billingTip = useMemo(() => {
        if (subscription === undefined) {
            return (_jsx(Trans, { i18nKey: 'com.affine.payment.billing-setting.ai.free-desc', components: {
                    a: _jsx("span", { onClick: onClick, className: styles.currentPlanName }),
                } }));
        }
        if (subscription?.status === SubscriptionStatus.PastDue) {
            return t['com.affine.payment.billing-tip.past-due']({
                due: i18nTime(subscription.nextBillAt, {
                    absolute: { accuracy: 'day' },
                }),
            });
        }
        if (subscription?.nextBillAt) {
            return t['com.affine.payment.ai.billing-tip.next-bill-at']({
                due: i18nTime(subscription.nextBillAt, {
                    absolute: { accuracy: 'day' },
                }),
            });
        }
        if ((isOnetime || subscription?.canceledAt) && subscription?.end) {
            return t['com.affine.payment.ai.billing-tip.end-at']({
                end: i18nTime(subscription.end, { absolute: { accuracy: 'day' } }),
            });
        }
        return null;
    }, [subscription, isOnetime, onClick, t]);
    if (subscription === null) {
        return _jsx(Skeleton, { height: 100 });
    }
    return (_jsxs("div", { className: styles.planCard, style: { marginBottom: 24 }, children: [_jsx("div", { className: styles.currentPlan, children: _jsx(SettingRow, { spreadCol: false, name: _jsx(CardNameLabelRow, { cardName: t['com.affine.payment.billing-setting.ai-plan'](), status: subscription?.status }), desc: _jsxs(_Fragment, { children: [billingTip, _jsxs("div", { className: styles.planActionContainer, children: [price?.yearlyAmount ? (subscription ? (isOnetime ? (_jsx(AIRedeemCodeButton, { className: styles.planAction })) : subscription.canceledAt ? (_jsx(AIResume, { className: styles.planAction })) : (_jsx(AICancel, { className: styles.planAction }))) : (_jsx(AISubscribe, { className: styles.planAction, children: t['com.affine.payment.billing-setting.ai.start-free-trial']() }))) : null, subscription?.status === SubscriptionStatus.PastDue ? (_jsx(PaymentMethodUpdater, { inCardView: true, className: styles.managementInCard, variant: "primary" })) : null] })] }) }) }), _jsxs("p", { className: styles.planPrice, children: [subscription ? priceReadable : '$0', _jsxs("span", { className: styles.billingFrequency, children: ["/", priceFrequency] })] })] }));
};
//# sourceMappingURL=ai-plan-card.js.map