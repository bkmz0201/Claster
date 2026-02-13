import { getIndexCoordinate, waitNextFrame } from './misc.js';
export async function dragBetweenCoords(page, from, to, options) {
    const steps = options?.steps ?? 20;
    const button = options?.button ?? 'left';
    const { x: x1, y: y1 } = from;
    const { x: x2, y: y2 } = to;
    options?.click && (await page.mouse.click(x1, y1));
    await page.mouse.move(x1, y1);
    await page.mouse.down({ button });
    await page.mouse.move(x2, y2, { steps });
    await options?.beforeMouseUp?.();
    await page.mouse.up({ button });
}
export async function dragBetweenIndices(page, [startRichTextIndex, startVIndex], [endRichTextIndex, endVIndex], startCoordOffSet = { x: 0, y: 0 }, endCoordOffSet = { x: 0, y: 0 }, options) {
    const finalOptions = {
        steps: 50,
        ...options,
    };
    const startCoord = await getIndexCoordinate(page, [startRichTextIndex, startVIndex], startCoordOffSet);
    const endCoord = await getIndexCoordinate(page, [endRichTextIndex, endVIndex], endCoordOffSet);
    await dragBetweenCoords(page, startCoord, endCoord, finalOptions);
}
export async function dragOverTitle(page) {
    const { from, to } = await page.evaluate(() => {
        const titleInput = document.querySelector('doc-title rich-text');
        const titleBound = titleInput.getBoundingClientRect();
        return {
            from: { x: titleBound.left + 1, y: titleBound.top + 1 },
            to: { x: titleBound.right - 1, y: titleBound.bottom - 1 },
        };
    });
    await dragBetweenCoords(page, from, to, {
        steps: 5,
    });
}
export async function dragEmbedResizeByTopRight(page) {
    const { from, to } = await page.evaluate(() => {
        const bottomRightButton = document.querySelector('.top-right');
        const bottomRightButtonBound = bottomRightButton.getBoundingClientRect();
        const y = bottomRightButtonBound.top;
        return {
            from: { x: bottomRightButtonBound.left + 5, y: y + 5 },
            to: { x: bottomRightButtonBound.left + 5 - 200, y },
        };
    });
    await dragBetweenCoords(page, from, to, {
        steps: 10,
    });
}
export async function dragEmbedResizeByTopLeft(page) {
    const { from, to } = await page.evaluate(() => {
        const bottomRightButton = document.querySelector('.top-left');
        const bottomRightButtonBound = bottomRightButton.getBoundingClientRect();
        const y = bottomRightButtonBound.top;
        return {
            from: { x: bottomRightButtonBound.left + 5, y: y + 5 },
            to: { x: bottomRightButtonBound.left + 5 + 200, y },
        };
    });
    await dragBetweenCoords(page, from, to, {
        steps: 10,
    });
}
export async function dragHandleFromBlockToBlockBottomById(page, sourceId, targetId, bottom = true, offset, beforeMouseUp) {
    const sourceBlock = await page
        .locator(`[data-block-id="${sourceId}"]`)
        .boundingBox();
    const targetBlock = await page
        .locator(`[data-block-id="${targetId}"]`)
        .boundingBox();
    if (!sourceBlock || !targetBlock) {
        throw new Error();
    }
    await page.mouse.move(sourceBlock.x + sourceBlock.width / 2, sourceBlock.y + sourceBlock.height / 2);
    await waitNextFrame(page);
    const dragHandleContainer = page.locator('.affine-drag-handle-container');
    await dragHandleContainer.hover();
    const handle = await dragHandleContainer.boundingBox();
    if (!handle) {
        throw new Error();
    }
    await page.mouse.move(handle.x + handle.width / 2, handle.y + handle.height / 2, { steps: 10 });
    await page.mouse.down();
    await page.mouse.move(targetBlock.x, targetBlock.y + (bottom ? targetBlock.height - 1 : 1), {
        steps: 50,
    });
    if (offset) {
        await page.mouse.move(targetBlock.x + offset, targetBlock.y + (bottom ? targetBlock.height - 1 : 1), {
            steps: 50,
        });
    }
    if (beforeMouseUp) {
        await beforeMouseUp();
    }
    await page.mouse.up();
}
export async function dragBlockToPoint(page, sourceId, point) {
    const sourceBlock = await page
        .locator(`[data-block-id="${sourceId}"]`)
        .boundingBox();
    if (!sourceBlock) {
        throw new Error();
    }
    await page.mouse.move(sourceBlock.x + sourceBlock.width / 2, sourceBlock.y + sourceBlock.height / 2);
    const handle = await page
        .locator('.affine-drag-handle-container')
        .boundingBox();
    if (!handle) {
        throw new Error();
    }
    await page.mouse.move(handle.x + handle.width / 2, handle.y + handle.height / 2);
    await page.mouse.down();
    await page.mouse.move(point.x, point.y, {
        steps: 50,
    });
    await page.mouse.up();
}
export async function moveToImage(page) {
    await page.locator('affine-image').hover({ timeout: 500 });
}
export async function popImageMoreMenu(page) {
    await moveToImage(page);
    const toolbar = page.locator('affine-toolbar-widget editor-toolbar');
    const menu = toolbar.getByLabel('More menu');
    await menu.click();
    const turnIntoCardButton = menu.getByLabel('Turn into card view');
    const copyButton = menu.getByLabel('Copy');
    const duplicateButton = page.getByLabel('Duplicate');
    const deleteButton = page.getByLabel('Delete');
    return {
        menu,
        copyButton,
        turnIntoCardButton,
        duplicateButton,
        deleteButton,
    };
}
export async function clickBlockDragHandle(page, blockId) {
    const blockBox = await page
        .locator(`[data-block-id="${blockId}"]`)
        .boundingBox();
    if (!blockBox) {
        throw new Error();
    }
    await page.mouse.move(blockBox.x + blockBox.width / 2, blockBox.y + blockBox.height / 2);
    const handleBox = await page
        .locator('.affine-drag-handle-container')
        .boundingBox();
    if (!handleBox) {
        throw new Error();
    }
    await page.mouse.click(handleBox.x + handleBox.width / 2, handleBox.y + handleBox.height / 2);
}
//# sourceMappingURL=drag.js.map