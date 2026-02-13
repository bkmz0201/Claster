import { Entity, LiveData } from '@toeverything/infra';
import type { WorkspaceService } from '../../workspace';
import type { WorkspaceQuotaStore } from '../stores/quota';
export declare class WorkspaceQuota extends Entity {
    private readonly workspaceService;
    private readonly store;
    quota$: LiveData<{
        __typename?: "WorkspaceQuotaType";
        name: string;
        blobLimit: number;
        storageQuota: number;
        usedStorageQuota: number;
        historyPeriod: number;
        memberLimit: number;
        memberCount: number;
        overcapacityMemberCount: number;
        humanReadable: {
            __typename?: "WorkspaceQuotaHumanReadableType";
            name: string;
            blobLimit: string;
            storageQuota: string;
            historyPeriod: string;
            memberLimit: string;
            memberCount: string;
            overcapacityMemberCount: string;
        };
    } | null>;
    isRevalidating$: LiveData<boolean>;
    error$: LiveData<any>;
    /** Used storage in bytes */
    used$: LiveData<number | null>;
    /** Formatted used storage */
    usedFormatted$: LiveData<string | null>;
    /** Maximum storage limit in bytes */
    max$: LiveData<number | null>;
    /** Maximum storage limit formatted */
    maxFormatted$: LiveData<string | null>;
    /** Percentage of storage used */
    percent$: LiveData<number | null>;
    color$: LiveData<string | null>;
    constructor(workspaceService: WorkspaceService, store: WorkspaceQuotaStore);
    revalidate: import("@toeverything/infra").Effect<unknown>;
    waitForRevalidation(signal?: AbortSignal): Promise<boolean>;
    reset(): void;
    dispose(): void;
}
//# sourceMappingURL=quota.d.ts.map