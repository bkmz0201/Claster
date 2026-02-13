import type { TextRendererOptions } from '@affine/core/blocksuite/ai/components/text-renderer';
import type { EditorHost } from '@blocksuite/affine/std';
import { LitElement } from 'lit';
import { type ChatMessage } from '../../../components/ai-chat-messages';
export declare class AIChatBlockMessage extends LitElement {
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
    private renderStreamObjects;
    private renderRichText;
    accessor message: ChatMessage;
    accessor host: EditorHost;
    accessor state: 'finished' | 'generating';
    accessor textRendererOptions: TextRendererOptions;
}
export declare class AIChatBlockMessages extends LitElement {
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
    accessor host: EditorHost;
    accessor messages: ChatMessage[];
    accessor textRendererOptions: TextRendererOptions;
}
declare global {
    interface HTMLElementTagNameMap {
        'ai-chat-block-message': AIChatBlockMessage;
        'ai-chat-block-messages': AIChatBlockMessages;
    }
}
//# sourceMappingURL=ai-chat-messages.d.ts.map