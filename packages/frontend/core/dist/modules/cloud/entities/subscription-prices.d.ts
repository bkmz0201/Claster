import { Entity, LiveData } from '@toeverything/infra';
import type { ServerService } from '../services/server';
import type { SubscriptionStore } from '../stores/subscription';
export declare class SubscriptionPrices extends Entity {
    private readonly serverService;
    private readonly store;
    prices$: LiveData<{
        __typename?: "SubscriptionPrice";
        type: string;
        plan: import("@affine/graphql").SubscriptionPlan;
        currency: string;
        amount: number | null;
        yearlyAmount: number | null;
        lifetimeAmount: number | null;
    }[] | null>;
    isRevalidating$: LiveData<boolean>;
    error$: LiveData<any>;
    proPrice$: LiveData<{
        __typename?: "SubscriptionPrice";
        type: string;
        plan: import("@affine/graphql").SubscriptionPlan;
        currency: string;
        amount: number | null;
        yearlyAmount: number | null;
        lifetimeAmount: number | null;
    } | null | undefined>;
    aiPrice$: LiveData<{
        __typename?: "SubscriptionPrice";
        type: string;
        plan: import("@affine/graphql").SubscriptionPlan;
        currency: string;
        amount: number | null;
        yearlyAmount: number | null;
        lifetimeAmount: number | null;
    } | null | undefined>;
    teamPrice$: LiveData<{
        __typename?: "SubscriptionPrice";
        type: string;
        plan: import("@affine/graphql").SubscriptionPlan;
        currency: string;
        amount: number | null;
        yearlyAmount: number | null;
        lifetimeAmount: number | null;
    } | null | undefined>;
    readableLifetimePrice$: LiveData<string>;
    constructor(serverService: ServerService, store: SubscriptionStore);
    revalidate: import("@toeverything/infra").Effect<unknown>;
}
//# sourceMappingURL=subscription-prices.d.ts.map