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
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { nanoid } from 'nanoid';
import { useCallback, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
function createLitPortalAnchor(callback) {
    return html `<lit-react-portal
    .notify=${callback}
    portalId=${nanoid()}
  ></lit-react-portal>`;
}
export const LIT_REACT_PORTAL = 'lit-react-portal';
let LitReactPortal = (() => {
    let _classDecorators = [customElement(LIT_REACT_PORTAL)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = LitElement;
    var LitReactPortal = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            LitReactPortal = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        static get properties() {
            return {
                portalId: { type: String },
                notify: { attribute: false },
            };
        }
        connectedCallback() {
            super.connectedCallback();
            this.notify?.({
                name: 'connectedCallback',
                target: this,
            });
        }
        attributeChangedCallback(name, oldVal, newVal) {
            super.attributeChangedCallback(name, oldVal, newVal);
            if (name.toLowerCase() === 'portalid') {
                this.notify?.({
                    name: 'willUpdate',
                    target: this,
                });
            }
        }
        // do not enable shadow root
        createRenderRoot() {
            return this;
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            this.notify?.({
                name: 'disconnectedCallback',
                target: this,
            });
        }
    };
    return LitReactPortal = _classThis;
})();
// returns a factory function that renders a given element to a lit template
export const useLitPortalFactory = () => {
    const [portals, setPortals] = useState([]);
    const reactToLit = useCallback((elementOrFactory, rerendering) => {
        const element = typeof elementOrFactory === 'function'
            ? elementOrFactory()
            : elementOrFactory;
        return createLitPortalAnchor(event => {
            setPortals(portals => {
                const { name, target } = event;
                const id = target.portalId;
                let newPortals = portals;
                const updatePortals = () => {
                    let oldPortalIndex = portals.findIndex(p => p.litElement === target);
                    oldPortalIndex =
                        oldPortalIndex === -1 ? portals.length : oldPortalIndex;
                    newPortals = portals.toSpliced(oldPortalIndex, 1, {
                        id,
                        portal: ReactDOM.createPortal(element, target),
                        litElement: target,
                    });
                };
                switch (name) {
                    case 'connectedCallback':
                        updatePortals();
                        break;
                    case 'disconnectedCallback':
                        newPortals = portals.filter(p => p.litElement.isConnected);
                        break;
                    case 'willUpdate':
                        if (!target.isConnected || !rerendering) {
                            break;
                        }
                        updatePortals();
                        break;
                }
                return newPortals;
            });
        });
    }, []);
    return [reactToLit, portals];
};
// render a react element to a lit template
export const useLitPortal = (elementOrFactory) => {
    const [anchor, setAnchor] = useState();
    const template = useMemo(() => createLitPortalAnchor(event => {
        let anchor;
        if (event.name !== 'disconnectedCallback') {
            anchor = event.target;
        }
        setAnchor(anchor);
    }), []);
    const element = useMemo(() => typeof elementOrFactory === 'function'
        ? elementOrFactory()
        : elementOrFactory, [elementOrFactory]);
    return {
        template,
        portal: anchor ? ReactDOM.createPortal(element, anchor) : undefined,
    };
};
//# sourceMappingURL=lit-portal.js.map