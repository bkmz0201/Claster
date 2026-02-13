import { Store } from '@toeverything/infra';
import type { WorkspaceServerService } from '../../cloud';
export declare class MemberSearchStore extends Store {
    private readonly workspaceServerService;
    constructor(workspaceServerService: WorkspaceServerService);
    getMembersByEmailOrName(workspaceId: string, query?: string, skip?: number, take?: number, signal?: AbortSignal): Promise<{
        __typename?: "WorkspaceType";
        memberCount: number;
        members: Array<{
            __typename?: "InviteUserType";
            id: string;
            name: string | null;
            email: string | null;
            avatarUrl: string | null;
            permission: import("@affine/graphql").Permission;
            inviteId: string;
            emailVerified: boolean | null;
            status: import("@affine/graphql").WorkspaceMemberStatus;
        }>;
    }>;
}
//# sourceMappingURL=member-search.d.ts.map