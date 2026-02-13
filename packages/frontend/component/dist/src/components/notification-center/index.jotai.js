import { atom } from 'jotai';
import { nanoid } from 'nanoid';
const notificationsBaseAtom = atom([]);
const expandNotificationCenterBaseAtom = atom(false);
const cleanupQueueAtom = atom([]);
/**
 * @deprecated use `import { notify } from '@affine/component'` instead
 */
export const expandNotificationCenterAtom = atom(get => get(expandNotificationCenterBaseAtom), (get, set, value) => {
    if (value === false) {
        get(cleanupQueueAtom).forEach(cleanup => cleanup());
        set(cleanupQueueAtom, []);
    }
    set(expandNotificationCenterBaseAtom, value);
});
/**
 * @deprecated use `import { notify } from '@affine/component'` instead
 */
export const notificationsAtom = atom(get => get(notificationsBaseAtom));
/**
 * @deprecated use `import { notify } from '@affine/component'` instead
 */
export const removeNotificationAtom = atom(null, (_, set, key) => {
    set(notificationsBaseAtom, notifications => notifications.filter(notification => notification.key !== key));
});
/**
 * @deprecated use `import { notify } from '@affine/component'` instead
 */
export const pushNotificationAtom = atom(null, (_, set, newNotification) => {
    newNotification.key = newNotification.key || nanoid();
    const key = newNotification.key;
    const removeNotification = () => set(notificationsBaseAtom, notifications => notifications.filter(notification => notification.key !== key));
    const action = newNotification.action
        ? (() => {
            const action = newNotification.action;
            return async function actionNotificationWrapper() {
                removeNotification();
                return action();
            };
        })()
        : undefined;
    set(notificationsBaseAtom, notifications => [
        // push to the top
        { ...newNotification, action },
        ...notifications,
    ]);
});
//# sourceMappingURL=index.jotai.js.map