import { getWorkspacePageByIdQuery, publishPageMutation, revokePublicPageMutation, } from '@affine/graphql';
import { Store } from '@toeverything/infra';
export class ShareStore extends Store {
    constructor(workspaceServerService) {
        super();
        this.workspaceServerService = workspaceServerService;
    }
    async getShareInfoByDocId(workspaceId, docId, signal) {
        if (!this.workspaceServerService.server) {
            throw new Error('No Server');
        }
        const data = await this.workspaceServerService.server.gql({
            query: getWorkspacePageByIdQuery,
            variables: {
                pageId: docId,
                workspaceId,
            },
            context: {
                signal,
            },
        });
        return data.workspace.doc ?? undefined;
    }
    async enableSharePage(workspaceId, pageId, docMode, signal) {
        if (!this.workspaceServerService.server) {
            throw new Error('No Server');
        }
        await this.workspaceServerService.server.gql({
            query: publishPageMutation,
            variables: {
                pageId,
                workspaceId,
                mode: docMode,
            },
            context: {
                signal,
            },
        });
    }
    async disableSharePage(workspaceId, pageId, signal) {
        if (!this.workspaceServerService.server) {
            throw new Error('No Server');
        }
        await this.workspaceServerService.server.gql({
            query: revokePublicPageMutation,
            variables: {
                pageId,
                workspaceId,
            },
            context: {
                signal,
            },
        });
    }
}
//# sourceMappingURL=share.js.map