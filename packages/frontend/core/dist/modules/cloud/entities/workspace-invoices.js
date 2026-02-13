import { catchErrorInto, effect, Entity, exhaustMapSwitchUntilChanged, fromPromise, LiveData, onComplete, onStart, smartRetry, } from '@toeverything/infra';
import { map, tap } from 'rxjs';
import { InvoicesStore } from '../stores/invoices';
export class WorkspaceInvoices extends Entity {
    constructor(workspaceService, workspaceServerService) {
        super();
        this.workspaceService = workspaceService;
        this.workspaceServerService = workspaceServerService;
        this.store = this.workspaceServerService.server?.scope.get(InvoicesStore);
        this.pageNum$ = new LiveData(0);
        this.invoiceCount$ = new LiveData(undefined);
        this.pageInvoices$ = new LiveData(undefined);
        this.isLoading$ = new LiveData(false);
        this.error$ = new LiveData(null);
        this.PAGE_SIZE = 8;
        this.revalidate = effect(map(() => this.pageNum$.value), exhaustMapSwitchUntilChanged((a, b) => a === b, pageNum => {
            return fromPromise(async (signal) => {
                if (!this.store) {
                    throw new Error('No invoices store');
                }
                return this.store.fetchWorkspaceInvoices(pageNum * this.PAGE_SIZE, this.PAGE_SIZE, this.workspaceService.workspace.id, signal);
            }).pipe(tap(data => {
                this.invoiceCount$.setValue(data.invoiceCount);
                this.pageInvoices$.setValue(data.invoices);
            }), smartRetry(), catchErrorInto(this.error$), onStart(() => {
                this.pageInvoices$.setValue(undefined);
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
//# sourceMappingURL=workspace-invoices.js.map