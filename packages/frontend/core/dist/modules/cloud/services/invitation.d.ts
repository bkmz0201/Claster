import type { GetInviteInfoQuery } from '@affine/graphql';
import { LiveData, Service } from '@toeverything/infra';
import type { AcceptInviteStore } from '../stores/accept-invite';
import type { InviteInfoStore } from '../stores/invite-info';
export type InviteInfo = GetInviteInfoQuery['getInviteInfo'];
export declare class InvitationService extends Service {
    private readonly acceptInviteStore;
    private readonly inviteInfoStore;
    constructor(acceptInviteStore: AcceptInviteStore, inviteInfoStore: InviteInfoStore);
    inviteId$: LiveData<string | undefined>;
    inviteInfo$: LiveData<{
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
    } | undefined>;
    loading$: LiveData<boolean>;
    error$: LiveData<any>;
    readonly getInviteInfo: import("@toeverything/infra").Effect<{
        inviteId: string;
    }>;
    acceptInvite(inviteId: string): Promise<boolean>;
    dispose(): void;
}
//# sourceMappingURL=invitation.d.ts.map