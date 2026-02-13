import { type ListUserAccessTokensQuery } from '@affine/graphql';
import { Store } from '@toeverything/infra';
import type { GraphQLService } from '../services/graphql';
export type AccessToken = ListUserAccessTokensQuery['revealedAccessTokens'][number];
export declare class AccessTokenStore extends Store {
    private readonly gqlService;
    constructor(gqlService: GraphQLService);
    listUserAccessTokens(signal?: AbortSignal): Promise<AccessToken[]>;
    generateUserAccessToken(name: string, expiresAt?: string, signal?: AbortSignal): Promise<{
        __typename?: "RevealedAccessToken";
        id: string;
        name: string;
        token: string;
        createdAt: string;
        expiresAt: string | null;
    }>;
    revokeUserAccessToken(id: string, signal?: AbortSignal): Promise<boolean>;
}
//# sourceMappingURL=access-token.d.ts.map