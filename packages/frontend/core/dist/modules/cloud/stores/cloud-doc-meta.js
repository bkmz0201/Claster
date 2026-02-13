import { getWorkspacePageMetaByIdQuery } from '@affine/graphql';
import { Store } from '@toeverything/infra';
import {} from '../entities/cloud-doc-meta';
export class CloudDocMetaStore extends Store {
    constructor(workspaceServerService) {
        super();
        this.workspaceServerService = workspaceServerService;
    }
    async fetchCloudDocMeta(workspaceId, docId, abortSignal) {
        if (!this.workspaceServerService.server) {
            throw new Error('Server not found');
        }
        const serverConfigData = await this.workspaceServerService.server.gql({
            query: getWorkspacePageMetaByIdQuery,
            variables: { id: workspaceId, pageId: docId },
            context: {
                signal: abortSignal,
            },
        });
        return serverConfigData.workspace.pageMeta;
    }
}
//# sourceMappingURL=cloud-doc-meta.js.map