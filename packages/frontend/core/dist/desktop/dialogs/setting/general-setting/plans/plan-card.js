import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button } from '@affine/component/ui/button';
import { Tooltip } from '@affine/component/ui/tooltip';
import { generateSubscriptionCallbackLink } from '@affine/core/components/hooks/affine/use-subscription-notify';
import { useAsyncCallback } from '@affine/core/components/hooks/affine-async-hooks';
import { AuthService, ServerService, SubscriptionService, } from '@affine/core/modules/cloud';
import { GlobalDialogService } from '@affine/core/modules/dialogs';
import { UrlService } from '@affine/core/modules/url';
import { SubscriptionPlan, SubscriptionRecurring, SubscriptionStatus, SubscriptionVariant, } from '@affine/graphql';
import { Trans, useI18n } from '@affine/i18n';
import { track } from '@affine/track';
import { DoneIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import clsx from 'clsx';
import { nanoid } from 'nanoid';
import { useCallback, useMemo, useState } from 'react';
import { CancelAction, ResumeAction } from './actions';
import { CheckoutSlot } from './checkout-slot';
import { ConfirmLoadingModal } from './modals';
import * as styles from './style.css';
export const PlanCard = (props) => {
    const { detail, recurring } = props;
    const loggedIn = useLiveData(useService(AuthService).session.status$) === 'authenticated';
    const subscriptionService = useService(SubscriptionService);
    const proSubscription = useLiveData(subscriptionService.subscription.pro$);
    const currentPlan = proSubscription?.plan ?? SubscriptionPlan.Free;
    const isCurrent = loggedIn &&
        detail.plan === currentPlan &&
        recurring === proSubscription?.recurring;
    const isPro = detail.plan === SubscriptionPlan.Pro;
    return (_jsxs("div", { "data-current": isCurrent, className: isPro ? styles.proPlanCard : styles.planCard, children: [_jsx("div", { className: styles.planCardBorderMock }), _jsxs("div", { className: styles.planTitle, children: [_jsxs("div", { style: { paddingBottom: 12 }, children: [_jsx("section", { className: styles.planTitleName, children: detail.name }), _jsx("section", { className: styles.planTitleDescription, children: detail.description }), _jsx("section", { className: styles.planTitleTitle, children: detail.titleRenderer(recurring, detail) })] }), _jsx(ActionButton, { ...props })] }), _jsx("div", { className: styles.planBenefits, children: Object.entries(detail.benefits).map(([groupName, benefitList]) => {
                    return (_jsxs("ul", { className: styles.planBenefitGroup, children: [_jsxs("section", { className: styles.planBenefitGroupTitle, children: [groupName, ":"] }), benefitList.map(({ icon, title }, index) => {
                                return (_jsxs("li", { className: styles.planBenefit, children: [_jsx("div", { className: styles.planBenefitIcon, children: icon ?? _jsx(DoneIcon, {}) }), _jsx("div", { className: styles.planBenefitText, children: title })] }, index));
                            })] }, groupName));
                }) })] }, detail.plan));
};
const getSignUpText = (plan, t) => {
    switch (plan) {
        case SubscriptionPlan.Free:
            return t['com.affine.payment.sign-up-free']();
        case SubscriptionPlan.Team:
            return t['com.affine.payment.upgrade']();
        default:
            return t['com.affine.payment.buy-pro']();
    }
};
const ActionButton = ({ detail, recurring }) => {
    const t = useI18n();
    const loggedIn = useLiveData(useService(AuthService).session.status$) === 'authenticated';
    const subscriptionService = useService(SubscriptionService);
    const isBeliever = useLiveData(subscriptionService.subscription.isBeliever$);
    const primarySubscription = useLiveData(subscriptionService.subscription.pro$);
    const currentPlan = primarySubscription?.plan ?? SubscriptionPlan.Free;
    const currentRecurring = primarySubscription?.recurring;
    const isOnetime = useLiveData(subscriptionService.subscription.isOnetimePro$);
    const isFree = detail.plan === SubscriptionPlan.Free;
    const signUpText = useMemo(() => getSignUpText(detail.plan, t), [detail.plan, t]);
    // branches:
    //  if contact                                => 'Contact Sales'
    //  if not signed in:
    //    if free                                 => 'Sign up free'
    //    if team                                 => 'Upgrade'
    //    else                                    => 'Buy Pro'
    //  else
    //    if team                                 => 'Start 14-day free trial'
    //    if isBeliever                           => 'Included in Lifetime'
    //    if onetime
    //      if free                               => 'Included in Pro'
    //      else                                  => 'Redeem Code'
    //    if isCurrent
    //      if canceled                           => 'Resume'
    //      else                                  => 'Current Plan'
    //    if free                                 => 'Downgrade'
    //    if currentRecurring !== recurring       => 'Change to {recurring} Billing'
    //    else                                    => 'Upgrade'
    // team
    if (detail.plan === SubscriptionPlan.Team) {
        return _jsx(UpgradeToTeam, { recurring: recurring });
    }
    // not signed in
    if (!loggedIn) {
        return _jsx(SignUpAction, { children: signUpText });
    }
    // lifetime
    if (isBeliever) {
        return (_jsx(Button, { className: styles.planAction, disabled: true, children: t['com.affine.payment.cloud.lifetime.included']() }));
    }
    // onetime
    if (isOnetime) {
        return isFree ? (_jsx(Button, { className: styles.planAction, disabled: true, children: t['com.affine.payment.cloud.onetime.included']() })) : (_jsx(RedeemCode, { recurring: recurring }));
    }
    const isCanceled = !!primarySubscription?.canceledAt;
    const isCurrent = detail.plan === currentPlan &&
        (isFree
            ? true
            : currentRecurring === recurring &&
                primarySubscription?.status === SubscriptionStatus.Active);
    // is current
    if (isCurrent) {
        return isCanceled ? _jsx(ResumeButton, {}) : _jsx(CurrentPlan, {});
    }
    if (isFree) {
        return _jsx(Downgrade, { disabled: isCanceled });
    }
    return currentPlan === detail.plan ? (_jsx(ChangeRecurring, { from: currentRecurring, to: recurring, due: primarySubscription?.nextBillAt || '', disabled: isCanceled })) : (_jsx(Upgrade, { recurring: recurring, plan: SubscriptionPlan.Pro }));
};
const CurrentPlan = () => {
    const t = useI18n();
    return (_jsx(Button, { className: styles.planAction, children: t['com.affine.payment.current-plan']() }));
};
const Downgrade = ({ disabled }) => {
    const t = useI18n();
    const [open, setOpen] = useState(false);
    const tooltipContent = disabled
        ? t['com.affine.payment.downgraded-tooltip']()
        : null;
    const handleClick = useCallback(() => {
        setOpen(true);
    }, []);
    return (_jsx(CancelAction, { open: open, onOpenChange: setOpen, children: _jsx(Tooltip, { content: tooltipContent, rootOptions: { delayDuration: 0 }, children: _jsx("div", { className: styles.planAction, children: _jsx(Button, { className: styles.planAction, variant: "primary", onClick: handleClick, disabled: disabled, children: t['com.affine.payment.downgrade']() }) }) }) }));
};
const UpgradeToTeam = ({ recurring }) => {
    const t = useI18n();
    const serverService = useService(ServerService);
    const urlService = useService(UrlService);
    const url = `${serverService.server.baseUrl}/upgrade-to-team?recurring=${recurring}`;
    const scheme = urlService.getClientScheme();
    const urlParams = new URLSearchParams();
    if (scheme) {
        urlParams.set('client', scheme);
    }
    return (_jsx("a", { className: styles.planAction, href: `${url}${urlParams.toString() ? `&${urlParams.toString()}` : ''}`, target: "_blank", rel: "noreferrer", children: _jsx(Button, { className: styles.planAction, variant: "primary", "data-event-args-url": `${url}${urlParams.toString() ? `&${urlParams.toString()}` : ''}`, children: t['com.affine.payment.upgrade']() }) }));
};
export const Upgrade = ({ className, recurring, plan, workspaceId, children, checkoutInput, onCheckoutSuccess, onBeforeCheckout, ...btnProps }) => {
    const t = useI18n();
    const authService = useService(AuthService);
    const urlService = useService(UrlService);
    const schema = urlService.getClientScheme();
    const handleBeforeCheckout = useCallback(() => {
        track.$.settingsPanel.plans.checkout({
            plan: plan,
            recurring: recurring,
        });
        onBeforeCheckout?.();
    }, [onBeforeCheckout, plan, recurring]);
    const checkoutOptions = useMemo(() => ({
        recurring,
        plan: plan,
        variant: null,
        coupon: null,
        successCallbackLink: generateSubscriptionCallbackLink(authService.session.account$.value, plan, recurring, workspaceId || '', schema),
        ...checkoutInput,
    }), [
        authService.session.account$.value,
        checkoutInput,
        plan,
        recurring,
        schema,
        workspaceId,
    ]);
    return (_jsx(CheckoutSlot, { onBeforeCheckout: handleBeforeCheckout, checkoutOptions: checkoutOptions, onCheckoutSuccess: onCheckoutSuccess, renderer: props => (_jsx(Button, { className: clsx(styles.planAction, className), variant: "primary", ...props, ...btnProps, children: children ?? t['com.affine.payment.upgrade']() })) }));
};
const ChangeRecurring = ({ from, to, disabled, due, }) => {
    const t = useI18n();
    const [open, setOpen] = useState(false);
    const [isMutating, setIsMutating] = useState(false);
    // allow replay request on network error until component unmount or success
    const [idempotencyKey, setIdempotencyKey] = useState(nanoid());
    const subscription = useService(SubscriptionService).subscription;
    const onStartChange = useCallback(() => {
        track.$.settingsPanel.plans.changeSubscriptionRecurring({
            plan: SubscriptionPlan.Pro,
            recurring: to,
        });
        setOpen(true);
    }, [to]);
    const change = useAsyncCallback(async () => {
        setIsMutating(true);
        await subscription.setSubscriptionRecurring(idempotencyKey, to);
        setIdempotencyKey(nanoid());
        setIsMutating(false);
    }, [subscription, to, idempotencyKey]);
    const changeCurringContent = (_jsxs(Trans, { values: { from, to, due }, className: styles.downgradeContent, children: ["You are changing your ", _jsx("span", { className: styles.textEmphasis, children: from }), ' ', "subscription to ", _jsx("span", { className: styles.textEmphasis, children: to }), ' ', "subscription. This change will take effect in the next billing cycle, with an effective date of", ' ', _jsx("span", { className: styles.textEmphasis, children: new Date(due).toLocaleDateString() }), "."] }));
    return (_jsxs(_Fragment, { children: [_jsx(Button, { className: styles.planAction, variant: "primary", onClick: onStartChange, disabled: disabled || isMutating, loading: isMutating, children: t['com.affine.payment.change-to']({ to }) }), _jsx(ConfirmLoadingModal, { type: 'change', loading: isMutating, open: open, onConfirm: change, onOpenChange: setOpen, content: changeCurringContent })] }));
};
export const SignUpAction = ({ children, className, }) => {
    const globalDialogService = useService(GlobalDialogService);
    const onClickSignIn = useCallback(() => {
        globalDialogService.open('sign-in', {});
    }, [globalDialogService]);
    return (_jsx(Button, { onClick: onClickSignIn, className: clsx(styles.planAction, className), variant: "primary", children: children }));
};
const ResumeButton = () => {
    const t = useI18n();
    const [open, setOpen] = useState(false);
    const subscription = useService(SubscriptionService).subscription;
    const handleClick = useCallback(() => {
        setOpen(true);
        const pro = subscription.pro$.value;
        if (pro) {
            track.$.settingsPanel.plans.resumeSubscription({
                plan: SubscriptionPlan.Pro,
                recurring: pro.recurring,
            });
        }
    }, [subscription.pro$.value]);
    return (_jsx(ResumeAction, { open: open, onOpenChange: setOpen, children: _jsxs(Button, { className: styles.resumeAction, onClick: handleClick, children: [_jsx("span", { "data-show-hover": "true", className: clsx(styles.resumeContent), children: t['com.affine.payment.resume-renewal']() }), _jsx("span", { "data-show-hover": "false", className: clsx(styles.resumeContent), children: t['com.affine.payment.current-plan']() })] }) }));
};
const redeemCodeCheckoutInput = { variant: SubscriptionVariant.Onetime };
export const RedeemCode = ({ className, recurring = SubscriptionRecurring.Yearly, plan, children, ...btnProps }) => {
    const t = useI18n();
    return (_jsx(Upgrade, { recurring: recurring, className: className, checkoutInput: redeemCodeCheckoutInput, plan: plan ?? SubscriptionPlan.Pro, ...btnProps, children: children ?? t['com.affine.payment.redeem-code']() }));
};
//# sourceMappingURL=plan-card.js.map