import type { EditorHost } from '@blocksuite/affine/std';
import { LitElement } from 'lit';
import type { AffineAIPanelWidgetConfig } from '../widgets/ai-panel/type';
type AIAnswerWrapperOptions = {
    height: number;
};
export declare class AIAnswerWrapper extends LitElement {
    static styles: import("lit").CSSResult;
    accessor options: AIAnswerWrapperOptions | undefined;
    protected render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ai-answer-wrapper': AIAnswerWrapper;
    }
}
export declare const createIframeRenderer: (host: EditorHost, options?: AIAnswerWrapperOptions) => AffineAIPanelWidgetConfig['answerRenderer'];
export declare const createImageRenderer: (host: EditorHost, options?: AIAnswerWrapperOptions) => AffineAIPanelWidgetConfig['answerRenderer'];
export {};
//# sourceMappingURL=wrapper.d.ts.map