import type { EditorHost } from '@blocksuite/affine/std';
import { LitElement, type TemplateResult } from 'lit';
import { type ChatAction } from '../../components/ai-chat-messages';
declare const ActionWrapper_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class ActionWrapper extends ActionWrapper_base {
    static styles: import("lit").CSSResult;
    accessor promptShow: boolean;
    accessor item: ChatAction;
    accessor host: EditorHost;
    protected render(): TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'action-wrapper': ActionWrapper;
    }
}
export {};
//# sourceMappingURL=action-wrapper.d.ts.map