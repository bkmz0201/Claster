import { BlockStdScope, ShadowlessElement } from '@blocksuite/affine/std';
import type { ExtensionType, Store } from '@blocksuite/affine/store';
import { nothing, type TemplateResult } from 'lit';
declare const EdgelessEditor_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class EdgelessEditor extends EdgelessEditor_base {
    static styles: import("lit").CSSResult;
    get host(): import("@blocksuite/std").EditorHost | null;
    connectedCallback(): void;
    getUpdateComplete(): Promise<boolean>;
    render(): TemplateResult<1> | typeof nothing;
    willUpdate(changedProperties: Map<string | number | symbol, unknown>): void;
    accessor doc: Store;
    accessor editor: TemplateResult;
    accessor specs: ExtensionType[];
    accessor std: BlockStdScope;
}
declare global {
    interface HTMLElementTagNameMap {
        'edgeless-editor': EdgelessEditor;
    }
}
export {};
//# sourceMappingURL=edgeless-editor.d.ts.map