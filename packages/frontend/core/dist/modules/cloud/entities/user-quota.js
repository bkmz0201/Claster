import { catchErrorInto, effect, Entity, exhaustMapSwitchUntilChanged, fromPromise, LiveData, onComplete, onStart, smartRetry, } from '@toeverything/infra';
import { cssVarV2 } from '@toeverything/theme/v2';
import bytes from 'bytes';
import { map, tap } from 'rxjs';
export class UserQuota extends Entity {
    constructor(authService, store) {
        super();
        this.authService = authService;
        this.store = store;
        this.quota$ = new LiveData(null);
        /** Used storage in bytes */
        this.used$ = new LiveData(null);
        /** Formatted used storage */
        this.usedFormatted$ = this.used$.map(used => used !== null ? bytes.format(used) : null);
        /** Maximum storage limit in bytes */
        this.max$ = this.quota$.map(quota => (quota ? quota.storageQuota : null));
        /** Maximum storage limit formatted */
        this.maxFormatted$ = this.max$.map(max => (max ? bytes.format(max) : null));
        /** Percentage of storage used */
        this.percent$ = LiveData.computed(get => {
            const max = get(this.max$);
            const used = get(this.used$);
            if (max === null || used === null) {
                return null;
            }
            return Math.min(100, Math.max(0.5, Number(((used / max) * 100).toFixed(4))));
        });
        this.color$ = this.percent$.map(percent => percent !== null
            ? percent > 80
                ? cssVarV2('toast/iconState/error')
                : cssVarV2('toast/iconState/regular')
            : null);
        this.isRevalidating$ = new LiveData(false);
        this.error$ = new LiveData(null);
        this.revalidate = effect(map(() => ({
            accountId: this.authService.session.account$.value?.id,
        })), exhaustMapSwitchUntilChanged((a, b) => a.accountId === b.accountId, ({ accountId }) => fromPromise(async (signal) => {
            if (!accountId) {
                return; // no quota if no user
            }
            const { quota, used } = await this.store.fetchUserQuota(signal);
            return { quota, used };
        }).pipe(smartRetry(), tap(data => {
            if (data) {
                const { quota, used } = data;
                this.quota$.next(quota);
                this.used$.next(used);
            }
            else {
                this.quota$.next(null);
                this.used$.next(null);
            }
        }), catchErrorInto(this.error$), onStart(() => this.isRevalidating$.next(true)), onComplete(() => this.isRevalidating$.next(false))), () => {
            // Reset the state when the user is changed
            this.reset();
        }));
    }
    reset() {
        this.quota$.next(null);
        this.used$.next(null);
        this.error$.next(null);
        this.isRevalidating$.next(false);
    }
    dispose() {
        this.revalidate.unsubscribe();
    }
}
//# sourceMappingURL=user-quota.js.map