import { ShadowlessElement } from '@blocksuite/affine/std';
import { type PropertyValues } from 'lit';
import type { DocChip, DocDisplayConfig } from './type';
declare const ChatPanelDocChip_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class ChatPanelDocChip extends ChatPanelDocChip_base {
    accessor chip: DocChip;
    accessor independentMode: boolean | undefined;
    accessor addChip: (chip: DocChip) => void;
    accessor updateChip: (chip: DocChip, options: Partial<DocChip>) => void;
    accessor removeChip: (chip: DocChip) => void;
    accessor checkTokenLimit: (newChip: DocChip, newTokenCount: number) => boolean;
    accessor docDisplayConfig: DocDisplayConfig;
    private chipName;
    connectedCallback(): void;
    updated(changedProperties: PropertyValues): void;
    disconnectedCallback(): void;
    private readonly onChipClick;
    private readonly onChipDelete;
    private readonly autoUpdateChip;
    private readonly processDocChip;
    render(): import("lit-html").TemplateResult<1>;
}
export {};
//# sourceMappingURL=doc-chip.d.ts.map