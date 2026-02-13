import { Entity, LiveData } from '@toeverything/infra';
import type { WorkspaceMetadata } from '../metadata';
import type { WorkspaceFlavoursService } from '../services/flavours';
import type { WorkspaceProfileCacheStore } from '../stores/profile-cache';
import type { Workspace } from './workspace';
export interface WorkspaceProfileInfo {
    avatar?: string;
    name?: string;
    isOwner?: boolean;
    isAdmin?: boolean;
    isTeam?: boolean;
    isEmpty?: boolean;
}
/**
 * # WorkspaceProfile
 *
 * This class take care of workspace avatar and name
 */
export declare class WorkspaceProfile extends Entity<{
    metadata: WorkspaceMetadata;
}> {
    private readonly cache;
    private readonly provider;
    get id(): string;
    profile$: LiveData<WorkspaceProfileInfo | null>;
    avatar$: LiveData<string | undefined>;
    name$: LiveData<string | undefined>;
    isLoading$: LiveData<boolean>;
    constructor(cache: WorkspaceProfileCacheStore, flavoursService: WorkspaceFlavoursService);
    private setProfile;
    revalidate: import("@toeverything/infra").Effect<unknown>;
    syncWithWorkspace(workspace: Workspace): void;
}
//# sourceMappingURL=profile.d.ts.map