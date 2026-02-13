import { withContext } from './constructor-context';
import { CircularDependencyError, ComponentNotFoundError, MissingDependencyError, RecursionLimitError, } from './error';
import { EventBus } from './event';
import { parseIdentifier } from './identifier';
export class FrameworkProvider {
    constructor() {
        this.get = (identifier, options) => {
            return this.getRaw(parseIdentifier(identifier), {
                ...options,
                optional: false,
            });
        };
        this.getAll = (identifier, options) => {
            return this.getAllRaw(parseIdentifier(identifier), {
                ...options,
            });
        };
        this.getOptional = (identifier, options) => {
            return this.getRaw(parseIdentifier(identifier), {
                ...options,
                optional: true,
            });
        };
        this.createEntity = (identifier, ...[props]) => {
            return this.getRaw(parseIdentifier(identifier), {
                noCache: true,
                sameScope: true,
                props,
            });
        };
        this.createScope = (root, ...[props]) => {
            const newProvider = this.collection.provider([...this.scope, parseIdentifier(root).identifierName], this);
            return newProvider.getRaw(parseIdentifier(root), {
                sameScope: true,
                props,
            });
        };
        this.emitEvent = (event, payload) => {
            this.eventBus.emit(event, payload);
        };
    }
    [Symbol.dispose]() {
        this.dispose();
    }
}
export class ComponentCachePool {
    constructor() {
        this.cache = new Map();
    }
    getOrInsert(identifier, insert) {
        const cache = this.cache.get(identifier.identifierName) ?? new Map();
        if (!cache.has(identifier.variant)) {
            cache.set(identifier.variant, insert());
        }
        const cached = cache.get(identifier.variant);
        this.cache.set(identifier.identifierName, cache);
        return cached;
    }
    dispose() {
        for (const t of this.cache.values()) {
            for (const i of t.values()) {
                if (typeof i === 'object' && typeof i[Symbol.dispose] === 'function') {
                    try {
                        i[Symbol.dispose]();
                    }
                    catch (err) {
                        // make a uncaught exception
                        setTimeout(() => {
                            throw err;
                        }, 0);
                    }
                }
            }
        }
        this.cache.clear();
    }
    [Symbol.dispose]() {
        this.dispose();
    }
}
class Resolver extends FrameworkProvider {
    constructor(provider, depth = 0, stack = []) {
        super();
        this.provider = provider;
        this.depth = depth;
        this.stack = stack;
        this.scope = this.provider.scope;
        this.collection = this.provider.collection;
        this.eventBus = this.provider.eventBus;
    }
    getRaw(identifier, { sameScope = false, optional = false, noCache = false, props, } = {}) {
        const factory = this.provider.collection.getFactory(identifier, this.provider.scope);
        if (!factory) {
            if (this.provider.parent && !sameScope) {
                return this.provider.parent.getRaw(identifier, {
                    sameScope: sameScope,
                    optional,
                    noCache,
                    props,
                });
            }
            if (optional) {
                return undefined;
            }
            throw new ComponentNotFoundError(identifier);
        }
        const runFactory = () => {
            const nextResolver = this.track(identifier);
            try {
                return withContext(() => factory(nextResolver), {
                    provider: this.provider,
                    props,
                });
            }
            catch (err) {
                if (err instanceof ComponentNotFoundError) {
                    throw new MissingDependencyError(identifier, err.identifier, this.stack);
                }
                throw err;
            }
        };
        if (noCache) {
            return runFactory();
        }
        return this.provider.cache.getOrInsert(identifier, runFactory);
    }
    getAllRaw(identifier, { sameScope = false, noCache, props } = {}) {
        const vars = this.provider.collection.getFactoryAll(identifier, this.provider.scope);
        if (vars === undefined) {
            if (this.provider.parent && !sameScope) {
                return this.provider.parent.getAllRaw(identifier);
            }
            return new Map();
        }
        const result = new Map();
        for (const [variant, factory] of vars) {
            // eslint-disable-next-line sonarjs/no-identical-functions
            const runFactory = () => {
                const nextResolver = this.track(identifier);
                try {
                    return withContext(() => factory(nextResolver), {
                        provider: this.provider,
                        props,
                    });
                }
                catch (err) {
                    if (err instanceof ComponentNotFoundError) {
                        throw new MissingDependencyError(identifier, err.identifier, this.stack);
                    }
                    throw err;
                }
            };
            let service;
            if (noCache) {
                service = runFactory();
            }
            else {
                service = this.provider.cache.getOrInsert({
                    identifierName: identifier.identifierName,
                    variant,
                }, runFactory);
            }
            result.set(variant, service);
        }
        return result;
    }
    track(identifier) {
        const depth = this.depth + 1;
        if (depth >= 100) {
            throw new RecursionLimitError();
        }
        const circular = this.stack.find(i => i.identifierName === identifier.identifierName &&
            i.variant === identifier.variant);
        if (circular) {
            throw new CircularDependencyError([...this.stack, identifier]);
        }
        return new Resolver(this.provider, depth, [...this.stack, identifier]);
    }
    dispose() { }
}
export class BasicFrameworkProvider extends FrameworkProvider {
    constructor(collection, scope, parent) {
        super();
        this.scope = scope;
        this.parent = parent;
        this.cache = new ComponentCachePool();
        this.disposed = false;
        this.collection = collection;
        this.eventBus = new EventBus(this, this.parent?.eventBus);
    }
    getRaw(identifier, options) {
        const resolver = new Resolver(this);
        return resolver.getRaw(identifier, options);
    }
    getAllRaw(identifier, options) {
        const resolver = new Resolver(this);
        return resolver.getAllRaw(identifier, options);
    }
    dispose() {
        if (this.disposed) {
            return;
        }
        this.disposed = true;
        this.cache.dispose();
        this.eventBus.dispose();
    }
}
export class FrameworkStackProvider extends FrameworkProvider {
    constructor(providers) {
        if (providers.length === 0) {
            throw new Error('FrameworkStackProvider must have at least one provider');
        }
        super();
        this.stack = [...providers];
        // use the collection and eventBus from the first provider
        this.collection = this.stack[0].collection;
        this.eventBus = this.stack[0].eventBus;
    }
    get scope() {
        return this.stack[0]?.scope || [];
    }
    getRaw(identifier, options) {
        for (const provider of this.stack) {
            const service = provider.getRaw(identifier, {
                ...options,
                optional: true,
            });
            if (service) {
                return service;
            }
        }
        if (options?.optional) {
            return undefined;
        }
        throw new ComponentNotFoundError(identifier);
    }
    getAllRaw(identifier, options) {
        for (const provider of this.stack) {
            const components = provider.getAllRaw(identifier, options);
            if (components.size > 0) {
                return components;
            }
        }
        return new Map();
    }
    dispose() {
        // No need to handle the disposal of providers in the stack, as they are passed in externally
    }
}
//# sourceMappingURL=provider.js.map