import type { Permission, WorkspaceInviteLinkExpireTime } from '@affine/graphql';
import { Service } from '@toeverything/infra';
import type { WorkspaceService } from '../../workspace';
import { WorkspaceMembers } from '../entities/members';
import type { WorkspaceMembersStore } from '../stores/members';
export declare class WorkspaceMembersService extends Service {
    private readonly store;
    private readonly workspaceService;
    constructor(store: WorkspaceMembersStore, workspaceService: WorkspaceService);
    members: WorkspaceMembers;
    inviteMembers(emails: string[]): Promise<{
        __typename?: "InviteResult";
        email: string;
        inviteId: string | null;
        sentSuccess: boolean;
    }[]>;
    generateInviteLink(expireTime: WorkspaceInviteLinkExpireTime): Promise<{
        __typename?: "InviteLink";
        link: string;
        expireTime: string;
    }>;
    revokeInviteLink(): Promise<boolean>;
    revokeMember(userId: string): Promise<boolean>;
    approveMember(userId: string): Promise<boolean>;
    adjustMemberPermission(userId: string, permission: Permission): Promise<boolean>;
}
//# sourceMappingURL=members.d.ts.map