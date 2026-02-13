import { catchErrorInto, effect, Entity, exhaustMapSwitchUntilChanged, fromPromise, LiveData, onComplete, onStart, smartRetry, } from '@toeverything/infra';
import { map, tap } from 'rxjs';
export class Invoices extends Entity {
    constructor(store) {
        super();
        this.store = store;
        this.pageNum$ = new LiveData(0);
        this.invoiceCount$ = new LiveData(undefined);
        this.pageInvoices$ = new LiveData(undefined);
        this.isLoading$ = new LiveData(false);
        this.error$ = new LiveData(null);
        this.PAGE_SIZE = 8;
        this.revalidate = effect(map(() => this.pageNum$.value), exhaustMapSwitchUntilChanged((a, b) => a === b, pageNum => {
            return fromPromise(async (signal) => {
                return this.store.fetchInvoices(pageNum * this.PAGE_SIZE, this.PAGE_SIZE, signal);
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
//# sourceMappingURL=invoices.js.map