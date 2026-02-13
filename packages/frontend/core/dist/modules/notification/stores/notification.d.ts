import { type DocMode, type ListNotificationsQuery, type PaginationInput, type UnionNotificationBodyType } from '@affine/graphql';
import { Store } from '@toeverything/infra';
import type { GraphQLService, ServerService } from '../../cloud';
import type { GlobalSessionState } from '../../storage';
export type Notification = NonNullable<ListNotificationsQuery['currentUser']>['notifications']['edges'][number]['node'];
export type NotificationBody = UnionNotificationBodyType;
export { NotificationType } from '@affine/graphql';
export declare class NotificationStore extends Store {
    private readonly gqlService;
    private readonly serverService;
    private readonly globalSessionState;
    constructor(gqlService: GraphQLService, serverService: ServerService, globalSessionState: GlobalSessionState);
    watchNotificationCountCache(): import("rxjs").Observable<number>;
    setNotificationCountCache(count: number): void;
    getNotificationCount(signal?: AbortSignal): Promise<number | undefined>;
    listNotification(pagination: PaginationInput, signal?: AbortSignal): Promise<{
        __typename?: "PaginatedNotificationObjectType";
        totalCount: number;
        edges: Array<{
            __typename?: "NotificationObjectTypeEdge";
            cursor: string;
            node: {
                __typename?: "NotificationObjectType";
                id: string;
                type: import("@affine/graphql").NotificationType;
                level: import("@affine/graphql").NotificationLevel;
                read: boolean;
                createdAt: string;
                updatedAt: string;
                body: any;
            };
        }>;
        pageInfo: {
            __typename?: "PageInfo";
            startCursor: string | null;
            endCursor: string | null;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
        };
    } | undefined>;
    readNotification(id: string): Promise<import("@affine/graphql").ReadNotificationMutation>;
    readAllNotifications(): Promise<import("@affine/graphql").ReadAllNotificationsMutation>;
    mentionUser(userId: string, workspaceId: string, doc: {
        id: string;
        title: string;
        blockId?: string;
        elementId?: string;
        mode: DocMode;
    }): Promise<string>;
}
//# sourceMappingURL=notification.d.ts.map