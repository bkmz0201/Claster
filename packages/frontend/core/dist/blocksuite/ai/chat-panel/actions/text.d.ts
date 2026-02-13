import './action-wrapper';
import type { EditorHost } from '@blocksuite/affine/std';
import { LitElement } from 'lit';
import { type ChatAction } from '../../components/ai-chat-messages';
declare const ActionText_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class ActionText extends ActionText_base {
    static styles: import("lit").CSSResult;
    accessor item: ChatAction;
    accessor host: EditorHost;
    accessor isCode: boolean;
    protected render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'action-text': ActionText;
    }
}
export {};
//# sourceMappingURL=text.d.ts.map