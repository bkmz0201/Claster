import { type EditorHost } from '@blocksuite/affine/std';
import { LitElement } from 'lit';
import type { AIContext } from '../utils/context';
import type { AffineAIPanelWidgetConfig } from '../widgets/ai-panel/type';
export declare const createSlidesRenderer: (host: EditorHost, ctx: AIContext) => AffineAIPanelWidgetConfig['answerRenderer'];
declare const AISlidesRenderer_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class AISlidesRenderer extends AISlidesRenderer_base {
    static styles: import("lit").CSSResult;
    private readonly _editorContainer;
    private _doc;
    private _docCollection;
    private accessor _editorHost;
    accessor text: string;
    accessor host: EditorHost;
    accessor ctx: {
        get(): Record<string, unknown>;
        set(data: Record<string, unknown>): void;
    } | undefined;
    protected firstUpdated(): void;
    protected _getExtensions(): import("@blocksuite/store").ExtensionType[];
    protected render(): import("lit-html").TemplateResult<1>;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'ai-slides-renderer': AISlidesRenderer;
    }
}
export {};
//# sourceMappingURL=slides-renderer.d.ts.map