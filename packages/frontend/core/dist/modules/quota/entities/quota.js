import { DebugLogger } from '@affine/debug';
import { catchErrorInto, effect, Entity, exhaustMapWithTrailing, fromPromise, LiveData, onComplete, onStart, smartRetry, } from '@toeverything/infra';
import { cssVarV2 } from '@toeverything/theme/v2';
import bytes from 'bytes';
import { tap } from 'rxjs';
const logger = new DebugLogger('affine:workspace-permission');
export class WorkspaceQuota extends Entity {
    constructor(workspaceService, store) {
        super();
        this.workspaceService = workspaceService;
        this.store = store;
        this.quota$ = new LiveData(null);
        this.isRevalidating$ = new LiveData(false);
        this.error$ = new LiveData(null);
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
                ? cssVarV2('status/error')
                : cssVarV2('toast/iconState/regular')
            : null);
        this.revalidate = effect(exhaustMapWithTrailing(() => {
            return fromPromise(async (signal) => {
                const data = await this.store.fetchWorkspaceQuota(this.workspaceService.workspace.id, signal);
                return { quota: data, used: data.usedStorageQuota };
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
            }), catchErrorInto(this.error$, error => {
                logger.error('Failed to fetch workspace quota', error);
            }), onStart(() => this.isRevalidating$.setValue(true)), onComplete(() => this.isRevalidating$.setValue(false)));
        }));
    }
    waitForRevalidation(signal) {
        this.revalidate();
        return this.isRevalidating$.waitFor(isRevalidating => !isRevalidating, signal);
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
//# sourceMappingURL=quota.js.map