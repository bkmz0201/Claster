import type { EditorHost } from '@blocksuite/affine/std';
import { LitElement } from 'lit';
import type { AIPanelAnswerConfig, CopyConfig } from '../../type.js';
declare const AIPanelAnswer_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class AIPanelAnswer extends AIPanelAnswer_base {
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
    accessor config: AIPanelAnswerConfig;
    accessor copy: CopyConfig | undefined;
    accessor finish: boolean;
    accessor host: EditorHost;
    accessor testId: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'ai-panel-answer': AIPanelAnswer;
    }
}
export {};
//# sourceMappingURL=answer.d.ts.map