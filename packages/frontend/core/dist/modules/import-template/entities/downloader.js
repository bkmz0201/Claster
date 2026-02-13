import { catchErrorInto, effect, Entity, fromPromise, LiveData, onComplete, onStart, smartRetry, } from '@toeverything/infra';
import { switchMap, tap } from 'rxjs';
export class TemplateDownloader extends Entity {
    constructor(store) {
        super();
        this.store = store;
        this.isDownloading$ = new LiveData(false);
        this.data$ = new LiveData(null);
        this.error$ = new LiveData(null);
        this.download = effect(switchMap(({ snapshotUrl }) => {
            return fromPromise(() => this.store.download(snapshotUrl)).pipe(tap(({ data }) => {
                this.data$.next(data);
            }), smartRetry(), catchErrorInto(this.error$), onStart(() => {
                this.isDownloading$.next(true);
                this.data$.next(null);
                this.error$.next(null);
            }), onComplete(() => this.isDownloading$.next(false)));
        }));
    }
}
//# sourceMappingURL=downloader.js.map