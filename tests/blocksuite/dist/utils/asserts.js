import './declare-test-window.js';
import { expect } from '@playwright/test';
import { DEFAULT_NOTE_HEIGHT, DEFAULT_NOTE_WIDTH, } from '../utils/bs-alternative.js';
import { getCanvasElementsCount, getConnectorPath, getContainerChildIds, getContainerIds, getContainerOfElements, getEdgelessElementBound, getNoteRect, getSelectedBound, getSortedIdsInViewport, getZoomLevel, toIdCountMap, toModelCoord, } from './actions/edgeless.js';
import { pressArrowLeft, pressArrowRight, pressBackspace, redoByKeyboard, SHORT_KEY, type, undoByKeyboard, } from './actions/keyboard.js';
import { captureHistory, getClipboardCustomData, getCurrentThemeCSSPropertyValue, getEditorLocator, inlineEditorInnerTextToString, } from './actions/misc.js';
import { getStringFromRichText } from './inline-editor.js';
const BLOCK_ID_ATTR = 'data-block-id';
export const defaultStore = {
    meta: {
        pages: [
            {
                id: 'doc:home',
                title: '',
                tags: [],
            },
        ],
    },
    spaces: {
        'doc:home': {
            blocks: {
                '0': {
                    'prop:title': '',
                    'sys:id': '0',
                    'sys:flavour': 'affine:page',
                    'sys:children': ['1'],
                    'sys:version': 2,
                },
                '1': {
                    'sys:flavour': 'affine:note',
                    'sys:id': '1',
                    'sys:children': ['2'],
                    'sys:version': 1,
                    'prop:xywh': `[0,0,${DEFAULT_NOTE_WIDTH}, ${DEFAULT_NOTE_HEIGHT}]`,
                    'prop:background': 'rgba(255, 255, 255, 1)',
                    'prop:index': 'a0',
                    'prop:hidden': false,
                    'prop:displayMode': 'both',
                    'prop:edgeless': {
                        style: {
                            borderRadius: 8,
                            borderSize: 4,
                            borderStyle: 'none',
                            shadowType: '--affine-note-shadow-box',
                        },
                    },
                },
                '2': {
                    'sys:flavour': 'affine:paragraph',
                    'sys:id': '2',
                    'sys:children': [],
                    'sys:version': 1,
                    'prop:text': 'hello',
                    'prop:type': 'text',
                },
            },
        },
    },
};
export async function assertEmpty(page) {
    await assertRichTexts(page, ['']);
}
export async function assertTitle(page, text) {
    const editor = getEditorLocator(page);
    const inlineEditor = editor.locator('.doc-title-container').first();
    const vText = inlineEditorInnerTextToString(await inlineEditor.innerText());
    expect(vText).toBe(text);
}
export async function assertInlineEditorDeltas(page, deltas, i = 0) {
    const actual = await page.evaluate(i => {
        const inlineRoot = document.querySelectorAll('[data-v-root="true"]')[i];
        return inlineRoot.inlineEditor.yTextDeltas;
    }, i);
    expect(actual).toEqual(deltas);
}
export async function assertRichTextInlineDeltas(page, deltas, i = 0) {
    const actual = await page.evaluate(([i]) => {
        const editorHost = document.querySelector('editor-host');
        const inlineRoot = editorHost?.querySelectorAll('rich-text [data-v-root="true"]')[i];
        return inlineRoot?.inlineEditor.yTextDeltas;
    }, [i]);
    expect(actual).toEqual(deltas);
}
export async function assertText(page, text, i = 0) {
    const actual = await getStringFromRichText(page, i);
    expect(actual).toBe(text);
}
export async function assertTextContain(page, text, i = 0) {
    const actual = await getStringFromRichText(page, i);
    expect(actual).toContain(text);
}
export async function assertRichTexts(page, texts) {
    const actualTexts = await page.evaluate(() => {
        const editorHost = document.querySelector('editor-host');
        const richTexts = Array.from(editorHost?.querySelectorAll('rich-text') ?? []);
        return richTexts.map(richText => {
            const editor = richText.inlineEditor;
            return editor.yText.toString();
        });
    });
    expect(actualTexts).toEqual(texts);
}
export async function assertEdgelessCanvasText(page, text) {
    const actualTexts = await page.evaluate(() => {
        const editor = document.querySelector([
            'edgeless-text-editor',
            'edgeless-shape-text-editor',
            'edgeless-frame-title-editor',
            'edgeless-group-title-editor',
            'edgeless-connector-label-editor',
        ].join(','));
        if (!editor) {
            throw new Error('editor not found');
        }
        // @ts-ignore
        const inlineEditor = editor.inlineEditor;
        return inlineEditor?.yText.toString();
    });
    expect(actualTexts).toEqual(text);
}
export async function assertRichImage(page, count) {
    const editor = getEditorLocator(page);
    await expect(editor.locator('.resizable-img')).toHaveCount(count);
}
export async function assertDivider(page, count) {
    await expect(page.locator('affine-divider')).toHaveCount(count);
}
export async function assertRichDragButton(page) {
    await expect(page.locator('.resize')).toHaveCount(4);
}
export async function assertImageSize(page, size) {
    const actual = await page.locator('.resizable-img').boundingBox();
    expect(size).toEqual({
        width: Math.floor(actual?.width ?? NaN),
        height: Math.floor(actual?.height ?? NaN),
    });
}
export async function assertDocTitleFocus(page) {
    const locator = page.locator('doc-title .inline-editor').nth(0);
    await expect(locator).toBeFocused();
}
export async function assertListPrefix(page, predict, range) {
    const prefixs = page.locator('.affine-list-block__prefix');
    let start = 0;
    let end = await prefixs.count();
    if (range) {
        [start, end] = range;
    }
    for (let i = start; i < end; i++) {
        const prefix = await prefixs.nth(i).innerText();
        expect(prefix).toContain(predict[i]);
    }
}
export async function assertBlockCount(page, flavour, count) {
    await expect(page.locator(`affine-${flavour}`)).toHaveCount(count);
}
export async function assertRowCount(page, count) {
    await expect(page.locator('.affine-database-block-row')).toHaveCount(count);
}
export async function assertVisibleBlockCount(page, flavour, count) {
    // not only count, but also check if all the blocks are visible
    const locator = page.locator(`affine-${flavour}`);
    let visibleCount = 0;
    for (let i = 0; i < (await locator.count()); i++) {
        if (await locator.nth(i).isVisible()) {
            visibleCount++;
        }
    }
    expect(visibleCount).toEqual(count);
}
export async function assertRichTextInlineRange(page, richTextIndex, rangeIndex, rangeLength = 0) {
    const actual = await page.evaluate(([richTextIndex]) => {
        const editorHost = document.querySelector('editor-host');
        const richText = editorHost?.querySelectorAll('rich-text')[richTextIndex];
        const inlineEditor = richText?.inlineEditor;
        return inlineEditor?.getInlineRange();
    }, [richTextIndex]);
    expect(actual).toEqual({ index: rangeIndex, length: rangeLength });
}
export async function assertNativeSelectionRangeCount(page, count) {
    const actual = await page.evaluate(() => {
        const selection = window.getSelection();
        return selection?.rangeCount;
    });
    expect(actual).toEqual(count);
}
export async function assertNoteXYWH(page, expected) {
    const actual = await page.evaluate(() => {
        const rootModel = window.doc.root;
        const note = rootModel.children.find(x => x.flavour === 'affine:note');
        return JSON.parse(note.xywh);
    });
    expect(actual[0]).toBeCloseTo(expected[0]);
    expect(actual[1]).toBeCloseTo(expected[1]);
    expect(actual[2]).toBeCloseTo(expected[2]);
    expect(actual[3]).toBeCloseTo(expected[3]);
}
export async function assertTextFormat(page, richTextIndex, index, resultObj) {
    const actual = await page.evaluate(({ richTextIndex, index }) => {
        const editorHost = document.querySelector('editor-host');
        const richText = editorHost?.querySelectorAll('rich-text')[richTextIndex];
        const inlineEditor = richText?.inlineEditor;
        if (!inlineEditor) {
            throw new Error('Inline editor is undefined');
        }
        const result = inlineEditor.getFormat({
            index,
            length: 0,
        });
        return result;
    }, { richTextIndex, index });
    expect(actual).toEqual(resultObj);
}
export async function assertRichTextModelType(page, type, index = 0) {
    const actual = await page.evaluate(({ index, BLOCK_ID_ATTR }) => {
        const editorHost = document.querySelector('editor-host');
        const richText = editorHost?.querySelectorAll('rich-text')[index];
        const block = richText?.closest(`[${BLOCK_ID_ATTR}]`);
        if (!block) {
            throw new Error('block component is undefined');
        }
        return block.model.props.type;
    }, { index, BLOCK_ID_ATTR });
    expect(actual).toEqual(type);
}
export async function assertTextFormats(page, resultObj) {
    const actual = await page.evaluate(() => {
        const editorHost = document.querySelector('editor-host');
        const elements = editorHost?.querySelectorAll('rich-text') ?? [];
        return Array.from(elements).map(el => {
            const inlineEditor = el.inlineEditor;
            if (!inlineEditor) {
                throw new Error('Inline editor is undefined');
            }
            const result = inlineEditor.getFormat({
                index: 0,
                length: inlineEditor.yText.length,
            });
            return result;
        });
    });
    expect(actual).toEqual(resultObj);
}
export async function assertStore(page, expected) {
    const actual = await page.evaluate(() => {
        const json = window.collection.doc.toJSON();
        delete json.meta.pages[0].createDate;
        return json;
    });
    expect(actual).toEqual(expected);
}
export async function assertBlockChildrenIds(page, blockId, ids) {
    const actual = await page.evaluate(({ blockId }) => {
        const element = document.querySelector(`[data-block-id="${blockId}"]`);
        // @ts-ignore
        const model = element.model;
        return model.children.map(child => child.id);
    }, { blockId });
    expect(actual).toEqual(ids);
}
export async function assertBlockChildrenFlavours(page, blockId, flavours) {
    const actual = await page.evaluate(({ blockId }) => {
        const element = document.querySelector(`[data-block-id="${blockId}"]`);
        // @ts-ignore
        const model = element.model;
        return model.children.map(child => child.flavour);
    }, { blockId });
    expect(actual).toEqual(flavours);
}
export async function assertParentBlockId(page, blockId, parentId) {
    const actual = await page.evaluate(({ blockId }) => {
        const model = window.doc?.getBlock(blockId)?.model;
        if (!model) {
            throw new Error(`Block with id ${blockId} not found`);
        }
        return model.store.getParent(model)?.id;
    }, { blockId });
    expect(actual).toEqual(parentId);
}
export async function assertParentBlockFlavour(page, blockId, flavour) {
    const actual = await page.evaluate(({ blockId }) => {
        const model = window.doc?.getBlock(blockId)?.model;
        if (!model) {
            throw new Error(`Block with id ${blockId} not found`);
        }
        return model.store.getParent(model)?.flavour;
    }, { blockId });
    expect(actual).toEqual(flavour);
}
export async function assertClassName(page, selector, className) {
    const locator = page.locator(selector);
    await expect(locator).toHaveClass(className);
}
export async function assertTextContent(page, selector, text) {
    const locator = page.locator(selector);
    await expect(locator).toHaveText(text);
}
export async function assertBlockType(page, id, type) {
    const actual = await page.evaluate(({ id }) => {
        const element = document.querySelector(`[data-block-id="${id}"]`);
        if (!element) {
            throw new Error(`Element with id ${id} not found`);
        }
        const model = element.model;
        // @ts-ignore
        return model.props.type;
    }, { id });
    expect(actual).toBe(type);
}
export async function assertBlockFlavour(page, id, flavour) {
    const actual = await page.evaluate(({ id }) => {
        const element = document.querySelector(`[data-block-id="${id}"]`);
        if (!element) {
            throw new Error(`Element with id ${id} not found`);
        }
        const model = element.model;
        return model.flavour;
    }, { id });
    expect(actual).toBe(flavour);
}
export async function assertBlockTextContent(page, id, str) {
    const actual = await page.evaluate(({ id }) => {
        const element = document.querySelector(`[data-block-id="${id}"]`);
        if (!element) {
            throw new Error(`Element with id ${id} not found`);
        }
        const model = element.model;
        return model.text?.toString() ?? '';
    }, { id });
    expect(actual).toBe(str);
}
export async function assertBlockProps(page, id, props) {
    const actual = await page.evaluate(([id, props]) => {
        const element = document.querySelector(`[data-block-id="${id}"]`);
        // @ts-ignore
        const model = element.model;
        return Object.fromEntries(
        // @ts-ignore
        Object.keys(props).map(key => [key, model.props[key].toString()]));
    }, [id, props]);
    expect(actual).toEqual(props);
}
export async function assertBlockTypes(page, blockTypes) {
    const actual = await page.evaluate(() => {
        const editor = document.querySelector('affine-editor-container');
        const elements = editor?.querySelectorAll('[data-block-id]') ?? [];
        return (Array.from(elements)
            .slice(2)
            // @ts-ignore
            .map(el => el.model.props.type));
    });
    expect(actual).toEqual(blockTypes);
}
export function assertClipItems(_page, _key, _value) {
    // FIXME: use original clipboard API
    // const clipItems = await page.evaluate(() => {
    //   return document
    //     .getElementsByTagName('affine-editor-container')[0]
    //     .clipboard['_copy']['_getClipItems']();
    // });
    // const actual = clipItems.find(item => item.mimeType === key)?.data;
    // expect(actual).toEqual(value);
    return true;
}
export function assertAlmostEqual(actual, expected, precision = 0.001) {
    expect(Math.abs(actual - expected), `expected: ${expected}, but actual: ${actual}`).toBeLessThan(precision);
}
export function assertPointAlmostEqual(actual, expected, precision = 0.001) {
    assertAlmostEqual(actual[0], expected[0], precision);
    assertAlmostEqual(actual[1], expected[1], precision);
}
/**
 * Assert the locator is visible in the viewport.
 * It will check the bounding box of the locator is within the viewport.
 *
 * See also https://playwright.dev/docs/actionability#visible
 */
