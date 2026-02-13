import './action-wrapper';
import type { EditorHost } from '@blocksuite/affine/std';
import { ShadowlessElement } from '@blocksuite/affine/std';
import { type ChatAction } from '../../components/ai-chat-messages';
declare const ActionMakeReal_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class ActionMakeReal extends ActionMakeReal_base {
    accessor item: ChatAction;
    accessor host: EditorHost;
    protected render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'action-make-real': ActionMakeReal;
    }
}
export {};
//# sourceMappingURL=make-real.d.ts.map