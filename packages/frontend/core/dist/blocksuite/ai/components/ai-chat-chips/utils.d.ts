import { type TemplateResult } from 'lit';
import type { AttachmentChip, ChatChip, ChipState, CollectionChip, DocChip, FileChip, SelectedContextChip, TagChip } from './type';
export declare function getChipTooltip(state: ChipState, name: string, tooltip?: string | null): string;
export declare function getChipIcon(state: ChipState, icon: TemplateResult<1>): TemplateResult<1>;
export declare function isDocChip(chip: ChatChip): chip is DocChip;
export declare function isFileChip(chip: ChatChip): chip is FileChip;
export declare function isTagChip(chip: ChatChip): chip is TagChip;
export declare function isCollectionChip(chip: ChatChip): chip is CollectionChip;
export declare function isSelectedContextChip(chip: ChatChip): chip is SelectedContextChip;
export declare function isAttachmentChip(chip: ChatChip): chip is AttachmentChip;
export declare function getChipKey(chip: ChatChip): string | null;
export declare function omitChip(chips: ChatChip[], chip: ChatChip): ChatChip[];
export declare function findChipIndex(chips: ChatChip[], chip: ChatChip): number;
export declare function estimateTokenCount(text: string): number;
//# sourceMappingURL=utils.d.ts.map