export async function assertLocatorVisible(page, locator, visible = true) {
    const bodyRect = await page.locator('body').boundingBox();
    const rect = await locator.boundingBox();
    expect(rect).toBeTruthy();
    expect(bodyRect).toBeTruthy();
    if (!rect || !bodyRect) {
        throw new Error('Unreachable');
    }
    if (visible) {
        // Assert the locator is **fully** visible
        await expect(locator).toBeVisible();
        expect(rect.x).toBeGreaterThanOrEqual(0);
        expect(rect.y).toBeGreaterThanOrEqual(0);
        expect(rect.x + rect.width).toBeLessThanOrEqual(bodyRect.x + bodyRect.width);
        expect(rect.y + rect.height).toBeLessThanOrEqual(bodyRect.x + bodyRect.height);
    }
    else {
        // Assert the locator is **fully** invisible
        const locatorIsVisible = await locator.isVisible();
        if (!locatorIsVisible) {
            // If the locator is invisible, we don't need to check the bounding box
            return;
        }
        const isInVisible = rect.x > bodyRect.x + bodyRect.width ||
            rect.y > bodyRect.y + bodyRect.height ||
            rect.x + rect.width < bodyRect.x ||
            rect.y + rect.height < bodyRect.y;
        expect(isInVisible).toBe(true);
    }
}
/**
 * Assert basic keyboard operation works in input
 *
 * NOTICE:
 *   - it will clear the input value.
 *   - it will pollute undo/redo history.
 */
