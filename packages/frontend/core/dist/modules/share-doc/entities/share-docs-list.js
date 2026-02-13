import { DebugLogger } from '@affine/debug';
import { catchErrorInto, effect, Entity, exhaustMapWithTrailing, fromPromise, LiveData, onComplete, onStart, smartRetry, } from '@toeverything/infra';
import { map, tap } from 'rxjs';
export const logger = new DebugLogger('affine:share-doc-list');
export class ShareDocsList extends Entity {
    constructor(workspaceService, store, cache) {
        super();
        this.workspaceService = workspaceService;
        this.store = store;
        this.cache = cache;
        this.list$ = LiveData.from(this.cache
            .watch('share-docs')
            .pipe(map(list => list ?? [])), []);
        this.isLoading$ = new LiveData(false);
        this.error$ = new LiveData(null);
        this.revalidate = effect(exhaustMapWithTrailing(() => fromPromise(signal => {
            return this.store.getWorkspacesShareDocs(this.workspaceService.workspace.id, signal);
        }).pipe(smartRetry(), tap(list => {
            this.cache.set('share-docs', list);
        }), catchErrorInto(this.error$, err => logger.error('revalidate share docs error', err)), onStart(() => {
            this.isLoading$.next(true);
        }), onComplete(() => {
            this.isLoading$.next(false);
        }))));
    }
    dispose() {
        this.revalidate.unsubscribe();
    }
}
//# sourceMappingURL=share-docs-list.js.map