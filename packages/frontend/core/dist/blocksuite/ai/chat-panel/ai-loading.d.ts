import { LitElement } from 'lit';
declare const AILoading_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class AILoading extends AILoading_base {
    static styles: import("lit").CSSResult;
    accessor stopGenerating: () => void;
    accessor testId: string;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ai-loading': AILoading;
    }
}
export {};
//# sourceMappingURL=ai-loading.d.ts.map