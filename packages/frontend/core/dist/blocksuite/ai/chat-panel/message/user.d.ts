import { ShadowlessElement } from '@blocksuite/affine/std';
import { type ChatMessage } from '../../components/ai-chat-messages';
declare const ChatMessageUser_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class ChatMessageUser extends ChatMessageUser_base {
    static styles: import("lit").CSSResult;
    accessor item: ChatMessage;
    accessor testId: string;
    renderContent(): import("lit-html").TemplateResult<1>;
    protected render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'chat-message-user': ChatMessageUser;
    }
}
export {};
//# sourceMappingURL=user.d.ts.map