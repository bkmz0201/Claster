import type { ReactNode } from 'react';
import type { Notification } from './index.jotai';
import { expandNotificationCenterAtom, pushNotificationAtom, removeNotificationAtom } from './index.jotai';
export { expandNotificationCenterAtom, pushNotificationAtom, removeNotificationAtom, };
type Height = {
    height: number;
    notificationKey: number | string | undefined;
};
export type NotificationCardProps = {
    notification: Notification;
    notifications: Notification[];
    index: number;
    heights: Height[];
    setHeights: React.Dispatch<React.SetStateAction<Height[]>>;
};
/**
 * @deprecated use `import { NotificationCenter } from '@affine/component'` instead
 */
export declare function NotificationCenter(): ReactNode;
//# sourceMappingURL=index.d.ts.map