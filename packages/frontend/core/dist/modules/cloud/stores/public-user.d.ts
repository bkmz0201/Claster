import { Store } from '@toeverything/infra';
import type { GraphQLService } from '../services/graphql';
export declare class PublicUserStore extends Store {
    private readonly gqlService;
    constructor(gqlService: GraphQLService);
    getPublicUserById(id: string, signal?: AbortSignal): Promise<{
        __typename?: "PublicUserType";
        id: string;
        avatarUrl: string | null;
        name: string;
    } | null>;
}
//# sourceMappingURL=public-user.d.ts.map