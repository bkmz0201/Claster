import { ColorScheme } from '@blocksuite/affine/model';
import { EditorHost } from '@blocksuite/affine/std';
import { LitElement } from 'lit';
import type { AIItemConfig } from './types';
declare const AIItem_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class AIItem extends AIItem_base {
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
    accessor host: EditorHost;
    accessor item: AIItemConfig;
    accessor menuItem: HTMLDivElement | null;
    accessor onClick: (() => void) | undefined;
    accessor theme: ColorScheme;
}
declare global {
    interface HTMLElementTagNameMap {
        'ai-item': AIItem;
    }
}
export {};
//# sourceMappingURL=ai-item.d.ts.map