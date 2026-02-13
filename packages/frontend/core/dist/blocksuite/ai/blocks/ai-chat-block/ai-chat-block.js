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
import { Peekable } from '@blocksuite/affine/components/peek';
import { ViewExtensionManagerIdentifier } from '@blocksuite/affine/ext-loader';
import { BlockComponent } from '@blocksuite/affine/std';
import { computed } from '@preact/signals-core';
import { html } from 'lit';
import { ChatMessagesSchema } from '../../components/ai-chat-messages';
import { ChatWithAIIcon } from './components/icon';
import {} from './model';
import { AIChatBlockStyles } from './styles';
let AIChatBlockComponent = (() => {
    let _classDecorators = [Peekable({
            enableOn: ({ store }) => {
                // Disable on mobile and readonly mode
                return !BUILD_CONFIG.isMobileEdition && !store.readonly;
            },
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BlockComponent;
    var AIChatBlockComponent = class extends _classSuper {
        static { _classThis = this; }
        constructor() {
            super(...arguments);
            this._textRendererOptions = {};
            // Deserialize messages from JSON string and verify the type using zod
            this._deserializeChatMessages = computed(() => {
                const messages = this.model.props.messages$.value;
                try {
                    const result = ChatMessagesSchema.safeParse(JSON.parse(messages));
                    if (result.success) {
                        return result.data;
                    }
                    else {
                        return [];
                    }
                }
                catch {
                    return [];
                }
            });
        }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AIChatBlockComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = AIChatBlockStyles; }
        connectedCallback() {
            super.connectedCallback();
            this._textRendererOptions = {
                customHeading: true,
                extensions: this.previewExtensions,
            };
        }
        renderBlock() {
            const messages = this._deserializeChatMessages.value.slice(-2);
            return html `<div class="affine-ai-chat-block-container">
      <div class="ai-chat-messages-container">
        <ai-chat-block-messages
          .host=${this.host}
          .messages=${messages}
          .textRendererOptions=${this._textRendererOptions}
          .withMask=${true}
        ></ai-chat-block-messages>
      </div>
      <div class="ai-chat-block-button">
        ${ChatWithAIIcon} <span>AI chat block</span>
      </div>
    </div> `;
        }
        get previewExtensions() {
            return this.std.get(ViewExtensionManagerIdentifier).get('preview-page');
        }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return AIChatBlockComponent = _classThis;
})();
export { AIChatBlockComponent };
//# sourceMappingURL=ai-chat-block.js.map