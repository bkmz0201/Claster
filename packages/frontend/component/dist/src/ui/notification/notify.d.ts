import { UserFriendlyError } from '@affine/error';
import type { FC } from 'react';
import { type ExternalToast } from 'sonner';
import { DesktopNotificationCenter } from './desktop/notification-center';
import type { Notification, NotificationCustomRendererProps } from './types';
declare const NotificationCenter: typeof DesktopNotificationCenter;
export { NotificationCenter };
/**
 *
 * @returns {string} toastId
 */
export declare function notify(notification: Notification, options?: ExternalToast): string | number;
export declare namespace notify {
    var error: (notification: Notification | UserFriendlyError, options?: ExternalToast) => string | number;
    var success: (notification: Notification, options?: ExternalToast) => string | number;
    var warning: (notification: Notification, options?: ExternalToast) => string | number;
    var custom: (Component: FC<NotificationCustomRendererProps>, options?: ExternalToast) => string | number;
    var dismiss: (id?: number | string) => string | number;
}
//# sourceMappingURL=notify.d.ts.map