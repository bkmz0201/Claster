import { ShadowlessElement } from '@blocksuite/affine/std';
import { type TemplateResult } from 'lit';
/**
 * A modal component for AI Playground
 */
export declare class PlaygroundModal extends ShadowlessElement {
    static styles: import("lit").CSSResult;
    private _close;
    private readonly _handleKeyDown;
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): TemplateResult<1>;
    accessor modalTitle: string;
    accessor content: TemplateResult;
    accessor onClose: (() => void) | undefined;
}
declare global {
    interface HTMLElementTagNameMap {
        'playground-modal': PlaygroundModal;
    }
}
/**
 * Creates and displays a modal with the provided content
 */
export declare const createPlaygroundModal: (content: TemplateResult, title: string) => PlaygroundModal;
//# sourceMappingURL=modal.d.ts.map