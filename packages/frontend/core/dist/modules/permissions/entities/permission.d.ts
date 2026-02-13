import { Entity, LiveData } from '@toeverything/infra';
import type { WorkspaceService } from '../../workspace';
import type { WorkspacePermissionStore } from '../stores/permission';
export declare class WorkspacePermission extends Entity {
    private readonly workspaceService;
    private readonly store;
    private readonly cache$;
    isOwner$: LiveData<boolean | null>;
    isAdmin$: LiveData<boolean | null>;
    isOwnerOrAdmin$: LiveData<boolean | null>;
    isTeam$: LiveData<boolean | null>;
    isRevalidating$: LiveData<boolean>;
    constructor(workspaceService: WorkspaceService, store: WorkspacePermissionStore);
    revalidate: import("@toeverything/infra").Effect<unknown>;
    waitForRevalidation(signal?: AbortSignal): Promise<void>;
    dispose(): void;
}
//# sourceMappingURL=permission.d.ts.map