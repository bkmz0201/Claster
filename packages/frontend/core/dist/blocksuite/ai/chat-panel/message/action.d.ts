import type { EditorHost } from '@blocksuite/affine/std';
import { ShadowlessElement } from '@blocksuite/affine/std';
import { type ChatAction } from '../../components/ai-chat-messages';
declare const ChatMessageAction_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class ChatMessageAction extends ChatMessageAction_base {
    accessor host: EditorHost;
    accessor item: ChatAction;
    accessor testId: string;
    renderHeader(): import("lit-html").TemplateResult<1>;
    renderContent(): import("lit-html").TemplateResult<1>;
    protected render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'chat-message-action': ChatMessageAction;
    }
}
export {};
//# sourceMappingURL=action.d.ts.map