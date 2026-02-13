import { ShadowlessElement } from '@blocksuite/affine/std';
import type { CollectionChip } from './type';
declare const ChatPanelCollectionChip_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class ChatPanelCollectionChip extends ChatPanelCollectionChip_base {
    accessor chip: CollectionChip;
    accessor removeChip: (chip: CollectionChip) => void;
    accessor collection: {
        id: string;
        name: string;
    };
    render(): import("lit-html").TemplateResult<1>;
    private readonly onChipDelete;
}
export {};
//# sourceMappingURL=collection-chip.d.ts.map