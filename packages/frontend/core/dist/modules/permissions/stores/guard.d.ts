import { type GetDocRolePermissionsQuery, type GetWorkspaceRolePermissionsQuery } from '@affine/graphql';
import { Store } from '@toeverything/infra';
import type { WorkspaceServerService } from '../../cloud';
import type { WorkspaceService } from '../../workspace';
export type WorkspacePermissionActions = keyof Omit<GetWorkspaceRolePermissionsQuery['workspaceRolePermissions']['permissions'], '__typename'>;
export type DocPermissionActions = keyof Omit<GetDocRolePermissionsQuery['workspace']['doc']['permissions'], '__typename'>;
export declare class GuardStore extends Store {
    private readonly workspaceService;
    private readonly workspaceServerService;
    constructor(workspaceService: WorkspaceService, workspaceServerService: WorkspaceServerService);
    getWorkspacePermissions(): Promise<Record<WorkspacePermissionActions, boolean>>;
    getDocPermissions(docId: string): Promise<Record<DocPermissionActions, boolean>>;
}
//# sourceMappingURL=guard.d.ts.map