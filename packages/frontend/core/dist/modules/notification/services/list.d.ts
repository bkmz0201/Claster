import { LiveData, Service } from '@toeverything/infra';
import type { NotificationStore } from '../stores/notification';
import type { NotificationCountService } from './count';
export declare class NotificationListService extends Service {
    private readonly store;
    private readonly notificationCount;
    isLoading$: LiveData<boolean>;
    notifications$: LiveData<{
        __typename?: "NotificationObjectType";
        id: string;
        type: import("@affine/graphql").NotificationType;
        level: import("@affine/graphql").NotificationLevel;
        read: boolean;
        createdAt: string;
        updatedAt: string;
        body: any;
    }[]>;
    nextCursor$: LiveData<string | undefined>;
    hasMore$: LiveData<boolean>;
    error$: LiveData<any>;
    readonly PAGE_SIZE = 8;
    constructor(store: NotificationStore, notificationCount: NotificationCountService);
    readonly loadMore: import("@toeverything/infra").Effect<unknown>;
    reset(): void;
    readNotification(id: string): Promise<void>;
    readAllNotifications(): Promise<void>;
}
//# sourceMappingURL=list.d.ts.map