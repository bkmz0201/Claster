import { Service } from '@toeverything/infra';
import { WorkspaceInvoices } from '../entities/workspace-invoices';
export class WorkspaceInvoicesService extends Service {
    constructor() {
        super(...arguments);
        this.invoices = this.framework.createEntity(WorkspaceInvoices);
    }
}
//# sourceMappingURL=workspace-invoices.js.map