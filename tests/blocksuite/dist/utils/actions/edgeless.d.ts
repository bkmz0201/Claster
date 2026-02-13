import '../declare-test-window.js';
import type { IPoint, IVec } from '@blocksuite/affine/global/gfx';
import type { NoteDisplayMode } from '@blocksuite/affine/model';
import type { Locator, Page } from '@playwright/test';
import type { Bound } from '../asserts.js';
import { dragBetweenCoords } from './drag.js';
export declare const ZOOM_BAR_RESPONSIVE_SCREEN_WIDTH = 1200;
export type Point = {
    x: number;
    y: number;
};
export declare enum Shape {
    Diamond = "Diamond",
    Ellipse = "Ellipse",
    'Rounded rectangle' = "Rounded rectangle",
    Square = "Square",
    Triangle = "Triangle"
}
export declare enum ConnectorMode {
    Straight = 0,
    Orthogonal = 1,
    Curve = 2
}
export declare function getNoteRect(page: Page, noteId: string): Promise<{
    x: any;
    y: any;
    w: any;
    h: any;
}>;
export declare function getNoteProps(page: Page, noteId: string): Promise<Record<string, string | number> | null>;
export declare function extendFormatBar(page: Page): Promise<void>;
export declare function toggleFramePanel(page: Page): Promise<void>;
export declare function toggleMultipleEditors(page: Page): Promise<void>;
export declare function switchEditorMode(page: Page): Promise<void>;
export declare function switchMultipleEditorsMode(page: Page): Promise<void>;
export declare function switchEditorEmbedMode(page: Page): Promise<void>;
export declare function enterPresentationMode(page: Page): Promise<void>;
export declare function toggleEditorReadonly(page: Page): Promise<void>;
type EdgelessTool = 'default' | 'pan' | 'note' | 'shape' | 'pen' | 'brush' | 'highlighter' | 'eraser' | 'text' | 'connector' | 'frame' | 'frameNavigator';
type ZoomToolType = 'zoomIn' | 'zoomOut' | 'fitToScreen';
type ComponentToolType = 'shape' | 'thin' | 'thick' | 'brush' | 'more';
type PresentationToolType = 'previous' | 'next';
export declare function locatorEdgelessToolButton(page: Page, type: EdgelessTool, innerContainer?: boolean): Promise<Locator>;
export declare function toggleZoomBarWhenSmallScreenWidth(page: Page): Promise<void>;
export declare function locatorEdgelessZoomToolButton(page: Page, type: ZoomToolType, innerContainer?: boolean): Promise<Locator>;
export declare function locatorEdgelessComponentToolButton(page: Page, type: ComponentToolType, innerContainer?: boolean): Locator;
export declare function locatorPresentationToolbarButton(page: Page, type: PresentationToolType): Locator;
export declare function setEdgelessTool(page: Page, mode: EdgelessTool, shape?: Shape): Promise<void>;
export type ShapeName = 'rect' | 'ellipse' | 'diamond' | 'triangle' | 'roundedRect';
export declare function assertEdgelessShapeType(page: Page, type: ShapeName): Promise<void>;
export declare function assertEdgelessTool(page: Page, mode: string): Promise<void>;
export declare function getConnectorLabel(page: Page, id: string): Promise<string>;
export declare function assertEdgelessConnectorToolMode(page: Page, mode: ConnectorMode): Promise<void>;
export declare function getEdgelessBlockChild(page: Page): Promise<{
    x: number;
    y: number;
    width: number;
    height: number;
}>;
export declare function getEdgelessSelectedRect(page: Page): Promise<DOMRect>;
export declare function getEdgelessSelectedRectModel(page: Page): Promise<Bound>;
export declare function decreaseZoomLevel(page: Page): Promise<void>;
export declare function increaseZoomLevel(page: Page): Promise<void>;
export declare function autoFit(page: Page): Promise<void>;
export declare function addBasicBrushElement(page: Page, start: Point, end: Point, auto?: boolean): Promise<void>;
export declare function addBasicRectShapeElement(page: Page, start: Point, end: Point): Promise<void>;
export declare function addBasicShapeElement(page: Page, start: Point, end: Point, shape: Shape): Promise<string>;
export declare function addBasicConnectorElement(page: Page, start: Point, end: Point): Promise<string>;
export declare function addBasicFrameElement(page: Page, start: Point, end: Point): Promise<void>;
export declare function addBasicEdgelessText(page: Page, text: string, x: number, y: number): Promise<void>;
export declare function addNote(page: Page, text: string, x: number, y: number): Promise<string>;
export declare function exitEditing(page: Page): Promise<void>;
export declare function resizeElementByHandle(page: Page, delta: Point, corner?: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left', steps?: number, beforeMouseUp?: () => Promise<void>): Promise<void>;
export declare function rotateElementByHandle(page: Page, deg?: number, corner?: 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left', steps?: number): Promise<void>;
export declare function selectBrushColor(page: Page, label: string): Promise<void>;
export declare function selectBrushSize(page: Page, size: string): Promise<void>;
export declare function pickColorAtPoints(page: Page, points: number[][]): Promise<`#${string}`[]>;
export declare function getNoteBoundBoxInEdgeless(page: Page, noteId: string): Promise<{
    x: number;
    y: number;
    width: number;
    height: number;
}>;
export declare function getAllNoteIds(page: Page): Promise<string[]>;
export declare function getAllEdgelessNoteIds(page: Page): Promise<string[]>;
export declare function getAllEdgelessTextIds(page: Page): Promise<string[]>;
export declare function countBlock(page: Page, flavour: string): Promise<number>;
export declare function activeNoteInEdgeless(page: Page, noteId: string): Promise<void>;
export declare function selectNoteInEdgeless(page: Page, noteId: string): Promise<void>;
export declare function locatorNoteDisplayModeButton(page: Page, mode: NoteDisplayMode): Locator;
export declare function locatorScalePanelButton(page: Page, scale: number): Locator;
export declare function changeNoteDisplayMode(page: Page, mode: NoteDisplayMode): Promise<void>;
export declare function changeNoteDisplayModeWithId(page: Page, noteId: string, mode: NoteDisplayMode): Promise<void>;
export declare function updateExistedBrushElementSize(page: Page, nthSizeButton: 1 | 2 | 3 | 4 | 5 | 6): Promise<void>;
export declare function openComponentToolbarMoreMenu(page: Page): Promise<void>;
export declare function clickComponentToolbarMoreMenuButton(page: Page, button: 'delete'): Promise<void>;
export declare function zoomByMouseWheel(page: Page, stepX: number, stepY: number, pressedKey?: boolean): Promise<void>;
export declare function multiTouchDown(page: Page, points: Point[]): Promise<void>;
export declare function multiTouchMove(page: Page, from: Point[], to: Point[], step?: number): Promise<void>;
export declare function multiTouchUp(page: Page, points: Point[]): Promise<void>;
export declare function zoomFitByKeyboard(page: Page): Promise<void>;
export declare function zoomOutByKeyboard(page: Page): Promise<void>;
export declare function zoomResetByKeyboard(page: Page): Promise<void>;
export declare function zoomToSelection(page: Page): Promise<void>;
export declare function zoomInByKeyboard(page: Page): Promise<void>;
export declare function getZoomLevel(page: Page): Promise<number>;
export declare function getViewportCenter(page: Page): Promise<[number, number]>;
export declare function setViewportCenter(page: Page, center: [number, number]): Promise<void>;
export declare function optionMouseDrag(page: Page, start: number[], end: number[]): Promise<void>;
export declare function shiftClick(page: Page, point: IPoint): Promise<void>;
export declare function shiftClickView(page: Page, point: [number, number]): Promise<void>;
export declare function deleteAll(page: Page): Promise<void>;
export declare function deleteAllConnectors(page: Page): Promise<void>;
export declare function locatorComponentToolbar(page: Page): Locator;
export declare function locatorComponentToolbarMoreButton(page: Page): Locator;
type Action = 'bringToFront' | 'bringForward' | 'sendBackward' | 'sendToBack' | 'copyAsPng' | 'changeNoteStyle' | 'changeShapeStyle' | 'changeShapeColor' | 'changeShapeFillColor' | 'changeShapeStrokeColor' | 'changeShapeStrokeStyles' | 'changeConnectorStrokeStyles' | 'changeConnectorShape' | 'addFrame' | 'addGroup' | 'addMindmap' | 'createGroupOnMoreOption' | 'ungroup' | 'releaseFromGroup' | 'createFrameOnMoreOption' | 'duplicate' | 'renameGroup' | 'autoSize' | 'changeNoteDisplayMode' | 'changeNoteSlicerSetting' | 'changeNoteScale' | 'addText' | 'quickConnect' | 'turnIntoLinkedDoc' | 'createLinkedDoc' | 'openLinkedDoc' | 'toCardView' | 'toEmbedView' | 'autoArrange' | 'autoResize';
export declare function triggerShapeSwitch(page: Page, type: 'Square' | 'Ellipse' | 'Diamond' | 'Triangle' | 'Rounded rectangle'): Promise<void>;
export declare function triggerComponentToolbarAction(page: Page, action: Action): Promise<void>;
export declare function changeEdgelessNoteBackground(page: Page, label: string): Promise<void>;
export declare function changeShapeFillColor(page: Page, label: string): Promise<void>;
export declare function changeShapeFillColorToTransparent(page: Page): Promise<void>;
export declare function changeShapeStrokeColor(page: Page, color: string): Promise<void>;
export declare function resizeConnectorByStartCapitalHandler(page: Page, delta: {
    x: number;
    y: number;
}, steps?: number): Promise<void>;
export declare function getEdgelessLineWidthPanel(page: Page): Locator;
export declare function changeShapeStrokeWidth(page: Page): Promise<void>;
export declare function locatorShapeStrokeStyleButton(page: Page, mode: 'solid' | 'dash' | 'none'): Locator;
export declare function changeShapeStrokeStyle(page: Page, mode: 'solid' | 'dash' | 'none'): Promise<void>;
export declare function locatorShapeStyleButton(page: Page, style: 'general' | 'scribbled'): Locator;
export declare function changeShapeStyle(page: Page, style: 'general' | 'scribbled'): Promise<void>;
export declare function changeConnectorStrokeColor(page: Page, color: string): Promise<void>;
export declare function locatorConnectorStrokeWidthButton(page: Page, buttonPosition: number): Locator;
export declare function changeConnectorStrokeWidth(page: Page, buttonPosition: number): Promise<void>;
export declare function locatorConnectorStrokeStyleButton(page: Page, mode: 'solid' | 'dash' | 'none'): Locator;
export declare function changeConnectorStrokeStyle(page: Page, mode: 'solid' | 'dash' | 'none'): Promise<void>;
export declare function initThreeOverlapFilledShapes(page: Page): Promise<void>;
export declare function initThreeOverlapNotes(page: Page, x?: number, y?: number): Promise<void>;
export declare function initThreeNotes(page: Page): Promise<void>;
export declare function toViewCoord(page: Page, point: number[]): Promise<IVec>;
export declare function dragBetweenViewCoords(page: Page, start: number[], end: number[], options?: Parameters<typeof dragBetweenCoords>[3]): Promise<void>;
export declare function toModelCoord(page: Page, point: number[]): Promise<IVec>;
export declare function getConnectorSourceConnection(page: Page): Promise<import("@blocksuite/affine-model").Connection>;
export declare function getConnectorPath(page: Page, index?: number): Promise<IVec[]>;
export declare function getConnectorPathWithInOut(page: Page, index?: number): Promise<{
    point: IVec;
    in: IVec;
    out: IVec;
}[]>;
export declare function getEdgelessElementBound(page: Page, elementId: string): Promise<[number, number, number, number]>;
export declare function getSelectedIds(page: Page): Promise<string[]>;
export declare function getSelectedBoundCount(page: Page): Promise<number>;
export declare function getSelectedBound(page: Page, index?: number): Promise<[number, number, number, number]>;
export declare function getContainerOfElements(page: Page, ids: string[]): Promise<(string | null)[]>;
export declare function getContainerIds(page: Page): Promise<string[]>;
export declare function getContainerChildIds(page: Page, id: string): Promise<string[]>;
export declare function getCanvasElementsCount(page: Page): Promise<number>;
export declare function getSortedIds(page: Page): Promise<string[]>;
export declare function getAllSortedIds(page: Page): Promise<string[]>;
export declare function getTypeById(page: Page, id: string): Promise<string>;
export declare function getIds(page: Page, filterGroup?: boolean): Promise<string[]>;
export declare function getFirstContainerId(page: Page, exclude?: string[]): Promise<string>;
export declare function getIndexes(page: Page): Promise<string[]>;
export declare function getSortedIdsInViewport(page: Page): Promise<string[]>;
export declare function edgelessCommonSetup(page: Page): Promise<void>;
export declare function createFrame(page: Page, coord1: [number, number], coord2: [number, number]): Promise<string>;
export declare function createShapeElement(page: Page, coord1: number[], coord2: number[], shape?: Shape): Promise<string>;
export declare function createConnectorElement(page: Page, coord1: number[], coord2: number[]): Promise<string>;
export declare function createFrameElement(page: Page, coord1: number[], coord2: number[]): Promise<void>;
export declare function createBrushElement(page: Page, coord1: number[], coord2: number[], auto?: boolean): Promise<void>;
export declare function createEdgelessText(page: Page, coord: number[], text?: string): Promise<void>;
export declare function createMindmap(page: Page, coord: number[]): Promise<void>;
export declare function createNote(page: Page, coord1: number[], content?: string): Promise<string>;
export declare function hoverOnNote(page: Page, id: string, offset?: number[]): Promise<void>;
export declare function toIdCountMap(ids: string[]): Record<string, number>;
export declare function getFrameTitle(page: Page, frame: string): Locator;
export declare function selectElementInEdgeless(page: Page, elements: string[]): Promise<void>;
export declare function waitFontsLoaded(page: Page): Promise<void>;
export declare function isIntersected(bound1: [number, number, number, number], bound2: [number, number, number, number]): boolean;
export {};
//# sourceMappingURL=edgeless.d.ts.map