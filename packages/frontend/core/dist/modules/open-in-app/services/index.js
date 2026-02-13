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
import { LiveData, OnEvent, Service } from '@toeverything/infra';
import { resolveLinkToDoc } from '../../navigation';
import { WorkbenchLocationChanged } from '../../workbench/services/workbench';
import { getLocalWorkspaceIds } from '../../workspace-engine/impls/local';
const storageKey = 'open-link-mode';
export var OpenLinkMode;
(function (OpenLinkMode) {
    OpenLinkMode["ALWAYS_ASK"] = "always-ask";
    OpenLinkMode["OPEN_IN_WEB"] = "open-in-web";
    OpenLinkMode["OPEN_IN_DESKTOP_APP"] = "open-in-desktop-app";
})(OpenLinkMode || (OpenLinkMode = {}));
let OpenInAppService = (() => {
    let _classDecorators = [OnEvent(WorkbenchLocationChanged, e => e.onNavigation)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Service;
    var OpenInAppService = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            OpenInAppService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        constructor(globalState, workspacesService) {
            super();
            this.globalState = globalState;
            this.workspacesService = workspacesService;
            this.initialized = false;
            this.showOpenInAppBanner$ = new LiveData(false);
            this.showOpenInAppPage$ = new LiveData(undefined);
            this.openLinkMode$ = LiveData.from(this.globalState.watch(storageKey), this.getOpenLinkMode()).map(v => v ?? OpenLinkMode.ALWAYS_ASK);
        }
        onNavigation() {
            // check doc id instead?
            if (window.location.href === this.initialUrl) {
                return;
            }
            this.showOpenInAppBanner$.next(false);
        }
        /**
         * Given the initial URL, check if we need to redirect to the desktop app.
         */
        bootstrap() {
            if (this.initialized || !window) {
                return;
            }
            this.initialized = true;
            this.initialUrl = window.location.href;
            const maybeDocLink = resolveLinkToDoc(this.initialUrl);
            let shouldOpenInApp = false;
            const localWorkspaceIds = getLocalWorkspaceIds();
            if (maybeDocLink && !localWorkspaceIds.includes(maybeDocLink.workspaceId)) {
                switch (this.getOpenLinkMode()) {
                    case OpenLinkMode.OPEN_IN_DESKTOP_APP:
                        shouldOpenInApp = true;
                        break;
                    case OpenLinkMode.ALWAYS_ASK:
                        this.showOpenInAppBanner$.next(true);
                        break;
                    default:
                        break;
                }
            }
            this.showOpenInAppPage$.next(shouldOpenInApp);
        }
        showOpenInAppPage() {
            this.showOpenInAppPage$.next(true);
        }
        hideOpenInAppPage() {
            this.showOpenInAppPage$.next(false);
        }
        getOpenLinkMode() {
            return (this.globalState.get(storageKey) ?? OpenLinkMode.ALWAYS_ASK);
        }
        setOpenLinkMode(mode) {
            this.globalState.set(storageKey, mode);
        }
        dismissBanner(rememberMode) {
            if (rememberMode) {
                this.globalState.set(storageKey, rememberMode);
            }
            this.showOpenInAppBanner$.next(false);
        }
    };
    return OpenInAppService = _classThis;
})();
export { OpenInAppService };
//# sourceMappingURL=index.js.map