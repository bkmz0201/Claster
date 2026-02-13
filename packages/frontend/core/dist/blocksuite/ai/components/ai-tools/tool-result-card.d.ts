import { ShadowlessElement } from '@blocksuite/affine/std';
import { type Signal } from '@preact/signals-core';
import { type TemplateResult } from 'lit';
export interface ToolResult {
    title: string | TemplateResult<1>;
    icon?: string | TemplateResult<1>;
    content?: string;
    href?: string;
    onClick?: () => void;
}
declare const ToolResultCard_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class ToolResultCard extends ToolResultCard_base {
    static styles: import("lit").CSSResult;
    accessor name: string;
    accessor icon: TemplateResult<1>;
    accessor footerIcons: TemplateResult<1>[] | string[];
    accessor results: ToolResult[];
    accessor width: Signal<number | undefined> | undefined;
    private accessor isCollapsed;
    private readonly imageProxyURL;
    protected render(): TemplateResult<1>;
    private renderFooterIcons;
    buildUrl(imageUrl: string): string;
    private renderIcon;
    private toggleCard;
}
export {};
//# sourceMappingURL=tool-result-card.d.ts.map