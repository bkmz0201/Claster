import { CanvasRenderer, type SurfaceBlockModel } from '@blocksuite/affine/blocks/surface';
import { BlockComponent } from '@blocksuite/affine/std';
import { MindmapService } from './mindmap-service.js';
export declare class MindmapSurfaceBlock extends BlockComponent<SurfaceBlockModel> {
    renderer?: CanvasRenderer;
    private get _grid();
    private get _layer();
    get mindmapService(): MindmapService;
    get viewport(): import("@blocksuite/std/gfx").Viewport;
    get gfx(): import("@blocksuite/std/gfx").GfxController;
    constructor();
    private _adjustNodeWidth;
    private _resizeEffect;
    private _setupCenterEffect;
    private _setupRenderer;
    connectedCallback(): void;
    firstUpdated(_changedProperties: Map<PropertyKey, unknown>): void;
    render(): import("lit-html").TemplateResult<1>;
    accessor editorContainer: HTMLDivElement;
}
//# sourceMappingURL=surface-block.d.ts.map