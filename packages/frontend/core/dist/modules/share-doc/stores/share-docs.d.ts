import type { WorkspaceServerService } from '@affine/core/modules/cloud';
import { Store } from '@toeverything/infra';
export declare class ShareDocsStore extends Store {
    private readonly workspaceServerService;
    constructor(workspaceServerService: WorkspaceServerService);
    getWorkspacesShareDocs(workspaceId: string, signal?: AbortSignal): Promise<{
        __typename?: "DocType";
        id: string;
        mode: import("@affine/graphql").PublicDocMode;
    }[]>;
}
//# sourceMappingURL=share-docs.d.ts.map