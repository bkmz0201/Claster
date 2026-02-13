import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { useEffect } from 'react';
import { SWRErrorBoundary } from '../../../../../components/pure/swr-error-bundary';
import { SubscriptionService } from '../../../../../modules/cloud';
import { AIPlan } from './ai/ai-plan';
import { CloudPlans } from './cloud-plans';
import { CloudPlanLayout, PlanLayout } from './layout';
import { PlansSkeleton } from './skeleton';
import * as styles from './style.css';
const Settings = () => {
    const subscriptionService = useService(SubscriptionService);
    const prices = useLiveData(subscriptionService.prices.prices$);
    useEffect(() => {
        subscriptionService.subscription.revalidate();
        subscriptionService.prices.revalidate();
    }, [subscriptionService]);
    if (prices === null) {
        return _jsx(PlansSkeleton, {});
    }
    return _jsx(PlanLayout, { cloud: _jsx(CloudPlans, {}), ai: _jsx(AIPlan, {}) });
};
export const AFFiNEPricingPlans = () => {
    return (_jsx(SWRErrorBoundary, { FallbackComponent: PlansErrorBoundary, children: _jsx(Settings, {}) }));
};
const PlansErrorBoundary = ({ resetErrorBoundary }) => {
    const t = useI18n();
    const scroll = (_jsxs("div", { className: styles.errorTip, children: [_jsx("span", { children: t['com.affine.payment.plans-error-tip']() }), _jsx("a", { onClick: resetErrorBoundary, className: styles.errorTipRetry, children: t['com.affine.payment.plans-error-retry']() })] }));
    return _jsx(PlanLayout, { cloud: _jsx(CloudPlanLayout, { scroll: scroll }) });
};
//# sourceMappingURL=index.js.map