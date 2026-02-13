import { DocRole, type GetPageGrantedUsersListQuery } from '@affine/graphql';
import { LiveData, Service } from '@toeverything/infra';
import type { DocService } from '../../doc';
import type { WorkspaceService } from '../../workspace';
import type { DocGrantedUsersStore } from '../stores/doc-granted-users';
export type GrantedUser = GetPageGrantedUsersListQuery['workspace']['doc']['grantedUsersList']['edges'][number]['node'];
export declare class DocGrantedUsersService extends Service {
    private readonly store;
    private readonly workspaceService;
    private readonly docService;
    constructor(store: DocGrantedUsersStore, workspaceService: WorkspaceService, docService: DocService);
    readonly PAGE_SIZE = 8;
    nextCursor$: LiveData<string | undefined>;
    hasMore$: LiveData<boolean>;
    grantedUserCount$: LiveData<number>;
    grantedUsers$: LiveData<{
        __typename?: "GrantedDocUserType";
        role: DocRole;
        user: {
            __typename?: "WorkspaceUserType";
            id: string;
            name: string;
            email: string;
            avatarUrl: string | null;
        };
    }[]>;
    isLoading$: LiveData<boolean>;
    error$: LiveData<any>;
    readonly loadMore: import("@toeverything/infra").Effect<unknown>;
    reset(): void;
    grantUsersRole(userIds: string[], role: DocRole): Promise<void>;
    revokeUsersRole(userId: string): Promise<void>;
    updateUserRole(userId: string, role: DocRole): Promise<boolean>;
    updateDocDefaultRole(role: DocRole): Promise<boolean>;
    dispose(): void;
}
//# sourceMappingURL=doc-granted-users.d.ts.map