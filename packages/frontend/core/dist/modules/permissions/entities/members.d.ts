import type { GetMembersByWorkspaceIdQuery } from '@affine/graphql';
import { Entity, LiveData } from '@toeverything/infra';
import type { WorkspaceService } from '../../workspace';
import type { WorkspaceMembersStore } from '../stores/members';
export type Member = GetMembersByWorkspaceIdQuery['workspace']['members'][number];
export declare class WorkspaceMembers extends Entity {
    private readonly store;
    private readonly workspaceService;
    constructor(store: WorkspaceMembersStore, workspaceService: WorkspaceService);
    pageNum$: LiveData<number>;
    memberCount$: LiveData<number | undefined>;
    pageMembers$: LiveData<{
        __typename?: "InviteUserType";
        id: string;
        name: string | null;
        email: string | null;
        avatarUrl: string | null;
        permission: import("@affine/graphql").Permission;
        inviteId: string;
        emailVerified: boolean | null;
        status: import("@affine/graphql").WorkspaceMemberStatus;
    }[] | undefined>;
    isLoading$: LiveData<boolean>;
    error$: LiveData<any>;
    readonly PAGE_SIZE = 8;
    readonly revalidate: import("@toeverything/infra").Effect<unknown>;
    setPageNum(pageNum: number): void;
    dispose(): void;
}
//# sourceMappingURL=members.d.ts.map