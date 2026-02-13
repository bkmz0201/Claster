import type { CreateCheckoutSessionInput, SubscriptionRecurring } from '@affine/graphql';
import { SubscriptionPlan } from '@affine/graphql';
import { Store } from '@toeverything/infra';
import type { GlobalCache } from '../../storage';
import type { UrlService } from '../../url';
import type { SubscriptionType } from '../entities/subscription';
import type { GraphQLService } from '../services/graphql';
import type { ServerService } from '../services/server';
export declare class SubscriptionStore extends Store {
    private readonly gqlService;
    private readonly globalCache;
    private readonly urlService;
    private readonly serverService;
    constructor(gqlService: GraphQLService, globalCache: GlobalCache, urlService: UrlService, serverService: ServerService);
    fetchSubscriptions(abortSignal?: AbortSignal): Promise<{
        userId: string;
        subscriptions: {
            __typename?: "SubscriptionType";
            id: string | null;
            status: import("@affine/graphql").SubscriptionStatus;
            plan: SubscriptionPlan;
            recurring: SubscriptionRecurring;
            start: string;
            end: string | null;
            nextBillAt: string | null;
            canceledAt: string | null;
            variant: import("@affine/graphql").SubscriptionVariant | null;
        }[];
    }>;
    fetchWorkspaceSubscriptions(workspaceId: string, abortSignal?: AbortSignal): Promise<{
        workspaceId: string | null | undefined;
        subscription: {
            __typename?: "SubscriptionType";
            id: string | null;
            status: import("@affine/graphql").SubscriptionStatus;
            plan: SubscriptionPlan;
            recurring: SubscriptionRecurring;
            start: string;
            end: string | null;
            nextBillAt: string | null;
            canceledAt: string | null;
            variant: import("@affine/graphql").SubscriptionVariant | null;
        } | null;
    }>;
    mutateResumeSubscription(idempotencyKey: string, plan?: SubscriptionPlan, abortSignal?: AbortSignal, workspaceId?: string): Promise<{
        __typename?: "SubscriptionType";
        id: string | null;
        status: import("@affine/graphql").SubscriptionStatus;
        nextBillAt: string | null;
        start: string;
        end: string | null;
    }>;
    mutateCancelSubscription(idempotencyKey: string, plan?: SubscriptionPlan, abortSignal?: AbortSignal, workspaceId?: string): Promise<{
        __typename?: "SubscriptionType";
        id: string | null;
        status: import("@affine/graphql").SubscriptionStatus;
        nextBillAt: string | null;
        canceledAt: string | null;
    }>;
    getCachedSubscriptions(userId: string): {
        __typename?: "SubscriptionType";
        id: string | null;
        status: import("@affine/graphql").SubscriptionStatus;
        plan: SubscriptionPlan;
        recurring: SubscriptionRecurring;
        start: string;
        end: string | null;
        nextBillAt: string | null;
        canceledAt: string | null;
        variant: import("@affine/graphql").SubscriptionVariant | null;
    }[] | undefined;
    setCachedSubscriptions(userId: string, subscriptions: SubscriptionType[]): void;
    getCachedWorkspaceSubscription(workspaceId: string): {
        __typename?: "SubscriptionType";
        id: string | null;
        status: import("@affine/graphql").SubscriptionStatus;
        plan: SubscriptionPlan;
        recurring: SubscriptionRecurring;
        start: string;
        end: string | null;
        nextBillAt: string | null;
        canceledAt: string | null;
        variant: import("@affine/graphql").SubscriptionVariant | null;
    } | undefined;
    setCachedWorkspaceSubscription(workspaceId: string, subscription: SubscriptionType): void;
    setSubscriptionRecurring(idempotencyKey: string, recurring: SubscriptionRecurring, plan?: SubscriptionPlan, workspaceId?: string): Promise<import("@affine/graphql").UpdateSubscriptionMutation>;
    createCheckoutSession(input: CreateCheckoutSessionInput): Promise<string>;
    fetchSubscriptionPrices(abortSignal?: AbortSignal): Promise<{
        __typename?: "SubscriptionPrice";
        type: string;
        plan: SubscriptionPlan;
        currency: string;
        amount: number | null;
        yearlyAmount: number | null;
        lifetimeAmount: number | null;
    }[]>;
}
//# sourceMappingURL=subscription.d.ts.map