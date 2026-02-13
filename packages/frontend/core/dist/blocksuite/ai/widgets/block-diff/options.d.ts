import { LitElement } from 'lit';
import type { PatchOp } from '../../utils/apply-model/markdown-diff';
declare const BlockDiffOptions_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class BlockDiffOptions extends BlockDiffOptions_base {
    static styles: import("lit").CSSResult;
    accessor onAccept: (op: PatchOp) => void;
    accessor op: PatchOp;
    accessor onReject: (op: PatchOp) => void;
    private readonly _handleAcceptClick;
    private readonly _handleRejectClick;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ai-block-diff-options': BlockDiffOptions;
    }
}
export {};
//# sourceMappingURL=options.d.ts.map