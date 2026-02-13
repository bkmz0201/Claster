import { Service } from '@toeverything/infra';
import { WorkspacePermission } from '../entities/permission';
export class WorkspacePermissionService extends Service {
    constructor(workspaceService, workspacesService, store) {
        super();
        this.workspaceService = workspaceService;
        this.workspacesService = workspacesService;
        this.store = store;
        this.permission = this.framework.createEntity(WorkspacePermission);
    }
    dispose() {
        this.permission?.dispose();
    }
    async leaveWorkspace() {
        await this.store.leaveWorkspace(this.workspaceService.workspace.id);
        this.workspacesService.list.revalidate();
    }
}
//# sourceMappingURL=permission.js.map