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
var __addDisposableResource = (this && this.__addDisposableResource) || function (env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose, inner;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
            if (async) inner = dispose;
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        if (inner) dispose = function() { try { inner.call(this); } catch (e) { return Promise.reject(e); } };
        env.stack.push({ value: value, dispose: dispose, async: async });
    }
    else if (async) {
        env.stack.push({ async: true });
    }
    return value;
};
var __disposeResources = (this && this.__disposeResources) || (function (SuppressedError) {
    return function (env) {
        function fail(e) {
            env.error = env.hasError ? new SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
            env.hasError = true;
        }
        var r, s = 0;
        function next() {
            while (r = env.stack.pop()) {
                try {
                    if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
                    if (r.dispose) {
                        var result = r.dispose.call(r.value);
                        if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
                    }
                    else s |= 1;
                }
                catch (e) {
                    fail(e);
                }
            }
            if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
            if (env.hasError) throw env.error;
        }
        return next();
    };
})(typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
import { describe, expect, test } from 'vitest';
import { CircularDependencyError, ComponentNotFoundError, createEvent, createIdentifier, DuplicateDefinitionError, Entity, Framework, MissingDependencyError, RecursionLimitError, Scope, Service, } from '..';
import { OnEvent } from '../core/event';
describe('framework', () => {
    test('basic', () => {
        const framework = new Framework();
        class TestService extends Service {
            constructor() {
                super(...arguments);
                this.a = 'b';
            }
        }
        framework.service(TestService);
        const provider = framework.provider();
        expect(provider.get(TestService).a).toBe('b');
    });
    test('entity', () => {
        const framework = new Framework();
        class TestService extends Service {
            constructor() {
                super(...arguments);
                this.a = 'b';
            }
        }
        class TestEntity extends Entity {
            constructor(test) {
                super();
                this.test = test;
            }
        }
        framework.service(TestService).entity(TestEntity, [TestService]);
        const provider = framework.provider();
        const entity = provider.createEntity(TestEntity, {
            name: 'test',
        });
        expect(entity.test.a).toBe('b');
        expect(entity.props.name).toBe('test');
    });
    test('componentCount', () => {
        const framework = new Framework();
        class TestService extends Service {
            constructor() {
                super(...arguments);
                this.a = 'b';
            }
        }
        framework.service(TestService);
        expect(framework.componentCount).toEqual(1);
    });
    test('dependency', () => {
        const framework = new Framework();
        class A extends Service {
            constructor() {
                super(...arguments);
                this.value = 'hello world';
            }
        }
        class B extends Service {
            constructor(a) {
                super();
                this.a = a;
            }
        }
        class C extends Service {
            constructor(b) {
                super();
                this.b = b;
            }
        }
        framework.service(A).service(B, [A]).service(C, [B]);
        const provider = framework.provider();
        expect(provider.get(C).b.a.value).toEqual('hello world');
    });
    test('identifier', () => {
        const Animal = createIdentifier('Animal');
        class Cat extends Service {
            constructor() {
                super(...arguments);
                this.name = 'cat';
            }
        }
        class Zoo extends Service {
            constructor(animal) {
                super();
                this.animal = animal;
            }
        }
        const serviceCollection = new Framework();
        serviceCollection.impl(Animal, Cat).service(Zoo, [Animal]);
        const provider = serviceCollection.provider();
        expect(provider.get(Zoo).animal.name).toEqual('cat');
    });
    test('variant', () => {
        const framework = new Framework();
        const USB = createIdentifier('USB');
        class TypeA extends Service {
            constructor() {
                super(...arguments);
                this.speed = 100;
            }
        }
        class TypeC extends Service {
            constructor() {
                super(...arguments);
                this.speed = 300;
            }
        }
        class PC extends Service {
            constructor(typeA, ports) {
                super();
                this.typeA = typeA;
                this.ports = ports;
            }
        }
        framework
            .impl(USB('A'), TypeA)
            .impl(USB('C'), TypeC)
            .service(PC, [USB('A'), [USB]]);
        const provider = framework.provider();
        expect(provider.get(USB('A')).speed).toEqual(100);
        expect(provider.get(USB('C')).speed).toEqual(300);
        expect(provider.get(PC).typeA.speed).toEqual(100);
        expect(provider.get(PC).ports.length).toEqual(2);
    });
    test('lazy initialization', () => {
        const framework = new Framework();
        const Command = createIdentifier('command');
        let pageSystemInitialized = false;
        class PageSystem extends Service {
            constructor() {
                super();
                this.mode = 'page';
                this.name = 'helloworld';
                pageSystemInitialized = true;
            }
            switchToEdgeless() {
                this.mode = 'edgeless';
            }
            rename() {
                this.name = 'foobar';
            }
        }
        class CommandSystem extends Service {
            constructor(commands) {
                super();
                this.commands = commands;
            }
            execute(shortcut) {
                const command = this.commands.find(c => c.shortcut === shortcut);
                if (command) {
                    command.callback();
                }
            }
        }
        framework.service(PageSystem);
        framework.service(CommandSystem, [[Command]]);
        framework.impl(Command('switch'), p => ({
            shortcut: 'option+s',
            callback: () => p.get(PageSystem).switchToEdgeless(),
        }));
        framework.impl(Command('rename'), p => ({
            shortcut: 'f2',
            callback: () => p.get(PageSystem).rename(),
        }));
        const provider = framework.provider();
        const commandSystem = provider.get(CommandSystem);
        expect(pageSystemInitialized, "PageSystem won't be initialized until command executed").toEqual(false);
        commandSystem.execute('option+s');
        expect(pageSystemInitialized).toEqual(true);
        expect(provider.get(PageSystem).mode).toEqual('edgeless');
        expect(provider.get(PageSystem).name).toEqual('helloworld');
        expect(commandSystem.commands.length).toEqual(2);
        commandSystem.execute('f2');
        expect(provider.get(PageSystem).name).toEqual('foobar');
    });
    test('duplicate, override', () => {
        const framework = new Framework();
        const something = createIdentifier('USB');
        class A {
            constructor() {
                this.a = 'i am A';
            }
        }
        class B {
            constructor() {
                this.b = 'i am B';
            }
        }
        framework.impl(something, A).override(something, B);
        const provider = framework.provider();
        expect(provider.get(something)).toEqual({ b: 'i am B' });
    });
    test('event', () => {
        const framework = new Framework();
        const event = createEvent('test-event');
        let TestService = (() => {
            let _classDecorators = [OnEvent(event, p => p.onTestEvent)];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _classSuper = Service;
            var TestService = class extends _classSuper {
                static { _classThis = this; }
                constructor() {
                    super(...arguments);
                    this.value = 0;
                }
                static {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestService = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                }
                onTestEvent(payload) {
                    this.value = payload.value;
                }
            };
            return TestService = _classThis;
        })();
        framework.service(TestService);
        const provider = framework.provider();
        provider.emitEvent(event, { value: 123 });
        expect(provider.get(TestService).value).toEqual(123);
    });
    test('scope', () => {
        const framework = new Framework();
        class SystemService extends Service {
            constructor() {
                super(...arguments);
                this.appName = 'affine';
            }
        }
        framework.service(SystemService);
        class WorkspaceScope extends Scope {
        }
        class WorkspaceService extends Service {
            constructor(system) {
                super();
                this.system = system;
            }
        }
        framework.scope(WorkspaceScope).service(WorkspaceService, [SystemService]);
        class PageScope extends Scope {
        }
        class PageService extends Service {
            constructor(workspace, system) {
                super();
                this.workspace = workspace;
                this.system = system;
            }
        }
        framework
            .scope(WorkspaceScope)
            .scope(PageScope)
            .service(PageService, [WorkspaceService, SystemService]);
        class EditorScope extends Scope {
            get pageId() {
                return this.framework.get(PageScope).props.pageId;
            }
        }
        class EditorService extends Service {
            constructor(page) {
                super();
                this.page = page;
            }
        }
        framework
            .scope(WorkspaceScope)
            .scope(PageScope)
            .scope(EditorScope)
            .service(EditorService, [PageService]);
        const root = framework.provider();
        expect(root.get(SystemService).appName).toEqual('affine');
        expect(() => root.get(WorkspaceService)).toThrowError(ComponentNotFoundError);
        const workspaceScope = root.createScope(WorkspaceScope);
        const workspaceService = workspaceScope.get(WorkspaceService);
        expect(workspaceService.system.appName).toEqual('affine');
        expect(() => workspaceScope.get(PageService)).toThrowError(ComponentNotFoundError);
        const pageScope = workspaceScope.createScope(PageScope, {
            pageId: 'test-page',
        });
        expect(pageScope.props.pageId).toEqual('test-page');
        const pageService = pageScope.get(PageService);
        expect(pageService.workspace).toBe(workspaceService);
        expect(pageService.system.appName).toEqual('affine');
        const editorScope = pageScope.createScope(EditorScope);
        expect(editorScope.pageId).toEqual('test-page');
        const editorService = editorScope.get(EditorService);
        expect(editorService.page).toBe(pageService);
    });
    test('scope event', () => {
        const framework = new Framework();
        const event = createEvent('test-event');
        let TestService = (() => {
            let _classDecorators = [OnEvent(event, p => p.onTestEvent)];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _classSuper = Service;
            var TestService = class extends _classSuper {
                static { _classThis = this; }
                constructor() {
                    super(...arguments);
                    this.value = 0;
                }
                static {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestService = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                }
                onTestEvent(payload) {
                    this.value = payload.value;
                }
            };
            return TestService = _classThis;
        })();
        class TestScope extends Scope {
        }
        let TestScopeService = (() => {
            let _classDecorators = [OnEvent(event, p => p.onTestEvent)];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _classSuper = Service;
            var TestScopeService = class extends _classSuper {
                static { _classThis = this; }
                constructor() {
                    super(...arguments);
                    this.value = 0;
                }
                static {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestScopeService = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                }
                onTestEvent(payload) {
                    this.value = payload.value;
                }
            };
            return TestScopeService = _classThis;
        })();
        framework.service(TestService).scope(TestScope).service(TestScopeService);
        const provider = framework.provider();
        const scope = provider.createScope(TestScope);
        scope.emitEvent(event, { value: 123 });
        expect(provider.get(TestService).value).toEqual(0);
        expect(scope.get(TestScopeService).value).toEqual(123);
    });
    test('dispose', () => {
        const framework = new Framework();
        let isSystemDisposed = false;
        class System extends Service {
            constructor() {
                super(...arguments);
                this.appName = 'affine';
            }
            dispose() {
                super.dispose();
                isSystemDisposed = true;
            }
        }
        framework.service(System);
        let isWorkspaceDisposed = false;
        class WorkspaceScope extends Scope {
            dispose() {
                super.dispose();
                isWorkspaceDisposed = true;
            }
        }
        let isWorkspacePageServiceDisposed = false;
        class WorkspacePageService extends Service {
            constructor(workspace, sysmte) {
                super();
                this.workspace = workspace;
                this.sysmte = sysmte;
            }
            dispose() {
                super.dispose();
                isWorkspacePageServiceDisposed = true;
            }
        }
        framework
            .scope(WorkspaceScope)
            .service(WorkspacePageService, [WorkspaceScope, System]);
        {
            const env_1 = { stack: [], error: void 0, hasError: false };
            try {
                const root = __addDisposableResource(env_1, framework.provider(), false);
                {
                    const env_2 = { stack: [], error: void 0, hasError: false };
                    try {
                        // create a workspace
                        const workspaceScope = __addDisposableResource(env_2, root.createScope(WorkspaceScope), false);
                        const pageService = workspaceScope.get(WorkspacePageService);
                        expect(pageService).instanceOf(WorkspacePageService);
                        expect(isSystemDisposed ||
                            isWorkspaceDisposed ||
                            isWorkspacePageServiceDisposed).toBe(false);
                    }
                    catch (e_1) {
                        env_2.error = e_1;
                        env_2.hasError = true;
                    }
                    finally {
                        __disposeResources(env_2);
                    }
                }
                expect(isWorkspaceDisposed && isWorkspacePageServiceDisposed).toBe(true);
                expect(isSystemDisposed).toBe(false);
            }
            catch (e_2) {
                env_1.error = e_2;
                env_1.hasError = true;
            }
            finally {
                __disposeResources(env_1);
            }
        }
        expect(isSystemDisposed).toBe(true);
    });
    test('service not found', () => {
        const framework = new Framework();
        const provider = framework.provider();
        expect(() => provider.get(createIdentifier('SomeService'))).toThrowError(ComponentNotFoundError);
    });
    test('missing dependency', () => {
        const framework = new Framework();
        class A extends Service {
            constructor() {
                super(...arguments);
                this.value = 'hello world';
            }
        }
        class B extends Service {
            constructor(a) {
                super();
                this.a = a;
            }
        }
        framework.service(B, [A]);
        const provider = framework.provider();
        expect(() => provider.get(B)).toThrowError(MissingDependencyError);
    });
    test('circular dependency', () => {
        const framework = new Framework();
        class A extends Service {
            constructor(c) {
                super();
                this.c = c;
            }
        }
        class B extends Service {
            constructor(a) {
                super();
                this.a = a;
            }
        }
        class C extends Service {
            constructor(b) {
                super();
                this.b = b;
            }
        }
        framework.service(A, [C]).service(B, [A]).service(C, [B]);
        const provider = framework.provider();
        expect(() => provider.get(A)).toThrowError(CircularDependencyError);
        expect(() => provider.get(B)).toThrowError(CircularDependencyError);
        expect(() => provider.get(C)).toThrowError(CircularDependencyError);
    });
    test('duplicate service definition', () => {
        const serviceCollection = new Framework();
        class A extends Service {
        }
        serviceCollection.service(A);
        expect(() => serviceCollection.service(A)).toThrowError(DuplicateDefinitionError);
        class B {
        }
        const Something = createIdentifier('something');
        serviceCollection.impl(Something, A);
        expect(() => serviceCollection.impl(Something, B)).toThrowError(DuplicateDefinitionError);
    });
    test('recursion limit', () => {
        // maxmium resolve depth is 100
        const serviceCollection = new Framework();
        const Something = createIdentifier('something');
        let i = 0;
        for (; i < 100; i++) {
            const next = i + 1;
            class Test {
                constructor(_next) { }
            }
            serviceCollection.impl(Something(i.toString()), Test, [
                Something(next.toString()),
            ]);
        }
        class Final {
            constructor() {
                this.a = 'b';
            }
        }
        serviceCollection.impl(Something(i.toString()), Final);
        const provider = serviceCollection.provider();
        expect(() => provider.get(Something('0'))).toThrowError(RecursionLimitError);
    });
});
//# sourceMappingURL=framework.spec.js.map