import type { JSX, ReactNode } from 'react';
/**
 * @deprecated use `import type { Notification } from '@affine/component'` instead
 */
export type Notification = {
    key?: string;
    title: string;
    message?: string;
    type: 'success' | 'error' | 'warning' | 'info';
    theme?: 'light' | 'dark' | 'default';
    timeout?: number;
    progressingBar?: boolean;
    multimedia?: ReactNode | JSX.Element;
    action?: () => Promise<void>;
    actionLabel?: string;
};
/**
 * @deprecated use `import { notify } from '@affine/component'` instead
 */
export declare const expandNotificationCenterAtom: import("jotai").WritableAtom<boolean, [boolean], void>;
/**
 * @deprecated use `import { notify } from '@affine/component'` instead
 */
export declare const notificationsAtom: import("jotai").Atom<Notification[]>;
/**
 * @deprecated use `import { notify } from '@affine/component'` instead
 */
export declare const removeNotificationAtom: import("jotai").WritableAtom<null, [key: string], void> & {
    init: null;
};
/**
 * @deprecated use `import { notify } from '@affine/component'` instead
 */
export declare const pushNotificationAtom: import("jotai").WritableAtom<null, [Notification], void> & {
    init: null;
};
//# sourceMappingURL=index.jotai.d.ts.map