import { type EditorHost } from '@blocksuite/affine/std';
import { LitElement } from 'lit';
import type { AIItemGroupConfig } from './ai-item/types';
declare const AskAIToolbarButton_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class AskAIToolbarButton extends AskAIToolbarButton_base {
    static styles: import("lit").CSSResult;
    private _abortController;
    private _panelRoot;
    accessor host: EditorHost;
    accessor actionGroups: AIItemGroupConfig[];
    private readonly _onItemClick;
    private readonly _clearAbortController;
    private readonly _openAIPanel;
    private readonly _generateAnswer;
    private readonly _onClick;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ask-ai-toolbar-button': AskAIToolbarButton;
    }
}
export {};
//# sourceMappingURL=ask-ai-toolbar.d.ts.map