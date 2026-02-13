import { catchErrorInto, effect, fromPromise, LiveData, onComplete, onStart, Service, smartRetry, } from '@toeverything/infra';
import { EMPTY, exhaustMap, tap } from 'rxjs';
export class MemberSearchService extends Service {
    constructor(store, workspaceService) {
        super();
        this.store = store;
        this.workspaceService = workspaceService;
        this.PAGE_SIZE = 8;
        this.searchText$ = new LiveData('');
        this.isLoading$ = new LiveData(false);
        this.error$ = new LiveData(null);
        this.result$ = new LiveData([]);
        this.hasMore$ = new LiveData(true);
        this.loadMore = effect(exhaustMap(() => {
            if (!this.hasMore$.value) {
                return EMPTY;
            }
            return fromPromise(async (signal) => {
                return this.store.getMembersByEmailOrName(this.workspaceService.workspace.id, this.searchText$.value || undefined, this.result$.value.length, this.PAGE_SIZE, signal);
            }).pipe(tap(data => {
                this.result$.setValue([...this.result$.value, ...data.members]);
                this.hasMore$.setValue(data.members.length === this.PAGE_SIZE);
            }), smartRetry(), catchErrorInto(this.error$), onStart(() => {
                this.isLoading$.setValue(true);
            }), onComplete(() => this.isLoading$.setValue(false)));
        }));
    }
    reset() {
        this.result$.setValue([]);
        this.hasMore$.setValue(true);
        this.searchText$.setValue('');
        this.error$.setValue(null);
        this.loadMore.reset();
    }
    search(searchText) {
        this.reset();
        this.searchText$.setValue(searchText ?? '');
        this.loadMore();
    }
}
//# sourceMappingURL=member-search.js.map