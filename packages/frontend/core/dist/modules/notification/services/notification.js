import { Service } from '@toeverything/infra';
export class NotificationService extends Service {
    constructor(store) {
        super();
        this.store = store;
    }
    async mentionUser(userId, workspaceId, doc) {
        return this.store.mentionUser(userId, workspaceId, doc);
    }
}
//# sourceMappingURL=notification.js.map