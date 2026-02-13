import { ShadowlessElement } from '@blocksuite/affine/std';
import { nothing } from 'lit';
declare const ChatContentImages_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class ChatContentImages extends ChatContentImages_base {
    static styles: import("lit").CSSResult;
    accessor images: string[];
    accessor layout: 'row' | 'column';
    protected render(): import("lit-html").TemplateResult<1> | typeof nothing;
}
declare global {
    interface HTMLElementTagNameMap {
        'chat-content-images': ChatContentImages;
    }
}
export {};
//# sourceMappingURL=images.d.ts.map