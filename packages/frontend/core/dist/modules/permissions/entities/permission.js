import { Permission } from '@affine/graphql';
import { backoffRetry, effect, Entity, exhaustMapWithTrailing, fromPromise, LiveData, onComplete, onStart, } from '@toeverything/infra';
import { tap } from 'rxjs';
export class WorkspacePermission extends Entity {
    constructor(workspaceService, store) {
        super();
        this.workspaceService = workspaceService;
        this.store = store;
        this.cache$ = LiveData.from(this.store.watchWorkspacePermissionCache(), undefined);
        this.isOwner$ = this.cache$.map(cache => cache?.isOwner ?? null);
        this.isAdmin$ = this.cache$.map(cache => cache?.isAdmin ?? null);
        this.isOwnerOrAdmin$ = this.cache$.map(cache => (cache?.isOwner ?? null) || (cache?.isAdmin ?? null));
        this.isTeam$ = this.cache$.map(cache => cache?.isTeam ?? null);
        this.isRevalidating$ = new LiveData(false);
        this.revalidate = effect(exhaustMapWithTrailing(() => {
            return fromPromise(async (signal) => {
                if (this.workspaceService.workspace.flavour !== 'local' &&
                    !this.workspaceService.workspace.openOptions.isSharedMode) {
                    const info = await this.store.fetchWorkspaceInfo(this.workspaceService.workspace.id, signal);
                    return {
                        isOwner: info.workspace.role === Permission.Owner,
                        isAdmin: info.workspace.role === Permission.Admin,
                        isTeam: info.workspace.team,
                    };
                }
                else {
                    return { isOwner: true, isAdmin: false, isTeam: false };
                }
            }).pipe(backoffRetry({
                count: Infinity,
            }), tap(({ isOwner, isAdmin, isTeam }) => {
                this.store.setWorkspacePermissionCache({
                    isOwner,
                    isAdmin,
                    isTeam,
                });
            }), onStart(() => this.isRevalidating$.setValue(true)), onComplete(() => this.isRevalidating$.setValue(false)));
        }));
    }
    async waitForRevalidation(signal) {
        this.revalidate();
        await this.isRevalidating$.waitFor(isRevalidating => !isRevalidating, signal);
    }
    dispose() {
        this.revalidate.unsubscribe();
    }
}
//# sourceMappingURL=permission.js.map