import { ColorScheme } from '@blocksuite/affine/model';
import { LitElement } from 'lit';
declare const AIPanelInput_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class AIPanelInput extends AIPanelInput_base {
    static styles: import("lit").CSSResult;
    private readonly _onInput;
    private readonly _onKeyDown;
    private readonly _sendToAI;
    render(): import("lit-html").TemplateResult<1>;
    updated(_changedProperties: Map<PropertyKey, unknown>): void;
    private accessor _arrow;
    private accessor _hasContent;
    accessor onFinish: ((input: string) => void) | undefined;
    accessor onInput: ((input: string) => void) | undefined;
    accessor theme: ColorScheme;
    accessor textarea: HTMLTextAreaElement;
}
declare global {
    interface HTMLElementTagNameMap {
        'ai-panel-input': AIPanelInput;
    }
}
export {};
//# sourceMappingURL=input.d.ts.map