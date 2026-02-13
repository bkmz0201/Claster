import { type Permission, type WorkspaceInviteLinkExpireTime } from '@affine/graphql';
import { Store } from '@toeverything/infra';
import type { WorkspaceServerService } from '../../cloud';
export declare class WorkspaceMembersStore extends Store {
    private readonly workspaceServerService;
    constructor(workspaceServerService: WorkspaceServerService);
    fetchMembers(workspaceId: string, skip: number, take: number, signal?: AbortSignal): Promise<{
        __typename?: "WorkspaceType";
        memberCount: number;
        members: Array<{
            __typename?: "InviteUserType";
            id: string;
            name: string | null;
            email: string | null;
            avatarUrl: string | null;
            permission: Permission;
            inviteId: string;
            emailVerified: boolean | null;
            status: import("@affine/graphql").WorkspaceMemberStatus;
        }>;
    }>;
    inviteBatch(workspaceId: string, emails: string[]): Promise<{
        __typename?: "InviteResult";
        email: string;
        inviteId: string | null;
        sentSuccess: boolean;
    }[]>;
    generateInviteLink(workspaceId: string, expireTime: WorkspaceInviteLinkExpireTime): Promise<{
        __typename?: "InviteLink";
        link: string;
        expireTime: string;
    }>;
    revokeInviteLink(workspaceId: string, signal?: AbortSignal): Promise<boolean>;
    revokeMemberPermission(workspaceId: string, userId: string, signal?: AbortSignal): Promise<boolean>;
    approveMember(workspaceId: string, userId: string): Promise<boolean>;
    adjustMemberPermission(workspaceId: string, userId: string, permission: Permission): Promise<boolean>;
}
//# sourceMappingURL=members.d.ts.map