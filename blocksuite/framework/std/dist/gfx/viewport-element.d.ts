import { type EditorHost, ShadowlessElement } from '../view';
import { GfxBlockElementModel } from './model/gfx-block-model';
import { Viewport } from './viewport';
/**
 * A wrapper around `requestConnectedFrame` that only calls at most once in one frame
 */
export declare function requestThrottledConnectedFrame<T extends (...args: unknown[]) => void>(func: T, element?: HTMLElement): T;
declare const GfxViewportElement_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class GfxViewportElement extends GfxViewportElement_base {
    static styles: import("lit").CSSResult;
    private readonly _hideOutsideAndNoSelectedBlock;
    private _lastVisibleModels?;
    private readonly _pendingChildrenUpdates;
    private readonly _refreshViewport;
    private _updatingChildrenFlag;
    connectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    scheduleUpdateChildren?: (id: string) => Promise<void>;
    private _getSelectedModels;
    accessor getModelsInViewport: () => Set<GfxBlockElementModel>;
    accessor host: undefined | EditorHost;
    accessor maxConcurrentRenders: number;
    accessor enableChildrenSchedule: boolean;
    accessor viewport: Viewport;
    setBlocksActive(blockIds: string[]): void;
    setBlocksIdle(blockIds: string[]): void;
}
export {};
//# sourceMappingURL=viewport-element.d.ts.map