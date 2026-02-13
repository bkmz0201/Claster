import { catchErrorInto, effect, fromPromise, LiveData, onComplete, onStart, Service, smartRetry, } from '@toeverything/infra';
import { EMPTY, switchMap, tap } from 'rxjs';
export class InvitationService extends Service {
    constructor(acceptInviteStore, inviteInfoStore) {
        super();
        this.acceptInviteStore = acceptInviteStore;
        this.inviteInfoStore = inviteInfoStore;
        this.inviteId$ = new LiveData(undefined);
        this.inviteInfo$ = new LiveData(undefined);
        this.loading$ = new LiveData(false);
        this.error$ = new LiveData(null);
        this.getInviteInfo = effect(switchMap(({ inviteId }) => {
            if (!inviteId) {
                return EMPTY;
            }
            return fromPromise(async () => {
                return await this.inviteInfoStore.getInviteInfo(inviteId);
            }).pipe(tap(res => {
                this.inviteInfo$.setValue(res);
            }), smartRetry({
                count: 1,
            }), catchErrorInto(this.error$), onStart(() => {
                this.inviteId$.setValue(inviteId);
                this.loading$.setValue(true);
                this.inviteInfo$.setValue(undefined);
            }), onComplete(() => {
                this.loading$.setValue(false);
            }));
        }));
    }
    async acceptInvite(inviteId) {
        this.getInviteInfo({ inviteId });
        await this.loading$.waitFor(f => !f);
        if (!this.inviteInfo$.value) {
            throw new Error('Invalid invite id');
        }
        return await this.acceptInviteStore.acceptInvite(this.inviteInfo$.value.workspace.id, inviteId);
    }
    dispose() {
        this.getInviteInfo.unsubscribe();
    }
}
//# sourceMappingURL=invitation.js.map