import { Path, ProjectRoot } from '@affine-tools/utils/path';
import type { BrowserContext } from '@playwright/test';
export { Path, ProjectRoot };
export declare const testResultDir: string;
export declare const istanbulTempDir: string;
export declare const enableCoverage: boolean;
type CurrentDocCollection = {
    meta: {
        id: string;
        flavour: string;
    };
};
export declare const skipOnboarding: (context: BrowserContext) => Promise<void>;
export declare const test: import("playwright/test").TestType<import("playwright/test").PlaywrightTestArgs & import("playwright/test").PlaywrightTestOptions & {
    workspace: {
        current: () => Promise<CurrentDocCollection>;
    };
}, import("playwright/test").PlaywrightWorkerArgs & import("playwright/test").PlaywrightWorkerOptions>;
//# sourceMappingURL=playwright.d.ts.map