const IS_MAC = process.platform === 'darwin';
// const IS_WINDOWS = process.platform === 'win32';
// const IS_LINUX = !IS_MAC && !IS_WINDOWS;
/**
 * The key will be 'Meta' on Macs and 'Control' on other platforms
 * @example
 * ```ts
 * await page.keyboard.press(`${SHORT_KEY}+a`);
 * ```
 */
export const SHORT_KEY = IS_MAC ? 'Meta' : 'Control';
/**
 * The key will be 'Alt' on Macs and 'Shift' on other platforms
 * @example
 * ```ts
 * await page.keyboard.press(`${SHORT_KEY}+${MODIFIER_KEY}+1`);
 * ```
 */
export const MODIFIER_KEY = IS_MAC ? 'Alt' : 'Shift';
export const SHIFT_KEY = 'Shift';
export async function type(page, content, delay = 20) {
    await page.keyboard.type(content, { delay });
}
export async function withPressKey(page, key, fn) {
    await page.keyboard.down(key);
    await fn();
    await page.keyboard.up(key);
}
export async function defaultTool(page) {
    await page.keyboard.press('v', { delay: 20 });
}
export async function pressBackspace(page, count = 1) {
    for (let i = 0; i < count; i++) {
        await page.keyboard.press('Backspace', { delay: 20 });
    }
}
export async function pressSpace(page) {
    await page.keyboard.press('Space', { delay: 20 });
}
export async function pressArrowLeft(page, count = 1) {
    for (let i = 0; i < count; i++) {
        await page.keyboard.press('ArrowLeft', { delay: 20 });
    }
}
export async function pressArrowRight(page, count = 1) {
    for (let i = 0; i < count; i++) {
        await page.keyboard.press('ArrowRight', { delay: 20 });
    }
}
export async function pressArrowDown(page, count = 1) {
    for (let i = 0; i < count; i++) {
        await page.keyboard.press('ArrowDown', { delay: 20 });
    }
}
export async function pressArrowUp(page, count = 1) {
    for (let i = 0; i < count; i++) {
        await page.keyboard.press('ArrowUp', { delay: 20 });
    }
}
export async function pressArrowDownWithShiftKey(page, count = 1) {
    for (let i = 0; i < count; i++) {
        await page.keyboard.press(`${SHIFT_KEY}+ArrowDown`, { delay: 20 });
    }
}
export async function pressArrowUpWithShiftKey(page, count = 1) {
    for (let i = 0; i < count; i++) {
        await page.keyboard.press(`${SHIFT_KEY}+ArrowUp`, { delay: 20 });
    }
}
export async function pressEnter(page, count = 1) {
    // avoid flaky test by simulate real user input
    for (let i = 0; i < count; i++) {
        await page.keyboard.press('Enter', { delay: 30 });
    }
}
export async function pressEnterWithShortkey(page) {
    await page.keyboard.press(`${SHORT_KEY}+Enter`, { delay: 20 });
}
export async function pressEscape(page, count = 1) {
    for (let i = 0; i < count; i++) {
        await page.keyboard.press('Escape', { delay: 20 });
    }
}
export async function undoByKeyboard(page) {
    await page.keyboard.press(`${SHORT_KEY}+z`, { delay: 20 });
}
export async function formatType(page) {
    await page.keyboard.press(`${SHORT_KEY}+${MODIFIER_KEY}+1`, {
        delay: 20,
    });
}
export async function redoByKeyboard(page) {
    await page.keyboard.press(`${SHORT_KEY}+Shift+Z`, { delay: 20 });
}
export async function selectAllByKeyboard(page) {
    await page.keyboard.press(`${SHORT_KEY}+a`, {
        delay: 20,
    });
}
export async function selectAllBlocksByKeyboard(page) {
    for (let i = 0; i < 3; i++) {
        await selectAllByKeyboard(page);
    }
}
export async function pressTab(page, count = 1) {
    for (let i = 0; i < count; i++) {
        await page.keyboard.press('Tab', { delay: 20 });
    }
}
export async function pressShiftTab(page) {
    await page.keyboard.press('Shift+Tab', { delay: 20 });
}
export async function pressBackspaceWithShortKey(page, count = 1) {
    for (let i = 0; i < count; i++) {
        await page.keyboard.press(`${SHORT_KEY}+Backspace`, { delay: 20 });
    }
}
export async function pressShiftEnter(page) {
    await page.keyboard.press('Shift+Enter', { delay: 20 });
}
export async function inlineCode(page) {
    await page.keyboard.press(`${SHORT_KEY}+e`, { delay: 20 });
}
export async function strikethrough(page) {
    await page.keyboard.press(`${SHORT_KEY}+Shift+s`, { delay: 20 });
}
export async function copyByKeyboard(page) {
    await page.keyboard.press(`${SHORT_KEY}+c`, { delay: 20 });
}
export async function cutByKeyboard(page) {
    await page.keyboard.press(`${SHORT_KEY}+x`, { delay: 20 });
}
/**
 * Notice: this method will try to click closest editor by default
 */
export async function pasteByKeyboard(page, forceFocus = true) {
    if (forceFocus) {
        const isEditorActive = await page.evaluate(() => document.activeElement?.closest('affine-editor-container'));
        if (!isEditorActive) {
            await page.click('affine-editor-container');
        }
    }
    await page.keyboard.press(`${SHORT_KEY}+v`, { delay: 20 });
}
export async function createCodeBlock(page) {
    await page.keyboard.press(`${SHORT_KEY}+Alt+c`);
}
export async function getCursorBlockIdAndHeight(page) {
    return page.evaluate(() => {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const startContainer = range.startContainer instanceof Text
            ? range.startContainer.parentElement
            : range.startContainer;
        const startComponent = startContainer.closest(`[data-block-id]`);
        const { height } = startComponent.getBoundingClientRect();
        const id = startComponent.dataset.blockId;
        return [id, height];
    });
}
/**
 * fill a line by keep triggering key input
 * @param page
 * @param toNext if true, fill until soft wrap
 */
export async function fillLine(page, toNext = false) {
    const [id, height] = await getCursorBlockIdAndHeight(page);
    if (id && height) {
        let nextHeight;
        // type until current block height is changed, means has new line
        do {
            await page.keyboard.type('a', { delay: 20 });
            [, nextHeight] = await getCursorBlockIdAndHeight(page);
        } while (nextHeight === height);
        if (!toNext) {
            await page.keyboard.press('Backspace');
        }
    }
}
export async function pressForwardDelete(page) {
    if (IS_MAC) {
        await page.keyboard.press('Control+d', { delay: 20 });
    }
    else {
        await page.keyboard.press('Delete', { delay: 20 });
    }
}
export async function pressForwardDeleteWord(page) {
    if (IS_MAC) {
        await page.keyboard.press('Alt+Delete', { delay: 20 });
    }
    else {
        await page.keyboard.press('Control+Delete', { delay: 20 });
    }
}
//# sourceMappingURL=keyboard.js.map