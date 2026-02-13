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
import { BlockComponent, BlockViewExtension } from '@blocksuite/affine/std';
import { css } from 'lit';
import { property } from 'lit/decorators.js';
import { literal } from 'lit/static-html.js';
let LitTranscriptionBlock = (() => {
    let _classSuper = BlockComponent;
    let _blockId_decorators;
    let _blockId_initializers = [];
    let _blockId_extraInitializers = [];
    return class LitTranscriptionBlock extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _blockId_decorators = [property({ type: String, attribute: 'data-block-id' })];
            __esDecorate(this, null, _blockId_decorators, { kind: "accessor", name: "blockId", static: false, private: false, access: { has: obj => "blockId" in obj, get: obj => obj.blockId, set: (obj, value) => { obj.blockId = value; } }, metadata: _metadata }, _blockId_initializers, _blockId_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = [
            css `
      transcription-block {
        outline: none;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
    `,
        ]; }
        render() {
            return this.std.host.renderChildren(this.model);
        }
        #blockId_accessor_storage = __runInitializers(this, _blockId_initializers, void 0);
        get blockId() { return this.#blockId_accessor_storage; }
        set blockId(value) { this.#blockId_accessor_storage = value; }
        constructor() {
            super();
            __runInitializers(this, _blockId_extraInitializers);
            // questionable:
            this.widgets = {};
            // to allow text selection across paragraphs in the callout block
            this.contentEditable = 'true';
        }
        firstUpdated(changedProperties) {
            super.firstUpdated(changedProperties);
            this.disposables.addFromEvent(this, 'click', this.onClick);
        }
        onClick(event) {
            event.stopPropagation();
        }
    };
})();
export { LitTranscriptionBlock };
export const AITranscriptionBlockSpec = [
    BlockViewExtension('affine:transcription', () => {
        return literal `transcription-block`;
    }),
];
//# sourceMappingURL=ai-transcription-block.js.map