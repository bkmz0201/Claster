import './declare-test-window.js';
import { type Locator, type Page } from '@playwright/test';
export declare const defaultStore: {
    meta: {
        pages: {
            id: string;
            title: string;
            tags: never[];
        }[];
    };
    spaces: {
        'doc:home': {
            blocks: {
                '0': {
                    'prop:title': string;
                    'sys:id': string;
                    'sys:flavour': string;
                    'sys:children': string[];
                    'sys:version': number;
                };
                '1': {
                    'sys:flavour': string;
                    'sys:id': string;
                    'sys:children': string[];
                    'sys:version': number;
                    'prop:xywh': string;
                    'prop:background': string;
                    'prop:index': string;
                    'prop:hidden': boolean;
                    'prop:displayMode': string;
                    'prop:edgeless': {
                        style: {
                            borderRadius: number;
                            borderSize: number;
                            borderStyle: string;
                            shadowType: string;
                        };
                    };
                };
                '2': {
                    'sys:flavour': string;
                    'sys:id': string;
                    'sys:children': never[];
                    'sys:version': number;
                    'prop:text': string;
                    'prop:type': string;
                };
            };
        };
    };
};
export type Bound = [x: number, y: number, w: number, h: number];
export declare function assertEmpty(page: Page): Promise<void>;
export declare function assertTitle(page: Page, text: string): Promise<void>;
export declare function assertInlineEditorDeltas(page: Page, deltas: unknown[], i?: number): Promise<void>;
export declare function assertRichTextInlineDeltas(page: Page, deltas: unknown[], i?: number): Promise<void>;
export declare function assertText(page: Page, text: string, i?: number): Promise<void>;
export declare function assertTextContain(page: Page, text: string, i?: number): Promise<void>;
export declare function assertRichTexts(page: Page, texts: string[]): Promise<void>;
export declare function assertEdgelessCanvasText(page: Page, text: string): Promise<void>;
export declare function assertRichImage(page: Page, count: number): Promise<void>;
export declare function assertDivider(page: Page, count: number): Promise<void>;
export declare function assertRichDragButton(page: Page): Promise<void>;
export declare function assertImageSize(page: Page, size: {
    width: number;
    height: number;
}): Promise<void>;
export declare function assertDocTitleFocus(page: Page): Promise<void>;
export declare function assertListPrefix(page: Page, predict: (string | RegExp)[], range?: [number, number]): Promise<void>;
export declare function assertBlockCount(page: Page, flavour: string, count: number): Promise<void>;
export declare function assertRowCount(page: Page, count: number): Promise<void>;
export declare function assertVisibleBlockCount(page: Page, flavour: string, count: number): Promise<void>;
export declare function assertRichTextInlineRange(page: Page, richTextIndex: number, rangeIndex: number, rangeLength?: number): Promise<void>;
export declare function assertNativeSelectionRangeCount(page: Page, count: number): Promise<void>;
export declare function assertNoteXYWH(page: Page, expected: [number, number, number, number]): Promise<void>;
export declare function assertTextFormat(page: Page, richTextIndex: number, index: number, resultObj: unknown): Promise<void>;
export declare function assertRichTextModelType(page: Page, type: string, index?: number): Promise<void>;
export declare function assertTextFormats(page: Page, resultObj: unknown[]): Promise<void>;
export declare function assertStore(page: Page, expected: Record<string, unknown>): Promise<void>;
export declare function assertBlockChildrenIds(page: Page, blockId: string, ids: string[]): Promise<void>;
export declare function assertBlockChildrenFlavours(page: Page, blockId: string, flavours: string[]): Promise<void>;
export declare function assertParentBlockId(page: Page, blockId: string, parentId: string): Promise<void>;
export declare function assertParentBlockFlavour(page: Page, blockId: string, flavour: string): Promise<void>;
export declare function assertClassName(page: Page, selector: string, className: RegExp): Promise<void>;
export declare function assertTextContent(page: Page, selector: string, text: RegExp): Promise<void>;
export declare function assertBlockType(page: Page, id: string | number | null, type: string): Promise<void>;
export declare function assertBlockFlavour(page: Page, id: string | number, flavour: string): Promise<void>;
export declare function assertBlockTextContent(page: Page, id: string | number, str: string): Promise<void>;
export declare function assertBlockProps(page: Page, id: string, props: Record<string, unknown>): Promise<void>;
export declare function assertBlockTypes(page: Page, blockTypes: string[]): Promise<void>;
type MimeType = 'text/plain' | 'blocksuite/x-c+w' | 'text/html';
export declare function assertClipItems(_page: Page, _key: MimeType, _value: unknown): boolean;
export declare function assertAlmostEqual(actual: number, expected: number, precision?: number): void;
export declare function assertPointAlmostEqual(actual: number[], expected: number[], precision?: number): void;
/**
 * Assert the locator is visible in the viewport.
 * It will check the bounding box of the locator is within the viewport.
 *
 * See also https://playwright.dev/docs/actionability#visible
 */
