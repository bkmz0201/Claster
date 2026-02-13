import { getWorkspaceInfoQuery, leaveWorkspaceMutation } from '@affine/graphql';
import { Store } from '@toeverything/infra';
export class WorkspacePermissionStore extends Store {
    constructor(workspaceServerService, workspaceLocalState) {
        super();
        this.workspaceServerService = workspaceServerService;
        this.workspaceLocalState = workspaceLocalState;
    }
    async fetchWorkspaceInfo(workspaceId, signal) {
        if (!this.workspaceServerService.server) {
            throw new Error('No Server');
        }
        const info = await this.workspaceServerService.server.gql({
            query: getWorkspaceInfoQuery,
            variables: {
                workspaceId,
            },
            context: { signal },
        });
        return info;
    }
    /**
     * @param workspaceName for send email
     */
    async leaveWorkspace(workspaceId) {
        if (!this.workspaceServerService.server) {
            throw new Error('No Server');
        }
        await this.workspaceServerService.server.gql({
            query: leaveWorkspaceMutation,
            variables: {
                workspaceId,
            },
        });
    }
    watchWorkspacePermissionCache() {
        return this.workspaceLocalState.watch('permission');
    }
    setWorkspacePermissionCache(permission) {
        this.workspaceLocalState.set('permission', permission);
    }
}
//# sourceMappingURL=permission.js.map