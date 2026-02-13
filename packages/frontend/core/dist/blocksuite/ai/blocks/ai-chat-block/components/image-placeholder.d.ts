import { LitElement, type TemplateResult } from 'lit';
export declare class ImagePlaceholder extends LitElement {
    static styles: import("lit").CSSResult;
    render(): TemplateResult<1>;
    accessor icon: TemplateResult<1>;
    accessor text: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'image-placeholder': ImagePlaceholder;
    }
}
//# sourceMappingURL=image-placeholder.d.ts.map