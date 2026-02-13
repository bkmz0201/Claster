import { logger } from '@sentry/react';
import { catchErrorInto, effect, Entity, fromPromise, LiveData, onComplete, onStart, smartRetry, } from '@toeverything/infra';
import { EMPTY, interval, Subject } from 'rxjs';
import { exhaustMap, mergeMap, switchMap, takeUntil } from 'rxjs/operators';
export class EmbeddingProgress extends Entity {
    constructor(workspaceService, store) {
        super();
        this.workspaceService = workspaceService;
        this.store = store;
        this.progress$ = new LiveData(null);
        this.error$ = new LiveData(null);
        this.loading$ = new LiveData(true);
        this.EMBEDDING_PROGRESS_POLL_INTERVAL = 3000;
        this.stopEmbeddingProgress$ = new Subject();
        this.uploadingAttachments$ = new LiveData([]);
        this.getEmbeddingProgress = effect(exhaustMap(() => {
            return interval(this.EMBEDDING_PROGRESS_POLL_INTERVAL).pipe(takeUntil(this.stopEmbeddingProgress$), switchMap(() => fromPromise(signal => this.store.getEmbeddingProgress(this.workspaceService.workspace.id, signal)).pipe(smartRetry(), mergeMap(value => {
                this.progress$.next(value);
                if (value && value.embedded === value.total && value.total > 0) {
                    this.stopEmbeddingProgressPolling();
                }
                return EMPTY;
            }), catchErrorInto(this.error$, error => {
                logger.error('Failed to fetch workspace embedding progress', error);
            }), onStart(() => this.loading$.setValue(true)), onComplete(() => this.loading$.setValue(false)))));
        }));
    }
    startEmbeddingProgressPolling() {
        this.stopEmbeddingProgressPolling();
        this.getEmbeddingProgress();
    }
    stopEmbeddingProgressPolling() {
        this.stopEmbeddingProgress$.next();
    }
    dispose() {
        this.stopEmbeddingProgress$.next();
        this.getEmbeddingProgress.unsubscribe();
    }
}
//# sourceMappingURL=embedding-progress.js.map