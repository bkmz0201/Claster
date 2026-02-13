import { catchErrorInto, effect, Entity, fromPromise, LiveData, mapInto, onComplete, onStart, smartRetry, } from '@toeverything/infra';
import { switchMap } from 'rxjs';
export class ShareInfo extends Entity {
    constructor(workspaceService, docService, store) {
        super();
        this.workspaceService = workspaceService;
        this.docService = docService;
        this.store = store;
        this.info$ = new LiveData(null);
        this.isShared$ = this.info$.map(info => info?.public);
        this.sharedMode$ = this.info$.map(info => (info !== null ? info?.mode : null));
        this.error$ = new LiveData(null);
        this.isRevalidating$ = new LiveData(false);
        this.revalidate = effect(switchMap(() => {
            return fromPromise(signal => this.store.getShareInfoByDocId(this.workspaceService.workspace.id, this.docService.doc.id, signal)).pipe(smartRetry(), mapInto(this.info$), catchErrorInto(this.error$), onStart(() => this.isRevalidating$.next(true)), onComplete(() => this.isRevalidating$.next(false)));
        }));
    }
    waitForRevalidation(signal) {
        this.revalidate();
        return this.isRevalidating$.waitFor(v => v === false, signal);
    }
    async enableShare(mode) {
        await this.store.enableSharePage(this.workspaceService.workspace.id, this.docService.doc.id, mode);
        await this.waitForRevalidation();
    }
    async changeShare(mode) {
        await this.enableShare(mode);
    }
    async disableShare() {
        await this.store.disableSharePage(this.workspaceService.workspace.id, this.docService.doc.id);
        await this.waitForRevalidation();
    }
}
//# sourceMappingURL=share-info.js.map