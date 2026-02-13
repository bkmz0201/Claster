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
import { ColorScheme } from '@blocksuite/affine/model';
import { DocModeProvider, NotificationProvider, ThemeProvider, ToolbarFlag, ToolbarRegistryIdentifier, } from '@blocksuite/affine/shared/services';
import { unsafeCSSVar } from '@blocksuite/affine/shared/theme';
import { getPageRootByElement, stopPropagation, } from '@blocksuite/affine/shared/utils';
import { WidgetComponent, WidgetViewExtension } from '@blocksuite/affine/std';
import { GfxControllerIdentifier } from '@blocksuite/affine/std/gfx';
import { RANGE_SYNC_EXCLUDE_ATTR } from '@blocksuite/affine/std/inline';
import { AFFINE_VIEWPORT_OVERLAY_WIDGET, } from '@blocksuite/affine/widgets/viewport-overlay';
import { autoPlacement, autoUpdate, computePosition, flip, offset, shift, } from '@floating-ui/dom';
import { darkCssVariables, lightCssVariables } from '@toeverything/theme';
import { css, html, nothing, unsafeCSS } from 'lit';
import { property, query } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { literal, unsafeStatic } from 'lit/static-html.js';
import {} from '../../provider';
import { mergeAIActionAnswer } from './utils';
export const AFFINE_AI_PANEL_WIDGET = 'affine-ai-panel-widget';
let AffineAIPanelWidget = (() => {
    let _classSuper = WidgetComponent;
    let _config_decorators;
    let _config_initializers = [];
    let _config_extraInitializers = [];
    let _generatingElement_decorators;
    let _generatingElement_initializers = [];
    let _generatingElement_extraInitializers = [];
    let _state_decorators;
    let _state_initializers = [];
    let _state_extraInitializers = [];
    let _appTheme_decorators;
    let _appTheme_initializers = [];
    let _appTheme_extraInitializers = [];
    return class AffineAIPanelWidget extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _config_decorators = [property({ attribute: false })];
            _generatingElement_decorators = [query('ai-panel-generating')];
            _state_decorators = [property()];
            _appTheme_decorators = [property({ attribute: 'data-app-theme', reflect: true })];
            __esDecorate(this, null, _config_decorators, { kind: "accessor", name: "config", static: false, private: false, access: { has: obj => "config" in obj, get: obj => obj.config, set: (obj, value) => { obj.config = value; } }, metadata: _metadata }, _config_initializers, _config_extraInitializers);
            __esDecorate(this, null, _generatingElement_decorators, { kind: "accessor", name: "generatingElement", static: false, private: false, access: { has: obj => "generatingElement" in obj, get: obj => obj.generatingElement, set: (obj, value) => { obj.generatingElement = value; } }, metadata: _metadata }, _generatingElement_initializers, _generatingElement_extraInitializers);
            __esDecorate(this, null, _state_decorators, { kind: "accessor", name: "state", static: false, private: false, access: { has: obj => "state" in obj, get: obj => obj.state, set: (obj, value) => { obj.state = value; } }, metadata: _metadata }, _state_initializers, _state_extraInitializers);
            __esDecorate(this, null, _appTheme_decorators, { kind: "accessor", name: "appTheme", static: false, private: false, access: { has: obj => "appTheme" in obj, get: obj => obj.appTheme, set: (obj, value) => { obj.appTheme = value; } }, metadata: _metadata }, _appTheme_initializers, _appTheme_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host {
      display: flex;
      outline: none;
      border-radius: var(--8, 8px);
      border: 1px solid;
      border-color: ${unsafeCSSVar('--affine-border-color')};
      background: ${unsafeCSSVar('backgroundOverlayPanelColor')};
      box-shadow: ${unsafeCSSVar('overlayShadow')};

      position: absolute;
      width: max-content;
      height: auto;
      top: 0;
      left: 0;
      overflow-y: auto;
      scrollbar-width: none !important;
      z-index: var(--affine-z-index-popover);
      --affine-font-family: var(--affine-font-sans-family);
    }

    :host([data-app-theme='light']) {
      background: ${unsafeCSS(lightCssVariables['--affine-background-overlay-panel-color'])};
      border-color: ${unsafeCSS(lightCssVariables['--affine-border-color'])};
      box-shadow: ${unsafeCSS(lightCssVariables['--affine-overlay-shadow'])};
    }
    :host([data-app-theme='dark']) {
      background: ${unsafeCSS(darkCssVariables['--affine-background-overlay-panel-color'])};
      border-color: ${unsafeCSS(darkCssVariables['--affine-border-color'])};
      box-shadow: ${unsafeCSS(darkCssVariables['--affine-overlay-shadow'])};
    }

    .ai-panel-container {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      width: 100%;
      height: fit-content;
      padding: 10px 0;
    }

    .ai-panel-container:not(:has(ai-panel-generating)) {
      gap: 8px;
    }

    .ai-panel-container:has(ai-panel-answer),
    .ai-panel-container:has(ai-panel-error),
    .ai-panel-container:has(ai-panel-generating:has(generating-placeholder)) {
      padding: 12px 0;
    }

    :host([data-state='hidden']) {
      display: none;
    }
  `; }
        get answer() {
            return this._answer ? mergeAIActionAnswer(this._answer) : null;
        }
        get inputText() {
            return this._inputText;
        }
        get viewportOverlayWidget() {
            const rootId = this.host.store.root?.id;
            return rootId
                ? this.host.view.getWidget(AFFINE_VIEWPORT_OVERLAY_WIDGET, rootId)
                : null;
        }
        _autoUpdatePosition(reference) {
            // workaround for the case that the reference contains children block elements, like:
            // paragraph
            //    child paragraph
            {
                const childrenContainer = reference.querySelector('.affine-block-children-container');
                if (childrenContainer && childrenContainer.previousElementSibling) {
                    reference = childrenContainer.previousElementSibling;
                }
            }
            this._stopAutoUpdate?.();
            this._stopAutoUpdate = autoUpdate(reference, this, () => {
                computePosition(reference, this, this._calcPositionOptions(reference))
                    .then(({ x, y }) => {
                    this.style.left = `${x}px`;
                    this.style.top = `${y}px`;
                    setTimeout(() => {
                        const input = this.shadowRoot?.querySelector('ai-panel-input');
                        input?.textarea?.focus();
                    }, 0);
                })
                    .catch(console.error);
            });
        }
        _calcPositionOptions(reference) {
            let rootBoundary;
            {
                const docModeProvider = this.host.std.get(DocModeProvider);
                if (docModeProvider.getEditorMode() === 'page') {
                    rootBoundary = undefined;
                }
                else {
                    const gfx = this.host.std.get(GfxControllerIdentifier);
                    // TODO circular dependency: instanceof EdgelessRootService
                    const viewport = gfx.viewport;
                    rootBoundary = {
                        x: viewport.left,
                        y: viewport.top,
                        width: viewport.width,
                        height: viewport.height - 100, // 100 for edgeless toolbar
                    };
                }
            }
            const overflowOptions = {
                padding: 20,
                rootBoundary: rootBoundary,
            };
            // block element in page editor
            if (getPageRootByElement(reference)) {
                return {
                    placement: 'bottom-start',
                    middleware: [offset(8), shift(overflowOptions)],
                };
            }
            // block element in doc in edgeless editor
            else if (reference.closest('edgeless-block-portal-note')) {
                return {
                    middleware: [
                        offset(8),
                        shift(overflowOptions),
                        autoPlacement({
                            ...overflowOptions,
                            allowedPlacements: ['top-start', 'bottom-start'],
                        }),
                    ],
                };
            }
            // edgeless element
            else {
                return {
                    placement: 'right-start',
                    middleware: [
                        offset({ mainAxis: 16 }),
                        flip({
                            mainAxis: true,
                            crossAxis: true,
                            flipAlignment: true,
                            ...overflowOptions,
                        }),
                        shift({
                            crossAxis: true,
                            ...overflowOptions,
                        }),
                    ],
                };
            }
        }
        connectedCallback() {
            super.connectedCallback();
            this.appTheme = this.std.get(ThemeProvider).app$.value;
            this.disposables.add(this.std.get(ThemeProvider).app$.subscribe(theme => {
                this.appTheme = theme;
                this.requestUpdate();
            }));
            this.tabIndex = -1;
            // No need to synchronize the contents of the input into the editor.
            this.setAttribute(RANGE_SYNC_EXCLUDE_ATTR, 'true');
            this.disposables.addFromEvent(document, 'pointerdown', this._onDocumentClick);
            if (this.block) {
                this.disposables.add(this.block.host.event.add('pointerDown', evtState => this._onDocumentClick(evtState.get('pointerState').event)));
                this.disposables.add(this.block.host.event.add('click', () => {
                    return this.state !== 'hidden' ? true : false;
                }));
            }
            this.disposables.addFromEvent(this, 'wheel', stopPropagation);
            this.disposables.addFromEvent(this, 'pointerdown', stopPropagation);
            this.disposables.addFromEvent(this, 'pointerup', stopPropagation);
            this.disposables.addFromEvent(this, 'cut', stopPropagation);
            this.disposables.addFromEvent(this, 'copy', stopPropagation);
            this.disposables.addFromEvent(this, 'paste', stopPropagation);
            this.disposables.addFromEvent(this, 'keydown', this._onKeyDown);
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            this._clearDiscardModal();
            this._stopAutoUpdate?.();
        }
        render() {
            if (this.state === 'hidden') {
                return nothing;
            }
            if (!this.config)
                return nothing;
            const config = this.config;
            const theme = this.std.get(ThemeProvider).app$.value;
            const mainTemplate = choose(this.state, [
                [
                    'input',
                    () => html `<ai-panel-input
            .onBlur=${this._discardWithConfirmation}
            .onFinish=${this._inputFinish}
            .onInput=${this.onInput}
            .networkSearchConfig=${config.networkSearchConfig}
            .theme=${theme}
          ></ai-panel-input>`,
                ],
                [
                    'generating',
                    () => html `
          ${this.answer
                        ? html `
                <ai-panel-answer
                  .finish=${false}
                  .config=${config.finishStateConfig}
                  .host=${this.host}
                >
                  ${this.answer &&
                            config.answerRenderer(this.answer, this.state)}
                </ai-panel-answer>
              `
                        : nothing}
          <ai-panel-generating
            .config=${config.generatingStateConfig}
            .theme=${theme}
            .stopGenerating=${this.stopGenerating}
            .withAnswer=${!!this.answer}
          ></ai-panel-generating>
        `,
                ],
                [
                    'finished',
                    () => html `
          <ai-panel-answer
            .config=${config.finishStateConfig}
            .copy=${config.copy}
            .host=${this.host}
          >
            ${this.answer && config.answerRenderer(this.answer, this.state)}
          </ai-panel-answer>
        `,
                ],
                [
                    'error',
                    () => html `
          <ai-panel-error
            .config=${config.errorStateConfig}
            .copy=${config.copy}
            .withAnswer=${!!this.answer}
            .host=${this.host}
          >
            ${this.answer && config.answerRenderer(this.answer, this.state)}
          </ai-panel-error>
        `,
                ],
            ]);
            return html `<div
      class="ai-panel-container"
      data-testid="ai-panel-container"
    >
      ${mainTemplate}
    </div>`;
        }
        willUpdate(changed) {
            const prevState = changed.get('state');
            if (prevState) {
                const shouldBeHidden = prevState === 'hidden';
                if (shouldBeHidden) {
                    this._selection = this.host.selection.value;
                }
                else {
                    this.restoreSelection();
                }
                // tell toolbar to show or hide
                this.std
                    .get(ToolbarRegistryIdentifier)
                    .flags.toggle(ToolbarFlag.Hiding, shouldBeHidden);
            }
            if (this.state === 'hidden') {
                this.viewportOverlayWidget?.unlock();
            }
            else {
                this.viewportOverlayWidget?.lock();
            }
            this.dataset.state = this.state;
        }
        #config_accessor_storage;
        get config() { return this.#config_accessor_storage; }
        set config(value) { this.#config_accessor_storage = value; }
        #generatingElement_accessor_storage;
        get generatingElement() { return this.#generatingElement_accessor_storage; }
        set generatingElement(value) { this.#generatingElement_accessor_storage = value; }
        #state_accessor_storage;
        get state() { return this.#state_accessor_storage; }
        set state(value) { this.#state_accessor_storage = value; }
        #appTheme_accessor_storage;
        get appTheme() { return this.#appTheme_accessor_storage; }
        set appTheme(value) { this.#appTheme_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._abortController = new AbortController();
            this._answer = null;
            this._clearDiscardModal = () => {
                if (this._discardModalAbort) {
                    this._discardModalAbort.abort();
                    this._discardModalAbort = null;
                }
            };
            this._clickOutside = () => {
                if (this.state === 'generating') {
                    this._stopWithConfirmation();
                }
                else {
                    this._discardWithConfirmation();
                }
            };
            this._discardModalAbort = null;
            this._inputFinish = (text) => {
                this._inputText = text;
                this.generate();
            };
            this._inputText = null;
            this._onDocumentClick = (e) => {
                if (this.state !== 'hidden' &&
                    e.target !== this &&
                    !this.contains(e.target)) {
                    this._clickOutside();
                }
            };
            this._onKeyDown = (event) => {
                event.stopPropagation();
                const { state } = this;
                if (state !== 'generating' && state !== 'input') {
                    return;
                }
                const { key } = event;
                if (key === 'Escape') {
                    if (state === 'generating') {
                        this.stopGenerating();
                    }
                    else {
                        this.hide();
                    }
                    return;
                }
            };
            this._resetAbortController = () => {
                if (this.state === 'generating') {
                    this._abortController.abort();
                }
                this._abortController = new AbortController();
            };
            this.ctx = null;
            this._stopWithConfirmation = () => {
                this.showStopModal()
                    .then(stop => {
                    if (stop) {
                        this.stopGenerating();
                    }
                })
                    .catch(console.error);
            };
            this._discardWithConfirmation = () => {
                if (this.state === 'hidden') {
                    return;
                }
                if (this.state === 'input' || !this.answer) {
                    this.hide();
                    return;
                }
                this.showDiscardModal()
                    .then(discard => {
                    discard && this.discard();
                })
                    .catch(console.error);
            };
            this.discard = () => {
                this.hide();
                this.restoreSelection();
                this.config?.discardCallback?.();
            };
            /**
             * You can evaluate this method multiple times to regenerate the answer.
             */
            this.generate = () => {
                this.restoreSelection();
                const text = this._inputText;
                if (!this.config) {
                    throw new Error('config is not found');
                }
                if (text === null || text === undefined) {
                    throw new Error('text is not found');
                }
                if (!this.config.generateAnswer) {
                    throw new Error('generateAnswer is not found');
                }
                this._resetAbortController();
                // reset answer
                this._answer = null;
                const update = (answer) => {
                    this._answer = answer;
                    this.requestUpdate();
                };
                const finish = (type, err) => {
                    if (type === 'aborted')
                        return;
                    if (!this.config) {
                        throw new Error('config is not found when finish');
                    }
                    if (type === 'error') {
                        this.state = 'error';
                        this.config.errorStateConfig.error = err;
                    }
                    else {
                        this.state = 'finished';
                        this.config.errorStateConfig.error = undefined;
                    }
                    this._resetAbortController();
                };
                this.scrollTop = 0; // reset scroll top
                this.state = 'generating';
                this.config.generateAnswer({
                    input: text,
                    update,
                    finish,
                    signal: this._abortController.signal,
                });
            };
            this.hide = (shouldTriggerCallback = true) => {
                this._resetAbortController();
                this.state = 'hidden';
                this._stopAutoUpdate?.();
                this._inputText = null;
                this._answer = null;
                this._stopAutoUpdate = undefined;
                this.viewportOverlayWidget?.unlock();
                if (shouldTriggerCallback) {
                    this.config?.hideCallback?.();
                }
            };
            this.onInput = (text) => {
                this._inputText = text;
                this.config?.inputCallback?.(text);
            };
            this.restoreSelection = () => {
                if (this._selection) {
                    this.host.selection.set([...this._selection]);
                    if (this.state === 'hidden') {
                        this._selection = undefined;
                    }
                }
            };
            this.setState = (state, reference) => {
                this.state = state;
                this._autoUpdatePosition(reference);
            };
            this.showStopModal = () => {
                const notification = this.host.std.getOptional(NotificationProvider);
                if (!notification) {
                    return Promise.resolve(true);
                }
                this._clearDiscardModal();
                this._discardModalAbort = new AbortController();
                return notification
                    .confirm({
                    title: 'Stop generating',
                    message: 'AI is generating content. Do you want to stop generating?',
                    cancelText: 'Cancel',
                    confirmText: 'Stop',
                    abort: this._abortController.signal,
                })
                    .finally(() => (this._discardModalAbort = null));
            };
            this.showDiscardModal = () => {
                const notification = this.host.std.getOptional(NotificationProvider);
                if (!notification) {
                    return Promise.resolve(true);
                }
                this._clearDiscardModal();
                this._discardModalAbort = new AbortController();
                return notification
                    .confirm({
                    title: 'Discard the AI result',
                    message: 'Do you want to discard the results the AI just generated?',
                    cancelText: 'Cancel',
                    confirmText: 'Discard',
                    abort: this._abortController.signal,
                })
                    .finally(() => (this._discardModalAbort = null));
            };
            this.stopGenerating = () => {
                this._abortController.abort();
                this.state = 'finished';
                if (!this.answer) {
                    this.hide();
                }
            };
            this.toggle = (reference, type) => {
                if (type === 'generate') {
                    this._inputText = '';
                    this.generate();
                }
                else if (type === 'input') {
                    this.hide();
                    this.state = 'input';
                }
                this._autoUpdatePosition(reference);
            };
            this.#config_accessor_storage = __runInitializers(this, _config_initializers, null);
            this.#generatingElement_accessor_storage = (__runInitializers(this, _config_extraInitializers), __runInitializers(this, _generatingElement_initializers, null));
            this.#state_accessor_storage = (__runInitializers(this, _generatingElement_extraInitializers), __runInitializers(this, _state_initializers, 'hidden'));
            this.#appTheme_accessor_storage = (__runInitializers(this, _state_extraInitializers), __runInitializers(this, _appTheme_initializers, ColorScheme.Light));
            __runInitializers(this, _appTheme_extraInitializers);
        }
    };
})();
export { AffineAIPanelWidget };
export const aiPanelWidget = WidgetViewExtension('affine:page', AFFINE_AI_PANEL_WIDGET, literal `${unsafeStatic(AFFINE_AI_PANEL_WIDGET)}`);
//# sourceMappingURL=ai-panel.js.map