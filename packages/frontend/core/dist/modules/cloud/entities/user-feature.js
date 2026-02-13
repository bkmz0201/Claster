import { FeatureType } from '@affine/graphql';
import { catchErrorInto, effect, Entity, exhaustMapSwitchUntilChanged, fromPromise, LiveData, onComplete, onStart, smartRetry, } from '@toeverything/infra';
import { map, tap } from 'rxjs';
export class UserFeature extends Entity {
    constructor(authService, store) {
        super();
        this.authService = authService;
        this.store = store;
        // undefined means no user, null means loading
        this.features$ = new LiveData(null);
        this.isAdmin$ = this.features$.map(features => features === null ? null : features?.some(f => f === FeatureType.Admin));
        this.isEarlyAccess$ = this.features$.map(features => features === null
            ? null
            : features?.some(f => f === FeatureType.EarlyAccess));
        this.isRevalidating$ = new LiveData(false);
        this.error$ = new LiveData(null);
        this.revalidate = effect(map(() => ({
            accountId: this.authService.session.account$.value?.id,
        })), exhaustMapSwitchUntilChanged((a, b) => a.accountId === b.accountId, ({ accountId }) => {
            return fromPromise(async (signal) => {
                if (!accountId) {
                    return; // no feature if no user
                }
                const { userId, features } = await this.store.getUserFeatures(signal);
                if (userId !== accountId) {
                    // The user has changed, ignore the result
                    this.authService.session.revalidate();
                    await this.authService.session.waitForRevalidation();
                    return;
                }
                return {
                    userId: userId,
                    features: features,
                };
            }).pipe(smartRetry(), tap(data => {
                if (data) {
                    this.features$.next(data.features);
                }
                else {
                    this.features$.next(null);
                }
            }), catchErrorInto(this.error$), onStart(() => this.isRevalidating$.next(true)), onComplete(() => this.isRevalidating$.next(false)));
        }, () => {
            // Reset the state when the user is changed
            this.reset();
        }));
    }
    reset() {
        this.features$.next(null);
        this.error$.next(null);
        this.isRevalidating$.next(false);
    }
}
//# sourceMappingURL=user-feature.js.map