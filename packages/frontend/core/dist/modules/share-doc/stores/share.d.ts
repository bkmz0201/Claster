import type { PublicDocMode } from '@affine/graphql';
import { Store } from '@toeverything/infra';
import type { WorkspaceServerService } from '../../cloud';
export declare class ShareStore extends Store {
    private readonly workspaceServerService;
    constructor(workspaceServerService: WorkspaceServerService);
    getShareInfoByDocId(workspaceId: string, docId: string, signal?: AbortSignal): Promise<{
        __typename?: "DocType";
        id: string;
        mode: PublicDocMode;
        defaultRole: import("@affine/graphql").DocRole;
        public: boolean;
        title: string | null;
        summary: string | null;
    }>;
    enableSharePage(workspaceId: string, pageId: string, docMode?: PublicDocMode, signal?: AbortSignal): Promise<void>;
    disableSharePage(workspaceId: string, pageId: string, signal?: AbortSignal): Promise<void>;
}
//# sourceMappingURL=share.d.ts.map