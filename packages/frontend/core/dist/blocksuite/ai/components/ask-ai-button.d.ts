import './ask-ai-panel';
import { type EditorHost } from '@blocksuite/affine/std';
import { LitElement } from 'lit';
import type { AIItemGroupConfig } from './ai-item/types';
import type { ButtonSize } from './ask-ai-icon';
type toggleType = 'hover' | 'click';
export type AskAIButtonOptions = {
    size: ButtonSize;
    backgroundColor?: string;
    boxShadow?: string;
    panelWidth?: number;
};
declare const AskAIButton_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class AskAIButton extends AskAIButton_base {
    static styles: import("lit").CSSResult;
    private accessor _askAIButton;
    private _abortController;
    private readonly _whenHover;
    accessor host: EditorHost;
    accessor actionGroups: AIItemGroupConfig[];
    accessor toggleType: toggleType;
    accessor options: AskAIButtonOptions;
    private readonly _clearAbortController;
    private readonly _toggleAIPanel;
    disconnectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ask-ai-button': AskAIButton;
    }
}
export {};
//# sourceMappingURL=ask-ai-button.d.ts.map