// eslint-disable no-empty-pattern
import { test as base } from '@affine-test/kit/playwright';
import { ChatPanelUtils } from '../utils/chat-panel-utils';
import { EditorUtils } from '../utils/editor-utils';
import { SettingsPanelUtils } from '../utils/settings-panel-utils';
import { TestUtils } from '../utils/test-utils';
export const test = base.extend({
    utils: async ({}, use) => {
        const testUtils = TestUtils.getInstance();
        await use({
            testUtils,
            chatPanel: ChatPanelUtils,
            editor: EditorUtils,
            settings: SettingsPanelUtils,
        });
    },
    loggedInPage: async ({ browser }, use) => {
        const context = await browser.newContext({
            storageState: 'storageState.json',
        });
        const page = await context.newPage();
        await use(page);
        await context.close();
    },
});
//# sourceMappingURL=base-test.js.map