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
import { css, html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { insertBelow } from '../utils/editor-actions';
let ChatActionList = (() => {
    let _classSuper = LitElement;
    let _host_decorators;
    let _host_initializers = [];
    let _host_extraInitializers = [];
    let _actions_decorators;
    let _actions_initializers = [];
    let _actions_extraInitializers = [];
    let _content_decorators;
    let _content_initializers = [];
    let _content_extraInitializers = [];
    let _session_decorators;
    let _session_initializers = [];
    let _session_extraInitializers = [];
    let _messageId_decorators;
    let _messageId_initializers = [];
    let _messageId_extraInitializers = [];
    let _layoutDirection_decorators;
    let _layoutDirection_initializers = [];
    let _layoutDirection_extraInitializers = [];
    let _withMargin_decorators;
    let _withMargin_initializers = [];
    let _withMargin_extraInitializers = [];
    let _testId_decorators;
    let _testId_initializers = [];
    let _testId_extraInitializers = [];
    let _notificationService_decorators;
    let _notificationService_initializers = [];
    let _notificationService_extraInitializers = [];
    return class ChatActionList extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _host_decorators = [property({ attribute: false })];
            _actions_decorators = [property({ attribute: false })];
            _content_decorators = [property({ attribute: false })];
            _session_decorators = [property({ attribute: false })];
            _messageId_decorators = [property({ attribute: false })];
            _layoutDirection_decorators = [property({ attribute: false })];
            _withMargin_decorators = [property({ attribute: false })];
            _testId_decorators = [property({ attribute: 'data-testid', reflect: true })];
            _notificationService_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _host_decorators, { kind: "accessor", name: "host", static: false, private: false, access: { has: obj => "host" in obj, get: obj => obj.host, set: (obj, value) => { obj.host = value; } }, metadata: _metadata }, _host_initializers, _host_extraInitializers);
            __esDecorate(this, null, _actions_decorators, { kind: "accessor", name: "actions", static: false, private: false, access: { has: obj => "actions" in obj, get: obj => obj.actions, set: (obj, value) => { obj.actions = value; } }, metadata: _metadata }, _actions_initializers, _actions_extraInitializers);
            __esDecorate(this, null, _content_decorators, { kind: "accessor", name: "content", static: false, private: false, access: { has: obj => "content" in obj, get: obj => obj.content, set: (obj, value) => { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            __esDecorate(this, null, _session_decorators, { kind: "accessor", name: "session", static: false, private: false, access: { has: obj => "session" in obj, get: obj => obj.session, set: (obj, value) => { obj.session = value; } }, metadata: _metadata }, _session_initializers, _session_extraInitializers);
            __esDecorate(this, null, _messageId_decorators, { kind: "accessor", name: "messageId", static: false, private: false, access: { has: obj => "messageId" in obj, get: obj => obj.messageId, set: (obj, value) => { obj.messageId = value; } }, metadata: _metadata }, _messageId_initializers, _messageId_extraInitializers);
            __esDecorate(this, null, _layoutDirection_decorators, { kind: "accessor", name: "layoutDirection", static: false, private: false, access: { has: obj => "layoutDirection" in obj, get: obj => obj.layoutDirection, set: (obj, value) => { obj.layoutDirection = value; } }, metadata: _metadata }, _layoutDirection_initializers, _layoutDirection_extraInitializers);
            __esDecorate(this, null, _withMargin_decorators, { kind: "accessor", name: "withMargin", static: false, private: false, access: { has: obj => "withMargin" in obj, get: obj => obj.withMargin, set: (obj, value) => { obj.withMargin = value; } }, metadata: _metadata }, _withMargin_initializers, _withMargin_extraInitializers);
            __esDecorate(this, null, _testId_decorators, { kind: "accessor", name: "testId", static: false, private: false, access: { has: obj => "testId" in obj, get: obj => obj.testId, set: (obj, value) => { obj.testId = value; } }, metadata: _metadata }, _testId_initializers, _testId_extraInitializers);
            __esDecorate(this, null, _notificationService_decorators, { kind: "accessor", name: "notificationService", static: false, private: false, access: { has: obj => "notificationService" in obj, get: obj => obj.notificationService, set: (obj, value) => { obj.notificationService = value; } }, metadata: _metadata }, _notificationService_initializers, _notificationService_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .actions-container {
      display: flex;
      gap: 8px;
    }
    .actions-container > div {
      display: flex;
      gap: 8px;
    }
    .actions-container.horizontal {
      flex-wrap: wrap;
      justify-content: end;
    }
    .actions-container.vertical {
      flex-direction: column;
      align-items: flex-end;
    }
    .action {
      width: fit-content;
      height: 32px;
      padding: 4px 18px;
      box-sizing: border-box;
      border-radius: 8px;
      border: 1px solid var(--affine-border-color);
      background-color: var(--affine-white-10);
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 4px;
      font-size: var(--affine-font-sm);
      font-weight: 500;
      color: var(--affine-text-primary-color);
      cursor: pointer;
      user-select: none;
      line-height: 22px;
    }
    .action svg {
      color: var(--affine-icon-color);
    }
  `; }
        get _selectionValue() {
            return this.host.selection.value;
        }
        get _currentTextSelection() {
            return this._selectionValue.find(v => v.type === 'text');
        }
        get _currentBlockSelections() {
            return this._selectionValue.filter(v => v.type === 'block');
        }
        get _currentImageSelections() {
            return this._selectionValue.filter(v => v.type === 'image');
        }
        #host_accessor_storage = __runInitializers(this, _host_initializers, void 0);
        get host() { return this.#host_accessor_storage; }
        set host(value) { this.#host_accessor_storage = value; }
        #actions_accessor_storage = (__runInitializers(this, _host_extraInitializers), __runInitializers(this, _actions_initializers, []));
        get actions() { return this.#actions_accessor_storage; }
        set actions(value) { this.#actions_accessor_storage = value; }
        #content_accessor_storage = (__runInitializers(this, _actions_extraInitializers), __runInitializers(this, _content_initializers, ''));
        get content() { return this.#content_accessor_storage; }
        set content(value) { this.#content_accessor_storage = value; }
        #session_accessor_storage = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _session_initializers, void 0));
        get session() { return this.#session_accessor_storage; }
        set session(value) { this.#session_accessor_storage = value; }
        #messageId_accessor_storage = (__runInitializers(this, _session_extraInitializers), __runInitializers(this, _messageId_initializers, undefined));
        get messageId() { return this.#messageId_accessor_storage; }
        set messageId(value) { this.#messageId_accessor_storage = value; }
        #layoutDirection_accessor_storage = (__runInitializers(this, _messageId_extraInitializers), __runInitializers(this, _layoutDirection_initializers, 'vertical'));
        get layoutDirection() { return this.#layoutDirection_accessor_storage; } // New property for layout direction
        set layoutDirection(value) { this.#layoutDirection_accessor_storage = value; }
        #withMargin_accessor_storage = (__runInitializers(this, _layoutDirection_extraInitializers), __runInitializers(this, _withMargin_initializers, false));
        get withMargin() { return this.#withMargin_accessor_storage; }
        set withMargin(value) { this.#withMargin_accessor_storage = value; }
        #testId_accessor_storage = (__runInitializers(this, _withMargin_extraInitializers), __runInitializers(this, _testId_initializers, 'chat-action-list'));
        get testId() { return this.#testId_accessor_storage; }
        set testId(value) { this.#testId_accessor_storage = value; }
        #notificationService_accessor_storage = (__runInitializers(this, _testId_extraInitializers), __runInitializers(this, _notificationService_initializers, void 0));
        get notificationService() { return this.#notificationService_accessor_storage; }
        set notificationService(value) { this.#notificationService_accessor_storage = value; }
        render() {
            const { actions } = this;
            if (!actions.length) {
                return nothing;
            }
            const { host, content, messageId, layoutDirection } = this;
            const classes = classMap({
                'actions-container': true,
                horizontal: layoutDirection === 'horizontal',
                vertical: layoutDirection === 'vertical',
            });
            return html `<style>
        .actions-container {
          margin-top: ${this.withMargin ? '8px' : '0'};
        }
      </style>
      <div class=${classes}>
        ${repeat(actions.filter(action => action.showWhen(host)), action => action.title, action => {
                return html `<div
              class="action"
              @click=${async () => {
                    if (action.title === 'Insert below' &&
                        this._selectionValue.length === 1 &&
                        this._selectionValue[0].type === 'database') {
                        const element = this.host.view.getBlock(this._selectionValue[0].blockId);
                        if (!element)
                            return;
                        await insertBelow(host, content, element);
                        return;
                    }
                    const currentSelections = {
                        text: this._currentTextSelection,
                        blocks: this._currentBlockSelections,
                        images: this._currentImageSelections,
                    };
                    const sessionId = this.session?.sessionId;
                    const success = await action.handler(host, content, currentSelections, sessionId, messageId);
                    if (success) {
                        this.notificationService.notify({
                            title: action.toast,
                            accent: 'success',
                            onClose: function () { },
                        });
                    }
                }}
            >
              ${action.icon}
              <div
                data-testid="action-${action.title
                    .toLowerCase()
                    .replaceAll(' ', '-')}"
              >
                ${action.title}
              </div>
            </div>`;
            })}
      </div>`;
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _notificationService_extraInitializers);
        }
    };
})();
export { ChatActionList };
//# sourceMappingURL=chat-action-list.js.map