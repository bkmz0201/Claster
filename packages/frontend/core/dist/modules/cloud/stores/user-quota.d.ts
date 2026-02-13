import { Store } from '@toeverything/infra';
import type { GraphQLService } from '../services/graphql';
export declare class UserQuotaStore extends Store {
    private readonly graphqlService;
    constructor(graphqlService: GraphQLService);
    fetchUserQuota(abortSignal?: AbortSignal): Promise<{
        userId: string;
        quota: {
            __typename?: "UserQuotaType";
            name: string;
            blobLimit: number;
            storageQuota: number;
            historyPeriod: number;
            memberLimit: number;
            humanReadable: {
                __typename?: "UserQuotaHumanReadableType";
                name: string;
                blobLimit: string;
                storageQuota: string;
                historyPeriod: string;
                memberLimit: string;
            };
        };
        used: number;
    }>;
}
//# sourceMappingURL=user-quota.d.ts.map