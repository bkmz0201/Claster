import { type Page } from '@playwright/test';
import type { ElectronApplication } from 'playwright';
type RoutePath = 'setting';
export declare const test: import("playwright/test").TestType<import("playwright/test").PlaywrightTestArgs & import("playwright/test").PlaywrightTestOptions & {
    workspace: {
        current: () => Promise<{
            meta: {
                id: string;
                flavour: string;
            };
        }>;
    };
} & {
    electronApp: ElectronApplication;
    shell: Page;
    appInfo: {
        appPath: string;
        appData: string;
        sessionData: string;
    };
    views: {
        getActive: () => Promise<Page>;
    };
    router: {
        goto: (path: RoutePath) => Promise<void>;
    };
}, import("playwright/test").PlaywrightWorkerArgs & import("playwright/test").PlaywrightWorkerOptions>;
export {};
//# sourceMappingURL=electron.d.ts.map