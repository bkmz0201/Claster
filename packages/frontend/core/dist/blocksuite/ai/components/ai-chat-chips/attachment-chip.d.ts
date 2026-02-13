import { ShadowlessElement } from '@blocksuite/affine/std';
import type { AttachmentChip } from './type';
declare const ChatPanelAttachmentChip_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class ChatPanelAttachmentChip extends ChatPanelAttachmentChip_base {
    accessor chip: AttachmentChip;
    accessor removeChip: (chip: AttachmentChip) => void;
    render(): import("lit-html").TemplateResult<1>;
    private readonly onChipDelete;
}
export {};
//# sourceMappingURL=attachment-chip.d.ts.map