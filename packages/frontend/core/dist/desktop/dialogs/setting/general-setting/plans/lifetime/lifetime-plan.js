import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@affine/component';
import { AuthService, SubscriptionService } from '@affine/core/modules/cloud';
import { SubscriptionPlan, SubscriptionRecurring } from '@affine/graphql';
import { Trans, useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { SignUpAction, Upgrade } from '../plan-card';
import { BelieverCard } from './believer-card';
import { BelieverBenefits } from './benefits';
import * as styles from './style.css';
export const LifetimePlan = () => {
    const t = useI18n();
    const subscriptionService = useService(SubscriptionService);
    const loggedIn = useLiveData(useService(AuthService).session.status$) === 'authenticated';
    const readableLifetimePrice = useLiveData(subscriptionService.prices.readableLifetimePrice$);
    const isBeliever = useLiveData(subscriptionService.subscription.isBeliever$);
    if (!readableLifetimePrice)
        return null;
    return (_jsxs(BelieverCard, { type: 1, children: [_jsx("div", { className: styles.caption1, children: t['com.affine.payment.lifetime.caption-1']() }), _jsx("div", { className: styles.title, children: t['com.affine.payment.lifetime.title']() }), _jsx("div", { className: styles.price, children: readableLifetimePrice }), !loggedIn ? (_jsx(SignUpAction, { className: styles.purchase, children: t['com.affine.payment.sign-up-free']() })) : isBeliever ? (_jsx(Button, { className: styles.purchase, size: "default", disabled: true, children: t['com.affine.payment.lifetime.purchased']() })) : (_jsx(Upgrade, { className: styles.purchase, recurring: SubscriptionRecurring.Lifetime, plan: SubscriptionPlan.Pro, children: t['com.affine.payment.lifetime.purchase']() })), _jsx("div", { className: styles.caption2, children: _jsx(Trans, { i18nKey: "com.affine.payment.lifetime.caption-2", components: {
                        a: _jsx("a", { className: styles.userPolicyLink, href: "#" }),
                    } }) }), _jsx(BelieverBenefits, { style: { padding: '8px 6px' } })] }));
};
//# sourceMappingURL=lifetime-plan.js.map