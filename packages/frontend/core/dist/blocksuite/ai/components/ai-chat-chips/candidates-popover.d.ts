import { ShadowlessElement } from '@blocksuite/affine/std';
import { type Signal } from '@preact/signals-core';
import type { DocChip, DocDisplayConfig } from './type';
declare const ChatPanelCandidatesPopover_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class ChatPanelCandidatesPopover extends ChatPanelCandidatesPopover_base {
    static styles: import("lit").CSSResult;
    accessor referenceDocs: Signal<Array<{
        docId: string;
        title: string;
    }>>;
    accessor abortController: AbortController;
    accessor addChip: (chip: DocChip) => void;
    accessor docDisplayConfig: DocDisplayConfig;
    private accessor _activatedIndex;
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    private readonly _addDocChip;
    private readonly _handleKeyDown;
    private _scrollItemIntoView;
}
export {};
//# sourceMappingURL=candidates-popover.d.ts.map