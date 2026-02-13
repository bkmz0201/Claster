import { catchErrorInto, effect, Entity, exhaustMapWithTrailing, fromPromise, LiveData, onComplete, onStart, smartRetry, } from '@toeverything/infra';
import { tap } from 'rxjs';
const CACHE_KEY_PREFIX = 'cloud-doc-meta:';
export class CloudDocMeta extends Entity {
    constructor(store, docService, cache) {
        super();
        this.store = store;
        this.docService = docService;
        this.cache = cache;
        this.docId = this.docService.doc.id;
        this.workspaceId = this.docService.doc.workspace.id;
        this.cacheKey = `${CACHE_KEY_PREFIX}${this.workspaceId}:${this.docId}`;
        this.meta$ = LiveData.from(this.cache.watch(this.cacheKey), undefined);
        this.isRevalidating$ = new LiveData(false);
        this.error$ = new LiveData(null);
        this.revalidate = effect(exhaustMapWithTrailing(() => {
            return fromPromise(this.store.fetchCloudDocMeta(this.workspaceId, this.docId)).pipe(smartRetry(), tap(meta => {
                this.cache.set(this.cacheKey, meta);
            }), catchErrorInto(this.error$), onStart(() => this.isRevalidating$.next(true)), onComplete(() => this.isRevalidating$.next(false)));
        }));
    }
}
//# sourceMappingURL=cloud-doc-meta.js.map