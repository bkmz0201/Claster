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
import { Tooltip } from '@blocksuite/affine/components/tooltip';
import { WithDisposable } from '@blocksuite/affine/global/lit';
import { noop } from '@blocksuite/affine/global/utils';
import { unsafeCSSVarV2 } from '@blocksuite/affine/shared/theme';
import { createButtonPopper } from '@blocksuite/affine/shared/utils';
import { CopyIcon, MoreHorizontalIcon, ResetIcon } from '@blocksuite/icons/lit';
import { css, html, LitElement, nothing } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { copyText } from '../utils/editor-actions';
noop(Tooltip);
let ChatCopyMore = (() => {
    let _classSuper = WithDisposable(LitElement);
    let __showMoreMenu_decorators;
    let __showMoreMenu_initializers = [];
    let __showMoreMenu_extraInitializers = [];
    let __moreButton_decorators;
    let __moreButton_initializers = [];
    let __moreButton_extraInitializers = [];
    let __moreMenu_decorators;
    let __moreMenu_initializers = [];
    let __moreMenu_extraInitializers = [];
    let _host_decorators;
    let _host_initializers = [];
    let _host_extraInitializers = [];
    let _actions_decorators;
    let _actions_initializers = [];
    let _actions_extraInitializers = [];
    let _session_decorators;
    let _session_initializers = [];
    let _session_extraInitializers = [];
    let _content_decorators;
    let _content_initializers = [];
    let _content_extraInitializers = [];
    let _messageId_decorators;
    let _messageId_initializers = [];
    let _messageId_extraInitializers = [];
    let _isLast_decorators;
    let _isLast_initializers = [];
    let _isLast_extraInitializers = [];
    let _withMargin_decorators;
    let _withMargin_initializers = [];
    let _withMargin_extraInitializers = [];
    let _retry_decorators;
    let _retry_initializers = [];
    let _retry_extraInitializers = [];
    let _testId_decorators;
    let _testId_initializers = [];
    let _testId_extraInitializers = [];
    let _notificationService_decorators;
    let _notificationService_initializers = [];
    let _notificationService_extraInitializers = [];
    return class ChatCopyMore extends _classSuper {
        constructor() {
            super(...arguments);
            this.#_showMoreMenu_accessor_storage = __runInitializers(this, __showMoreMenu_initializers, false);
            this.#_moreButton_accessor_storage = (__runInitializers(this, __showMoreMenu_extraInitializers), __runInitializers(this, __moreButton_initializers, void 0));
            this.#_moreMenu_accessor_storage = (__runInitializers(this, __moreButton_extraInitializers), __runInitializers(this, __moreMenu_initializers, void 0));
            this._morePopper = (__runInitializers(this, __moreMenu_extraInitializers), null);
            this.#host_accessor_storage = __runInitializers(this, _host_initializers, void 0);
            this.#actions_accessor_storage = (__runInitializers(this, _host_extraInitializers), __runInitializers(this, _actions_initializers, []));
            this.#session_accessor_storage = (__runInitializers(this, _actions_extraInitializers), __runInitializers(this, _session_initializers, void 0));
            this.#content_accessor_storage = (__runInitializers(this, _session_extraInitializers), __runInitializers(this, _content_initializers, void 0));
            this.#messageId_accessor_storage = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _messageId_initializers, undefined));
            this.#isLast_accessor_storage = (__runInitializers(this, _messageId_extraInitializers), __runInitializers(this, _isLast_initializers, void 0));
            this.#withMargin_accessor_storage = (__runInitializers(this, _isLast_extraInitializers), __runInitializers(this, _withMargin_initializers, false));
            this.#retry_accessor_storage = (__runInitializers(this, _withMargin_extraInitializers), __runInitializers(this, _retry_initializers, () => { }));
            this.#testId_accessor_storage = (__runInitializers(this, _retry_extraInitializers), __runInitializers(this, _testId_initializers, 'chat-actions'));
            this.#notificationService_accessor_storage = (__runInitializers(this, _testId_extraInitializers), __runInitializers(this, _notificationService_initializers, void 0));
            this._notifySuccess = (__runInitializers(this, _notificationService_extraInitializers), (title) => {
                this.notificationService.notify({
                    title: title,
                    accent: 'success',
                    onClose: function () { },
                });
            });
        }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __showMoreMenu_decorators = [state()];
            __moreButton_decorators = [query('.button.more')];
            __moreMenu_decorators = [query('.more-menu')];
            _host_decorators = [property({ attribute: false })];
            _actions_decorators = [property({ attribute: false })];
            _session_decorators = [property({ attribute: false })];
            _content_decorators = [property({ attribute: false })];
            _messageId_decorators = [property({ attribute: false })];
            _isLast_decorators = [property({ attribute: false })];
            _withMargin_decorators = [property({ attribute: false })];
            _retry_decorators = [property({ attribute: false })];
            _testId_decorators = [property({ attribute: 'data-testid', reflect: true })];
            _notificationService_decorators = [property({ attribute: false })];
            __esDecorate(this, null, __showMoreMenu_decorators, { kind: "accessor", name: "_showMoreMenu", static: false, private: false, access: { has: obj => "_showMoreMenu" in obj, get: obj => obj._showMoreMenu, set: (obj, value) => { obj._showMoreMenu = value; } }, metadata: _metadata }, __showMoreMenu_initializers, __showMoreMenu_extraInitializers);
            __esDecorate(this, null, __moreButton_decorators, { kind: "accessor", name: "_moreButton", static: false, private: false, access: { has: obj => "_moreButton" in obj, get: obj => obj._moreButton, set: (obj, value) => { obj._moreButton = value; } }, metadata: _metadata }, __moreButton_initializers, __moreButton_extraInitializers);
            __esDecorate(this, null, __moreMenu_decorators, { kind: "accessor", name: "_moreMenu", static: false, private: false, access: { has: obj => "_moreMenu" in obj, get: obj => obj._moreMenu, set: (obj, value) => { obj._moreMenu = value; } }, metadata: _metadata }, __moreMenu_initializers, __moreMenu_extraInitializers);
            __esDecorate(this, null, _host_decorators, { kind: "accessor", name: "host", static: false, private: false, access: { has: obj => "host" in obj, get: obj => obj.host, set: (obj, value) => { obj.host = value; } }, metadata: _metadata }, _host_initializers, _host_extraInitializers);
            __esDecorate(this, null, _actions_decorators, { kind: "accessor", name: "actions", static: false, private: false, access: { has: obj => "actions" in obj, get: obj => obj.actions, set: (obj, value) => { obj.actions = value; } }, metadata: _metadata }, _actions_initializers, _actions_extraInitializers);
            __esDecorate(this, null, _session_decorators, { kind: "accessor", name: "session", static: false, private: false, access: { has: obj => "session" in obj, get: obj => obj.session, set: (obj, value) => { obj.session = value; } }, metadata: _metadata }, _session_initializers, _session_extraInitializers);
            __esDecorate(this, null, _content_decorators, { kind: "accessor", name: "content", static: false, private: false, access: { has: obj => "content" in obj, get: obj => obj.content, set: (obj, value) => { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            __esDecorate(this, null, _messageId_decorators, { kind: "accessor", name: "messageId", static: false, private: false, access: { has: obj => "messageId" in obj, get: obj => obj.messageId, set: (obj, value) => { obj.messageId = value; } }, metadata: _metadata }, _messageId_initializers, _messageId_extraInitializers);
            __esDecorate(this, null, _isLast_decorators, { kind: "accessor", name: "isLast", static: false, private: false, access: { has: obj => "isLast" in obj, get: obj => obj.isLast, set: (obj, value) => { obj.isLast = value; } }, metadata: _metadata }, _isLast_initializers, _isLast_extraInitializers);
            __esDecorate(this, null, _withMargin_decorators, { kind: "accessor", name: "withMargin", static: false, private: false, access: { has: obj => "withMargin" in obj, get: obj => obj.withMargin, set: (obj, value) => { obj.withMargin = value; } }, metadata: _metadata }, _withMargin_initializers, _withMargin_extraInitializers);
            __esDecorate(this, null, _retry_decorators, { kind: "accessor", name: "retry", static: false, private: false, access: { has: obj => "retry" in obj, get: obj => obj.retry, set: (obj, value) => { obj.retry = value; } }, metadata: _metadata }, _retry_initializers, _retry_extraInitializers);
            __esDecorate(this, null, _testId_decorators, { kind: "accessor", name: "testId", static: false, private: false, access: { has: obj => "testId" in obj, get: obj => obj.testId, set: (obj, value) => { obj.testId = value; } }, metadata: _metadata }, _testId_initializers, _testId_extraInitializers);
            __esDecorate(this, null, _notificationService_decorators, { kind: "accessor", name: "notificationService", static: false, private: false, access: { has: obj => "notificationService" in obj, get: obj => obj.notificationService, set: (obj, value) => { obj.notificationService = value; } }, metadata: _metadata }, _notificationService_initializers, _notificationService_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .copy-more {
      display: flex;
      gap: 8px;
      height: 36px;
      box-sizing: border-box;
      justify-content: flex-end;
      align-items: center;
      padding: 8px 0;

      div {
        cursor: pointer;
        border-radius: 4px;
      }

      div:hover {
        background-color: var(--affine-hover-color);
      }

      .button {
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
          color: ${unsafeCSSVarV2('icon/primary')};
        }
      }
    }

    .more-menu {
      width: 226px;
      border-radius: 8px;
      background-color: var(--affine-background-overlay-panel-color);
      box-shadow: var(--affine-menu-shadow);
      display: flex;
      flex-direction: column;
      gap: 4px;
      position: absolute;
      z-index: 1;
      user-select: none;

      > div {
        height: 30px;
        display: flex;
        gap: 8px;
        align-items: center;
        cursor: pointer;

        svg {
          margin-left: 12px;
        }
      }

      > div:hover {
        background-color: var(--affine-hover-color);
      }
    }
  `; }
        get _selectionValue() {
            return this.host?.selection.value ?? [];
        }
        get _currentTextSelection() {
            return this._selectionValue.find(v => v.type === 'text');
        }
        get _currentBlockSelections() {
            return this._selectionValue.filter(v => v.type === 'block');
        }
        #_showMoreMenu_accessor_storage;
        get _showMoreMenu() { return this.#_showMoreMenu_accessor_storage; }
        set _showMoreMenu(value) { this.#_showMoreMenu_accessor_storage = value; }
        #_moreButton_accessor_storage;
        get _moreButton() { return this.#_moreButton_accessor_storage; }
        set _moreButton(value) { this.#_moreButton_accessor_storage = value; }
        #_moreMenu_accessor_storage;
        get _moreMenu() { return this.#_moreMenu_accessor_storage; }
        set _moreMenu(value) { this.#_moreMenu_accessor_storage = value; }
        #host_accessor_storage;
        get host() { return this.#host_accessor_storage; }
        set host(value) { this.#host_accessor_storage = value; }
        #actions_accessor_storage;
        get actions() { return this.#actions_accessor_storage; }
        set actions(value) { this.#actions_accessor_storage = value; }
        #session_accessor_storage;
        get session() { return this.#session_accessor_storage; }
        set session(value) { this.#session_accessor_storage = value; }
        #content_accessor_storage;
        get content() { return this.#content_accessor_storage; }
        set content(value) { this.#content_accessor_storage = value; }
        #messageId_accessor_storage;
        get messageId() { return this.#messageId_accessor_storage; }
        set messageId(value) { this.#messageId_accessor_storage = value; }
        #isLast_accessor_storage;
        get isLast() { return this.#isLast_accessor_storage; }
        set isLast(value) { this.#isLast_accessor_storage = value; }
        #withMargin_accessor_storage;
        get withMargin() { return this.#withMargin_accessor_storage; }
        set withMargin(value) { this.#withMargin_accessor_storage = value; }
        #retry_accessor_storage;
        get retry() { return this.#retry_accessor_storage; }
        set retry(value) { this.#retry_accessor_storage = value; }
        #testId_accessor_storage;
        get testId() { return this.#testId_accessor_storage; }
        set testId(value) { this.#testId_accessor_storage = value; }
        #notificationService_accessor_storage;
        get notificationService() { return this.#notificationService_accessor_storage; }
        set notificationService(value) { this.#notificationService_accessor_storage = value; }
        _toggle() {
            this._morePopper?.toggle();
        }
        updated(changed) {
            if (changed.has('isLast')) {
                if (this.isLast) {
                    this._morePopper?.dispose();
                    this._morePopper = null;
                }
                else if (!this._morePopper) {
                    this._morePopper = createButtonPopper({
                        reference: this._moreButton,
                        popperElement: this._moreMenu,
                        stateUpdated: ({ display }) => (this._showMoreMenu = display === 'show'),
                        mainAxis: 0,
                        crossAxis: -100,
                    });
                    this.disposables.add(() => this._morePopper?.dispose());
                }
            }
        }
        render() {
            const { host, content, isLast, messageId, actions } = this;
            const showMoreIcon = !isLast && actions.length > 0;
            return html `<style>
        .copy-more {
          margin-top: ${this.withMargin ? '8px' : '0px'};
          margin-bottom: ${this.withMargin ? '12px' : '0px'};
        }
        .more-menu {
          padding: ${this._showMoreMenu ? '8px' : '0px'};
        }
      </style>
      <div class="copy-more">
        ${content
                ? html `<div
              class="button copy"
              @click=${async () => {
                    const success = await copyText(content);
                    if (success) {
                        this._notifySuccess('Copied to clipboard');
                    }
                }}
              data-testid="action-copy-button"
            >
              ${CopyIcon({ width: '20px', height: '20px' })}
              <affine-tooltip>Copy</affine-tooltip>
            </div>`
                : nothing}
        ${isLast
                ? html `<div
              class="button retry"
              @click=${() => this.retry()}
              data-testid="action-retry-button"
            >
              ${ResetIcon({ width: '20px', height: '20px' })}
              <affine-tooltip .autoShift=${true}>Retry</affine-tooltip>
            </div>`
                : nothing}
        ${showMoreIcon && host
                ? html `<div
              class="button more"
              data-testid="action-more-button"
              @click=${this._toggle}
            >
              ${MoreHorizontalIcon({ width: '20px', height: '20px' })}
            </div> `
                : nothing}
      </div>

      <div class="more-menu">
        ${this._showMoreMenu && host
                ? repeat(actions.filter(action => action.showWhen(host)), action => action.title, action => {
                    const currentSelections = {
                        text: this._currentTextSelection,
                        blocks: this._currentBlockSelections,
                    };
                    return html `<div
                  @click=${async () => {
                        const sessionId = this.session?.sessionId;
                        const success = await action.handler(host, content, currentSelections, sessionId, messageId);
                        if (success) {
                            this._notifySuccess(action.toast);
                        }
                    }}
                >
                  ${action.icon}
                  <div>${action.title}</div>
                </div>`;
                })
                : nothing}
      </div>`;
        }
    };
})();
export { ChatCopyMore };
//# sourceMappingURL=copy-more.js.map