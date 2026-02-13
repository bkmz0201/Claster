import './action-wrapper';
import '../../messages/slides-renderer';
import type { EditorHost } from '@blocksuite/affine/std';
import { ShadowlessElement } from '@blocksuite/affine/std';
import { nothing } from 'lit';
import { type ChatAction } from '../../components/ai-chat-messages';
declare const ActionSlides_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class ActionSlides extends ActionSlides_base {
    accessor item: ChatAction;
    accessor host: EditorHost;
    protected render(): import("lit-html").TemplateResult<1> | typeof nothing;
}
declare global {
    interface HTMLElementTagNameMap {
        'action-slides': ActionSlides;
    }
}
export {};
//# sourceMappingURL=slides.d.ts.map