import type { WorkspaceServerService } from '@affine/core/modules/cloud';
import { Store } from '@toeverything/infra';
export declare class WorkspaceShareSettingStore extends Store {
    private readonly workspaceServerService;
    constructor(workspaceServerService: WorkspaceServerService);
    fetchWorkspaceConfig(workspaceId: string, signal?: AbortSignal): Promise<{
        __typename?: "WorkspaceType";
        enableAi: boolean;
        enableUrlPreview: boolean;
        enableDocEmbedding: boolean;
        inviteLink: {
            __typename?: "InviteLink";
            link: string;
            expireTime: string;
        } | null;
    }>;
    updateWorkspaceEnableAi(workspaceId: string, enableAi: boolean, signal?: AbortSignal): Promise<void>;
    updateWorkspaceEnableUrlPreview(workspaceId: string, enableUrlPreview: boolean, signal?: AbortSignal): Promise<void>;
}
//# sourceMappingURL=share-setting.d.ts.map