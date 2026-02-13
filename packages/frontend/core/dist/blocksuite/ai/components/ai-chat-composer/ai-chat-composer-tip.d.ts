import type { PropertyValues, TemplateResult } from 'lit';
import { LitElement } from 'lit';
export declare class AIChatComposerTip extends LitElement {
    static styles: import("lit").CSSResult;
    accessor tips: TemplateResult[];
    accessor loop: boolean;
    private readonly _interval;
    private readonly _animDuration;
    private _tipIntervalId;
    private _tipListElement;
    private _currentIndex;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected firstUpdated(): void;
    protected willUpdate(changed: PropertyValues<this>): void;
    private _startAutoScroll;
    private _stopAutoScroll;
    private _scrollToNext;
    private readonly _onMouseEnter;
    private readonly _onMouseLeave;
    render(): TemplateResult<1>;
}
//# sourceMappingURL=ai-chat-composer-tip.d.ts.map