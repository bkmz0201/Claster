import { Store } from '@toeverything/infra';
import type { GraphQLService } from '../services/graphql';
export declare class AcceptInviteStore extends Store {
    private readonly gqlService;
    constructor(gqlService: GraphQLService);
    acceptInvite(workspaceId: string, inviteId: string, signal?: AbortSignal): Promise<boolean>;
}
//# sourceMappingURL=accept-invite.d.ts.map