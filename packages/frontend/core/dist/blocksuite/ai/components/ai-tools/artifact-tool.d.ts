import type { ColorScheme } from '@blocksuite/affine/model';
import { ShadowlessElement } from '@blocksuite/affine/std';
import type { Signal } from '@preact/signals-core';
import { type PropertyValues, type TemplateResult } from 'lit';
declare const ArtifactTool_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
/**
 * Base web-component for AI artifact tools.
 * It encapsulates common reactive properties (data/std/width/…)
 * and automatically calls `updatePreviewPanel()` when the `data`
 * property changes while the preview panel is open.
 */
export declare abstract class ArtifactTool<TData extends {
    type: 'tool-result' | 'tool-call';
}> extends ArtifactTool_base {
    static styles: import("lit").CSSResult;
    /** Tool data coming from ChatGPT (tool-call / tool-result). */
    accessor data: TData;
    accessor theme: Signal<ColorScheme>;
    /**
     * Sub-class must provide primary information for the card.
     */
    protected abstract getCardMeta(): {
        title: string;
        /** Extra css class appended to card root */
        className?: string;
    };
    /**
     * Icon shown in the card (when not loading) and in the loading skeleton.
     */
    protected abstract getIcon(): TemplateResult | HTMLElement | string | null;
    /** Banner shown on the right side of the card (can be undefined). */
    protected abstract getBanner(theme: ColorScheme): TemplateResult | HTMLElement | string | null | undefined;
    /**
     * Provide the main TemplateResult shown in the preview panel.
     * Called each time the panel opens or the tool data updates.
     */
    protected abstract getPreviewContent(): TemplateResult<1>;
    /** Provide the action controls (right-side buttons) for the panel. */
    protected getPreviewControls(): TemplateResult<1> | undefined;
    /** Open or refresh the preview panel. */
    private openOrUpdatePreviewPanel;
    protected isLoading(): boolean;
    protected refreshPreviewPanel(): void;
    /** Optionally override to show an error card. Return null if no error. */
    protected getErrorTemplate(): TemplateResult | null;
    protected renderLoadingSkeleton(): TemplateResult<1>;
    private readonly onCardClick;
    protected renderCard(): TemplateResult<1>;
    connectedCallback(): void;
    render(): TemplateResult;
    updated(changed: PropertyValues<this>): void;
}
export {};
//# sourceMappingURL=artifact-tool.d.ts.map