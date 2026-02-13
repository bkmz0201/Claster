import { Store } from '@toeverything/infra';
import type { GraphQLService } from '../services/graphql';
export declare class UserCopilotQuotaStore extends Store {
    private readonly graphqlService;
    constructor(graphqlService: GraphQLService);
    fetchUserCopilotQuota(abortSignal?: AbortSignal): Promise<{
        __typename?: "CopilotQuota";
        limit: number | null;
        used: number;
    }>;
}
//# sourceMappingURL=user-copilot-quota.d.ts.map