import { catchErrorInto, effect, exhaustMapWithTrailing, fromPromise, LiveData, onComplete, onStart, Service, smartRetry, } from '@toeverything/infra';
import { tap } from 'rxjs';
export class SelfhostLicenseService extends Service {
    constructor(store, workspaceService) {
        super();
        this.store = store;
        this.workspaceService = workspaceService;
        this.license$ = new LiveData(null);
        this.isRevalidating$ = new LiveData(false);
        this.error$ = new LiveData(null);
        this.revalidate = effect(exhaustMapWithTrailing(() => {
            return fromPromise(async (signal) => {
                const currentWorkspaceId = this.workspaceService.workspace.id;
                if (!currentWorkspaceId) {
                    return undefined; // no subscription if no user
                }
                return await this.store.getLicense(currentWorkspaceId, signal);
            }).pipe(smartRetry(), tap(data => {
                if (data) {
                    this.license$.next(data);
                }
            }), catchErrorInto(this.error$), onStart(() => this.isRevalidating$.next(true)), onComplete(() => this.isRevalidating$.next(false)));
        }));
    }
    async activateLicense(workspaceId, licenseKey) {
        return await this.store.activate(workspaceId, licenseKey);
    }
    async deactivateLicense(workspaceId) {
        return await this.store.deactivate(workspaceId);
    }
    async installLicense(workspaceId, licenseFile) {
        return await this.store.installLicense(workspaceId, licenseFile);
    }
    clear() {
        this.license$.next(null);
        this.error$.next(null);
    }
}
//# sourceMappingURL=selfhost-license.js.map