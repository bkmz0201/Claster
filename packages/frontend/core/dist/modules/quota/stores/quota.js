import { workspaceQuotaQuery } from '@affine/graphql';
import { Store } from '@toeverything/infra';
export class WorkspaceQuotaStore extends Store {
    constructor(workspaceServerService) {
        super();
        this.workspaceServerService = workspaceServerService;
    }
    async fetchWorkspaceQuota(workspaceId, signal) {
        if (!this.workspaceServerService.server) {
            throw new Error('No Server');
        }
        const data = await this.workspaceServerService.server.gql({
            query: workspaceQuotaQuery,
            variables: {
                id: workspaceId,
            },
            context: {
                signal,
            },
        });
        return data.workspace.quota;
    }
}
//# sourceMappingURL=quota.js.map