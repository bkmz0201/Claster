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
import { createReactComponentFromLit } from '@affine/component';
import { getViewManager } from '@affine/core/blocksuite/manager/view';
import { PeekViewProvider } from '@blocksuite/affine/components/peek';
import { SignalWatcher, WithDisposable } from '@blocksuite/affine/global/lit';
import { RefNodeSlotsProvider } from '@blocksuite/affine/inlines/reference';
import { codeBlockWrapMiddleware, defaultImageProxyMiddleware, ImageProxyService, } from '@blocksuite/affine/shared/adapters';
import { unsafeCSSVarV2 } from '@blocksuite/affine/shared/theme';
import { BlockStdScope, BlockViewIdentifier, ShadowlessElement, } from '@blocksuite/affine/std';
import { darkCssVariablesV2, lightCssVariablesV2, } from '@toeverything/theme/v2';
import { css, html, nothing, unsafeCSS } from 'lit';
import { property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { keyed } from 'lit/directives/keyed.js';
import { literal } from 'lit/static-html.js';
import React from 'react';
import { filter } from 'rxjs/operators';
import { markDownToDoc } from '../../utils';
export const getCustomPageEditorBlockSpecs = () => {
    const manager = getViewManager().config.init().value;
    return [
        ...manager.get('page'),
        {
            setup: di => {
                di.override(BlockViewIdentifier('affine:page'), () => literal `affine-page-root`);
            },
        },
    ];
};
const customHeadingStyles = css `
  .custom-heading {
    .h1 {
      font-size: calc(var(--affine-font-h-1) - 2px);
      code {
        font-size: calc(var(--affine-font-base) + 6px);
      }
    }
    .h2 {
      font-size: calc(var(--affine-font-h-2) - 2px);
      code {
        font-size: calc(var(--affine-font-base) + 4px);
      }
    }
    .h3 {
      font-size: calc(var(--affine-font-h-3) - 2px);
      code {
        font-size: calc(var(--affine-font-base) + 2px);
      }
    }
    .h4 {
      font-size: calc(var(--affine-font-h-4) - 2px);
      code {
        font-size: var(--affine-font-base);
      }
    }
    .h5 {
      font-size: calc(var(--affine-font-h-5) - 2px);
      code {
        font-size: calc(var(--affine-font-base) - 2px);
      }
    }
    .h6 {
      font-size: calc(var(--affine-font-h-6) - 2px);
      code {
        font-size: calc(var(--affine-font-base) - 4px);
      }
    }
  }
`;
// todo: refactor it for more general purpose usage instead of AI only?
let TextRenderer = (() => {
    let _classSuper = SignalWatcher(WithDisposable(ShadowlessElement));
    let __container_decorators;
    let __container_initializers = [];
    let __container_extraInitializers = [];
    let __previewHost_decorators;
    let __previewHost_initializers = [];
    let __previewHost_extraInitializers = [];
    let _answer_decorators;
    let _answer_initializers = [];
    let _answer_extraInitializers = [];
    let _options_decorators;
    let _options_initializers = [];
    let _options_extraInitializers = [];
    let _state_decorators;
    let _state_initializers = [];
    let _state_extraInitializers = [];
    return class TextRenderer extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __container_decorators = [query('.text-renderer-container')];
            __previewHost_decorators = [query('.text-renderer-container editor-host')];
            _answer_decorators = [property({ attribute: false })];
            _options_decorators = [property({ attribute: false })];
            _state_decorators = [property({ attribute: false })];
            __esDecorate(this, null, __container_decorators, { kind: "accessor", name: "_container", static: false, private: false, access: { has: obj => "_container" in obj, get: obj => obj._container, set: (obj, value) => { obj._container = value; } }, metadata: _metadata }, __container_initializers, __container_extraInitializers);
            __esDecorate(this, null, __previewHost_decorators, { kind: "accessor", name: "_previewHost", static: false, private: false, access: { has: obj => "_previewHost" in obj, get: obj => obj._previewHost, set: (obj, value) => { obj._previewHost = value; } }, metadata: _metadata }, __previewHost_initializers, __previewHost_extraInitializers);
            __esDecorate(this, null, _answer_decorators, { kind: "accessor", name: "answer", static: false, private: false, access: { has: obj => "answer" in obj, get: obj => obj.answer, set: (obj, value) => { obj.answer = value; } }, metadata: _metadata }, _answer_initializers, _answer_extraInitializers);
            __esDecorate(this, null, _options_decorators, { kind: "accessor", name: "options", static: false, private: false, access: { has: obj => "options" in obj, get: obj => obj.options, set: (obj, value) => { obj.options = value; } }, metadata: _metadata }, _options_initializers, _options_extraInitializers);
            __esDecorate(this, null, _state_decorators, { kind: "accessor", name: "state", static: false, private: false, access: { has: obj => "state" in obj, get: obj => obj.state, set: (obj, value) => { obj.state = value; } }, metadata: _metadata }, _state_initializers, _state_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .ai-answer-text-editor.affine-page-viewport {
      background: transparent;
      font-family: var(--affine-font-family);
      margin-top: 0;
      margin-bottom: 0;
    }

    .ai-answer-text-editor .affine-page-root-block-container {
      padding: 0;
      margin: 0;
      line-height: var(--affine-line-height);
      color: ${unsafeCSSVarV2('text/primary')};
      font-weight: 400;
    }

    .ai-answer-text-editor {
      .affine-note-block-container {
        > .affine-block-children-container {
          > :first-child:not(affine-callout),
          > :first-child:not(affine-callout) * {
            margin-top: 0 !important;
          }
          > :last-child,
          > :last-child * {
            margin-bottom: 0 !important;
          }
        }
      }

      .affine-paragraph-block-container {
        line-height: 22px;

        .h6 {
          padding-left: 16px;
          color: ${unsafeCSSVarV2('text/link')};
          font-size: var(--affine-font-base);

          .toggle-icon {
            transform: translateX(0);
            svg {
              color: ${unsafeCSSVarV2('text/link')};
            }
          }
        }
      }
    }

    .text-renderer-container {
      overflow-y: auto;
      overflow-x: hidden;
      padding: 0;
      overscroll-behavior-y: none;
    }
    .text-renderer-container.show-scrollbar::-webkit-scrollbar {
      width: 5px;
      height: 100px;
    }
    .text-renderer-container.show-scrollbar::-webkit-scrollbar-thumb {
      border-radius: 20px;
    }
    .text-renderer-container.show-scrollbar:hover::-webkit-scrollbar-thumb {
      background-color: var(--affine-black-30);
    }
    .text-renderer-container.show-scrollbar::-webkit-scrollbar-corner {
      display: none;
    }

    .text-renderer-container {
      rich-text .nowrap-lines v-text span,
      rich-text .nowrap-lines v-element span {
        white-space: pre;
      }
      editor-host:focus-visible {
        outline: none;
      }
      editor-host * {
        box-sizing: border-box;
      }
      editor-host {
        isolation: isolate;
      }
    }

    .text-renderer-container[data-app-theme='dark'] {
      .ai-answer-text-editor .affine-page-root-block-container {
        color: ${unsafeCSS(darkCssVariablesV2['--affine-v2-text-primary'])};
      }
    }

    .text-renderer-container[data-app-theme='light'] {
      .ai-answer-text-editor .affine-page-root-block-container {
        color: ${unsafeCSS(lightCssVariablesV2['--affine-v2-text-primary'])};
      }
    }

    ${customHeadingStyles}
  `; }
        connectedCallback() {
            super.connectedCallback();
            this._answers.push(this.answer);
            this._updateDoc();
            if (this.state === 'generating') {
                this._timer = setInterval(this._updateDoc, 600);
            }
        }
        firstUpdated() {
            this._subscribeDocLinkClicked();
        }
        disposeDoc() {
            this._doc?.dispose();
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            this._clearTimer();
            this.disposeDoc();
        }
        render() {
            if (!this._doc) {
                return nothing;
            }
            const { customHeading, testId = 'ai-text-renderer' } = this.options;
            const classes = classMap({
                'text-renderer-container': true,
                'custom-heading': !!customHeading,
            });
            const theme = this.options.theme?.value;
            return html `
      <div
        class=${classes}
        data-testid=${testId}
        data-app-theme=${theme ?? 'light'}
      >
        ${keyed(this._doc, html `<div class="ai-answer-text-editor affine-page-viewport">
            ${this._host}
          </div>`)}
      </div>
    `;
        }
        shouldUpdate(changedProperties) {
            if (changedProperties.has('answer')) {
                this._answers.push(this.answer);
                return false;
            }
            return true;
        }
        updated(changedProperties) {
            super.updated(changedProperties);
            requestAnimationFrame(() => {
                if (!this._container)
                    return;
                // Track max height during generation
                if (this.state === 'generating') {
                    this._maxContainerHeight = Math.max(this._maxContainerHeight, this._container.scrollHeight);
                    // Apply min-height to prevent shrinking
                    this._container.style.minHeight = `${this._maxContainerHeight}px`;
                }
                else {
                    setTimeout(() => {
                        this._maxContainerHeight = 0;
                        this._container.style.minHeight = '';
                    }, 500);
                }
            });
        }
        #_container_accessor_storage;
        get _container() { return this.#_container_accessor_storage; }
        set _container(value) { this.#_container_accessor_storage = value; }
        #_previewHost_accessor_storage;
        get _previewHost() { return this.#_previewHost_accessor_storage; }
        set _previewHost(value) { this.#_previewHost_accessor_storage = value; }
        #answer_accessor_storage;
        get answer() { return this.#answer_accessor_storage; }
        set answer(value) { this.#answer_accessor_storage = value; }
        #options_accessor_storage;
        get options() { return this.#options_accessor_storage; }
        set options(value) { this.#options_accessor_storage = value; }
        #state_accessor_storage;
        get state() { return this.#state_accessor_storage; }
        set state(value) { this.#state_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._answers = [];
            this._maxContainerHeight = 0;
            this._clearTimer = () => {
                if (this._timer) {
                    clearInterval(this._timer);
                    this._timer = null;
                }
            };
            this._doc = null;
            this._host = null;
            this._query = {
                mode: 'strict',
                match: [
                    'affine:page',
                    'affine:note',
                    'affine:table',
                    'affine:surface',
                    'affine:paragraph',
                    'affine:callout',
                    'affine:code',
                    'affine:list',
                    'affine:divider',
                    'affine:latex',
                    'affine:bookmark',
                    'affine:attachment',
                    'affine:embed-linked-doc',
                ].map(flavour => ({ flavour, viewType: 'display' })),
            };
            this._timer = null;
            this._subscribeDocLinkClicked = () => {
                const refNodeSlots = this._host?.std.getOptional(RefNodeSlotsProvider);
                if (!refNodeSlots)
                    return;
                this.disposables.add(refNodeSlots.docLinkClicked
                    .pipe(filter(options => !!this._previewHost && options.host === this._previewHost))
                    .subscribe(options => {
                    // Open the doc in center peek
                    this._host?.std
                        .getOptional(PeekViewProvider)
                        ?.peek({
                        docId: options.pageId,
                    })
                        .catch(console.error);
                }));
            };
            this._updateDoc = () => {
                if (this._answers.length > 0) {
                    const latestAnswer = this._answers.pop();
                    this._answers = [];
                    if (latestAnswer) {
                        const middlewares = [
                            defaultImageProxyMiddleware,
                            codeBlockWrapMiddleware(true),
                            ...(this.options.additionalMiddlewares ?? []),
                        ];
                        markDownToDoc(latestAnswer, middlewares, this.options.affineFeatureFlagService)
                            .then(doc => {
                            this.disposeDoc();
                            this._doc = doc.doc.getStore({
                                query: this._query,
                            });
                            this._host = new BlockStdScope({
                                store: this._doc,
                                extensions: this.options.extensions ?? getCustomPageEditorBlockSpecs(),
                            }).render();
                            this.disposables.add(() => {
                                doc.doc.removeStore({ query: this._query });
                            });
                            this._doc.readonly = true;
                            this.requestUpdate();
                            if (this.state !== 'generating') {
                                this._doc.load();
                                const imageProxyService = this._host.std.get(ImageProxyService);
                                imageProxyService.setImageProxyURL(imageProxyService.imageProxyURL);
                                this._clearTimer();
                            }
                        })
                            .catch(console.error);
                    }
                }
            };
            this.#_container_accessor_storage = __runInitializers(this, __container_initializers, void 0);
            this.#_previewHost_accessor_storage = (__runInitializers(this, __container_extraInitializers), __runInitializers(this, __previewHost_initializers, null));
            this.#answer_accessor_storage = (__runInitializers(this, __previewHost_extraInitializers), __runInitializers(this, _answer_initializers, void 0));
            this.#options_accessor_storage = (__runInitializers(this, _answer_extraInitializers), __runInitializers(this, _options_initializers, void 0));
            this.#state_accessor_storage = (__runInitializers(this, _options_extraInitializers), __runInitializers(this, _state_initializers, undefined));
            __runInitializers(this, _state_extraInitializers);
        }
    };
})();
export { TextRenderer };
export const createTextRenderer = (options) => {
    return (answer, state) => {
        return html `<text-renderer
      contenteditable="false"
      .answer=${answer}
      .state=${state}
      .options=${options}
    ></text-renderer>`;
    };
};
export const LitTextRenderer = createReactComponentFromLit({
    react: React,
    elementClass: TextRenderer,
});
//# sourceMappingURL=text-renderer.js.map