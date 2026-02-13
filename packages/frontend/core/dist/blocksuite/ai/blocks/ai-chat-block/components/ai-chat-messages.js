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
import { NotificationProvider, ThemeProvider, } from '@blocksuite/affine-shared/services';
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import {} from '../../../components/ai-chat-messages';
import { UserInfoTemplate } from './user-info';
let AIChatBlockMessage = (() => {
    let _classSuper = LitElement;
    let _message_decorators;
    let _message_initializers = [];
    let _message_extraInitializers = [];
    let _host_decorators;
    let _host_initializers = [];
    let _host_extraInitializers = [];
    let _state_decorators;
    let _state_initializers = [];
    let _state_extraInitializers = [];
    let _textRendererOptions_decorators;
    let _textRendererOptions_initializers = [];
    let _textRendererOptions_extraInitializers = [];
    return class AIChatBlockMessage extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _message_decorators = [property({ attribute: false })];
            _host_decorators = [property({ attribute: false })];
            _state_decorators = [property({ attribute: false })];
            _textRendererOptions_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _message_decorators, { kind: "accessor", name: "message", static: false, private: false, access: { has: obj => "message" in obj, get: obj => obj.message, set: (obj, value) => { obj.message = value; } }, metadata: _metadata }, _message_initializers, _message_extraInitializers);
            __esDecorate(this, null, _host_decorators, { kind: "accessor", name: "host", static: false, private: false, access: { has: obj => "host" in obj, get: obj => obj.host, set: (obj, value) => { obj.host = value; } }, metadata: _metadata }, _host_initializers, _host_extraInitializers);
            __esDecorate(this, null, _state_decorators, { kind: "accessor", name: "state", static: false, private: false, access: { has: obj => "state" in obj, get: obj => obj.state, set: (obj, value) => { obj.state = value; } }, metadata: _metadata }, _state_initializers, _state_extraInitializers);
            __esDecorate(this, null, _textRendererOptions_decorators, { kind: "accessor", name: "textRendererOptions", static: false, private: false, access: { has: obj => "textRendererOptions" in obj, get: obj => obj.textRendererOptions, set: (obj, value) => { obj.textRendererOptions = value; } }, metadata: _metadata }, _textRendererOptions_initializers, _textRendererOptions_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .ai-chat-message {
      display: flex;
      width: 100%;
      flex-direction: column;
      gap: 4px;
      box-sizing: border-box;
    }

    .ai-chat-content {
      display: block;
      width: calc(100% - 34px);
      padding-left: 34px;
      font-weight: 400;
    }

    .with-attachments {
      margin-top: 8px;
    }
  `; }
        render() {
            const { content, attachments, userName, userId, avatarUrl, role, streamObjects, } = this.message;
            const withAttachments = !!attachments && attachments.length > 0;
            const messageClasses = classMap({
                'with-attachments': withAttachments,
            });
            return html `
      <div class="ai-chat-message">
        ${UserInfoTemplate({ userId, userName, avatarUrl }, role)}
        <div class="ai-chat-content">
          <chat-images .attachments=${attachments}></chat-images>
          <div class=${messageClasses}>
            ${streamObjects?.length
                ? this.renderStreamObjects(streamObjects)
                : this.renderRichText(content)}
          </div>
        </div>
      </div>
    `;
        }
        renderStreamObjects(answer) {
            const notificationService = this.host.std.get(NotificationProvider);
            return html `<chat-content-stream-objects
      .answer=${answer}
      .host=${this.host}
      .state=${this.state}
      .extensions=${this.textRendererOptions.extensions}
      .affineFeatureFlagService=${this.textRendererOptions
                .affineFeatureFlagService}
      .notificationService=${notificationService}
      .independentMode=${false}
      .theme=${this.host.std.get(ThemeProvider).app$}
    ></chat-content-stream-objects>`;
        }
        renderRichText(text) {
            return html `<chat-content-rich-text
      .text=${text}
      .state=${this.state}
      .extensions=${this.textRendererOptions.extensions}
      .affineFeatureFlagService=${this.textRendererOptions
                .affineFeatureFlagService}
      .theme=${this.host.std.get(ThemeProvider).app$}
    ></chat-content-rich-text>`;
        }
        #message_accessor_storage = __runInitializers(this, _message_initializers, void 0);
        get message() { return this.#message_accessor_storage; }
        set message(value) { this.#message_accessor_storage = value; }
        #host_accessor_storage = (__runInitializers(this, _message_extraInitializers), __runInitializers(this, _host_initializers, void 0));
        get host() { return this.#host_accessor_storage; }
        set host(value) { this.#host_accessor_storage = value; }
        #state_accessor_storage = (__runInitializers(this, _host_extraInitializers), __runInitializers(this, _state_initializers, 'finished'));
        get state() { return this.#state_accessor_storage; }
        set state(value) { this.#state_accessor_storage = value; }
        #textRendererOptions_accessor_storage = (__runInitializers(this, _state_extraInitializers), __runInitializers(this, _textRendererOptions_initializers, {}));
        get textRendererOptions() { return this.#textRendererOptions_accessor_storage; }
        set textRendererOptions(value) { this.#textRendererOptions_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _textRendererOptions_extraInitializers);
        }
    };
})();
export { AIChatBlockMessage };
let AIChatBlockMessages = (() => {
    let _classSuper = LitElement;
    let _host_decorators;
    let _host_initializers = [];
    let _host_extraInitializers = [];
    let _messages_decorators;
    let _messages_initializers = [];
    let _messages_extraInitializers = [];
    let _textRendererOptions_decorators;
    let _textRendererOptions_initializers = [];
    let _textRendererOptions_extraInitializers = [];
    return class AIChatBlockMessages extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _host_decorators = [property({ attribute: false })];
            _messages_decorators = [property({ attribute: false })];
            _textRendererOptions_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _host_decorators, { kind: "accessor", name: "host", static: false, private: false, access: { has: obj => "host" in obj, get: obj => obj.host, set: (obj, value) => { obj.host = value; } }, metadata: _metadata }, _host_initializers, _host_extraInitializers);
            __esDecorate(this, null, _messages_decorators, { kind: "accessor", name: "messages", static: false, private: false, access: { has: obj => "messages" in obj, get: obj => obj.messages, set: (obj, value) => { obj.messages = value; } }, metadata: _metadata }, _messages_initializers, _messages_extraInitializers);
            __esDecorate(this, null, _textRendererOptions_decorators, { kind: "accessor", name: "textRendererOptions", static: false, private: false, access: { has: obj => "textRendererOptions" in obj, get: obj => obj.textRendererOptions, set: (obj, value) => { obj.textRendererOptions = value; } }, metadata: _metadata }, _textRendererOptions_initializers, _textRendererOptions_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host {
      width: 100%;
      box-sizing: border-box;
    }

    .ai-chat-messages {
      display: flex;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      flex-direction: column;
      gap: 24px;
    }
  `; }
        render() {
            return html `<div class="ai-chat-messages">
      ${repeat(this.messages, message => message.id || message.createdAt, message => {
                return html `
            <ai-chat-block-message
              .host=${this.host}
              .textRendererOptions=${this.textRendererOptions}
              .message=${message}
            ></ai-chat-block-message>
          `;
            })}
    </div>`;
        }
        #host_accessor_storage = __runInitializers(this, _host_initializers, void 0);
        get host() { return this.#host_accessor_storage; }
        set host(value) { this.#host_accessor_storage = value; }
        #messages_accessor_storage = (__runInitializers(this, _host_extraInitializers), __runInitializers(this, _messages_initializers, []));
        get messages() { return this.#messages_accessor_storage; }
        set messages(value) { this.#messages_accessor_storage = value; }
        #textRendererOptions_accessor_storage = (__runInitializers(this, _messages_extraInitializers), __runInitializers(this, _textRendererOptions_initializers, {}));
        get textRendererOptions() { return this.#textRendererOptions_accessor_storage; }
        set textRendererOptions(value) { this.#textRendererOptions_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _textRendererOptions_extraInitializers);
        }
    };
})();
export { AIChatBlockMessages };
//# sourceMappingURL=ai-chat-messages.js.map