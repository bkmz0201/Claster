import { EditorHost } from '@blocksuite/affine/std';
import { LitElement } from 'lit';
import type { AIItemGroupConfig } from './types';
declare const AIItemList_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class AIItemList extends AIItemList_base {
    static styles: import("lit").CSSResult;
    private _abortController;
    private _activeSubMenuItem;
    private readonly _closeSubMenu;
    private readonly _itemClassName;
    private readonly _openSubMenu;
    disconnectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    accessor groups: AIItemGroupConfig[];
    accessor host: EditorHost;
    accessor onClick: (() => void) | undefined;
    accessor testId: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'ai-item-list': AIItemList;
    }
}
export {};
//# sourceMappingURL=ai-item-list.d.ts.map