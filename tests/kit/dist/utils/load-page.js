import { expect } from '@playwright/test';
export let coreUrl = 'http://localhost:8080';
export function setCoreUrl(url) {
    coreUrl = url;
}
export async function openHomePage(page) {
    await page.goto(coreUrl);
}
export async function open404Page(page) {
    await page.goto(`${coreUrl}/404`);
}
export async function confirmCreateJournal(page) {
    const confirmButton = page.getByTestId('confirm-create-journal-button');
    await confirmButton.click();
}
export async function openJournalsPage(page) {
    await page.getByTestId('slider-bar-journals-button').click();
    await confirmCreateJournal(page);
    await expect(page.locator('.doc-title-container:has-text("Today")')).toBeVisible();
}
//# sourceMappingURL=load-page.js.map