import type { TagMeta } from '@affine/core/components/page-list';
import { ShadowlessElement } from '@blocksuite/affine/std';
import type { TagChip } from './type';
declare const ChatPanelTagChip_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class ChatPanelTagChip extends ChatPanelTagChip_base {
    static styles: import("lit").CSSResult;
    accessor chip: TagChip;
    accessor removeChip: (chip: TagChip) => void;
    accessor tag: TagMeta;
    render(): import("lit-html").TemplateResult<1>;
    private readonly onChipDelete;
}
export {};
//# sourceMappingURL=tag-chip.d.ts.map