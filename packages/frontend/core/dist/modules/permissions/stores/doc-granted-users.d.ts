import type { WorkspaceServerService } from '@affine/core/modules/cloud';
import { type DocRole, type GrantDocUserRolesInput, type PaginationInput, type UpdateDocDefaultRoleInput } from '@affine/graphql';
import { Store } from '@toeverything/infra';
export declare class DocGrantedUsersStore extends Store {
    private readonly workspaceServerService;
    constructor(workspaceServerService: WorkspaceServerService);
    fetchDocGrantedUsersList(workspaceId: string, docId: string, pagination: PaginationInput, signal?: AbortSignal): Promise<{
        __typename?: "PaginatedGrantedDocUserType";
        totalCount: number;
        pageInfo: {
            __typename?: "PageInfo";
            endCursor: string | null;
            hasNextPage: boolean;
        };
        edges: Array<{
            __typename?: "GrantedDocUserTypeEdge";
            node: {
                __typename?: "GrantedDocUserType";
                role: DocRole;
                user: {
                    __typename?: "WorkspaceUserType";
                    id: string;
                    name: string;
                    email: string;
                    avatarUrl: string | null;
                };
            };
        }>;
    }>;
    grantDocUserRoles(input: GrantDocUserRolesInput): Promise<boolean>;
    revokeDocUserRoles(workspaceId: string, docId: string, userId: string): Promise<boolean>;
    updateDocUserRole(workspaceId: string, docId: string, userId: string, role: DocRole): Promise<boolean>;
    updateDocDefaultRole(input: UpdateDocDefaultRoleInput): Promise<boolean>;
}
//# sourceMappingURL=doc-granted-users.d.ts.map