const defaultOptions = Object.freeze({
    scope: 'global',
    directionThreshold: 10,
});
export class SwipeHelper {
    constructor() {
        this._trigger = null;
        this._options = defaultOptions;
        this._direction = null;
        this._startPos = { x: 0, y: 0 };
        this._isFirst = true;
        this._lastInfo = null;
        this._startTime = 0;
        this._lastTime = 0;
        this._dragStartCleanup = () => { };
        this._dragMoveCleanup = () => { };
        this._dragEndCleanup = () => { };
    }
    get scopeElement() {
        return this._options.scope === 'inside'
            ? (this._trigger ?? document.body)
            : document.body;
    }
    /**
     * Register touch event to observe drag gesture
     */
    init(trigger, options) {
        this.destroy();
        this._options = { ...this._options, ...options };
        this._trigger = trigger;
        const handler = this._handleTouchStart.bind(this);
        trigger.addEventListener('touchstart', handler, {
            passive: !this._options.preventScroll,
        });
        this._dragStartCleanup = () => {
            trigger.removeEventListener('touchstart', handler);
        };
        return () => this.destroy();
    }
    /**
     * Remove all listeners
     */
    destroy() {
        this._dragStartCleanup();
        this._clearDrag();
    }
    _handleTouchStart(e) {
        const touch = e.touches[0];
        this._startPos = {
            x: touch.clientX,
            y: touch.clientY,
        };
        this._lastTime = Date.now();
        this._startTime = this._lastTime;
        this._options.onSwipeStart?.();
        const moveHandler = this._handleTouchMove.bind(this);
        this.scopeElement.addEventListener('touchmove', moveHandler, {
            passive: !this._options.preventScroll,
        });
        const endHandler = this._handleTouchEnd.bind(this);
        this.scopeElement.addEventListener('touchend', endHandler, {
            passive: !this._options.preventScroll,
        });
        this._dragMoveCleanup = () => {
            this.scopeElement.removeEventListener('touchmove', moveHandler);
        };
        this._dragEndCleanup = () => {
            this.scopeElement.removeEventListener('touchend', endHandler);
        };
    }
    _handleTouchMove(e) {
        const info = this._getInfo(e);
        if (this._options.preventScroll &&
            // direction is not detected
            (!this._direction ||
                // direction is not specified
                !this._options.direction ||
                // direction is same as specified
                this._direction === this._options.direction)) {
            e.preventDefault();
        }
        this._lastInfo = info;
        this._isFirst = false;
        this._options.onSwipe?.(info);
    }
    _handleTouchEnd() {
        if (!this._lastInfo ||
            (Math.abs(this._lastInfo.deltaY) < 1 &&
                Math.abs(this._lastInfo.deltaX) < 1)) {
            this._options.onTap?.();
        }
        else {
            this._options.onSwipeEnd?.(this._lastInfo);
        }
        this._clearDrag();
    }
    _getInfo(e) {
        const lastTime = this._lastTime;
        this._lastTime = Date.now();
        const deltaTime = this._lastTime - lastTime;
        const touch = e.touches[0];
        const deltaX = touch.clientX - this._startPos.x;
        const deltaY = touch.clientY - this._startPos.y;
        const speedX = (Math.abs(deltaX - (this._lastInfo?.deltaX ?? 0)) / deltaTime) * 1000;
        const averageSpeedX = (Math.abs(deltaX) / (this._lastTime - this._startTime)) * 1000;
        const speedY = (Math.abs(deltaY - (this._lastInfo?.deltaY ?? 0)) / deltaTime) * 1000;
        const averageSpeedY = (Math.abs(deltaY) / (this._lastTime - this._startTime)) * 1000;
        // detect direction
        const threshold = this._options.directionThreshold ?? defaultOptions.directionThreshold;
        const maxDelta = Math.max(Math.abs(deltaX), Math.abs(deltaY));
        if (!this._direction && maxDelta > threshold) {
            this._direction =
                Math.abs(deltaX) > Math.abs(deltaY) ? 'horizontal' : 'vertical';
        }
        return {
            e,
            startX: this._startPos.x,
            startY: this._startPos.y,
            endX: touch.clientX,
            endY: touch.clientY,
            deltaX,
            deltaY,
            isFirst: this._isFirst,
            speedX,
            averageSpeedX,
            speedY,
            averageSpeedY,
            initialDirection: this._direction,
        };
    }
    _clearDrag() {
        this._lastInfo = null;
        this._lastTime = 0;
        this._startTime = 0;
        this._direction = null;
        this._dragMoveCleanup();
        this._dragEndCleanup();
    }
}
//# sourceMappingURL=swipe-helper.js.map