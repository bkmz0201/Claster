import { Entity, LiveData } from '@toeverything/infra';
import { Observable, switchMap } from 'rxjs';
export class Navigator extends Entity {
    constructor(workbenchService) {
        super();
        this.workbenchService = workbenchService;
        this.history$ = this.workbenchService.workbench.activeView$.map(view => view.history);
        this.location$ = LiveData.from(this.history$.pipe(switchMap(history => new Observable(subscriber => {
            subscriber.next({ index: history.index, entries: history.entries });
            return history.listen(() => {
                subscriber.next({
                    index: history.index,
                    entries: history.entries,
                });
            });
        }))), { index: 0, entries: [] });
        this.backable$ = this.location$.map(({ index, entries }) => index > 0 && entries.length > 1);
        this.forwardable$ = this.location$.map(({ index, entries }) => index < entries.length - 1);
    }
    back() {
        if (!BUILD_CONFIG.isElectron) {
            window.history.back();
        }
        else {
            this.history$.value.back();
        }
    }
    forward() {
        if (!BUILD_CONFIG.isElectron) {
            window.history.forward();
        }
        else {
            this.history$.value.forward();
        }
    }
}
//# sourceMappingURL=navigator.js.map