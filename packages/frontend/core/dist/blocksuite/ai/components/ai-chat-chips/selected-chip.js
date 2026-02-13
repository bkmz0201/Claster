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
import { SignalWatcher, WithDisposable } from '@blocksuite/affine/global/lit';
import { ShadowlessElement } from '@blocksuite/affine/std';
import { UngroupIcon } from '@blocksuite/icons/lit';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { getChipIcon, getChipTooltip } from './utils';
let ChatPanelSelectedChip = (() => {
    let _classSuper = SignalWatcher(WithDisposable(ShadowlessElement));
    let _chip_decorators;
    let _chip_initializers = [];
    let _chip_extraInitializers = [];
    let _removeChip_decorators;
    let _removeChip_initializers = [];
    let _removeChip_extraInitializers = [];
    return class ChatPanelSelectedChip extends _classSuper {
        constructor() {
            super(...arguments);
            this.#chip_accessor_storage = __runInitializers(this, _chip_initializers, void 0);
            this.#removeChip_accessor_storage = (__runInitializers(this, _chip_extraInitializers), __runInitializers(this, _removeChip_initializers, void 0));
            this.onChipDelete = (__runInitializers(this, _removeChip_extraInitializers), () => {
                this.removeChip(this.chip);
            });
        }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _chip_decorators = [property({ attribute: false })];
            _removeChip_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _chip_decorators, { kind: "accessor", name: "chip", static: false, private: false, access: { has: obj => "chip" in obj, get: obj => obj.chip, set: (obj, value) => { obj.chip = value; } }, metadata: _metadata }, _chip_initializers, _chip_extraInitializers);
            __esDecorate(this, null, _removeChip_decorators, { kind: "accessor", name: "removeChip", static: false, private: false, access: { has: obj => "removeChip" in obj, get: obj => obj.removeChip, set: (obj, value) => { obj.removeChip = value; } }, metadata: _metadata }, _removeChip_initializers, _removeChip_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        #chip_accessor_storage;
        get chip() { return this.#chip_accessor_storage; }
        set chip(value) { this.#chip_accessor_storage = value; }
        #removeChip_accessor_storage;
        get removeChip() { return this.#removeChip_accessor_storage; }
        set removeChip(value) { this.#removeChip_accessor_storage = value; }
        render() {
            const { state } = this.chip;
            const isLoading = state === 'processing';
            const tooltip = getChipTooltip(state, 'selected-content', this.chip.tooltip);
            const icon = getChipIcon(state, UngroupIcon());
            return html `<chat-panel-chip
      .state=${state}
      .name=${'selected-content'}
      .tooltip=${tooltip}
      .icon=${icon}
      .closeable=${!isLoading}
      .onChipDelete=${this.onChipDelete}
    ></chat-panel-chip>`;
        }
    };
})();
export { ChatPanelSelectedChip };
//# sourceMappingURL=selected-chip.js.map