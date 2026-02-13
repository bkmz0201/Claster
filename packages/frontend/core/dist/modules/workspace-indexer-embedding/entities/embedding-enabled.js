import { logger } from '@sentry/react';
import { catchErrorInto, effect, Entity, fromPromise, LiveData, onComplete, onStart, smartRetry, } from '@toeverything/infra';
import { EMPTY } from 'rxjs';
import { exhaustMap, mergeMap } from 'rxjs/operators';
export class EmbeddingEnabled extends Entity {
    constructor(workspaceService, store) {
        super();
        this.workspaceService = workspaceService;
        this.store = store;
        this.enabled$ = new LiveData(null);
        this.loading$ = new LiveData(true);
        this.error$ = new LiveData(null);
        this.getEnabled = effect(exhaustMap(() => {
            return fromPromise(signal => this.store.getEnabled(this.workspaceService.workspace.id, signal)).pipe(smartRetry(), mergeMap(value => {
                this.enabled$.next(value);
                return EMPTY;
            }), catchErrorInto(this.error$, error => {
                logger.error('Failed to fetch workspace doc embedding enabled', error);
            }), onStart(() => this.loading$.setValue(true)), onComplete(() => this.loading$.setValue(false)));
        }));
        this.setEnabled = (enabled) => {
            return this.store
                .updateEnabled(this.workspaceService.workspace.id, enabled)
                .then(() => {
                this.getEnabled();
            });
        };
    }
    dispose() {
        this.getEnabled.unsubscribe();
    }
}
//# sourceMappingURL=embedding-enabled.js.map