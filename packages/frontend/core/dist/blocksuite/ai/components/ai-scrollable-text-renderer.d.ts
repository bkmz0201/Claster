import { ShadowlessElement } from '@blocksuite/affine/std';
import type { PropertyValues } from 'lit';
import type { AffineAIPanelState, AffineAIPanelWidgetConfig } from '../widgets/ai-panel/type';
import type { TextRendererOptions } from './text-renderer';
declare const AIScrollableTextRenderer_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class AIScrollableTextRenderer extends AIScrollableTextRenderer_base {
    static styles: import("lit").CSSResult;
    private _lastScrollHeight;
    private readonly _scrollToEnd;
    private readonly _throttledScrollToEnd;
    private readonly _onWheel;
    protected updated(_changedProperties: PropertyValues): void;
    render(): import("lit-html").TemplateResult<1>;
    accessor answer: string;
    accessor state: AffineAIPanelState | undefined;
    accessor textRendererOptions: TextRendererOptions;
    accessor maxHeight: number;
    accessor autoScroll: boolean;
    accessor _scrollableTextRenderer: HTMLDivElement | null;
}
export declare const createAIScrollableTextRenderer: (textRendererOptions: TextRendererOptions, maxHeight: number, autoScroll: boolean) => AffineAIPanelWidgetConfig['answerRenderer'];
declare global {
    interface HTMLElementTagNameMap {
        'ai-scrollable-text-renderer': AIScrollableTextRenderer;
    }
}
export {};
//# sourceMappingURL=ai-scrollable-text-renderer.d.ts.map