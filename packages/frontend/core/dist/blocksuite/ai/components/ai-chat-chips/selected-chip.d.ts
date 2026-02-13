import { ShadowlessElement } from '@blocksuite/affine/std';
import type { SelectedContextChip } from './type';
declare const ChatPanelSelectedChip_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class ChatPanelSelectedChip extends ChatPanelSelectedChip_base {
    accessor chip: SelectedContextChip;
    accessor removeChip: (chip: SelectedContextChip) => void;
    render(): import("lit-html").TemplateResult<1>;
    private readonly onChipDelete;
}
export {};
//# sourceMappingURL=selected-chip.d.ts.map