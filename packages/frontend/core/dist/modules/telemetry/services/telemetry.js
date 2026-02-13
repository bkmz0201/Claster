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
import { shallowEqual } from '@affine/component';
import { ServerDeploymentType } from '@affine/graphql';
import { mixpanel } from '@affine/track';
import { LiveData, OnEvent, Service } from '@toeverything/infra';
import { ApplicationStarted } from '../../lifecycle';
let TelemetryService = (() => {
    let _classDecorators = [OnEvent(ApplicationStarted, e => e.onApplicationStart)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Service;
    var TelemetryService = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TelemetryService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        constructor(globalContextService, serversService) {
            super();
            this.globalContextService = globalContextService;
            this.serversService = serversService;
            this.disposableFns = [];
            this.currentAccount$ = this.globalContextService.globalContext.serverId.$.selector(id => id
                ? this.serversService.server$(id)
                : new LiveData(undefined))
                .flat()
                .selector(server => [
                server?.account$,
                server?.config$.selector(c => c.type === ServerDeploymentType.Selfhosted),
            ])
                .flat()
                .map(([account, selfHosted]) => ({
                account,
                selfHosted,
            }))
                .distinctUntilChanged(shallowEqual);
            // TODO: support multiple servers
            let prevAccount = null;
            let prevSelfHosted = undefined;
            const unsubscribe = this.currentAccount$.subscribe(({ account, selfHosted }) => {
                if (prevAccount) {
                    mixpanel.reset();
                }
                // the isSelfHosted property from environment is not reliable
                if (selfHosted !== prevSelfHosted) {
                    mixpanel.register({
                        isSelfHosted: selfHosted,
                    });
                }
                prevSelfHosted = selfHosted;
                prevAccount = account ?? null;
                if (account) {
                    mixpanel.identify(account.id);
                    mixpanel.people.set({
                        $email: account.email,
                        $name: account.label,
                        $avatar: account.avatar,
                    });
                }
            });
            this.disposableFns.push(() => {
                unsubscribe.unsubscribe();
            });
        }
        onApplicationStart() {
            this.registerMiddlewares();
        }
        registerMiddlewares() {
            this.disposables.push(mixpanel.middleware((_event, parameters) => {
                const extraContext = this.extractGlobalContext();
                return {
                    ...extraContext,
                    ...parameters,
                };
            }));
        }
        extractGlobalContext() {
            const globalContext = this.globalContextService.globalContext;
            const page = globalContext.isDoc.get()
                ? globalContext.isTrashDoc.get()
                    ? 'trash'
                    : globalContext.docMode.get() === 'page'
                        ? 'doc'
                        : 'edgeless'
                : globalContext.isAllDocs.get()
                    ? 'allDocs'
                    : globalContext.isTrash.get()
                        ? 'trash'
                        : globalContext.isCollection.get()
                            ? 'collection'
                            : globalContext.isTag.get()
                                ? 'tag'
                                : undefined;
            const serverId = globalContext.serverId.get() ?? undefined;
            return { page, serverId };
        }
        dispose() {
            this.disposableFns.forEach(dispose => dispose());
            super.dispose();
        }
    };
    return TelemetryService = _classThis;
})();
export { TelemetryService };
//# sourceMappingURL=telemetry.js.map