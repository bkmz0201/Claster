import { getUserFeaturesQuery } from '@affine/graphql';
import { Store } from '@toeverything/infra';
export class UserFeatureStore extends Store {
    constructor(gqlService) {
        super();
        this.gqlService = gqlService;
    }
    async getUserFeatures(signal) {
        const data = await this.gqlService.gql({
            query: getUserFeaturesQuery,
            context: {
                signal,
            },
        });
        return {
            userId: data.currentUser?.id,
            features: data.currentUser?.features,
        };
    }
}
//# sourceMappingURL=user-feature.js.map