import { LitElement, type TemplateResult } from 'lit';
/**
 * ArtifactSkeleton
 *
 * A lightweight loading skeleton used while an artifact preview is fetching / processing.
 * It mimics the layout of a document – an optional icon followed by several animated grey lines.
 *
 * Animation is implemented with pure CSS keyframes (no framer-motion dependency).
 * Only a single prop is supported for now:
 *   - `icon` – TemplateResult that will be rendered at the top-left position.
 */
export declare class ArtifactSkeleton extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * Optional icon rendered at the top-left corner.
     * It should be a lit `TemplateResult`, typically an inline SVG.
     */
    accessor icon: TemplateResult | null;
    render(): TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'artifact-skeleton': ArtifactSkeleton;
    }
}
//# sourceMappingURL=index.d.ts.map