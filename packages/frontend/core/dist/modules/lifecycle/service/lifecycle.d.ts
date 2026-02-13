import { Service } from '@toeverything/infra';
/**
 * Event that is emitted when application is started.
 */
export declare const ApplicationStarted: import("@toeverything/infra").FrameworkEvent<boolean>;
/**
 * Event that is emitted when browser tab or windows is focused again, after being blurred.
 * Can be used to actively refresh some data.
 */
export declare const ApplicationFocused: import("@toeverything/infra").FrameworkEvent<boolean>;
export declare class LifecycleService extends Service {
    constructor();
    applicationStart(): void;
    applicationFocus(): void;
}
//# sourceMappingURL=lifecycle.d.ts.map