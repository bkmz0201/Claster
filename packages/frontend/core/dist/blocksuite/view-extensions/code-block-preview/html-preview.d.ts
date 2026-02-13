import type { CodeBlockModel } from '@blocksuite/affine/model';
import { ShadowlessElement } from '@blocksuite/std';
import { type PropertyValues } from 'lit';
export declare const CodeBlockHtmlPreview: import("@blocksuite/store").ExtensionType;
declare const HTMLPreview_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class HTMLPreview extends HTMLPreview_base {
    static styles: import("lit").CSSResult;
    accessor model: CodeBlockModel | null;
    accessor html: string | null;
    accessor state: 'loading' | 'error' | 'finish' | 'fallback';
    accessor iframe: HTMLIFrameElement;
    firstUpdated(_changedProperties: PropertyValues): void;
    updated(changedProperties: PropertyValues): void;
    get normalizedHtml(): string | null;
    private _link;
    render(): import("lit-html").TemplateResult<1>;
}
export declare function effects(): void;
declare global {
    interface HTMLElementTagNameMap {
        'html-preview': HTMLPreview;
    }
}
export {};
//# sourceMappingURL=html-preview.d.ts.map