export declare function assertLocatorVisible(page: Page, locator: Locator, visible?: boolean): Promise<void>;
/**
 * Assert basic keyboard operation works in input
 *
 * NOTICE:
 *   - it will clear the input value.
 *   - it will pollute undo/redo history.
 */
export declare function assertKeyboardWorkInInput(page: Page, locator: Locator): Promise<void>;
export declare function assertSameColor(c1?: `#${string}`, c2?: `#${string}`): void;
type Rect = {
    x: number;
    y: number;
    w: number;
    h: number;
};
export declare function assertNoteRectEqual(page: Page, noteId: string, expected: Rect): Promise<void>;
export declare function assertRectEqual(a: Rect, b: Rect): void;
export declare function assertDOMRectEqual(a: DOMRect, b: DOMRect): void;
export declare function assertEdgelessDraggingArea(page: Page, xywh: number[]): Promise<void>;
export declare function getSelectedRect(page: Page): Promise<{
    x: number;
    y: number;
    width: number;
    height: number;
}>;
export declare function assertEdgelessSelectedRect(page: Page, xywh: number[]): Promise<void>;
export declare function assertEdgelessSelectedModelRect(page: Page, xywh: number[]): Promise<void>;
export declare function assertEdgelessSelectedElementHandleCount(page: Page, count: number): Promise<void>;
export declare function assertEdgelessRemoteSelectedRect(page: Page, xywh: number[], index?: number): Promise<void>;
export declare function assertEdgelessRemoteSelectedModelRect(page: Page, xywh: number[], index?: number): Promise<void>;
export declare function assertEdgelessSelectedRectRotation(page: Page, deg?: number): Promise<void>;
export declare function assertEdgelessSelectedReactCursor(page: Page, expected: ({
    mode: 'resize';
    handle: 'top' | 'right' | 'bottom' | 'left' | 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left';
} | {
    mode: 'rotate';
    handle: 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left';
}) & {
    cursor: string;
}): Promise<void>;
export declare function assertEdgelessNonSelectedRect(page: Page): Promise<void>;
export declare function assertSelectionInNote(page: Page, noteId: string, blockNote?: string): Promise<void>;
export declare function assertEdgelessNoteBackground(page: Page, noteId: string, color: string): Promise<void>;
export declare function assertEdgelessColorSameWithHexColor(page: Page, edgelessColor: string, hexColor: `#${string}`): Promise<void>;
export declare function assertZoomLevel(page: Page, zoom: number): Promise<void>;
export declare function assertConnectorPath(page: Page, path: number[][], index?: number): Promise<void>;
export declare function assertRectExist(rect: {
    x: number;
    y: number;
    width: number;
    height: number;
} | null): asserts rect is {
    x: number;
    y: number;
    width: number;
    height: number;
};
export declare function assertEdgelessElementBound(page: Page, elementId: string, bound: Bound): Promise<void>;
export declare function assertSelectedBound(page: Page, expected: Bound, index?: number): Promise<void>;
/**
 * asserts all groups and they children count at the same time
 * @param page
 * @param expected the expected group id and the count of of its children
 */
export declare function assertContainerIds(page: Page, expected: Record<string, number>): Promise<void>;
export declare function assertSortedIds(page: Page, expected: string[]): Promise<void>;
export declare function assertContainerChildIds(page: Page, expected: Record<string, number>, id: string): Promise<void>;
export declare function assertContainerOfElements(page: Page, elements: string[], containerId: string | null): Promise<void>;
/**
 * Assert the given container has the expected children count.
 * And the children's container id should equal to the given container id.
 * @param page
 * @param containerId
 * @param childrenCount
 */
export declare function assertContainerChildCount(page: Page, containerId: string, childrenCount: number): Promise<void>;
export declare function assertCanvasElementsCount(page: Page, expected: number): Promise<void>;
export declare function assertBound(received: Bound, expected: Bound): void;
export declare function assertClipboardItem(page: Page, data: unknown, type: string): Promise<void>;
export declare function assertClipboardCustomData(page: Page, type: string, data: unknown): Promise<void>;
export declare function assertClipData(clipItems: {
    mimeType: string;
    data: unknown;
}[], expectClipItems: {
    mimeType: string;
    data: unknown;
}[], type: string): void;
export declare function assertHasClass(locator: Locator, className: string): Promise<void>;
export declare function assertNotHasClass(locator: Locator, className: string): Promise<void>;
export declare function assertNoteSequence(page: Page, expected: string): Promise<void>;
export declare function assertBlockSelections(page: Page, paths: string[]): Promise<void>;
export declare function assertTextSelection(page: Page, from?: {
    blockId: string;
    index: number;
    length: number;
}, to?: {
    blockId: string;
    index: number;
    length: number;
}): Promise<void>;
export declare function assertConnectorStrokeColor(page: Page, label: string, color: string): Promise<void>;
export {};
//# sourceMappingURL=asserts.d.ts.map