import { skipOnboarding } from '@affine-test/kit/playwright';
import { createRandomAIUser, switchDefaultChatModel, } from '@affine-test/kit/utils/cloud';
import { openHomePage, setCoreUrl } from '@affine-test/kit/utils/load-page';
import { clickNewPageButton, waitForEditorLoad, } from '@affine-test/kit/utils/page-logic';
import { createLocalWorkspace } from '@affine-test/kit/utils/workspace';
export class TestUtils {
    constructor() {
        this.isProduction = process.env.NODE_ENV === 'production';
        if (process.env.PLAYWRIGHT_USER_AGENT &&
            process.env.PLAYWRIGHT_EMAIL &&
            !process.env.PLAYWRIGHT_PASSWORD) {
            setCoreUrl(process.env.PLAYWRIGHT_CORE_URL || 'http://localhost:8080');
            this.isProduction = true;
        }
    }
    static getInstance() {
        if (!TestUtils.instance) {
            TestUtils.instance = new TestUtils();
        }
        return TestUtils.instance;
    }
    getUser() {
        if (!this.isProduction ||
            !process.env.PLAYWRIGHT_EMAIL ||
            !process.env.PLAYWRIGHT_PASSWORD) {
            return createRandomAIUser();
        }
        return {
            email: process.env.PLAYWRIGHT_EMAIL,
            password: process.env.PLAYWRIGHT_PASSWORD,
        };
    }
    async createNewPage(page) {
        await clickNewPageButton(page);
        await waitForEditorLoad(page);
    }
    async setupTestEnvironment(page, defaultModel = 'gemini-2.5-flash') {
        await switchDefaultChatModel(defaultModel);
        await skipOnboarding(page.context());
        await openHomePage(page);
        await this.createNewPage(page);
    }
    async createTestWorkspace(page, name = 'test') {
        await createLocalWorkspace({ name }, page);
    }
}
//# sourceMappingURL=test-utils.js.map