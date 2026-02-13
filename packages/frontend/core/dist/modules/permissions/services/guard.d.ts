import { LiveData, Service } from '@toeverything/infra';
import type { WorkspaceService } from '../../workspace';
import type { DocPermissionActions, GuardStore, WorkspacePermissionActions } from '../stores/guard';
import type { WorkspacePermissionService } from './permission';
export declare class GuardService extends Service {
    private readonly guardStore;
    private readonly workspaceService;
    private readonly workspacePermissionService;
    constructor(guardStore: GuardStore, workspaceService: WorkspaceService, workspacePermissionService: WorkspacePermissionService);
    private readonly workspacePermissions$;
    private readonly docPermissions$;
    private readonly isAdmin$;
    /**
     * @example
     * ```ts
     * guardService.can$('Workspace_Properties_Update');
     * guardService.can$('Doc_Update', docId);
     * ```
     *
     * @returns LiveData<boolean | undefined> the value is undefined if the permission is loading
     */
    can$<T extends WorkspacePermissionActions | DocPermissionActions>(action: T, ...args: T extends DocPermissionActions ? [string] : []): LiveData<boolean | undefined>;
    can<T extends WorkspacePermissionActions | DocPermissionActions>(action: T, ...args: T extends DocPermissionActions ? [string] : []): Promise<boolean>;
    revalidateCan<T extends WorkspacePermissionActions | DocPermissionActions>(_action: T, ...args: T extends DocPermissionActions ? [string] : []): void;
    private readonly revalidateWorkspacePermission;
    private readonly revalidateDocPermission;
    private readonly loadWorkspacePermission;
    private readonly loadDocPermission;
    dispose(): void;
}
//# sourceMappingURL=guard.d.ts.map