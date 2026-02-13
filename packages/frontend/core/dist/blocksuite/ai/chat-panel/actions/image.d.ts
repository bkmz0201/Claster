import type { EditorHost } from '@blocksuite/affine/std';
import { ShadowlessElement } from '@blocksuite/affine/std';
import { type ChatAction } from '../../components/ai-chat-messages';
declare const ActionImage_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class ActionImage extends ActionImage_base {
    accessor item: ChatAction;
    accessor host: EditorHost;
    accessor testId: string;
    protected render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'action-image': ActionImage;
    }
}
export {};
//# sourceMappingURL=image.d.ts.map