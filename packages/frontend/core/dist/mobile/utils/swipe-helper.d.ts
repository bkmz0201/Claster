type Direction = 'horizontal' | 'vertical';
export interface SwipeInfo {
    e: TouchEvent;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    deltaX: number;
    deltaY: number;
    isFirst: boolean;
    /**
     * Instant horizontal speed in `px/s`
     */
    speedX: number;
    /**
     * Average horizontal speed in `px/s`
     */
    averageSpeedX: number;
    /**
     * Instant vertical speed in `px/s`
     */
    speedY: number;
    /**
     * Average vertical speed in `px/s`
     */
    averageSpeedY: number;
    /**
     * The first detected direction
     */
    initialDirection: Direction | null;
}
export interface SwipeHelperOptions {
    scope?: 'global' | 'inside';
    /**
     * When swipe started, the direction will be detected and not change until swipe ended.
     * If the direction is specified, and not match the detected one, the scroll won't be prevented.
     */
    direction?: Direction;
    /**
     * @description The distance in px that determine which direction the swipe gesture is
     * @default 10
     */
    directionThreshold?: number;
    preventScroll?: boolean;
    onTap?: () => void;
    onSwipeStart?: () => void;
    onSwipe?: (info: SwipeInfo) => void;
    onSwipeEnd?: (info: SwipeInfo) => void;
}
export declare class SwipeHelper {
    private _trigger;
    private _options;
    private _direction;
    private _startPos;
    private _isFirst;
    private _lastInfo;
    private _startTime;
    private _lastTime;
    get scopeElement(): HTMLElement;
    private _dragStartCleanup;
    private _dragMoveCleanup;
    private _dragEndCleanup;
    /**
     * Register touch event to observe drag gesture
     */
    init(trigger: HTMLElement, options?: SwipeHelperOptions): () => void;
    /**
     * Remove all listeners
     */
    destroy(): void;
    private _handleTouchStart;
    private _handleTouchMove;
    private _handleTouchEnd;
    private _getInfo;
    private _clearDrag;
}
export {};
//# sourceMappingURL=swipe-helper.d.ts.map