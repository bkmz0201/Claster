import { approveWorkspaceTeamMemberMutation, createInviteLinkMutation, getMembersByWorkspaceIdQuery, grantWorkspaceTeamMemberMutation, inviteByEmailsMutation, revokeInviteLinkMutation, revokeMemberPermissionMutation, } from '@affine/graphql';
import { Store } from '@toeverything/infra';
export class WorkspaceMembersStore extends Store {
    constructor(workspaceServerService) {
        super();
        this.workspaceServerService = workspaceServerService;
    }
    async fetchMembers(workspaceId, skip, take, signal) {
        if (!this.workspaceServerService.server) {
            throw new Error('No Server');
        }
        const data = await this.workspaceServerService.server.gql({
            query: getMembersByWorkspaceIdQuery,
            variables: {
                workspaceId,
                skip,
                take,
            },
            context: {
                signal,
            },
        });
        return data.workspace;
    }
    async inviteBatch(workspaceId, emails) {
        if (!this.workspaceServerService.server) {
            throw new Error('No Server');
        }
        const inviteBatch = await this.workspaceServerService.server.gql({
            query: inviteByEmailsMutation,
            variables: {
                workspaceId,
                emails,
            },
        });
        return inviteBatch.inviteMembers;
    }
    async generateInviteLink(workspaceId, expireTime) {
        if (!this.workspaceServerService.server) {
            throw new Error('No Server');
        }
        const inviteLink = await this.workspaceServerService.server.gql({
            query: createInviteLinkMutation,
            variables: {
                workspaceId,
                expireTime,
            },
        });
        return inviteLink.createInviteLink;
    }
    async revokeInviteLink(workspaceId, signal) {
        if (!this.workspaceServerService.server) {
            throw new Error('No Server');
        }
        const revoke = await this.workspaceServerService.server.gql({
            query: revokeInviteLinkMutation,
            variables: {
                workspaceId,
            },
            context: { signal },
        });
        return revoke.revokeInviteLink;
    }
    async revokeMemberPermission(workspaceId, userId, signal) {
        if (!this.workspaceServerService.server) {
            throw new Error('No Server');
        }
        const revoke = await this.workspaceServerService.server.gql({
            query: revokeMemberPermissionMutation,
            variables: {
                workspaceId,
                userId,
            },
            context: { signal },
        });
        return revoke.revokeMember;
    }
    async approveMember(workspaceId, userId) {
        if (!this.workspaceServerService.server) {
            throw new Error('No Server');
        }
        const member = await this.workspaceServerService.server.gql({
            query: approveWorkspaceTeamMemberMutation,
            variables: {
                workspaceId,
                userId,
            },
        });
        return member.approveMember;
    }
    async adjustMemberPermission(workspaceId, userId, permission) {
        if (!this.workspaceServerService.server) {
            throw new Error('No Server');
        }
        const member = await this.workspaceServerService.server.gql({
            query: grantWorkspaceTeamMemberMutation,
            variables: {
                workspaceId,
                userId,
                permission,
            },
        });
        return member.grantMember;
    }
}
//# sourceMappingURL=members.js.map