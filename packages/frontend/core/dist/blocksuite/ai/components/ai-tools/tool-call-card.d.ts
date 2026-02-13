import { ShadowlessElement } from '@blocksuite/affine/std';
import { type TemplateResult } from 'lit';
declare const ToolCallCard_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class ToolCallCard extends ToolCallCard_base {
    static styles: import("lit").CSSResult;
    accessor name: string;
    accessor icon: TemplateResult<1>;
    private accessor dotsText;
    private animationTimer?;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private startDotsAnimation;
    private stopDotsAnimation;
    protected render(): TemplateResult<1>;
}
export {};
//# sourceMappingURL=tool-call-card.d.ts.map