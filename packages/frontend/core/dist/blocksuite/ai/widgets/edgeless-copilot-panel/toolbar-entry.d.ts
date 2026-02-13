import type { EditorHost } from '@blocksuite/affine/std';
import { LitElement } from 'lit';
import type { AIItemGroupConfig } from '../../components/ai-item/types';
declare const EdgelessCopilotToolbarEntry_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class EdgelessCopilotToolbarEntry extends EdgelessCopilotToolbarEntry_base {
    static styles: import("lit").CSSResult;
    private readonly _onClick;
    private get _gfx();
    private _showCopilotPanel;
    render(): import("lit-html").TemplateResult<1>;
    accessor groups: AIItemGroupConfig[];
    accessor host: EditorHost;
    accessor onClick: (() => void) | undefined;
}
export {};
//# sourceMappingURL=toolbar-entry.d.ts.map