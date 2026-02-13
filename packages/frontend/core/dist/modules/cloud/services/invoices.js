import { Service } from '@toeverything/infra';
import { Invoices } from '../entities/invoices';
export class InvoicesService extends Service {
    constructor() {
        super(...arguments);
        this.invoices = this.framework.createEntity(Invoices);
    }
}
//# sourceMappingURL=invoices.js.map