import { catchErrorInto, effect, Entity, fromPromise, LiveData, onComplete, onStart, smartRetry, } from '@toeverything/infra';
import { map, switchMap, tap } from 'rxjs';
export class WorkspaceMembers extends Entity {
    constructor(store, workspaceService) {
        super();
        this.store = store;
        this.workspaceService = workspaceService;
        this.pageNum$ = new LiveData(0);
        this.memberCount$ = new LiveData(undefined);
        this.pageMembers$ = new LiveData(undefined);
        this.isLoading$ = new LiveData(false);
        this.error$ = new LiveData(null);
        this.PAGE_SIZE = 8;
        this.revalidate = effect(map(() => this.pageNum$.value), switchMap(pageNum => {
            return fromPromise(async (signal) => {
                return this.store.fetchMembers(this.workspaceService.workspace.id, pageNum * this.PAGE_SIZE, this.PAGE_SIZE, signal);
            }).pipe(tap(data => {
                this.memberCount$.setValue(data.memberCount);
                this.pageMembers$.setValue(data.members);
            }), smartRetry(), catchErrorInto(this.error$), onStart(() => {
                this.pageMembers$.setValue(undefined);
                this.isLoading$.setValue(true);
            }), onComplete(() => this.isLoading$.setValue(false)));
        }));
    }
    setPageNum(pageNum) {
        this.pageNum$.setValue(pageNum);
    }
    dispose() {
        this.revalidate.unsubscribe();
    }
}
//# sourceMappingURL=members.js.map