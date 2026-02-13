import type { FeatureFlagService } from '@affine/core/modules/feature-flag';
import type { ColorScheme } from '@blocksuite/affine/model';
import { ShadowlessElement } from '@blocksuite/affine/std';
import type { ExtensionType } from '@blocksuite/affine/store';
import type { Signal } from '@preact/signals-core';
declare const ChatContentRichText_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class ChatContentRichText extends ChatContentRichText_base {
    accessor text: string;
    accessor state: 'finished' | 'generating';
    accessor extensions: ExtensionType[];
    accessor affineFeatureFlagService: FeatureFlagService;
    accessor theme: Signal<ColorScheme>;
    protected render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'chat-content-rich-text': ChatContentRichText;
    }
}
export {};
//# sourceMappingURL=rich-text.d.ts.map