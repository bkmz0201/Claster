import type { Page } from '@playwright/test';
import { ChatPanelUtils } from '../utils/chat-panel-utils';
import { EditorUtils } from '../utils/editor-utils';
import { SettingsPanelUtils } from '../utils/settings-panel-utils';
import { TestUtils } from '../utils/test-utils';
interface TestUtilsFixtures {
    utils: {
        testUtils: TestUtils;
        chatPanel: typeof ChatPanelUtils;
        editor: typeof EditorUtils;
        settings: typeof SettingsPanelUtils;
    };
    loggedInPage: Page;
}
export declare const test: import("playwright/test").TestType<import("playwright/test").PlaywrightTestArgs & import("playwright/test").PlaywrightTestOptions & {
    workspace: {
        current: () => Promise<{
            meta: {
                id: string;
                flavour: string;
            };
        }>;
    };
} & TestUtilsFixtures, import("playwright/test").PlaywrightWorkerArgs & import("playwright/test").PlaywrightWorkerOptions>;
export type TestFixtures = typeof test;
export {};
//# sourceMappingURL=base-test.d.ts.map