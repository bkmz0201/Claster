import { Store } from '@toeverything/infra';
import type { GraphQLService } from '../services/graphql';
export declare class InviteInfoStore extends Store {
    private readonly gqlService;
    constructor(gqlService: GraphQLService);
    getInviteInfo(inviteId?: string, signal?: AbortSignal): Promise<{
        __typename?: "InvitationType";
        status: import("@affine/graphql").WorkspaceMemberStatus | null;
        workspace: {
            __typename?: "InvitationWorkspaceType";
            id: string;
            name: string;
            avatar: string;
        };
        user: {
            __typename?: "WorkspaceUserType";
            id: string;
            name: string;
            avatarUrl: string | null;
        };
        invitee: {
            __typename?: "WorkspaceUserType";
            id: string;
            name: string;
            email: string;
            avatarUrl: string | null;
        };
    }>;
}
//# sourceMappingURL=invite-info.d.ts.map