import { toViewCoord } from './edgeless.js';
import { waitNextFrame } from './misc.js';
export function getDebugMenu(page) {
    const debugMenu = page.locator('starter-debug-menu');
    return {
        debugMenu,
        undoBtn: debugMenu.locator('sl-tooltip[content="Undo"]'),
        redoBtn: debugMenu.locator('sl-tooltip[content="Redo"]'),
        blockTypeButton: debugMenu.getByRole('button', { name: 'Block Type' }),
        testOperationsButton: debugMenu.getByRole('button', {
            name: 'Test Operations',
        }),
        pagesBtn: debugMenu.getByTestId('docs-button'),
    };
}
export async function moveView(page, point) {
    const [x, y] = await toViewCoord(page, point);
    await page.mouse.move(x, y);
}
export async function click(page, point) {
    await page.mouse.click(point.x, point.y);
}
export async function clickView(page, point) {
    const [x, y] = await toViewCoord(page, point);
    await page.mouse.click(x, y);
}
export async function dblclickView(page, point) {
    const [x, y] = await toViewCoord(page, point);
    await page.mouse.dblclick(x, y);
}
export async function undoByClick(page) {
    await getDebugMenu(page).undoBtn.click();
}
export async function redoByClick(page) {
    await getDebugMenu(page).redoBtn.click();
}
export async function clickBlockById(page, id) {
    await page.click(`[data-block-id="${id}"]`);
}
export async function doubleClickBlockById(page, id) {
    await page.dblclick(`[data-block-id="${id}"]`);
}
export async function disconnectByClick(page) {
    await clickTestOperationsMenuItem(page, 'Disconnect');
}
export async function connectByClick(page) {
    await clickTestOperationsMenuItem(page, 'Connect');
}
export async function addNoteByClick(page) {
    await clickTestOperationsMenuItem(page, 'Add Note');
}
export async function addNewPage(page) {
    const { pagesBtn } = getDebugMenu(page);
    if (!(await page.locator('docs-panel').isVisible())) {
        await pagesBtn.click();
    }
    await page.locator('.new-doc-button').click();
    const docMetas = await page.evaluate(() => {
        const { collection } = window;
        return collection.meta.docMetas;
    });
    if (!docMetas.length)
        throw new Error('Add new doc failed');
    return docMetas[docMetas.length - 1];
}
export async function switchToPage(page, docId) {
    await page.evaluate(docId => {
        const { collection, editor } = window;
        if (!docId) {
            const docMetas = collection.meta.docMetas;
            if (!docMetas.length)
                return;
            docId = docMetas[0].id;
        }
        const doc = collection.getDoc(docId)?.getStore();
        if (!doc)
            return;
        editor.doc = doc;
    }, docId);
}
export async function clickTestOperationsMenuItem(page, name) {
    const menuButton = getDebugMenu(page).testOperationsButton;
    await menuButton.click();
    await waitNextFrame(page); // wait for animation ended
    const menuItem = page.getByRole('menuitem', { name });
    await menuItem.click();
    await menuItem.waitFor({ state: 'hidden' }); // wait for animation ended
}
export async function switchReadonly(page, value = true) {
    await page.evaluate(_value => {
        const defaultPage = document.querySelector('affine-page-root,affine-edgeless-root');
        const store = defaultPage.store;
        store.readonly = _value;
    }, value);
}
export async function activeEmbed(page) {
    await page.click('.resizable-img');
}
export async function toggleDarkMode(page) {
    await page.click('sl-tooltip[content="Toggle Dark Mode"] sl-button');
}
//# sourceMappingURL=click.js.map