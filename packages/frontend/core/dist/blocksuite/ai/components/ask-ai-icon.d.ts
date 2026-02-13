import { LitElement } from 'lit';
export type ButtonSize = 'small' | 'middle' | 'large';
declare const AskAIIcon_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class AskAIIcon extends AskAIIcon_base {
    accessor size: ButtonSize;
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ask-ai-icon': AskAIIcon;
    }
}
export {};
//# sourceMappingURL=ask-ai-icon.d.ts.map