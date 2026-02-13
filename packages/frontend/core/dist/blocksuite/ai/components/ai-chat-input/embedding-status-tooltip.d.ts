import type { WorkspaceDialogService } from '@affine/core/modules/dialogs';
import { LitElement } from 'lit';
declare const AIChatEmbeddingStatusTooltip_base: typeof LitElement;
export declare class AIChatEmbeddingStatusTooltip extends AIChatEmbeddingStatusTooltip_base {
    static styles: import("lit").CSSResult;
    accessor affineWorkspaceDialogService: WorkspaceDialogService;
    connectedCallback(): void;
    private readonly _handleCheckStatusClick;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ai-chat-embedding-status-tooltip': AIChatEmbeddingStatusTooltip;
    }
}
export {};
//# sourceMappingURL=embedding-status-tooltip.d.ts.map