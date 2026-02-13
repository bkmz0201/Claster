import { Store } from '@toeverything/infra';
import { type CloudDocMetaType } from '../entities/cloud-doc-meta';
import type { WorkspaceServerService } from '../services/workspace-server';
export declare class CloudDocMetaStore extends Store {
    private readonly workspaceServerService;
    constructor(workspaceServerService: WorkspaceServerService);
    fetchCloudDocMeta(workspaceId: string, docId: string, abortSignal?: AbortSignal): Promise<CloudDocMetaType>;
}
//# sourceMappingURL=cloud-doc-meta.d.ts.map