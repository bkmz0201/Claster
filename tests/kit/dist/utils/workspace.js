import { expect } from '@playwright/test';
import { waitForEditorLoad } from './page-logic';
export async function openWorkspaceListModal(page) {
    await page.getByTestId('app-sidebar').getByTestId('workspace-name').click({
        delay: 50,
    });
}
export async function createLocalWorkspace(params, page, skipOpenWorkspaceListModal = false, serverId) {
    if (!skipOpenWorkspaceListModal) {
        await openWorkspaceListModal(page);
    }
    // open create workspace modal
    await page.getByTestId('new-workspace').click();
    // const isDesktop: boolean = await page.evaluate(() => {
    //   return !!window.appInfo?.electron;
    // }, []);
    // input workspace name
    await page.getByPlaceholder('Set a Workspace name').click();
    await page.getByPlaceholder('Set a Workspace name').fill(params.name);
    await page.getByTestId('server-selector-trigger').click();
    const serverSelectorList = page.getByTestId('server-selector-list');
    await serverSelectorList.getByTestId(serverId ?? 'local').click();
    // click create button
    await page.getByTestId('create-workspace-create-button').click({
        delay: 500,
    });
    await expect(page.getByTestId('create-workspace-create-button')).not.toBeAttached();
    await waitForEditorLoad(page);
    await expect(page.getByTestId('workspace-name')).toHaveText(params.name);
    // if (isDesktop) {
    //   await page.getByTestId('create-workspace-continue-button').click();
    // }
}
//# sourceMappingURL=workspace.js.map