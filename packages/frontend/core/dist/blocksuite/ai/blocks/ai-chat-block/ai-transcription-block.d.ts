import type { TranscriptionBlockModel } from '@affine/core/blocksuite/ai/blocks/transcription-block/model';
import { BlockComponent } from '@blocksuite/affine/std';
import type { ExtensionType } from '@blocksuite/affine/store';
import { type PropertyValues } from 'lit';
export declare class LitTranscriptionBlock extends BlockComponent<TranscriptionBlockModel> {
    static styles: import("lit").CSSResult[];
    render(): import("lit-html").TemplateResult;
    accessor blockId: string;
    constructor();
    firstUpdated(changedProperties: PropertyValues): void;
    protected onClick(event: MouseEvent): void;
}
export declare const AITranscriptionBlockSpec: ExtensionType[];
//# sourceMappingURL=ai-transcription-block.d.ts.map