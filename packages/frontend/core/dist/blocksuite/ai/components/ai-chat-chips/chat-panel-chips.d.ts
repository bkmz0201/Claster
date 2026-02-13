import { ShadowlessElement } from '@blocksuite/affine/std';
import { type Signal } from '@preact/signals-core';
import { type PropertyValues } from 'lit';
import type { ChatChip, DocChip, DocDisplayConfig, FileChip } from './type';
declare const ChatPanelChips_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class ChatPanelChips extends ChatPanelChips_base {
    static styles: import("lit").CSSResult;
    private _abortController;
    accessor chips: ChatChip[];
    accessor isCollapsed: boolean;
    accessor independentMode: boolean | undefined;
    accessor addChip: (chip: ChatChip) => Promise<void>;
    accessor updateChip: (chip: ChatChip, options: Partial<DocChip | FileChip>) => void;
    accessor removeChip: (chip: ChatChip) => Promise<void>;
    accessor toggleCollapse: () => void;
    accessor docDisplayConfig: DocDisplayConfig;
    accessor portalContainer: HTMLElement | null;
    accessor testId: string;
    accessor moreCandidateButton: HTMLDivElement;
    accessor referenceDocs: Signal<Array<{
        docId: string;
        title: string;
    }>>;
    private _tags;
    private _collections;
    private _cleanup;
    private _docIds;
    render(): import("lit-html").TemplateResult<1>;
    connectedCallback(): void;
    protected updated(_changedProperties: PropertyValues): void;
    disconnectedCallback(): void;
    private readonly _toggleMoreCandidatesMenu;
    private readonly _checkTokenLimit;
    private readonly _updateReferenceDocs;
}
export {};
//# sourceMappingURL=chat-panel-chips.d.ts.map