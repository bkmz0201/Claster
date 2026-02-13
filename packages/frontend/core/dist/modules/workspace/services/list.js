import { Service } from '@toeverything/infra';
import { WorkspaceList } from '../entities/list';
export class WorkspaceListService extends Service {
    constructor() {
        super(...arguments);
        this.list = this.framework.createEntity(WorkspaceList);
    }
}
//# sourceMappingURL=list.js.map