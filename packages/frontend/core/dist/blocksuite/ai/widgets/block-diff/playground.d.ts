import { WidgetComponent } from '@blocksuite/affine/std';
import type { Store } from '@blocksuite/affine/store';
import { LitElement } from 'lit';
import { BlockDiffProvider } from '../../services/block-diff';
export declare const AFFINE_BLOCK_DIFF_PLAYGROUND = "affine-block-diff-playground";
export declare const AFFINE_BLOCK_DIFF_PLAYGROUND_MODAL = "affine-block-diff-playground-modal";
declare const BlockDiffPlaygroundModal_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class BlockDiffPlaygroundModal extends BlockDiffPlaygroundModal_base {
    static styles: import("lit").CSSResult;
    private accessor markdown;
    accessor diffService: BlockDiffProvider;
    accessor store: Store;
    accessor onClose: () => void;
    private readonly handleInput;
    private readonly handleClear;
    private getOriginalMarkdown;
    private readonly handleConfirm;
    private readonly handleInsertCurrentMarkdown;
    private readonly stopPropagation;
    render(): import("lit-html").TemplateResult<1>;
}
export declare class BlockDiffPlayground extends WidgetComponent {
    static styles: import("lit").CSSResult;
    accessor fab: HTMLDivElement;
    private _abortController;
    private get diffService();
    private readonly handleOpen;
    private readonly handleClose;
    render(): import("lit-html").TemplateResult<1>;
}
export declare const blockDiffPlayground: import("@blocksuite/store").ExtensionType;
export {};
//# sourceMappingURL=playground.d.ts.map