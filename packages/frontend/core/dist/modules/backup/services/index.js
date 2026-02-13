import { catchErrorInto, effect, fromPromise, LiveData, onComplete, onStart, Service, } from '@toeverything/infra';
import { switchMap, tap } from 'rxjs';
import { _addLocalWorkspace } from '../../workspace-engine';
export class BackupService extends Service {
    constructor(desktopApiService, workspacesService) {
        super();
        this.desktopApiService = desktopApiService;
        this.workspacesService = workspacesService;
        this.isLoading$ = new LiveData(false);
        this.error$ = new LiveData(null);
        this.pageBackupWorkspaces$ = new LiveData(undefined);
        this.revalidate = effect(switchMap(() => fromPromise(async () => {
            return this.desktopApiService.handler.workspace.getBackupWorkspaces();
        }).pipe(tap(data => {
            this.pageBackupWorkspaces$.setValue(data);
        }), catchErrorInto(this.error$), onStart(() => this.isLoading$.setValue(true)), onComplete(() => this.isLoading$.setValue(false)))));
    }
    async recoverBackupWorkspace(dbPath) {
        const result = await this.desktopApiService.handler.dialog.loadDBFile(dbPath);
        if (result.workspaceId) {
            _addLocalWorkspace(result.workspaceId);
            this.workspacesService.list.revalidate();
        }
        return result.workspaceId;
    }
    async deleteBackupWorkspace(backupWorkspaceId) {
        await this.desktopApiService.handler.workspace.deleteBackupWorkspace(backupWorkspaceId);
        this.revalidate();
    }
    dispose() {
        this.revalidate.unsubscribe();
    }
}
//# sourceMappingURL=index.js.map