export async function assertKeyboardWorkInInput(page, locator) {
    await expect(locator).toBeVisible();
    await locator.focus();
    // Clear input before test
    await locator.clear();
    // type/backspace
    await type(page, '12/34');
    await expect(locator).toHaveValue('12/34');
    await captureHistory(page);
    await pressBackspace(page);
    await expect(locator).toHaveValue('12/3');
    // undo/redo
    await undoByKeyboard(page);
    await expect(locator).toHaveValue('12/34');
    await redoByKeyboard(page);
    await expect(locator).toHaveValue('12/3');
    // keyboard
    await pressArrowLeft(page, 2);
    await pressArrowRight(page, 1);
    await pressBackspace(page);
    await expect(locator).toHaveValue('123');
    await pressBackspace(page);
    await expect(locator).toHaveValue('13');
    // copy/cut/paste
    await page.keyboard.press(`${SHORT_KEY}+a`, { delay: 50 });
    await page.keyboard.press(`${SHORT_KEY}+c`, { delay: 50 });
    await pressBackspace(page);
    await expect(locator).toHaveValue('');
    await page.keyboard.press(`${SHORT_KEY}+v`, { delay: 50 });
    await expect(locator).toHaveValue('13');
    await page.keyboard.press(`${SHORT_KEY}+a`, { delay: 50 });
    await page.keyboard.press(`${SHORT_KEY}+x`, { delay: 50 });
    await expect(locator).toHaveValue('');
}
export function assertSameColor(c1, c2) {
    expect(c1?.toLowerCase()).toEqual(c2?.toLowerCase());
}
export async function assertNoteRectEqual(page, noteId, expected) {
    const rect = await getNoteRect(page, noteId);
    assertRectEqual(rect, expected);
}
export function assertRectEqual(a, b) {
    expect(a.x).toBeCloseTo(b.x, 0);
    expect(a.y).toBeCloseTo(b.y, 0);
    expect(a.w).toBeCloseTo(b.w, 0);
    expect(a.h).toBeCloseTo(b.h, 0);
}
export function assertDOMRectEqual(a, b) {
    expect(a.x).toBeCloseTo(b.x, 0);
    expect(a.y).toBeCloseTo(b.y, 0);
    expect(a.width).toBeCloseTo(b.width, 0);
    expect(a.height).toBeCloseTo(b.height, 0);
}
export async function assertEdgelessDraggingArea(page, xywh) {
    const [x, y, w, h] = xywh;
    const editor = getEditorLocator(page);
    const draggingArea = editor
        .locator('edgeless-dragging-area-rect')
        .locator('.affine-edgeless-dragging-area');
    const box = await draggingArea.boundingBox();
    if (!box)
        throw new Error('Missing edgeless dragging area');
    expect(box.x).toBeCloseTo(x, 0);
    expect(box.y).toBeCloseTo(y, 0);
    expect(box.width).toBeCloseTo(w, 0);
    expect(box.height).toBeCloseTo(h, 0);
}
export async function getSelectedRect(page) {
    const editor = getEditorLocator(page);
    const selectedRect = editor
        .locator('edgeless-selected-rect')
        .locator('.affine-edgeless-selected-rect');
    // FIXME: remove this timeout
    await page.waitForTimeout(50);
    const box = await selectedRect.boundingBox();
    if (!box)
        throw new Error('Missing edgeless selected rect');
    return box;
}
// Better to use xxSelectedModelRect
export async function assertEdgelessSelectedRect(page, xywh) {
    const [x, y, w, h] = xywh;
    const box = await getSelectedRect(page);
    expect(box.x).toBeCloseTo(x, 0);
    expect(box.y).toBeCloseTo(y, 0);
    expect(box.width).toBeCloseTo(w, 0);
    expect(box.height).toBeCloseTo(h, 0);
}
export async function assertEdgelessSelectedModelRect(page, xywh) {
    const [x, y, w, h] = xywh;
    const box = await getSelectedRect(page);
    const [mX, mY] = await toModelCoord(page, [box.x, box.y]);
    expect(mX).toBeCloseTo(x, 0);
    expect(mY).toBeCloseTo(y, 0);
    expect(box.width).toBeCloseTo(w, 0);
    expect(box.height).toBeCloseTo(h, 0);
}
export async function assertEdgelessSelectedElementHandleCount(page, count) {
    const editor = getEditorLocator(page);
    const handles = editor.locator('.element-handle');
    await expect(handles).toHaveCount(count);
}
// Better to use xxSelectedModelRect
export async function assertEdgelessRemoteSelectedRect(page, xywh, index = 0) {
    const [x, y, w, h] = xywh;
    const editor = getEditorLocator(page);
    const remoteSelectedRect = editor
        .locator('affine-edgeless-remote-selection-widget')
        .locator('.remote-rect')
        .nth(index);
    const box = await remoteSelectedRect.boundingBox();
    if (!box)
        throw new Error('Missing edgeless remote selected rect');
    expect(box.x).toBeCloseTo(x, 0);
    expect(box.y).toBeCloseTo(y, 0);
    expect(box.width).toBeCloseTo(w, 0);
    expect(box.height).toBeCloseTo(h, 0);
}
export async function assertEdgelessRemoteSelectedModelRect(page, xywh, index = 0) {
    const [x, y, w, h] = xywh;
    const editor = getEditorLocator(page);
    const remoteSelectedRect = editor
        .locator('affine-edgeless-remote-selection-widget')
        .locator('.remote-rect')
        .nth(index);
    const box = await remoteSelectedRect.boundingBox();
    if (!box)
        throw new Error('Missing edgeless remote selected rect');
    const [mX, mY] = await toModelCoord(page, [box.x, box.y]);
    expect(mX).toBeCloseTo(x, 0);
    expect(mY).toBeCloseTo(y, 0);
    expect(box.width).toBeCloseTo(w, 0);
    expect(box.height).toBeCloseTo(h, 0);
}
export async function assertEdgelessSelectedRectRotation(page, deg = 0) {
    const editor = getEditorLocator(page);
    const selectedRect = editor
        .locator('edgeless-selected-rect')
        .locator('.affine-edgeless-selected-rect');
    const transform = await selectedRect.evaluate(el => el.style.transform);
    const r = new RegExp(`rotate\\(${deg}deg\\)`);
    expect(transform).toMatch(r);
}
export async function assertEdgelessSelectedReactCursor(page, expected) {
    const editor = getEditorLocator(page);
    const selectedRect = editor
        .locator('edgeless-selected-rect')
        .locator('.affine-edgeless-selected-rect');
    const handle = selectedRect
        .getByLabel(expected.handle, { exact: true })
        .locator(`.${expected.mode}`);
    await handle.hover();
    await expect(handle).toHaveCSS('cursor', expected.cursor);
}
export async function assertEdgelessNonSelectedRect(page) {
    const rect = page.locator('edgeless-selected-rect');
    await expect(rect).toBeHidden();
}
export async function assertSelectionInNote(page, noteId, blockNote = 'affine-note') {
    const closestNoteId = await page.evaluate(blockNote => {
        const selection = window.getSelection();
        const note = selection?.anchorNode?.parentElement?.closest(blockNote);
        return note?.getAttribute('data-block-id');
    }, blockNote);
    expect(closestNoteId).toEqual(noteId);
}
export async function assertEdgelessNoteBackground(page, noteId, color) {
    const editor = getEditorLocator(page);
    const backgroundColor = await editor
        .locator(`affine-edgeless-note[data-block-id="${noteId}"]`)
        .evaluate(ele => {
        const noteWrapper = ele?.querySelector('edgeless-note-background');
        if (!noteWrapper) {
            throw new Error(`Could not find note: ${noteId}`);
        }
        return noteWrapper.backgroundStyle$.value.backgroundColor;
    });
    expect(toHex(backgroundColor)).toEqual(color);
}
function toHex(color) {
    let r, g, b;
    if (color.startsWith('#')) {
        color = color.substr(1);
        if (color.length === 3) {
            color = color.replace(/./g, '$&$&');
        }
        [r, g, b] = color.match(/.{2}/g)?.map(hex => parseInt(hex, 16)) ?? [];
    }
    else if (color.startsWith('rgba')) {
        [r, g, b] = color.match(/\d+/g)?.map(Number) ?? [];
    }
    else if (color.startsWith('rgb')) {
        [r, g, b] = color.match(/\d+/g)?.map(Number) ?? [];
    }
    else {
        throw new Error('Invalid color format');
    }
    if (r === undefined || g === undefined || b === undefined) {
        throw new Error('Invalid color format');
    }
    const hex = ((r << 16) | (g << 8) | b).toString(16);
    return '#' + '0'.repeat(6 - hex.length) + hex;
}
export async function assertEdgelessColorSameWithHexColor(page, edgelessColor, hexColor) {
    const themeColor = edgelessColor.startsWith('--')
        ? await getCurrentThemeCSSPropertyValue(page, edgelessColor)
        : edgelessColor;
    expect(themeColor).toBeTruthy();
    const edgelessHexColor = toHex(themeColor);
    assertSameColor(hexColor, edgelessHexColor);
}
export async function assertZoomLevel(page, zoom) {
    const z = await getZoomLevel(page);
    expect(z).toBe(Math.ceil(zoom));
}
export async function assertConnectorPath(page, path, index = 0) {
    const actualPath = await getConnectorPath(page, index);
    actualPath.every((p, i) => assertPointAlmostEqual(p, path[i], 0.1));
}
export function assertRectExist(rect) {
    expect(rect).not.toBe(null);
}
export async function assertEdgelessElementBound(page, elementId, bound) {
    const actual = await getEdgelessElementBound(page, elementId);
    assertBound(actual, bound);
}
export async function assertSelectedBound(page, expected, index = 0) {
    const bound = await getSelectedBound(page, index);
    assertBound(bound, expected);
}
/**
 * asserts all groups and they children count at the same time
 * @param page
 * @param expected the expected group id and the count of of its children
 */
