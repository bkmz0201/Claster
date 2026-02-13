import type { EditorHost } from '@blocksuite/affine/std';
import { LitElement, nothing } from 'lit';
import type { AIItemGroupConfig } from '../../components/ai-item/types';
declare const EdgelessCopilotPanel_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class EdgelessCopilotPanel extends EdgelessCopilotPanel_base {
    static styles: import("lit").CSSResult;
    private _getChain;
    connectedCallback(): void;
    hide(): void;
    render(): import("lit-html").TemplateResult<1> | typeof nothing;
    accessor entry: 'toolbar' | 'selection' | undefined;
    accessor groups: AIItemGroupConfig[];
    accessor host: EditorHost;
    accessor onClick: (() => void) | undefined;
}
declare global {
    interface HTMLElementTagNameMap {
        'edgeless-copilot-panel': EdgelessCopilotPanel;
    }
}
export {};
//# sourceMappingURL=index.d.ts.map