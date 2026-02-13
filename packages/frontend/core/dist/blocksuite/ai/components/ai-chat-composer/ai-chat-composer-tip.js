var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
import { InformationIcon } from '@blocksuite/icons/lit';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
const TIP_HEIGHT = 24;
let AIChatComposerTip = (() => {
    let _classDecorators = [customElement('ai-chat-composer-tip')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = LitElement;
    let _tips_decorators;
    let _tips_initializers = [];
    let _tips_extraInitializers = [];
    let _loop_decorators;
    let _loop_initializers = [];
    let _loop_extraInitializers = [];
    var AIChatComposerTip = class extends _classSuper {
        static { _classThis = this; }
        constructor() {
            super(...arguments);
            this.#tips_accessor_storage = __runInitializers(this, _tips_initializers, []);
            this.#loop_accessor_storage = (__runInitializers(this, _tips_extraInitializers), __runInitializers(this, _loop_initializers, true));
            this._interval = (__runInitializers(this, _loop_extraInitializers), 5000);
            this._animDuration = 500;
            this._tipIntervalId = null;
            this._tipListElement = null;
            this._currentIndex = 0;
            this._onMouseEnter = (e) => {
                e.stopPropagation();
                this._stopAutoScroll();
            };
            this._onMouseLeave = (e) => {
                e.stopPropagation();
                this._startAutoScroll();
            };
        }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _tips_decorators = [property({ attribute: false })];
            _loop_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _tips_decorators, { kind: "accessor", name: "tips", static: false, private: false, access: { has: obj => "tips" in obj, get: obj => obj.tips, set: (obj, value) => { obj.tips = value; } }, metadata: _metadata }, _tips_initializers, _tips_extraInitializers);
            __esDecorate(this, null, _loop_decorators, { kind: "accessor", name: "loop", static: false, private: false, access: { has: obj => "loop" in obj, get: obj => obj.loop, set: (obj, value) => { obj.loop = value; } }, metadata: _metadata }, _loop_initializers, _loop_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AIChatComposerTip = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host {
      display: block;
      min-height: 24px;
      position: relative;
      height: 24px;
      overflow: hidden;
    }
    .tip-list {
      display: flex;
      flex-direction: column;
      transition: margin-top 0.5s ease-in-out;
      will-change: margin-top;
    }
    .tip {
      width: 100%;
      height: ${TIP_HEIGHT}px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 4px;
    }
  `; }
        #tips_accessor_storage;
        get tips() { return this.#tips_accessor_storage; }
        set tips(value) { this.#tips_accessor_storage = value; }
        #loop_accessor_storage;
        get loop() { return this.#loop_accessor_storage; }
        set loop(value) { this.#loop_accessor_storage = value; }
        connectedCallback() {
            super.connectedCallback();
            this._startAutoScroll();
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            this._stopAutoScroll();
            if (this._tipListElement) {
                this._tipListElement.removeEventListener('mouseenter', this._onMouseEnter);
                this._tipListElement.removeEventListener('mouseleave', this._onMouseLeave);
            }
        }
        firstUpdated() {
            this._tipListElement = this.renderRoot.querySelector('.tip-list');
            if (this._tipListElement) {
                this._tipListElement.addEventListener('mouseenter', this._onMouseEnter);
                this._tipListElement.addEventListener('mouseleave', this._onMouseLeave);
            }
        }
        willUpdate(changed) {
            if (changed.has('tips')) {
                this._stopAutoScroll();
                this._startAutoScroll();
            }
        }
        _startAutoScroll() {
            this._stopAutoScroll();
            if (!this.loop && this._currentIndex >= this.tips.length - 1) {
                return;
            }
            this._currentIndex = 0;
            this._tipIntervalId = window.setInterval(() => {
                this._scrollToNext();
            }, this._interval);
        }
        _stopAutoScroll() {
            if (this._tipIntervalId) {
                clearInterval(this._tipIntervalId);
                this._tipIntervalId = null;
            }
        }
        _scrollToNext() {
            if (this.tips.length <= 1 || !this._tipListElement)
                return;
            if (!this.loop && this._currentIndex >= this.tips.length - 1) {
                this._stopAutoScroll();
                return;
            }
            const list = this._tipListElement;
            const firstItem = list.firstElementChild;
            if (!firstItem)
                return;
            // Set transition effect, smoothly move up by one item height
            list.style.transition = 'margin-top ' + this._animDuration + 'ms';
            list.style.marginTop = '-' + TIP_HEIGHT + 'px';
            setTimeout(() => {
                list.style.transition = 'none';
                if (this.loop) {
                    list.append(firstItem);
                    list.style.marginTop = '0';
                    this._currentIndex++;
                }
                else {
                    // Non-looping: only scroll if not at the last tip
                    if (this._currentIndex < this.tips.length - 1) {
                        list.append(firstItem);
                        list.style.marginTop = '0';
                        this._currentIndex++;
                    }
                    else {
                        // When reaching the last tip, keep the position unchanged
                        list.style.marginTop = '0';
                    }
                }
            }, this._animDuration);
        }
        render() {
            return html `
      <div class="tip-list">
        ${this.tips.map(tip => html `<div class="tip">${InformationIcon()}${tip}</div>`)}
      </div>
    `;
        }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return AIChatComposerTip = _classThis;
})();
export { AIChatComposerTip };
//# sourceMappingURL=ai-chat-composer-tip.js.map