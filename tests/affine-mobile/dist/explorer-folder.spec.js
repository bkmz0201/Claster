import { test } from '@affine-test/kit/mobile';
import { expect } from '@playwright/test';
import { expandCollapsibleSection, getAttrOfActiveElement, openNavigationPanelNodeMenu, } from './utils';
const locateFolder = async (scope, name) => {
    return scope.locator(`[data-role="navigation-panel-folder"][aria-label="${name}"]`);
};
/**
 * Check rename input is focused
 */
const isRenameInputFocused = async (page) => {
    const focusElTestid = await getAttrOfActiveElement(page);
    expect(focusElTestid).toEqual('rename-input');
};
const createRootFolder = async (page, name) => {
    const section = await expandCollapsibleSection(page, 'organize');
    await section.getByTestId('navigation-panel-bar-add-organize-button').tap();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await isRenameInputFocused(page);
    await page.keyboard.type(name);
    await dialog.getByTestId('rename-confirm').tap();
    await expect(dialog).not.toBeVisible();
    const node = await locateFolder(section, name);
    return node;
};
const createSubFolder = async (page, parent, name) => {
    const menu = await openNavigationPanelNodeMenu(page, parent);
    await menu.getByTestId('create-subfolder').tap();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await isRenameInputFocused(page);
    await page.keyboard.type(name);
    await dialog.getByTestId('rename-confirm').tap();
    await expect(dialog).not.toBeVisible();
    const node = await locateFolder(parent, name);
    return node;
};
test('create a folder', async ({ page }) => {
    const node = await createRootFolder(page, 'Test Folder');
    await expect(node).toBeVisible();
});
test('create a sub folder', async ({ page }) => {
    const parent = await createRootFolder(page, 'Parent Folder');
    await expect(parent).toBeVisible();
    await parent.tap();
    const child = await createSubFolder(page, parent, 'Child Folder');
    await expect(child).toBeVisible();
});
test('create a folder and rename it', async ({ page }) => {
    const originalName = 'Test Folder';
    const appendedName = ' Renamed';
    const folder = await createRootFolder(page, originalName);
    const menu = await openNavigationPanelNodeMenu(page, folder);
    await menu.getByTestId('rename-folder').tap();
    await isRenameInputFocused(page);
    await page.keyboard.type(appendedName);
    await menu.getByTestId('rename-confirm').tap();
    const renamedFolder = await locateFolder(page, originalName + appendedName);
    await expect(folder).not.toBeVisible();
    await expect(renamedFolder).toBeVisible();
});
//# sourceMappingURL=explorer-folder.spec.js.map