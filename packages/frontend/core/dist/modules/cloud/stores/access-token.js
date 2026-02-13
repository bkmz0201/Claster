import { generateUserAccessTokenMutation, listUserAccessTokensQuery, revokeUserAccessTokenMutation, } from '@affine/graphql';
import { Store } from '@toeverything/infra';
export class AccessTokenStore extends Store {
    constructor(gqlService) {
        super();
        this.gqlService = gqlService;
    }
    async listUserAccessTokens(signal) {
        const data = await this.gqlService.gql({
            query: listUserAccessTokensQuery,
            context: { signal },
        });
        return data.revealedAccessTokens;
    }
    async generateUserAccessToken(name, expiresAt, signal) {
        const data = await this.gqlService.gql({
            query: generateUserAccessTokenMutation,
            variables: { input: { name, expiresAt } },
            context: { signal },
        });
        return data.generateUserAccessToken;
    }
    async revokeUserAccessToken(id, signal) {
        const data = await this.gqlService.gql({
            query: revokeUserAccessTokenMutation,
            variables: { id },
            context: { signal },
        });
        return data.revokeUserAccessToken;
    }
}
//# sourceMappingURL=access-token.js.map