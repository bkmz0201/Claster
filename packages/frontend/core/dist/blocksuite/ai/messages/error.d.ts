import { type EditorHost } from '@blocksuite/affine/std';
import { LitElement } from 'lit';
import { type AIError } from '../provider';
declare const AIErrorWrapper_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class AIErrorWrapper extends AIErrorWrapper_base {
    static styles: import("lit").CSSResult;
    private readonly _showDetailContent;
    protected render(): import("lit-html").TemplateResult<1>;
    accessor text: string;
    accessor onClick: () => void;
    accessor errorMessage: string;
    accessor actionText: string;
    accessor actionTooltip: string;
    accessor showDetailPanel: boolean;
    accessor testId: string;
}
export declare function AIChatErrorRenderer(error: AIError, host?: EditorHost | null): import("lit-html").TemplateResult<1>;
declare global {
    interface HTMLElementTagNameMap {
        'ai-error-wrapper': AIErrorWrapper;
    }
}
export {};
//# sourceMappingURL=error.d.ts.map