export async function assertContainerIds(page, expected) {
    const ids = await getContainerIds(page);
    const result = toIdCountMap(ids);
    expect(result).toEqual(expected);
}
export async function assertSortedIds(page, expected) {
    const ids = await getSortedIdsInViewport(page);
    expect(ids).toEqual(expected);
}
export async function assertContainerChildIds(page, expected, id) {
    const ids = await getContainerChildIds(page, id);
    const result = toIdCountMap(ids);
    expect(result).toEqual(expected);
}
export async function assertContainerOfElements(page, elements, containerId) {
    const elementContainers = await getContainerOfElements(page, elements);
    elementContainers.forEach(elementContainer => {
        expect(elementContainer).toEqual(containerId);
    });
}
/**
 * Assert the given container has the expected children count.
 * And the children's container id should equal to the given container id.
 * @param page
 * @param containerId
 * @param childrenCount
 */
export async function assertContainerChildCount(page, containerId, childrenCount) {
    const ids = await getContainerChildIds(page, containerId);
    await assertContainerOfElements(page, ids, containerId);
    expect(new Set(ids).size).toBe(childrenCount);
}
export async function assertCanvasElementsCount(page, expected) {
    const number = await getCanvasElementsCount(page);
    expect(number).toEqual(expected);
}
export function assertBound(received, expected) {
    expect(received[0]).toBeCloseTo(expected[0], 0);
    expect(received[1]).toBeCloseTo(expected[1], 0);
    expect(received[2]).toBeCloseTo(expected[2], 0);
    expect(received[3]).toBeCloseTo(expected[3], 0);
}
export async function assertClipboardItem(page, data, type) {
    const dataInClipboard = await page.evaluate(async ([type]) => {
        const clipItems = await navigator.clipboard.read();
        const item = clipItems.find(item => item.types.includes(type));
        const data = await item?.getType(type);
        return data?.text();
    }, [type]);
    expect(dataInClipboard).toBe(data);
}
export async function assertClipboardCustomData(page, type, data) {
    const dataInClipboard = await getClipboardCustomData(page, type);
    expect(dataInClipboard).toBe(data);
}
export function assertClipData(clipItems, expectClipItems, type) {
    expect(clipItems.find(item => item.mimeType === type)?.data).toBe(expectClipItems.find(item => item.mimeType === type)?.data);
}
export async function assertHasClass(locator, className) {
    expect((await locator.getAttribute('class'))?.split(' ').includes(className)).toEqual(true);
}
export async function assertNotHasClass(locator, className) {
    expect((await locator.getAttribute('class'))?.split(' ').includes(className)).toEqual(false);
}
export async function assertNoteSequence(page, expected) {
    const actual = await page.locator('.page-visible-index-label').innerText();
    expect(expected).toBe(actual);
}
export async function assertBlockSelections(page, paths) {
    const selections = await page.evaluate(() => {
        const host = document.querySelector('editor-host');
        if (!host) {
            throw new Error('editor-host host not found');
        }
        return host.selection.value.filter(b => b.type === 'block');
    });
    const actualPaths = selections.map(selection => selection.blockId);
    expect(actualPaths).toEqual(paths);
}
export async function assertTextSelection(page, from, to) {
    const selection = (await page.evaluate(() => {
        const host = document.querySelector('editor-host');
        if (!host) {
            throw new Error('editor-host host not found');
        }
        return host.selection.value.find(b => b.type === 'text');
    }));
    if (!from && !to) {
        expect(selection).toBeUndefined();
        return;
    }
    if (from) {
        expect(selection?.from).toEqual(from);
    }
    if (to) {
        expect(selection?.to).toEqual(to);
    }
}
export async function assertConnectorStrokeColor(page, label, color) {
    const colorButton = page
        .locator('affine-toolbar-widget editor-toolbar')
        .locator('edgeless-color-panel')
        .locator(`.color-unit[aria-label="${label}"]`)
        .locator('svg');
    const realColor = await colorButton.evaluate(element => window.getComputedStyle(element).fill);
    expect(toHex(realColor)).toBe(color);
}
//# sourceMappingURL=asserts.js.map