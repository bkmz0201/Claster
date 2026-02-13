import { jsx as _jsx } from "react/jsx-runtime";
import { ServerService, SubscriptionService } from '@affine/core/modules/cloud';
import { SubscriptionPlan } from '@affine/graphql';
import { useLiveData, useServices } from '@toeverything/infra';
import clsx from 'clsx';
import { forwardRef, useEffect } from 'react';
import { tag } from './style.css';
export const UserPlanTag = forwardRef(function UserPlanTag({ className, ...attrs }, ref) {
    const { serverService, subscriptionService } = useServices({
        ServerService,
        SubscriptionService,
    });
    const hasPayment = useLiveData(serverService.server.features$.map(r => r?.payment));
    const plan = useLiveData(subscriptionService.subscription.pro$.map(subscription => subscription !== null ? subscription?.plan : null));
    const isBeliever = useLiveData(subscriptionService.subscription.isBeliever$);
    const isLoading = plan === null;
    useEffect(() => {
        // revalidate subscription to get the latest status
        subscriptionService.subscription.revalidate();
    }, [subscriptionService]);
    if (!hasPayment)
        return null;
    if (isLoading)
        return null;
    const planLabel = isBeliever ? 'Believer' : (plan ?? SubscriptionPlan.Free);
    return (_jsx("div", { ref: ref, className: clsx(tag, className), "data-is-believer": isBeliever, ...attrs, children: planLabel }));
});
//# sourceMappingURL=index.js.map