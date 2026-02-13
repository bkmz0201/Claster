import { expect } from '@playwright/test';
import { test as baseTest } from './playwright';
export const test = baseTest.extend({
    page: async ({ page }, use) => {
        await page.goto('/');
        await expect(page.locator('.affine-page-viewport[data-mode="page"]')).toBeVisible({
            timeout: 30 * 1000,
        });
        await page.goto('/');
        await use(page);
        console.log('Browser User Agent:', await page.evaluate(() => navigator.userAgent));
    },
});
//# sourceMappingURL=mobile.js.map