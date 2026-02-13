import { openHomePage } from '@affine-test/kit/utils/load-page';
import { addDatabase, clickNewPageButton, waitForEditorLoad, } from '@affine-test/kit/utils/page-logic';
import { expect } from '@playwright/test';
export async function createNewPage(page) {
    await clickNewPageButton(page);
}
export const gotoContentFromTitle = async (page) => {
    await page.keyboard.press('Enter');
};
export async function createDatabaseBlock(page) {
    await addDatabase(page);
}
export async function addRows(page, rowCount) {
    for (let i = 0; i < rowCount; i++) {
        await addDatabaseRow(page);
    }
}
export async function addDatabaseRow(page) {
    const addButton = page.locator('.data-view-table-group-add-row');
    await addButton.click();
}
export async function pasteString(page, data) {
    await page.evaluate(data => {
        const clipboardData = new DataTransfer();
        clipboardData.setData('text/plain', data);
        const pasteEvent = new ClipboardEvent('paste', {
            clipboardData,
            bubbles: true,
            cancelable: true,
        });
        const activeElement = document.activeElement;
        if (activeElement) {
            pasteEvent.preventDefault();
            activeElement.dispatchEvent(pasteEvent);
        }
    }, data);
}
export async function selectCell(page, nth, editing = true) {
    const firstCell = page.locator('dv-table-view-cell-container').nth(nth);
    // First click for focus
    await firstCell.click({ delay: 100 });
    // Second click for edit mode
    if (editing) {
        await firstCell.click({ delay: 100 });
    }
    return firstCell;
}
export async function verifyCellContents(page, expectedContents) {
    const cells = page.locator('dv-table-view-cell-container');
    for (let i = 0; i < expectedContents.length; i++) {
        const cell = cells.nth(i);
        await expect(cell.locator('uni-lit > *:first-child')).toHaveText(expectedContents[i]);
    }
}
export async function selectColumnType(page, columnType, nth = 1) {
    const typeMenu = page.locator('affine-menu').getByText('Type');
    await page.waitForTimeout(100);
    await typeMenu.hover();
    await page.mouse.move(0, 0);
    await page.waitForTimeout(100);
    for (const char of columnType.split('')) {
        await page.keyboard.type(char);
        await page.waitForTimeout(10);
    }
    await page.waitForTimeout(100);
    for (let i = 0; i < nth; i++) {
        await page.keyboard.press('ArrowDown');
    }
    await page.waitForTimeout(100);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(100);
}
export async function addColumn(page, type, nth = 1) {
    await clickAddColumnButton(page);
    await selectColumnType(page, type, nth);
}
export async function clickAddColumnButton(page) {
    const addColumnButton = page.locator('.header-add-column-button');
    await addColumnButton.click();
}
export async function changeColumnType(page, columnIndex, columnType) {
    const header = page.locator('affine-database-header-column').nth(columnIndex);
    await header.click();
    await selectColumnType(page, columnType);
}
export const initDatabaseByOneStep = async (page) => {
    await openHomePage(page);
    await createNewPage(page);
    await waitForEditorLoad(page);
    await gotoContentFromTitle(page);
    await createDatabaseBlock(page);
};
//# sourceMappingURL=utils.js.map