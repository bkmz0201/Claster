import { type EditorHost } from '@blocksuite/affine/std';
import { LitElement } from 'lit';
import type { AIItemGroupConfig } from './ai-item/types';
declare const AskAIPanel_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class AskAIPanel extends AskAIPanel_base {
    static styles: import("lit").CSSResult;
    accessor host: EditorHost;
    accessor actionGroups: AIItemGroupConfig[];
    accessor abortController: AbortController | null;
    accessor onItemClick: (() => void) | undefined;
    accessor minWidth: number;
    get _isEdgelessMode(): boolean;
    get _actionGroups(): {
        items: import("./ai-item").AIItemConfig[];
        name?: string;
        testId?: string;
    }[];
    connectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ask-ai-panel': AskAIPanel;
    }
}
export {};
//# sourceMappingURL=ask-ai-panel.d.ts.map