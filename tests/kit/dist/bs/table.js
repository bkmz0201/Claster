import { expect } from '@playwright/test';
import { waitNextFrame } from './misc';
export async function createTable(page) {
    await page.keyboard.press('/');
    await expect(page.locator('affine-slash-menu .slash-menu')).toBeVisible();
    await page.keyboard.type('table');
    await page.keyboard.press('Enter');
    await waitNextFrame(page);
    const table = page.locator('affine-table');
    await expect(table).toBeVisible();
    const cells = table.locator('affine-table-cell');
    const cellCount = await cells.count();
    expect(cellCount).toBe(4);
    for (let i = 0; i < cellCount; i++) {
        await inputToCell(page, i, `Cell${i + 1}`);
    }
}
export async function getCellText(page, nth, table) {
    table = table ?? page.locator('affine-table');
    const cell = table.locator('affine-table-cell').nth(nth);
    await cell.hover();
    await waitNextFrame(page);
    return cell.locator('v-line').innerText();
}
export async function inputToCell(page, nth, text, table) {
    table = table ?? page.locator('affine-table');
    const cell = table.locator('affine-table-cell').nth(nth);
    await cell.hover();
    await waitNextFrame(page);
    await cell.click();
    await cell.click();
    await waitNextFrame(page);
    await page.keyboard.type(text, { delay: 20 });
}
export async function clickDeleteButtonInTableMenu(page) {
    const menu = page.locator('affine-menu');
    await expect(menu).toBeVisible();
    const deleteButton = menu.getByText('Delete');
    await expect(deleteButton).toBeVisible();
    await deleteButton.click();
}
//# sourceMappingURL=table.js.map