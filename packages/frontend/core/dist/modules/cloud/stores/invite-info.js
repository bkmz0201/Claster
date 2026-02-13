import { getInviteInfoQuery } from '@affine/graphql';
import { Store } from '@toeverything/infra';
export class InviteInfoStore extends Store {
    constructor(gqlService) {
        super();
        this.gqlService = gqlService;
    }
    async getInviteInfo(inviteId, signal) {
        if (!inviteId) {
            throw new Error('No inviteId');
        }
        const data = await this.gqlService.gql({
            query: getInviteInfoQuery,
            variables: {
                inviteId,
            },
            context: { signal },
        });
        return data.getInviteInfo;
    }
}
//# sourceMappingURL=invite-info.js.map