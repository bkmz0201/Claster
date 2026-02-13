import { getPublicUserByIdQuery } from '@affine/graphql';
import { Store } from '@toeverything/infra';
export class PublicUserStore extends Store {
    constructor(gqlService) {
        super();
        this.gqlService = gqlService;
    }
    async getPublicUserById(id, signal) {
        const result = await this.gqlService.gql({
            query: getPublicUserByIdQuery,
            variables: {
                id,
            },
            context: {
                signal,
            },
        });
        return result.publicUserById;
    }
}
//# sourceMappingURL=public-user.js.map