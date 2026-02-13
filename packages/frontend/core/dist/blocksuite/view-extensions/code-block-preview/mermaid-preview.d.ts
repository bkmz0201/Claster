import type { CodeBlockModel } from '@blocksuite/affine/model';
import { ShadowlessElement } from '@blocksuite/std';
import { type PropertyValues } from 'lit';
export declare const CodeBlockMermaidPreview: import("@blocksuite/store").ExtensionType;
declare const MermaidPreview_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class MermaidPreview extends MermaidPreview_base {
    static styles: import("lit").CSSResult;
    accessor model: CodeBlockModel | null;
    accessor mermaidCode: string | null;
    accessor state: 'loading' | 'error' | 'finish' | 'fallback';
    accessor svgContent: string;
    accessor container: HTMLDivElement;
    private mermaid;
    private retryCount;
    private readonly maxRetries;
    private renderTimeout;
    private isRendering;
    private scale;
    private translateX;
    private translateY;
    private isDragging;
    private lastMouseX;
    private lastMouseY;
    firstUpdated(_changedProperties: PropertyValues): void;
    willUpdate(changedProperties: PropertyValues<this>): void;
    disconnectedCallback(): void;
    get normalizedMermaidCode(): string | null;
    private _scheduleRender;
    private _resetTransform;
    private _zoomIn;
    private _zoomOut;
    private _updateTransform;
    private readonly _handleMouseDown;
    private readonly _handleMouseMove;
    private readonly _handleMouseUp;
    private readonly _handleWheel;
    private _setupEventListeners;
    private _loadMermaid;
    private _render;
    render(): import("lit-html").TemplateResult<1>;
}
export declare function effects(): void;
declare global {
    interface HTMLElementTagNameMap {
        'mermaid-preview': MermaidPreview;
    }
}
export {};
//# sourceMappingURL=mermaid-preview.d.ts.map