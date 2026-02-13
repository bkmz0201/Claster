import { SubscriptionPlan, type SubscriptionQuery, SubscriptionRecurring, SubscriptionVariant } from '@affine/graphql';
import { Entity, LiveData } from '@toeverything/infra';
import type { AuthService } from '../services/auth';
import type { ServerService } from '../services/server';
import type { SubscriptionStore } from '../stores/subscription';
export type SubscriptionType = NonNullable<SubscriptionQuery['currentUser']>['subscriptions'][number];
export declare class Subscription extends Entity {
    private readonly authService;
    private readonly serverService;
    private readonly store;
    subscription$: LiveData<{
        __typename?: "SubscriptionType";
        id: string | null;
        status: import("@affine/graphql").SubscriptionStatus;
        plan: SubscriptionPlan;
        recurring: SubscriptionRecurring;
        start: string;
        end: string | null;
        nextBillAt: string | null;
        canceledAt: string | null;
        variant: SubscriptionVariant | null;
    }[] | null | undefined>;
    isRevalidating$: LiveData<boolean>;
    error$: LiveData<any>;
    pro$: LiveData<{
        __typename?: "SubscriptionType";
        id: string | null;
        status: import("@affine/graphql").SubscriptionStatus;
        plan: SubscriptionPlan;
        recurring: SubscriptionRecurring;
        start: string;
        end: string | null;
        nextBillAt: string | null;
        canceledAt: string | null;
        variant: SubscriptionVariant | null;
    } | null | undefined>;
    ai$: LiveData<{
        __typename?: "SubscriptionType";
        id: string | null;
        status: import("@affine/graphql").SubscriptionStatus;
        plan: SubscriptionPlan;
        recurring: SubscriptionRecurring;
        start: string;
        end: string | null;
        nextBillAt: string | null;
        canceledAt: string | null;
        variant: SubscriptionVariant | null;
    } | null | undefined>;
    isBeliever$: LiveData<boolean>;
    isOnetimePro$: LiveData<boolean>;
    isOnetimeAI$: LiveData<boolean>;
    constructor(authService: AuthService, serverService: ServerService, store: SubscriptionStore);
    resumeSubscription(idempotencyKey: string, plan?: SubscriptionPlan): Promise<void>;
    cancelSubscription(idempotencyKey: string, plan?: SubscriptionPlan): Promise<void>;
    setSubscriptionRecurring(idempotencyKey: string, recurring: SubscriptionRecurring, plan?: SubscriptionPlan): Promise<void>;
    waitForRevalidation(signal?: AbortSignal): Promise<void>;
    revalidate: import("@toeverything/infra").Effect<unknown>;
    reset(): void;
    dispose(): void;
}
//# sourceMappingURL=subscription.d.ts.map