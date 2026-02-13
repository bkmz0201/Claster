import { BlockComponent } from '@blocksuite/affine/std';
import { type AIChatBlockModel } from './model';
export declare class AIChatBlockComponent extends BlockComponent<AIChatBlockModel> {
    static styles: import("lit").CSSResult;
    private _textRendererOptions;
    private readonly _deserializeChatMessages;
    connectedCallback(): void;
    renderBlock(): import("lit-html").TemplateResult<1>;
    get previewExtensions(): import("@blocksuite/store").ExtensionType[];
}
declare global {
    interface HTMLElementTagNameMap {
        'affine-ai-chat': AIChatBlockComponent;
    }
}
//# sourceMappingURL=ai-chat-block.d.ts.map