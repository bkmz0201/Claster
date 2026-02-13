import { Service } from '@toeverything/infra';
import type { WorkspaceService, WorkspacesService } from '../../workspace';
import { WorkspacePermission } from '../entities/permission';
import type { WorkspacePermissionStore } from '../stores/permission';
export declare class WorkspacePermissionService extends Service {
    private readonly workspaceService;
    private readonly workspacesService;
    private readonly store;
    permission: WorkspacePermission;
    constructor(workspaceService: WorkspaceService, workspacesService: WorkspacesService, store: WorkspacePermissionStore);
    dispose(): void;
    leaveWorkspace(): Promise<void>;
}
//# sourceMappingURL=permission.d.ts.map