import { expect } from '@playwright/test';
export async function expectActiveTab(page, index, activeViewIndex = 0) {
    await expect(page
        .getByTestId('workbench-tab')
        .nth(index)
        .getByTestId('split-view-label')
        .nth(activeViewIndex)).toHaveAttribute('data-active', 'true');
}
export async function expectTabTitle(page, index, title) {
    if (typeof title === 'string') {
        await expect(page.getByTestId('workbench-tab').nth(index)).toContainText(title);
    }
    else {
        for (let i = 0; i < title.length; i++) {
            await expect(page
                .getByTestId('workbench-tab')
                .nth(index)
                .getByTestId('split-view-label')
                .nth(i)).toContainText(title[i]);
        }
    }
}
export async function expectTabCount(page, count) {
    await expect(page.getByTestId('workbench-tab')).toHaveCount(count);
}
export async function closeTab(page, index) {
    await page.getByTestId('workbench-tab').nth(index).hover();
    await page
        .getByTestId('workbench-tab')
        .nth(index)
        .getByTestId('close-tab-button')
        .click();
}
//# sourceMappingURL=app-tabs.js.map