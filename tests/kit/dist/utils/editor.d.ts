import '@blocksuite/affine/effects';
import type { IVec, XYWH } from '@blocksuite/affine/global/gfx';
import type { BlockComponent } from '@blocksuite/std';
import { type Locator, type Page } from '@playwright/test';
export declare const ZERO_WIDTH_FOR_EMPTY_LINE: string;
export declare function inlineEditorInnerTextToString(innerText: string): string;
export declare function locateModeSwitchButton(page: Page, mode: 'page' | 'edgeless', active?: boolean): Locator;
export declare function clickEdgelessModeButton(page: Page): Promise<void>;
export declare function clickPageModeButton(page: Page): Promise<void>;
export declare function ensureInPageMode(page: Page): Promise<void>;
export declare function ensureInEdgelessMode(page: Page): Promise<void>;
export declare function getPageMode(page: Page): Promise<'page' | 'edgeless'>;
export declare function locateEditorContainer(page: Page, editorIndex?: number): Locator;
export declare function locateDocTitle(page: Page, editorIndex?: number): Locator;
export declare function isDocTitleFocused(page: Page, editorIndex?: number): Promise<boolean>;
export declare function focusDocTitle(page: Page, editorIndex?: number): Promise<void>;
export declare function assertTitle(page: Page, text: string): Promise<void>;
export declare function locateToolbar(page: Page, editorIndex?: number): Locator;
export declare function getEdgelessSelectedIds(page: Page, editorIndex?: number): Promise<string[]>;
export declare function getSelectedXYWH(page: Page, index?: number, editorIndex?: number): Promise<[number, number, number, number]>;
export declare function getViewportCenter(page: Page, editorIndex?: number): Promise<import("@blocksuite/global/gfx").IPoint>;
export declare function getViewportBound(page: Page, editorIndex?: number): Promise<XYWH>;
export declare function setViewportCenter(page: Page, center: IVec, editorIndex?: number): Promise<void>;
export declare function setViewportZoom(page: Page, zoom?: number, editorIndex?: number): Promise<void>;
export declare function fitViewportToContent(page: Page, editorIndex?: number): Promise<void>;
/**
 * Convert a canvas point to view coordinate
 * @param point the coordinate on the canvas
 */
export declare function toViewCoord(page: Page, point: IVec, editorIndex?: number): Promise<IVec>;
/**
 * Convert a view coordinate to canvas point
 * @param point the coordinate on the view
 */
export declare function toModelCoord(page: Page, point: IVec, editorIndex?: number): Promise<IVec>;
/**
 * Move to a point on the canvas
 */
export declare function moveToView(page: Page, point: IVec, editorIndex?: number): Promise<void>;
/**
 * Click a point on the canvas
 * @param point the coordinate on the canvas
 */
export declare function clickView(page: Page, point: IVec, editorIndex?: number): Promise<void>;
/**
 * Double click a point on the canvas
 * @param point the coordinate on the canvas
 */
export declare function dblclickView(page: Page, point: IVec, editorIndex?: number): Promise<void>;
export declare function dragView(page: Page, from: IVec, to: IVec, editorIndex?: number): Promise<void>;
export declare function locateEdgelessToolbar(page: Page, editorIndex?: number): Locator;
type EdgelessTool = 'default' | 'pan' | 'note' | 'shape' | 'pen' | 'brush' | 'highlighter' | 'eraser' | 'text' | 'connector' | 'frame' | 'frameNavigator';
/**
 * @param type the type of the tool in the toolbar
 * @param innerContainer the button may have an inner container
 */
export declare function locateEdgelessToolButton(page: Page, type: EdgelessTool, innerContainer?: boolean, editorIndex?: number): Promise<Locator>;
export declare enum Shape {
    Diamond = "Diamond",
    Ellipse = "Ellipse",
    'Rounded rectangle' = "Rounded rectangle",
    Square = "Square",
    Triangle = "Triangle"
}
/**
 * Set edgeless tool by clicking button in edgeless toolbar
 */
export declare function setEdgelessTool(page: Page, tool: EdgelessTool, shape?: Shape, editorIndex?: number): Promise<void>;
export declare function resizeElementByHandle(page: Page, delta: IVec, corner?: 'right' | 'left' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left', editorIndex?: number): Promise<void>;
export declare function scaleElementByHandle(page: Page, delta: IVec, corner?: 'right' | 'left' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left', editorIndex?: number): Promise<void>;
/**
 * Create a not block in canvas
 * @param position the position or xwyh of the note block in canvas
 */
export declare function createEdgelessNoteBlock(page: Page, position: IVec | XYWH, editorIndex?: number): Promise<void>;
export declare function getBlockIds<T extends BlockComponent>(page: Page, selector: string): Promise<{
    blockIds: string[];
}>;
export declare function getParagraphIds(page: Page): Promise<{
    blockIds: string[];
}>;
export declare function getCodeBlockIds(page: Page): Promise<{
    blockIds: string[];
}>;
export {};
//# sourceMappingURL=editor.d.ts.map