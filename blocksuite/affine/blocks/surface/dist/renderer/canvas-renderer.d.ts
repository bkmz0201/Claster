import { type Color, ColorScheme } from '@blocksuite/affine-model';
import type { IBound } from '@blocksuite/global/gfx';
import type { BlockStdScope } from '@blocksuite/std';
import type { GridManager, LayerManager, SurfaceBlockModel, Viewport } from '@blocksuite/std/gfx';
import { Subject } from 'rxjs';
import type { SurfaceElementModel } from '../element-model/base.js';
import type { Overlay } from './overlay.js';
type EnvProvider = {
    generateColorProperty: (color: Color, fallback?: Color) => string;
    getColorScheme: () => ColorScheme;
    getColorValue: (color: Color, fallback?: Color, real?: boolean) => string;
    getPropertyValue: (property: string) => string;
    selectedElements?: () => string[];
};
type RendererOptions = {
    std: BlockStdScope;
    viewport: Viewport;
    layerManager: LayerManager;
    provider?: Partial<EnvProvider>;
    enableStackingCanvas?: boolean;
    onStackingCanvasCreated?: (canvas: HTMLCanvasElement) => void;
    gridManager: GridManager;
    surfaceModel: SurfaceBlockModel;
};
export declare class CanvasRenderer {
    private _container;
    private readonly _disposables;
    private readonly _turboEnabled;
    private readonly _overlays;
    private _refreshRafId;
    private _stackingCanvas;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    std: BlockStdScope;
    grid: GridManager;
    layerManager: LayerManager;
    provider: Partial<EnvProvider>;
    stackingCanvasUpdated: Subject<{
        canvases: HTMLCanvasElement[];
        added: HTMLCanvasElement[];
        removed: HTMLCanvasElement[];
    }>;
    usePlaceholder: boolean;
    viewport: Viewport;
    get stackingCanvas(): HTMLCanvasElement[];
    constructor(options: RendererOptions);
    /**
     * Specifying the actual size gives better results and more consistent behavior across browsers.
     *
     * Make sure the main canvas and the offscreen canvas or layer canvas are the same size.
     *
     * It is not recommended to set width and height to 100%.
     */
    private _canvasSizeUpdater;
    private _initStackingCanvas;
    private _initViewport;
    private _render;
    private _renderByBound;
    private _resetSize;
    private _watchSurface;
    addOverlay(overlay: Overlay): void;
    /**
     * Used to attach main canvas, main canvas will always exist
     * @param container
     */
    attach(container: HTMLElement): void;
    dispose(): void;
    generateColorProperty(color: Color, fallback?: Color): string;
    getCanvasByBound(bound?: IBound, surfaceElements?: SurfaceElementModel[], canvas?: HTMLCanvasElement, clearBeforeDrawing?: boolean, withZoom?: boolean): HTMLCanvasElement;
    getColorScheme(): ColorScheme;
    getColorValue(color: Color, fallback?: Color, real?: boolean): string;
    getPropertyValue(property: string): string;
    refresh(): void;
    removeOverlay(overlay: Overlay): void;
}
export {};
//# sourceMappingURL=canvas-renderer.d.ts.map