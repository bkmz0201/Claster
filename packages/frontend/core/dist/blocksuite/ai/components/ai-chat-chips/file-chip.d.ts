import { ShadowlessElement } from '@blocksuite/affine/std';
import type { FileChip } from './type';
declare const ChatPanelFileChip_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class ChatPanelFileChip extends ChatPanelFileChip_base {
    accessor chip: FileChip;
    accessor removeChip: (chip: FileChip) => void;
    render(): import("lit-html").TemplateResult<1>;
    private readonly onChipDelete;
}
export {};
//# sourceMappingURL=file-chip.d.ts.map