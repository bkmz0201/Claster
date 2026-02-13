import { openHomePage } from '@affine-test/kit/utils/load-page';
import { addCodeBlock, clickNewPageButton, waitForEditorLoad, } from '@affine-test/kit/utils/page-logic';
export const gotoContentFromTitle = async (page) => {
    await page.keyboard.press('Enter');
};
export const createNewPage = async (page) => {
    await clickNewPageButton(page);
};
export const initCodeBlockByOneStep = async (page) => {
    await openHomePage(page);
    await createNewPage(page);
    await waitForEditorLoad(page);
    await gotoContentFromTitle(page);
    await addCodeBlock(page);
};
//# sourceMappingURL=utils.js.map