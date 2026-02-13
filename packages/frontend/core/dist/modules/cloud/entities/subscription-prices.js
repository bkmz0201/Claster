import { catchErrorInto, effect, Entity, fromPromise, LiveData, mapInto, onComplete, onStart, smartRetry, } from '@toeverything/infra';
import { exhaustMap } from 'rxjs';
export class SubscriptionPrices extends Entity {
    constructor(serverService, store) {
        super();
        this.serverService = serverService;
        this.store = store;
        this.prices$ = new LiveData(null);
        this.isRevalidating$ = new LiveData(false);
        this.error$ = new LiveData(null);
        this.proPrice$ = this.prices$.map(prices => prices ? prices.find(price => price.plan === 'Pro') : null);
        this.aiPrice$ = this.prices$.map(prices => prices ? prices.find(price => price.plan === 'AI') : null);
        this.teamPrice$ = this.prices$.map(prices => prices ? prices.find(price => price.plan === 'Team') : null);
        this.readableLifetimePrice$ = this.proPrice$.map(price => price?.lifetimeAmount
            ? `$${(price.lifetimeAmount / 100).toFixed(2).replace(/\.0+$/, '')}`
            : '');
        this.revalidate = effect(exhaustMap(() => {
            return fromPromise(async (signal) => {
                const serverConfig = this.serverService.server.features$.value;
                if (!serverConfig.payment) {
                    // No payment feature, no subscription
                    return [];
                }
                return this.store.fetchSubscriptionPrices(signal);
            }).pipe(smartRetry(), mapInto(this.prices$), catchErrorInto(this.error$), onStart(() => this.isRevalidating$.next(true)), onComplete(() => this.isRevalidating$.next(false)));
        }));
    }
}
//# sourceMappingURL=subscription-prices.js.map