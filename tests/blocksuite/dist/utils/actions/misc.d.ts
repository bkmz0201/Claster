import '../declare-test-window.js';
import type { ListType } from '@blocksuite/affine/model';
import type { InlineRange } from '@blocksuite/affine/std/inline';
import type { BlockModel } from '@blocksuite/affine/store';
import type { Locator, Page } from '@playwright/test';
export declare const defaultPlaygroundURL: URL;
export declare const getSelectionRect: (page: Page) => Promise<DOMRect>;
export declare const getEditorLocator: (page: Page) => Locator;
export declare const getEditorHostLocator: (page: Page) => Locator;
/**
 * Expect console message to be called in the test.
 *
 * This function **should** be called before the `enterPlaygroundRoom` function!
 *
 * ```ts
 * expectConsoleMessage(page, 'Failed to load resource'); // Default type is 'error'
 * expectConsoleMessage(page, '[vite] connected.', 'warning'); // Specify type
 * ```
 */
export declare function expectConsoleMessage(page: Page, logPrefixOrRegex: string | RegExp, type?: 'log' | 'debug' | 'info' | 'error' | 'warning' | 'dir' | 'dirxml' | 'table' | 'trace' | 'clear' | 'startGroup' | 'startGroupCollapsed' | 'endGroup' | 'assert' | 'profile' | 'profileEnd' | 'count' | 'timeEnd'): void;
export type PlaygroundRoomOptions = {
    room?: string;
    blobSource?: ('idb' | 'mock')[];
    noInit?: boolean;
};
export declare function enterPlaygroundRoom(page: Page, ops?: PlaygroundRoomOptions): Promise<string>;
export declare function waitDefaultPageLoaded(page: Page): Promise<void>;
export declare function waitEmbedLoaded(page: Page): Promise<void>;
export declare function waitNextFrame(page: Page, frameTimeout?: number): Promise<void>;
export declare function clearLog(page: Page): Promise<void>;
export declare function captureHistory(page: Page): Promise<void>;
export declare function resetHistory(page: Page): Promise<void>;
export declare function enterPlaygroundWithList(page: Page, contents?: string[], type?: ListType): Promise<void>;
export declare function initEmptyParagraphState(page: Page, rootId?: string): Promise<{
    rootId: string;
    noteId: string;
    paragraphId: string;
}>;
export declare function initMultipleNoteWithParagraphState(page: Page, rootId?: string, count?: number): Promise<{
    rootId: string;
    ids: {
        noteId: string;
        paragraphId: string;
    }[];
}>;
export declare function initEmptyEdgelessState(page: Page): Promise<{
    rootId: string;
    noteId: string;
    paragraphId: string;
}>;
export declare function initEmptyDatabaseState(page: Page, rootId?: string): Promise<{
    rootId: string;
    noteId: string;
    databaseId: string;
}>;
export declare function initKanbanViewState(page: Page, config: {
    rows: string[];
    columns: {
        type: string;
        value?: unknown[];
    }[];
}, rootId?: string): Promise<{
    rootId: string;
    noteId: string;
    databaseId: string;
}>;
export declare function initEmptyDatabaseWithParagraphState(page: Page, rootId?: string): Promise<{
    rootId: string;
    noteId: string;
    databaseId: string;
}>;
export declare function initDatabaseRow(page: Page): Promise<void>;
export declare function initDatabaseRowWithData(page: Page, data: string): Promise<void>;
export declare const getAddRow: (page: Page) => Locator;
export declare function initDatabaseDynamicRowWithData(page: Page, data: string, addRow?: boolean, index?: number): Promise<void>;
export declare function focusDatabaseTitle(page: Page): Promise<void>;
export declare function assertDatabaseColumnOrder(page: Page, order: string[]): Promise<void>;
export declare function initEmptyCodeBlockState(page: Page, codeBlockProps?: {
    language?: string;
}): Promise<{
    rootId: string;
    noteId: string;
    codeBlockId: string;
}>;
type FocusRichTextOptions = {
    clickPosition?: {
        x: number;
        y: number;
    };
};
export declare function focusRichText(page: Page, i?: number, options?: FocusRichTextOptions): Promise<void>;
export declare function focusRichTextEnd(page: Page, i?: number): Promise<void>;
export declare function initThreeParagraphs(page: Page): Promise<void>;
export declare function initSixParagraphs(page: Page): Promise<void>;
export declare function initThreeLists(page: Page): Promise<void>;
export declare function insertThreeLevelLists(page: Page, i?: number): Promise<void>;
export declare function initThreeDividers(page: Page): Promise<void>;
export declare function initParagraphsByCount(page: Page, count: number): Promise<void>;
export declare function getInlineSelectionIndex(page: Page): Promise<number>;
export declare function getInlineSelectionText(page: Page): Promise<string>;
export declare function getSelectedTextByInlineEditor(page: Page): Promise<string>;
export declare function getSelectedText(page: Page): Promise<string>;
export declare function setInlineRangeInSelectedRichText(page: Page, index: number, length: number): Promise<void>;
export declare function setInlineRangeInInlineEditor(page: Page, inlineRange: InlineRange, i?: number): Promise<void>;
export declare function pasteContent(page: Page, clipData: Record<string, unknown>): Promise<void>;
export declare function pasteTestImage(page: Page): Promise<void>;
export declare function getClipboardHTML(page: Page): Promise<string>;
export declare function getClipboardText(page: Page): Promise<string>;
export declare function getClipboardCustomData(page: Page, type: string): Promise<unknown>;
export declare function getClipboardSnapshot(page: Page): Promise<any>;
export declare function getPageSnapshot(page: Page, toJSON?: boolean): Promise<string | import("@blocksuite/store").BlockSnapshot>;
export declare function setSelection(page: Page, anchorBlockId: number, anchorOffset: number, focusBlockId: number, focusOffset: number): Promise<void>;
export declare function readClipboardText(page: Page, type?: 'input' | 'textarea'): Promise<string>;
export declare const getCenterPositionByLocator: (page: Page, locator: Locator) => Promise<{
    x: number;
    y: number;
}>;
export declare function getBoundingBox(locator: Locator): Promise<{
    x: number;
    y: number;
    width: number;
    height: number;
}>;
export declare function getBlockModel<Model extends BlockModel>(page: Page, blockId: string): Promise<Model>;
export declare function getIndexCoordinate(page: Page, [richTextIndex, vIndex]: [number, number], coordOffSet?: {
    x: number;
    y: number;
}): Promise<{
    x: any;
    y: any;
}>;
export declare function inlineEditorInnerTextToString(innerText: string): string;
export declare function focusTitle(page: Page): Promise<void>;
/**
 * XXX: this is a workaround for the bug in Playwright
 */
