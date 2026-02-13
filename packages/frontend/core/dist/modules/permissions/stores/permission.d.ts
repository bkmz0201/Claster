import type { WorkspaceServerService } from '@affine/core/modules/cloud';
import { Store } from '@toeverything/infra';
import type { WorkspaceLocalState } from '../../workspace';
export declare class WorkspacePermissionStore extends Store {
    private readonly workspaceServerService;
    private readonly workspaceLocalState;
    constructor(workspaceServerService: WorkspaceServerService, workspaceLocalState: WorkspaceLocalState);
    fetchWorkspaceInfo(workspaceId: string, signal?: AbortSignal): Promise<import("@affine/graphql").GetWorkspaceInfoQuery>;
    /**
     * @param workspaceName for send email
     */
    leaveWorkspace(workspaceId: string): Promise<void>;
    watchWorkspacePermissionCache(): import("rxjs").Observable<{
        isOwner: boolean;
        isAdmin: boolean;
        isTeam: boolean;
    } | undefined>;
    setWorkspacePermissionCache(permission: {
        isOwner: boolean;
        isAdmin: boolean;
        isTeam: boolean;
    }): void;
}
//# sourceMappingURL=permission.d.ts.map