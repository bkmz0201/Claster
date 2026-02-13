import { listNotificationsQuery, mentionUserMutation, notificationCountQuery, readAllNotificationsMutation, readNotificationMutation, } from '@affine/graphql';
import { Store } from '@toeverything/infra';
import { map } from 'rxjs';
export { NotificationType } from '@affine/graphql';
export class NotificationStore extends Store {
    constructor(gqlService, serverService, globalSessionState) {
        super();
        this.gqlService = gqlService;
        this.serverService = serverService;
        this.globalSessionState = globalSessionState;
    }
    watchNotificationCountCache() {
        return this.globalSessionState
            .watch('notification-count:' + this.serverService.server.id)
            .pipe(map(count => {
            if (typeof count === 'number') {
                return count;
            }
            return 0;
        }));
    }
    setNotificationCountCache(count) {
        this.globalSessionState.set('notification-count:' + this.serverService.server.id, count);
    }
    async getNotificationCount(signal) {
        const result = await this.gqlService.gql({
            query: notificationCountQuery,
            context: {
                signal,
            },
        });
        return result.currentUser?.notificationCount;
    }
    async listNotification(pagination, signal) {
        const result = await this.gqlService.gql({
            query: listNotificationsQuery,
            variables: {
                pagination: pagination,
            },
            context: {
                signal,
            },
        });
        return result.currentUser?.notifications;
    }
    readNotification(id) {
        return this.gqlService.gql({
            query: readNotificationMutation,
            variables: {
                id,
            },
        });
    }
    readAllNotifications() {
        return this.gqlService.gql({
            query: readAllNotificationsMutation,
        });
    }
    async mentionUser(userId, workspaceId, doc) {
        const result = await this.gqlService.gql({
            query: mentionUserMutation,
            variables: {
                input: {
                    userId,
                    workspaceId,
                    doc,
                },
            },
        });
        return result.mentionUser;
    }
}
//# sourceMappingURL=notification.js.map