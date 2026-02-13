import type { WorkspaceServerService } from '@affine/core/modules/cloud';
import { Store } from '@toeverything/infra';
export declare class WorkspaceQuotaStore extends Store {
    private readonly workspaceServerService;
    constructor(workspaceServerService: WorkspaceServerService);
    fetchWorkspaceQuota(workspaceId: string, signal?: AbortSignal): Promise<{
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
    }>;
}
//# sourceMappingURL=quota.d.ts.map