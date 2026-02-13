import { getDocCreatedByUpdatedByListQuery } from '@affine/graphql';
import { Store, yjsGetPath } from '@toeverything/infra';
export class DocCreatedByUpdatedBySyncStore extends Store {
    constructor(workspaceServerService, workspaceService) {
        super();
        this.workspaceServerService = workspaceServerService;
        this.workspaceService = workspaceService;
    }
    async getDocCreatedByUpdatedByList(afterCursor) {
        if (!this.workspaceServerService.server) {
            throw new Error('Server not found');
        }
        return await this.workspaceServerService.server.gql({
            query: getDocCreatedByUpdatedByListQuery,
            variables: {
                workspaceId: this.workspaceService.workspace.id,
                pagination: {
                    first: 100,
                    after: afterCursor,
                },
            },
        });
    }
    watchDocCreatedByUpdatedBySynced() {
        const rootYDoc = this.workspaceService.workspace.rootYDoc;
        return yjsGetPath(rootYDoc.getMap('affine:workspace-properties'), 'docCreatedByUpdatedBySynced');
    }
    setDocCreatedByUpdatedBySynced(synced) {
        const rootYDoc = this.workspaceService.workspace.rootYDoc;
        rootYDoc
            .getMap('affine:workspace-properties')
            .set('docCreatedByUpdatedBySynced', synced);
    }
}
//# sourceMappingURL=doc-created-by-updated-by-sync.js.map