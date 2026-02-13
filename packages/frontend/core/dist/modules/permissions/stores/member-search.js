import { getMembersByWorkspaceIdQuery } from '@affine/graphql';
import { Store } from '@toeverything/infra';
export class MemberSearchStore extends Store {
    constructor(workspaceServerService) {
        super();
        this.workspaceServerService = workspaceServerService;
    }
    async getMembersByEmailOrName(workspaceId, query, skip, take, signal) {
        if (!this.workspaceServerService.server) {
            throw new Error('No Server');
        }
        const data = await this.workspaceServerService.server.gql({
            query: getMembersByWorkspaceIdQuery,
            variables: {
                workspaceId,
                skip,
                take,
                query,
            },
            context: {
                signal,
            },
        });
        return data.workspace;
    }
}
//# sourceMappingURL=member-search.js.map