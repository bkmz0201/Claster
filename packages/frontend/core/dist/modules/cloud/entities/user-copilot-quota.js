import { catchErrorInto, effect, Entity, exhaustMapSwitchUntilChanged, fromPromise, LiveData, onComplete, onStart, smartRetry, } from '@toeverything/infra';
import { map, tap } from 'rxjs';
export class UserCopilotQuota extends Entity {
    constructor(authService, store, serverService) {
        super();
        this.authService = authService;
        this.store = store;
        this.serverService = serverService;
        this.copilotActionLimit$ = new LiveData(null);
        this.copilotActionUsed$ = new LiveData(null);
        this.isRevalidating$ = new LiveData(false);
        this.error$ = new LiveData(null);
        this.revalidate = effect(map(() => ({
            accountId: this.authService.session.account$.value?.id,
        })), exhaustMapSwitchUntilChanged((a, b) => a.accountId === b.accountId, ({ accountId }) => fromPromise(async (signal) => {
            if (!accountId) {
                return; // no quota if no user
            }
            const serverConfig = await this.serverService.server.features$.waitForNonNull(signal);
            let aiQuota = null;
            if (serverConfig.copilot) {
                aiQuota = await this.store.fetchUserCopilotQuota(signal);
            }
            return aiQuota;
        }).pipe(smartRetry(), tap(data => {
            if (data) {
                const { limit, used } = data;
                this.copilotActionUsed$.next(used);
                this.copilotActionLimit$.next(limit === null ? 'unlimited' : limit); // fix me: unlimited status
            }
            else {
                this.copilotActionUsed$.next(null);
                this.copilotActionLimit$.next(null);
            }
        }), catchErrorInto(this.error$), onStart(() => this.isRevalidating$.next(true)), onComplete(() => this.isRevalidating$.next(false))), () => {
            // Reset the state when the user is changed
            this.reset();
        }));
    }
    reset() {
        this.copilotActionUsed$.next(null);
        this.copilotActionLimit$.next(null);
        this.error$.next(null);
        this.isRevalidating$.next(false);
    }
    dispose() {
        this.revalidate.unsubscribe();
    }
}
//# sourceMappingURL=user-copilot-quota.js.map