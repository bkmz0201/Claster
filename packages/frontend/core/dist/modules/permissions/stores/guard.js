import { getDocRolePermissionsQuery, getWorkspaceRolePermissionsQuery, } from '@affine/graphql';
import { Store } from '@toeverything/infra';
export class GuardStore extends Store {
    constructor(workspaceService, workspaceServerService) {
        super();
        this.workspaceService = workspaceService;
        this.workspaceServerService = workspaceServerService;
    }
    async getWorkspacePermissions() {
        if (!this.workspaceServerService.server) {
            throw new Error('No server');
        }
        const data = await this.workspaceServerService.server.gql({
            query: getWorkspaceRolePermissionsQuery,
            variables: {
                id: this.workspaceService.workspace.id,
            },
        });
        return data.workspaceRolePermissions.permissions;
    }
    async getDocPermissions(docId) {
        if (!this.workspaceServerService.server) {
            throw new Error('No server');
        }
        const data = await this.workspaceServerService.server.gql({
            query: getDocRolePermissionsQuery,
            variables: {
                workspaceId: this.workspaceService.workspace.id,
                docId,
            },
        });
        return data.workspace.doc.permissions;
    }
}
//# sourceMappingURL=guard.js.map