export declare function shamefullyBlurActiveElement(page: Page): Promise<void>;
/**
 * FIXME:
 * Sometimes inline editor state is not updated in time. Bad case like below:
 *
 * ```
 * await focusRichText(page);
 * await type(page, 'hello');
 * await assertRichTexts(page, ['hello']);
 * ```
 *
 * output(failed or flaky):
 *
 * ```
 * - Expected  - 1
 * + Received  + 1
 *   Array [
 * -   "hello",
 * +   "ello",
 *   ]
 * ```
 *
 */
export declare function waitForInlineEditorStateUpdated(page: Page): Promise<void>;
export declare function initImageState(page: Page, prependParagraph?: boolean): Promise<void>;
export declare function getCurrentEditorDocId(page: Page): Promise<string>;
export declare function getCurrentHTMLTheme(page: Page): Promise<string | null>;
export declare function getCurrentEditorTheme(page: Page): Promise<string>;
export declare function getCurrentThemeCSSPropertyValue(page: Page, property: string): Promise<string>;
export declare function scrollToTop(page: Page): Promise<void>;
export declare function scrollToBottom(page: Page): Promise<void>;
export declare function mockParseDocUrlService(page: Page, mapping: Record<string, string>): Promise<void>;
export {};
//# sourceMappingURL=misc.d.ts.map