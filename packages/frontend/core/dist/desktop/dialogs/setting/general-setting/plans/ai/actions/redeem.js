import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from '@affine/component';
import { generateSubscriptionCallbackLink } from '@affine/core/components/hooks/affine/use-subscription-notify';
import { AuthService } from '@affine/core/modules/cloud';
import { SubscriptionPlan, SubscriptionRecurring, SubscriptionVariant, } from '@affine/graphql';
import { useI18n } from '@affine/i18n';
import track from '@affine/track';
import { useService } from '@toeverything/infra';
import { useCallback, useMemo } from 'react';
import { CheckoutSlot } from '../../checkout-slot';
export const AIRedeemCodeButton = (btnProps) => {
    const t = useI18n();
    const authService = useService(AuthService);
    const onBeforeCheckout = useCallback(() => {
        track.$.settingsPanel.plans.checkout({
            plan: SubscriptionPlan.AI,
            recurring: SubscriptionRecurring.Yearly,
        });
    }, []);
    const checkoutOptions = useMemo(() => ({
        recurring: SubscriptionRecurring.Yearly,
        plan: SubscriptionPlan.AI,
        variant: SubscriptionVariant.Onetime,
        coupon: null,
        successCallbackLink: generateSubscriptionCallbackLink(authService.session.account$.value, SubscriptionPlan.AI, SubscriptionRecurring.Yearly),
    }), [authService.session.account$.value]);
    return (_jsx(CheckoutSlot, { onBeforeCheckout: onBeforeCheckout, checkoutOptions: checkoutOptions, renderer: props => (_jsx(Button, { variant: "primary", ...btnProps, ...props, children: t['com.affine.payment.redeem-code']() })) }));
};
//# sourceMappingURL=redeem.js.map