import { ShadowlessElement } from '@blocksuite/affine/std';
import { type TemplateResult } from 'lit';
export declare const isPreviewPanelOpen: (target: HTMLElement) => boolean;
export declare const renderPreviewPanel: (target: HTMLElement, content: TemplateResult<1>, controls?: TemplateResult<1>) => void;
export declare const closePreviewPanel: (target: HTMLElement) => void;
declare const ArtifactPreviewPanel_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class ArtifactPreviewPanel extends ArtifactPreviewPanel_base {
    static styles: import("lit").CSSResult;
    accessor content: TemplateResult<1> | null;
    accessor controls: TemplateResult<1> | null;
    private readonly _handleClose;
    protected render(): TemplateResult<1>;
}
export {};
//# sourceMappingURL=artifacts-preview-panel.d.ts.map