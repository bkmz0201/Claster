import { Bound, type IPoint, type IVec } from '@blocksuite/global/gfx';
import { BehaviorSubject, Subject } from 'rxjs';
import type { GfxViewportElement } from '.';
export declare const ZOOM_MAX = 6;
export declare const ZOOM_MIN = 0.1;
export declare const ZOOM_STEP = 0.25;
export declare const ZOOM_INITIAL = 1;
export declare const FIT_TO_SCREEN_PADDING = 100;
export interface ViewportRecord {
    left: number;
    top: number;
    viewportX: number;
    viewportY: number;
    zoom: number;
    viewScale: number;
}
export declare function clientToModelCoord(viewport: ViewportRecord, clientCoord: [number, number]): IVec;
export declare class Viewport {
    private _cachedBoundingClientRect;
    private _cachedOffsetWidth;
    private _resizeObserver;
    private readonly _resizeSubject;
    private _isResizing;
    private _initialTopLeft;
    protected _center: IPoint;
    protected _shell: HTMLElement | null;
    protected _element: GfxViewportElement | null;
    protected _height: number;
    protected _left: number;
    protected _locked: boolean;
    protected _rafId: number | null;
    protected _top: number;
    protected _width: number;
    protected _zoom: number;
    elementReady: Subject<GfxViewportElement>;
    sizeUpdated: Subject<{
        width: number;
        height: number;
        left: number;
        top: number;
    }>;
    viewportMoved: Subject<IVec>;
    viewportUpdated: Subject<{
        zoom: number;
        center: IVec;
    }>;
    zooming$: BehaviorSubject<boolean>;
    panning$: BehaviorSubject<boolean>;
    ZOOM_MAX: number;
    ZOOM_MIN: number;
    private readonly _resetZooming;
    private readonly _resetPanning;
    constructor();
    private _setupResizeObserver;
    private _completeResize;
    private _forceCompleteResize;
    get boundingClientRect(): DOMRect;
    get element(): GfxViewportElement | null;
    get center(): IPoint;
    get centerX(): number;
    get centerY(): number;
    get height(): number;
    get left(): number;
    get locked(): boolean;
    set locked(locked: boolean);
    /**
     * Note this is different from the zoom property.
     * The editor itself may be scaled by outer container which is common in nested editor scenarios.
     * This property is used to calculate the scale of the editor.
     */
    get viewScale(): number;
    get top(): number;
    get translateX(): number;
    get translateY(): number;
    get viewportBounds(): Bound;
    get viewportMaxXY(): {
        x: number;
        y: number;
    };
    get viewportMinXY(): {
        x: number;
        y: number;
    };
    get viewportX(): number;
    get viewportY(): number;
    get width(): number;
    get zoom(): number;
    applyDeltaCenter(deltaX: number, deltaY: number): void;
    clearViewportElement(): void;
    dispose(): void;
    getFitToScreenData(bounds?: Bound | null, padding?: [number, number, number, number], maxZoom?: number, fitToScreenPadding?: number): {
        zoom: number;
        centerX: number;
        centerY: number;
    };
    isInViewport(bound: Bound): boolean;
    onResize(): void;
    /**
     * Set the center of the viewport.
     * @param centerX The new x coordinate of the center of the viewport.
     * @param centerY The new y coordinate of the center of the viewport.
     * @param forceUpdate Whether to force complete any pending resize operations before setting the viewport.
     */
    setCenter(centerX: number, centerY: number, forceUpdate?: boolean): void;
    setRect(left: number, top: number, width: number, height: number): void;
    /**
     * Set the viewport to the new zoom and center.
     * @param newZoom The new zoom value.
     * @param newCenter The new center of the viewport.
     * @param smooth Whether to animate the zooming and panning.
     * @param forceUpdate Whether to force complete any pending resize operations before setting the viewport.
     */
    setViewport(newZoom: number, newCenter?: IVec, smooth?: boolean, forceUpdate?: boolean): void;
    /**
     * Set the viewport to fit the bound with padding.
     * @param bound The bound will be zoomed to fit the viewport.
     * @param padding The padding will be applied to the bound after zooming, default is [0, 0, 0, 0],
     *                the value may be reduced if there is not enough space for the padding.
     *                Use decimal less than 1 to represent percentage padding. e.g. [0.1, 0.1, 0.1, 0.1] means 10% padding.
     * @param smooth whether to animate the zooming
     * @param forceUpdate whether to force complete any pending resize operations before setting the viewport
     */
    setViewportByBound(bound: Bound, padding?: [number, number, number, number], smooth?: boolean, forceUpdate?: boolean): void;
    /** This is the outer container of the viewport, which is the host of the viewport element */
    setShellElement(el: HTMLElement): void;
    /**
     * Set the viewport to the new zoom.
     * @param zoom The new zoom value.
     * @param focusPoint The point to focus on after zooming, default is the center of the viewport.
     * @param wheel Whether the zoom is caused by wheel event.
     * @param forceUpdate Whether to force complete any pending resize operations before setting the viewport.
     */
    setZoom(zoom: number, focusPoint?: IPoint, wheel?: boolean, forceUpdate?: boolean): void;
    smoothTranslate(x: number, y: number, numSteps?: number): void;
    smoothZoom(zoom: number, focusPoint?: IPoint, numSteps?: number): void;
    toModelBound(bound: Bound): Bound;
    toModelCoord(viewX: number, viewY: number, zoom?: number, center?: IPoint): IVec;
    toModelCoordFromClientCoord([x, y]: IVec): IVec;
    toViewBound(bound: Bound): Bound;
    toViewCoord(modelX: number, modelY: number): IVec;
    toViewCoordFromClientCoord([x, y]: IVec): IVec;
    serializeRecord(): string;
    deserializeRecord(record?: string): ViewportRecord | null;
}
//# sourceMappingURL=viewport.d.ts.map