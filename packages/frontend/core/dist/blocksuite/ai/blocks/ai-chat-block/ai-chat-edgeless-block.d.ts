import { AIChatBlockComponent } from './ai-chat-block';
declare const EdgelessAIChatBlockComponent_base: typeof AIChatBlockComponent & (new (...args: any[]) => import("@blocksuite/std").GfxBlockComponent);
export declare class EdgelessAIChatBlockComponent extends EdgelessAIChatBlockComponent_base {
    renderGfxBlock(): import("lit-html").TemplateResult<1>;
}
export declare const EdgelessAIChatBlockInteraction: import("@blocksuite/store").ExtensionType;
declare global {
    interface HTMLElementTagNameMap {
        'affine-edgeless-ai-chat': EdgelessAIChatBlockComponent;
    }
}
export {};
//# sourceMappingURL=ai-chat-edgeless-block.d.ts.map