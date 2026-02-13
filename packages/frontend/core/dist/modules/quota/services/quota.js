import { Service } from '@toeverything/infra';
import { WorkspaceQuota } from '../entities/quota';
export class WorkspaceQuotaService extends Service {
    constructor() {
        super(...arguments);
        this.quota = this.framework.createEntity(WorkspaceQuota);
    }
    dispose() {
        this.quota.dispose();
    }
}
//# sourceMappingURL=quota.js.map