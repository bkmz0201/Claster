import type { EditorHost } from '@blocksuite/affine/std';
import { LitElement } from 'lit';
import type { AIPanelErrorConfig, CopyConfig } from '../../type.js';
declare const AIPanelError_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class AIPanelError extends AIPanelError_base {
    static styles: import("lit").CSSResult;
    private readonly _getResponseGroup;
    render(): import("lit-html").TemplateResult<1>;
    accessor config: AIPanelErrorConfig;
    accessor copy: CopyConfig | undefined;
    accessor host: EditorHost;
    accessor withAnswer: boolean;
}
declare global {
    interface HTMLElementTagNameMap {
        'ai-panel-error': AIPanelError;
    }
}
export {};
//# sourceMappingURL=error.d.ts.map