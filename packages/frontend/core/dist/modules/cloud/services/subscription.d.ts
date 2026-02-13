import { type CreateCheckoutSessionInput } from '@affine/graphql';
import { Service } from '@toeverything/infra';
import { Subscription } from '../entities/subscription';
import { SubscriptionPrices } from '../entities/subscription-prices';
import type { SubscriptionStore } from '../stores/subscription';
export declare class SubscriptionService extends Service {
    private readonly store;
    subscription: Subscription;
    prices: SubscriptionPrices;
    constructor(store: SubscriptionStore);
    createCheckoutSession(input: CreateCheckoutSessionInput): Promise<string>;
    private onAccountChanged;
}
//# sourceMappingURL=subscription.d.ts.map