import type { DocMode } from '@affine/graphql';
import { Service } from '@toeverything/infra';
import type { NotificationStore } from '../stores/notification';
export declare class NotificationService extends Service {
    private readonly store;
    constructor(store: NotificationStore);
    mentionUser(userId: string, workspaceId: string, doc: {
        id: string;
        title: string;
        blockId?: string;
        elementId?: string;
        mode: DocMode;
    }): Promise<string>;
}
//# sourceMappingURL=notification.d.ts.map