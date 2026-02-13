import { copilotQuotaQuery } from '@affine/graphql';
import { Store } from '@toeverything/infra';
export class UserCopilotQuotaStore extends Store {
    constructor(graphqlService) {
        super();
        this.graphqlService = graphqlService;
    }
    async fetchUserCopilotQuota(abortSignal) {
        const data = await this.graphqlService.gql({
            query: copilotQuotaQuery,
            context: {
                signal: abortSignal,
            },
        });
        if (!data.currentUser) {
            throw new Error('No logged in');
        }
        return data.currentUser.copilot.quota;
    }
}
//# sourceMappingURL=user-copilot-quota.js.map