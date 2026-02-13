import { SubscriptionPlan, SubscriptionRecurring, SubscriptionVariant, } from '@affine/graphql';
import { catchErrorInto, effect, Entity, exhaustMapSwitchUntilChanged, fromPromise, LiveData, onComplete, onStart, smartRetry, } from '@toeverything/infra';
import { map, tap } from 'rxjs';
export class Subscription extends Entity {
    constructor(authService, serverService, store) {
        super();
        this.authService = authService;
        this.serverService = serverService;
        this.store = store;
        // undefined means no user, null means loading
        this.subscription$ = new LiveData(null);
        this.isRevalidating$ = new LiveData(false);
        this.error$ = new LiveData(null);
        this.pro$ = this.subscription$.map(subscriptions => subscriptions
            ? subscriptions.find(sub => sub.plan === SubscriptionPlan.Pro)
            : null);
        this.ai$ = this.subscription$.map(subscriptions => subscriptions
            ? subscriptions.find(sub => sub.plan === SubscriptionPlan.AI)
            : null);
        this.isBeliever$ = this.pro$.map(sub => sub?.recurring === SubscriptionRecurring.Lifetime);
        this.isOnetimePro$ = this.pro$.map(sub => sub?.variant === SubscriptionVariant.Onetime);
        this.isOnetimeAI$ = this.ai$.map(sub => sub?.variant === SubscriptionVariant.Onetime);
        this.revalidate = effect(map(() => ({
            accountId: this.authService.session.account$.value?.id,
        })), exhaustMapSwitchUntilChanged((a, b) => a.accountId === b.accountId, ({ accountId }) => {
            return fromPromise(async (signal) => {
                if (!accountId) {
                    return undefined; // no subscription if no user
                }
                const serverConfig = await this.serverService.server.features$.waitForNonNull(signal);
                if (!serverConfig.payment) {
                    // No payment feature, no subscription
                    return {
                        userId: accountId,
                        subscriptions: [],
                    };
                }
                const { userId, subscriptions } = await this.store.fetchSubscriptions(signal);
                if (userId !== accountId) {
                    // The user has changed, ignore the result
                    this.authService.session.revalidate();
                    await this.authService.session.waitForRevalidation();
                    return null;
                }
                return {
                    userId: userId,
                    subscriptions: subscriptions,
                };
            }).pipe(smartRetry(), tap(data => {
                if (data) {
                    this.store.setCachedSubscriptions(data.userId, data.subscriptions);
                    this.subscription$.next(data.subscriptions);
                }
                else {
                    this.subscription$.next(undefined);
                }
            }), catchErrorInto(this.error$), onStart(() => this.isRevalidating$.next(true)), onComplete(() => this.isRevalidating$.next(false)));
        }, ({ accountId }) => {
            this.reset();
            if (!accountId) {
                this.subscription$.next(null);
            }
            else {
                this.subscription$.next(this.store.getCachedSubscriptions(accountId));
            }
        }));
    }
    async resumeSubscription(idempotencyKey, plan) {
        await this.store.mutateResumeSubscription(idempotencyKey, plan);
        await this.waitForRevalidation();
    }
    async cancelSubscription(idempotencyKey, plan) {
        await this.store.mutateCancelSubscription(idempotencyKey, plan);
        await this.waitForRevalidation();
    }
    async setSubscriptionRecurring(idempotencyKey, recurring, plan) {
        await this.store.setSubscriptionRecurring(idempotencyKey, recurring, plan);
        await this.waitForRevalidation();
    }
    async waitForRevalidation(signal) {
        this.revalidate();
        await this.isRevalidating$.waitFor(isRevalidating => !isRevalidating, signal);
    }
    reset() {
        this.subscription$.next(null);
        this.isRevalidating$.next(false);
        this.error$.next(null);
    }
    dispose() {
        this.revalidate.unsubscribe();
    }
}
//# sourceMappingURL=subscription.js.map