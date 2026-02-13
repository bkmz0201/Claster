import { getWorkspacePublicPagesQuery } from '@affine/graphql';
import { Store } from '@toeverything/infra';
export class ShareDocsStore extends Store {
    constructor(workspaceServerService) {
        super();
        this.workspaceServerService = workspaceServerService;
    }
    async getWorkspacesShareDocs(workspaceId, signal) {
        if (!this.workspaceServerService.server) {
            throw new Error('No Server');
        }
        const data = await this.workspaceServerService.server.gql({
            query: getWorkspacePublicPagesQuery,
            variables: {
                workspaceId: workspaceId,
            },
            context: {
                signal,
            },
        });
        return data.workspace.publicDocs;
    }
}
//# sourceMappingURL=share-docs.js.map