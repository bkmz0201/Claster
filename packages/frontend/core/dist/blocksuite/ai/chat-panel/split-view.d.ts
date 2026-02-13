import { ShadowlessElement } from '@blocksuite/std';
import { type PropertyValues, type TemplateResult } from 'lit';
declare const ChatPanelSplitView_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class ChatPanelSplitView extends ChatPanelSplitView_base {
    static styles: import("lit").CSSResult;
    accessor minWidthPercent: number;
    accessor open: boolean;
    accessor left: TemplateResult<1> | null;
    accessor right: TemplateResult<1> | null;
    private accessor _handle;
    private accessor _left;
    private accessor _right;
    accessor isDragging: boolean;
    accessor isTransitioning: boolean;
    private readonly _storeKey;
    private _getInitialSize;
    private _setInitialSize;
    private _percent;
    private _initialBox;
    private _initialX;
    private _initialPercent;
    private _rafId;
    private _onDragStart;
    private _onDragMove;
    private _onDragEnd;
    private _updateSize;
    firstUpdated(changed: PropertyValues): void;
    updated(changed: PropertyValues): void;
    render(): TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'chat-panel-split-view': ChatPanelSplitView;
    }
}
export {};
//# sourceMappingURL=split-view.d.ts.map