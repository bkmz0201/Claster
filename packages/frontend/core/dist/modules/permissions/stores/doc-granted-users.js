import { getPageGrantedUsersListQuery, grantDocUserRolesMutation, revokeDocUserRolesMutation, updateDocDefaultRoleMutation, updateDocUserRoleMutation, } from '@affine/graphql';
import { Store } from '@toeverything/infra';
export class DocGrantedUsersStore extends Store {
    constructor(workspaceServerService) {
        super();
        this.workspaceServerService = workspaceServerService;
    }
    async fetchDocGrantedUsersList(workspaceId, docId, pagination, signal) {
        if (!this.workspaceServerService.server) {
            throw new Error('No Server');
        }
        const res = await this.workspaceServerService.server.gql({
            query: getPageGrantedUsersListQuery,
            variables: {
                workspaceId,
                docId,
                pagination,
            },
            context: { signal },
        });
        return res.workspace.doc.grantedUsersList;
    }
    async grantDocUserRoles(input) {
        if (!this.workspaceServerService.server) {
            throw new Error('No Server');
        }
        const res = await this.workspaceServerService.server.gql({
            query: grantDocUserRolesMutation,
            variables: {
                input,
            },
        });
        return res.grantDocUserRoles;
    }
    async revokeDocUserRoles(workspaceId, docId, userId) {
        if (!this.workspaceServerService.server) {
            throw new Error('No Server');
        }
        const res = await this.workspaceServerService.server.gql({
            query: revokeDocUserRolesMutation,
            variables: {
                input: {
                    workspaceId,
                    docId,
                    userId,
                },
            },
        });
        return res.revokeDocUserRoles;
    }
    async updateDocUserRole(workspaceId, docId, userId, role) {
        if (!this.workspaceServerService.server) {
            throw new Error('No Server');
        }
        const res = await this.workspaceServerService.server.gql({
            query: updateDocUserRoleMutation,
            variables: {
                input: {
                    workspaceId,
                    docId,
                    userId,
                    role,
                },
            },
        });
        return res.updateDocUserRole;
    }
    async updateDocDefaultRole(input) {
        if (!this.workspaceServerService.server) {
            throw new Error('No Server');
        }
        const res = await this.workspaceServerService.server.gql({
            query: updateDocDefaultRoleMutation,
            variables: {
                input,
            },
        });
        return res.updateDocDefaultRole;
    }
}
//# sourceMappingURL=doc-granted-users.js.map