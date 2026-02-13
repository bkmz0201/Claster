import { acceptInviteByInviteIdMutation } from '@affine/graphql';
import { Store } from '@toeverything/infra';
export class AcceptInviteStore extends Store {
    constructor(gqlService) {
        super();
        this.gqlService = gqlService;
    }
    async acceptInvite(workspaceId, inviteId, signal) {
        const data = await this.gqlService.gql({
            query: acceptInviteByInviteIdMutation,
            variables: {
                workspaceId,
                inviteId,
            },
            context: { signal },
        });
        return data.acceptInviteById;
    }
}
//# sourceMappingURL=accept-invite.js.map