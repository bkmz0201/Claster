import { Service } from '@toeverything/infra';
import { WorkspaceMembers } from '../entities/members';
export class WorkspaceMembersService extends Service {
    constructor(store, workspaceService) {
        super();
        this.store = store;
        this.workspaceService = workspaceService;
        this.members = this.framework.createEntity(WorkspaceMembers);
    }
    async inviteMembers(emails) {
        return await this.store.inviteBatch(this.workspaceService.workspace.id, emails);
    }
    async generateInviteLink(expireTime) {
        return await this.store.generateInviteLink(this.workspaceService.workspace.id, expireTime);
    }
    async revokeInviteLink() {
        return await this.store.revokeInviteLink(this.workspaceService.workspace.id);
    }
    async revokeMember(userId) {
        return await this.store.revokeMemberPermission(this.workspaceService.workspace.id, userId);
    }
    async approveMember(userId) {
        return await this.store.approveMember(this.workspaceService.workspace.id, userId);
    }
    async adjustMemberPermission(userId, permission) {
        return await this.store.adjustMemberPermission(this.workspaceService.workspace.id, userId, permission);
    }
}
//# sourceMappingURL=members.js.map