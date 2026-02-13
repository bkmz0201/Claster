import { quotaQuery } from '@affine/graphql';
import { Store } from '@toeverything/infra';
export class UserQuotaStore extends Store {
    constructor(graphqlService) {
        super();
        this.graphqlService = graphqlService;
    }
    async fetchUserQuota(abortSignal) {
        const data = await this.graphqlService.gql({
            query: quotaQuery,
            context: {
                signal: abortSignal,
            },
        });
        if (!data.currentUser) {
            throw new Error('No logged in');
        }
        return {
            userId: data.currentUser.id,
            quota: data.currentUser.quota,
            used: data.currentUser.quotaUsage.storageQuota,
        };
    }
}
//# sourceMappingURL=user-quota.js.map