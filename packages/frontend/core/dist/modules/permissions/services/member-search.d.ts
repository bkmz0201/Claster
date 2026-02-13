import { LiveData, Service } from '@toeverything/infra';
import type { WorkspaceService } from '../../workspace';
import type { MemberSearchStore } from '../stores/member-search';
export declare class MemberSearchService extends Service {
    private readonly store;
    private readonly workspaceService;
    constructor(store: MemberSearchStore, workspaceService: WorkspaceService);
    readonly PAGE_SIZE = 8;
    readonly searchText$: LiveData<string>;
    readonly isLoading$: LiveData<boolean>;
    readonly error$: LiveData<any>;
    readonly result$: LiveData<{
        __typename?: "InviteUserType";
        id: string;
        name: string | null;
        email: string | null;
        avatarUrl: string | null;
        permission: import("@affine/graphql").Permission;
        inviteId: string;
        emailVerified: boolean | null;
        status: import("@affine/graphql").WorkspaceMemberStatus;
    }[]>;
    readonly hasMore$: LiveData<boolean>;
    readonly loadMore: import("@toeverything/infra").Effect<unknown>;
    reset(): void;
    search(searchText?: string): void;
}
//# sourceMappingURL=member-search.d.ts.map