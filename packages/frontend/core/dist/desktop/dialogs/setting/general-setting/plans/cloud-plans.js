import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Switch } from '@affine/component';
import { AuthService, SubscriptionService } from '@affine/core/modules/cloud';
import { SubscriptionPlan, SubscriptionRecurring } from '@affine/graphql';
import { Trans, useI18n } from '@affine/i18n';
import { AfFiNeIcon } from '@blocksuite/icons/rc';
import { useLiveData, useServices } from '@toeverything/infra';
import { useEffect, useMemo, useRef, useState, } from 'react';
import { CloudPlanLayout } from './layout';
import { LifetimePlan } from './lifetime/lifetime-plan';
import { PlanCard } from './plan-card';
import { planTitleTitleCaption } from './style.css';
import * as styles from './style.css';
const freeBenefits = t => ({
    [t['com.affine.payment.cloud.free.benefit.g1']()]: [1, 2, 3].map(i => ({
        title: t[`com.affine.payment.cloud.free.benefit.g1-${i}`](),
    })),
    [t['com.affine.payment.cloud.free.benefit.g2']()]: [1, 2, 3, 4, 5].map(i => ({
        title: t[`com.affine.payment.cloud.free.benefit.g2-${i}`](),
    })),
});
const proBenefits = t => ({
    [t['com.affine.payment.cloud.pro.benefit.g1']()]: [
        {
            title: t['com.affine.payment.cloud.pro.benefit.g1-1'](),
            icon: _jsx(AfFiNeIcon, {}),
        },
        ...[2, 3, 4, 5, 7, 8].map(i => ({
            title: t[`com.affine.payment.cloud.pro.benefit.g1-${i}`](),
        })),
    ],
});
const teamBenefits = t => ({
    [t['com.affine.payment.cloud.team-workspace.benefit.g1']()]: [
        {
            title: t['com.affine.payment.cloud.team-workspace.benefit.g1-1'](),
            icon: _jsx(AfFiNeIcon, {}),
        },
        ...[2, 3, 4, 5, 6].map(i => ({
            title: t[`com.affine.payment.cloud.team-workspace.benefit.g1-${i}`](),
        })),
    ],
});
export function getPlanDetail(t) {
    return new Map([
        [
            SubscriptionPlan.Free,
            {
                type: 'fixed',
                plan: SubscriptionPlan.Free,
                price: '0',
                yearlyPrice: '0',
                name: t['com.affine.payment.cloud.free.name'](),
                description: t['com.affine.payment.cloud.free.description'](),
                titleRenderer: () => t['com.affine.payment.cloud.free.title'](),
                benefits: freeBenefits(t),
            },
        ],
        [
            SubscriptionPlan.Pro,
            {
                type: 'fixed',
                plan: SubscriptionPlan.Pro,
                price: '1',
                yearlyPrice: '1',
                name: t['com.affine.payment.cloud.pro.name'](),
                description: t['com.affine.payment.cloud.pro.description'](),
                titleRenderer: (recurring, detail) => {
                    const price = recurring === SubscriptionRecurring.Yearly
                        ? detail.yearlyPrice
                        : detail.price;
                    return (_jsxs(_Fragment, { children: [t['com.affine.payment.cloud.pro.title.price-monthly']({
                                price: '$' + price,
                            }), recurring === SubscriptionRecurring.Yearly ? (_jsx("span", { className: planTitleTitleCaption, children: t['com.affine.payment.cloud.pro.title.billed-yearly']() })) : null] }));
                },
                benefits: proBenefits(t),
            },
        ],
        [
            SubscriptionPlan.Team,
            {
                type: 'fixed',
                plan: SubscriptionPlan.Team,
                price: '2',
                yearlyPrice: '2',
                name: t['com.affine.payment.cloud.team-workspace.name'](),
                description: t['com.affine.payment.cloud.team-workspace.description'](),
                titleRenderer: (recurring, detail) => {
                    const price = recurring === SubscriptionRecurring.Yearly
                        ? detail.yearlyPrice
                        : detail.price;
                    return (_jsxs(_Fragment, { children: [t['com.affine.payment.cloud.team-workspace.title.price-monthly']({
                                price: '$' + price,
                            }), recurring === SubscriptionRecurring.Yearly ? (_jsx("span", { className: planTitleTitleCaption, children: t['com.affine.payment.cloud.team-workspace.title.billed-yearly']() })) : null] }));
                },
                benefits: teamBenefits(t),
            },
        ],
    ]);
}
const getRecurringLabel = ({ recurring, t, }) => {
    return recurring === SubscriptionRecurring.Monthly
        ? t['com.affine.payment.recurring-monthly']()
        : t['com.affine.payment.recurring-yearly']();
};
export const CloudPlans = () => {
    const t = useI18n();
    const scrollWrapper = useRef(null);
    const { authService, subscriptionService } = useServices({
        AuthService,
        SubscriptionService,
    });
    const prices = useLiveData(subscriptionService.prices.prices$);
    const loggedIn = useLiveData(authService.session.status$) === 'authenticated';
    const proSubscription = useLiveData(subscriptionService.subscription.pro$);
    const isOnetimePro = useLiveData(subscriptionService.subscription.isOnetimePro$);
    const [recurring, setRecurring] = useState(proSubscription?.recurring ?? SubscriptionRecurring.Yearly);
    const planDetail = useMemo(() => {
        const rawMap = getPlanDetail(t);
        const clonedMap = new Map();
        rawMap.forEach((detail, plan) => {
            clonedMap.set(plan, { ...detail });
        });
        prices?.forEach(price => {
            const detail = clonedMap.get(price.plan);
            if (detail?.type === 'fixed') {
                detail.price = ((price.amount ?? 0) / 100).toFixed(2);
                detail.yearlyPrice = ((price.yearlyAmount ?? 0) / 100 / 12).toFixed(2);
                detail.discount =
                    price.yearlyAmount && price.amount
                        ? Math.floor((1 - price.yearlyAmount / 12 / price.amount) * 100).toString()
                        : undefined;
            }
        });
        return clonedMap;
    }, [prices, t]);
    const currentPlan = proSubscription?.plan ?? SubscriptionPlan.Free;
    const isCanceled = !!proSubscription?.canceledAt;
    const currentRecurring = proSubscription?.recurring ?? SubscriptionRecurring.Monthly;
    const yearlyDiscount = planDetail.get(SubscriptionPlan.Pro)?.discount;
    // auto scroll to current plan card
    useEffect(() => {
        if (!scrollWrapper.current)
            return;
        const currentPlanCard = scrollWrapper.current.querySelector('[data-current="true"]');
        const wrapperComputedStyle = getComputedStyle(scrollWrapper.current);
        const left = currentPlanCard
            ? currentPlanCard.getBoundingClientRect().left -
                scrollWrapper.current.getBoundingClientRect().left -
                parseInt(wrapperComputedStyle.paddingLeft)
            : 0;
        const appeared = scrollWrapper.current.dataset.appeared === 'true';
        const animationFrameId = requestAnimationFrame(() => {
            if (!scrollWrapper.current)
                return;
            scrollWrapper.current.scrollTo({
                behavior: appeared ? 'smooth' : 'instant',
                left,
            });
            scrollWrapper.current.dataset.appeared = 'true';
        });
        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [recurring]);
    // caption
    const cloudCaption = loggedIn ? (isCanceled ? (_jsx("p", { children: t['com.affine.payment.subtitle-canceled']({
            plan: `${getRecurringLabel({
                recurring: currentRecurring,
                t,
            })} ${currentPlan}`,
        }) })) : (_jsx("p", { children: _jsxs(Trans, { plan: currentPlan, i18nKey: "com.affine.payment.subtitle-active", values: { currentPlan }, children: ["You are currently on the ", { currentPlan }, " plan. If you have any questions, please contact our\u00A0", _jsx("a", { href: "mailto:support@toeverything.info", style: { color: 'var(--affine-link-color)' }, children: "customer support" }), "."] }) }))) : (_jsx("p", { children: t['com.affine.payment.subtitle-not-signed-in']() }));
    // toggle
    const cloudToggle = (_jsxs("div", { className: styles.recurringToggleWrapper, children: [_jsxs("div", { children: [_jsx("div", { className: styles.recurringToggleRecurring, children: _jsx("span", { children: t['com.affine.payment.cloud.pricing-plan.toggle-billed-yearly']() }) }), yearlyDiscount ? (_jsx("div", { className: styles.recurringToggleDiscount, children: t['com.affine.payment.cloud.pricing-plan.toggle-discount']({
                            discount: yearlyDiscount,
                        }) })) : null] }), _jsx(Switch, { checked: recurring === SubscriptionRecurring.Yearly, onChange: checked => setRecurring(checked
                    ? SubscriptionRecurring.Yearly
                    : SubscriptionRecurring.Monthly) })] }));
    const cloudScroll = (_jsx("div", { className: styles.planCardsWrapper, ref: scrollWrapper, children: Array.from(planDetail.values()).map(detail => {
            return _jsx(PlanCard, { detail, recurring }, detail.plan);
        }) }));
    const cloudSelect = (_jsxs("div", { className: styles.cloudSelect, children: [_jsx("b", { children: t['com.affine.payment.cloud.pricing-plan.select.title']() }), _jsx("span", { children: t['com.affine.payment.cloud.pricing-plan.select.caption']() })] }));
    return (_jsx(CloudPlanLayout, { caption: cloudCaption, select: cloudSelect, toggle: cloudToggle, scroll: cloudScroll, scrollRef: scrollWrapper, lifetime: isOnetimePro ? null : _jsx(LifetimePlan, {}) }));
};
//# sourceMappingURL=cloud-plans.js.map