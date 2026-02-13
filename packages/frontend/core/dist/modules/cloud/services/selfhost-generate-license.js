import {} from '@affine/error';
import { catchErrorInto, effect, fromPromise, LiveData, onComplete, onStart, Service, smartRetry, } from '@toeverything/infra';
import { exhaustMap, tap } from 'rxjs';
export class SelfhostGenerateLicenseService extends Service {
    constructor(store) {
        super();
        this.store = store;
        this.licenseKey$ = new LiveData(null);
        this.isLoading$ = new LiveData(false);
        this.error$ = new LiveData(null);
        this.generateLicenseKey = effect(exhaustMap((sessionId) => {
            return fromPromise(async () => {
                return await this.store.generateKey(sessionId);
            }).pipe(smartRetry(), tap(key => {
                this.licenseKey$.next(key);
            }), catchErrorInto(this.error$), onStart(() => {
                this.isLoading$.next(true);
            }), onComplete(() => {
                this.isLoading$.next(false);
            }));
        }));
    }
}
//# sourceMappingURL=selfhost-generate-license.js.map