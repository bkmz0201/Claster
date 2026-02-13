import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@affine/component';
import { AuthService, SubscriptionService } from '@affine/core/modules/cloud';
import { i18nTime, useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { useEffect } from 'react';
import { AICancel, AILogin, AIResume, AISubscribe } from './actions';
import { AIRedeemCodeButton } from './actions/redeem';
import * as styles from './ai-plan.css';
import { AIPlanLayout } from './layout';
export const AIPlan = () => {
    const t = useI18n();
    const authService = useService(AuthService);
    const subscriptionService = useService(SubscriptionService);
    const subscription = useLiveData(subscriptionService.subscription.ai$);
    const price = useLiveData(subscriptionService.prices.aiPrice$);
    const isLoggedIn = useLiveData(authService.session.status$) === 'authenticated';
    const isOnetime = useLiveData(subscriptionService.subscription.isOnetimeAI$);
    useEffect(() => {
        subscriptionService.subscription.revalidate();
        subscriptionService.prices.revalidate();
    }, [subscriptionService]);
    // yearly subscription should always be available
    if (!price?.yearlyAmount) {
        return null;
    }
    const billingTip = subscription?.nextBillAt
        ? t['com.affine.payment.ai.billing-tip.next-bill-at']({
            due: i18nTime(subscription.nextBillAt, {
                absolute: { accuracy: 'day' },
            }),
        })
        : subscription?.canceledAt && subscription.end
            ? t['com.affine.payment.ai.billing-tip.end-at']({
                end: i18nTime(subscription.end, {
                    absolute: { accuracy: 'day' },
                }),
            })
            : null;
    return (_jsx(AIPlanLayout, { caption: subscription
            ? t['com.affine.payment.ai.pricing-plan.caption-purchased']()
            : t['com.affine.payment.ai.pricing-plan.caption-free'](), actionButtons: isLoggedIn ? (subscription ? (isOnetime ? (_jsx(AIRedeemCodeButton, { className: styles.purchaseButton })) : subscription.canceledAt ? (_jsx(AIResume, { className: styles.purchaseButton })) : (_jsx(AICancel, { className: styles.purchaseButton }))) : (_jsxs(_Fragment, { children: [_jsx(AISubscribe, { className: styles.purchaseButton, displayedFrequency: "monthly" }), _jsx("a", { href: "https://ai.affine.pro", target: "_blank", rel: "noreferrer", children: _jsx(Button, { className: styles.learnAIButton, children: t['com.affine.payment.ai.pricing-plan.learn']() }) })] }))) : (_jsx(AILogin, { className: styles.purchaseButton })), billingTip: billingTip }));
};
//# sourceMappingURL=ai-plan.js.map