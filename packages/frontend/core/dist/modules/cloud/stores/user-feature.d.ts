import { Store } from '@toeverything/infra';
import type { GraphQLService } from '../services/graphql';
export declare class UserFeatureStore extends Store {
    private readonly gqlService;
    constructor(gqlService: GraphQLService);
    getUserFeatures(signal: AbortSignal): Promise<{
        userId: string | undefined;
        features: import("@affine/graphql").FeatureType[] | undefined;
    }>;
}
//# sourceMappingURL=user-feature.d.ts.map