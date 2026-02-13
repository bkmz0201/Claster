import { DebugLogger } from '@affine/debug';
import { catchErrorInto, effect, Entity, fromPromise, LiveData, onComplete, onStart, smartRetry, } from '@toeverything/infra';
import { exhaustMap, tap } from 'rxjs';
const logger = new DebugLogger('affine:workspace-permission');
export class WorkspaceShareSetting extends Entity {
    constructor(workspaceService, store) {
        super();
        this.workspaceService = workspaceService;
        this.store = store;
        this.enableAi$ = new LiveData(null);
        this.enableUrlPreview$ = new LiveData(null);
        this.inviteLink$ = new LiveData(null);
        this.isLoading$ = new LiveData(false);
        this.error$ = new LiveData(null);
        this.revalidate = effect(exhaustMap(() => {
            return fromPromise(signal => this.store.fetchWorkspaceConfig(this.workspaceService.workspace.id, signal)).pipe(smartRetry(), tap(value => {
                if (value) {
                    this.enableAi$.next(value.enableAi);
                    this.enableUrlPreview$.next(value.enableUrlPreview);
                    this.inviteLink$.next(value.inviteLink);
                }
            }), catchErrorInto(this.error$, error => {
                logger.error('Failed to fetch enableUrlPreview', error);
            }), onStart(() => this.isLoading$.setValue(true)), onComplete(() => this.isLoading$.setValue(false)));
        }));
        this.revalidate();
    }
    async waitForRevalidation(signal) {
        this.revalidate();
        await this.isLoading$.waitFor(isLoading => !isLoading, signal);
    }
    async setEnableUrlPreview(enableUrlPreview) {
        await this.store.updateWorkspaceEnableUrlPreview(this.workspaceService.workspace.id, enableUrlPreview);
        await this.waitForRevalidation();
    }
    async setEnableAi(enableAi) {
        await this.store.updateWorkspaceEnableAi(this.workspaceService.workspace.id, enableAi);
        await this.waitForRevalidation();
    }
    dispose() {
        this.revalidate.unsubscribe();
    }
}
//# sourceMappingURL=share-setting.js.map