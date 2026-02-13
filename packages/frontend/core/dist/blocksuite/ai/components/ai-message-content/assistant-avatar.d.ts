import { ShadowlessElement } from '@blocksuite/affine/std';
import type { ChatStatus } from '../ai-chat-messages';
export declare class AssistantAvatar extends ShadowlessElement {
    accessor status: ChatStatus;
    static styles: import("lit").CSSResult;
    protected render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'chat-assistant-avatar': AssistantAvatar;
    }
}
//# sourceMappingURL=assistant-avatar.d.ts.map