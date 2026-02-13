import { catchErrorInto, effect, Entity, fromPromise, LiveData, onComplete, onStart, smartRetry, } from '@toeverything/infra';
import { EMPTY } from 'rxjs';
import { exhaustMap, mergeMap } from 'rxjs/operators';
import { logger } from '../utils';
export class IgnoredDocs extends Entity {
    constructor(workspaceService, store) {
        super();
        this.workspaceService = workspaceService;
        this.store = store;
        this.docs$ = new LiveData([]);
        this.error$ = new LiveData(null);
        this.loading$ = new LiveData(true);
        this.getIgnoredDocs = effect(exhaustMap(() => {
            return fromPromise(signal => this.store.getIgnoredDocs(this.workspaceService.workspace.id, signal)).pipe(smartRetry(), mergeMap(value => {
                this.docs$.next(value);
                return EMPTY;
            }), catchErrorInto(this.error$, error => {
                logger.error('Failed to fetch workspace doc embedding ignored docs', error);
            }), onStart(() => this.loading$.setValue(true)), onComplete(() => this.loading$.setValue(false)));
        }));
        this.updateIgnoredDocs = ({ add, remove, }) => {
            return this.store
                .updateIgnoredDocs(this.workspaceService.workspace.id, add, remove)
                .then(() => {
                this.getIgnoredDocs();
            });
        };
    }
    dispose() {
        this.getIgnoredDocs.unsubscribe();
    }
}
//# sourceMappingURL=ignored-docs.js.map