export async function getRichTextBoundingBox(page, blockId) {
    return page.evaluate(id => {
        const paragraph = document.querySelector(`[data-block-id="${id}"] .inline-editor`);
        const bbox = paragraph?.getBoundingClientRect();
        return bbox;
    }, blockId);
}
export async function clickInEdge(page, rect) {
    const edgeX = rect.x + rect.width / 2;
    const edgeY = rect.y + rect.height - 5;
    await page.mouse.click(edgeX, edgeY);
}
export async function clickInCenter(page, rect) {
    const centerX = rect.x + rect.width / 2;
    const centerY = rect.y + rect.height / 2;
    await page.mouse.click(centerX, centerY);
}
export async function getBoundingRect(page, selector) {
    const div = page.locator(selector);
    const boundingRect = await div.boundingBox();
    if (!boundingRect) {
        throw new Error(`Missing ${selector}`);
    }
    return boundingRect;
}
//# sourceMappingURL=selection.js.map