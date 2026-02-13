import { ShadowlessElement } from '@blocksuite/affine/std';
import { type TemplateResult } from 'lit';
import type { ChipState } from './type';
declare const ChatPanelChip_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class ChatPanelChip extends ChatPanelChip_base {
    static styles: import("lit").CSSResult;
    accessor state: ChipState;
    accessor name: string;
    accessor tooltip: string;
    accessor icon: TemplateResult<1>;
    accessor closeable: boolean;
    accessor onChipDelete: () => void;
    accessor onChipClick: () => void;
    render(): TemplateResult<1>;
}
export {};
//# sourceMappingURL=chip.d.ts.map