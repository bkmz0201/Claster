import type { Entity } from './components/entity';
import type { Scope } from './components/scope';
import type { Service } from './components/service';
import type { Store } from './components/store';
import type { FrameworkProvider } from './provider';
import type { ComponentFactory, ComponentVariant, FrameworkScopeStack, GeneralIdentifier, Identifier, IdentifierType, IdentifierValue, Type, TypesToDeps } from './types';
export declare class Framework {
    private readonly components;
    /**
     * Create an empty framework.
     *
     * same as `new Framework()`
     */
    static get EMPTY(): Framework;
    /**
     * The number of components in the framework.
     */
    get componentCount(): number;
    /**
     * @see {@link FrameworkEditor.service}
     */
    get service(): <Arg1 extends Type<Service>, Arg2 extends ServiceType | Deps | ComponentFactory<ServiceType>, ServiceType = IdentifierType<Arg1>, Deps = Arg1 extends Type<ServiceType> ? TypesToDeps<ConstructorParameters<Arg1>> : []>(service: Arg1, ...[arg2]: Arg2 extends [] ? [] : [Arg2]) => FrameworkEditor;
    /**
     * @see {@link FrameworkEditor.impl}
     */
    get impl(): <Arg1 extends Identifier<any>, Arg2 extends Trait | Type<Trait> | ComponentFactory<Trait>, Arg3 extends Deps, Trait = IdentifierType<Arg1>, Deps = Arg2 extends Type<Trait> ? TypesToDeps<ConstructorParameters<Arg2>> : []>(identifier: Arg1, arg2: Arg2, ...[arg3]: Arg3 extends [] ? [] : [Arg3]) => FrameworkEditor;
    /**
     * @see {@link FrameworkEditor.entity}
     */
    get entity(): <Arg1 extends Type<Entity<any>>, Arg2 extends Deps | ComponentFactory<EntityType>, EntityType = IdentifierType<Arg1>, Deps = Arg1 extends Type<EntityType> ? TypesToDeps<ConstructorParameters<Arg1>> : []>(entity: Arg1, ...[arg2]: Arg2 extends [] ? [] : [Arg2]) => FrameworkEditor;
    /**
     * @see {@link FrameworkEditor.scope}
     */
    get scope(): (scope: Type<Scope<any>>) => FrameworkEditor;
    /**
     * @see {@link FrameworkEditor.override}
     */
    get override(): <Arg1 extends Identifier<any>, Arg2 extends Trait | Type<Trait> | ComponentFactory<Trait>, Arg3 extends Deps, Trait = IdentifierType<Arg1>, Deps = Arg2 extends Type<Trait> ? TypesToDeps<ConstructorParameters<Arg2>> : []>(identifier: Arg1, arg2: Arg2, ...[arg3]: Arg3 extends [] ? [] : [Arg3]) => FrameworkEditor;
    /**
     * @see {@link FrameworkEditor.store}
     */
    get store(): <Arg1 extends Type<Store>, Arg2 extends StoreType | Deps | ComponentFactory<StoreType>, StoreType = IdentifierType<Arg1>, Deps = Arg1 extends Type<StoreType> ? TypesToDeps<ConstructorParameters<Arg1>> : []>(store: Arg1, ...[arg2]: Arg2 extends [] ? [] : [Arg2]) => FrameworkEditor;
    /**
     * @internal Use {@link impl} instead.
     */
    addValue<T>(identifier: GeneralIdentifier<T>, value: T, { scope, override, }?: {
        scope?: FrameworkScopeStack;
        override?: boolean;
    }): void;
    /**
     * @internal Use {@link impl} instead.
     */
    addFactory<T>(identifier: GeneralIdentifier<T>, factory: ComponentFactory<T>, { scope, override, }?: {
        scope?: FrameworkScopeStack;
        override?: boolean;
    }): void;
    remove(identifier: IdentifierValue, scope?: FrameworkScopeStack): void;
    /**
     * Create a service provider from the collection.
     *
     * @example
     * ```ts
     * provider() // create a service provider for root scope
     * provider(ScopeA, parentProvider) // create a service provider for scope A
     * ```
     *
     * @param scope The scope of the service provider, default to the root scope.
     * @param parent The parent service provider, it is required if the scope is not the root scope.
     */
    provider(scope?: FrameworkScopeStack, parent?: FrameworkProvider | null): FrameworkProvider;
    /**
     * @internal
     */
    getFactory(identifier: IdentifierValue, scope?: FrameworkScopeStack): ComponentFactory | undefined;
    /**
     * @internal
     */
    getFactoryAll(identifier: IdentifierValue, scope?: FrameworkScopeStack): Map<ComponentVariant, ComponentFactory>;
    /**
     * Clone the entire service collection.
     *
     * This method is quite cheap as it only clones the references.
     *
     * @returns A new service collection with the same services.
     */
    clone(): Framework;
}
/**
 * A helper class to edit a framework.
 */
declare class FrameworkEditor {
    private readonly collection;
    private currentScopeStack;
    constructor(collection: Framework);
    /**
     * Add a service to the framework.
     *
     * @see {@link Framework}
     *
     * @example
     * ```ts
     * service(ServiceClass, [dependencies, ...])
     * ```
     */
    service: <Arg1 extends Type<Service>, Arg2 extends Deps | ComponentFactory<ServiceType> | ServiceType, ServiceType = IdentifierType<Arg1>, Deps = Arg1 extends Type<ServiceType> ? TypesToDeps<ConstructorParameters<Arg1>> : []>(service: Arg1, ...[arg2]: Arg2 extends [] ? [] : [Arg2]) => this;
    /**
     * Add a store to the framework.
     *
     * @see {@link Framework}
     *
     * @example
     * ```ts
     * store(StoreClass, [dependencies, ...])
     * ```
     */
    store: <Arg1 extends Type<Store>, Arg2 extends Deps | ComponentFactory<StoreType> | StoreType, StoreType = IdentifierType<Arg1>, Deps = Arg1 extends Type<StoreType> ? TypesToDeps<ConstructorParameters<Arg1>> : []>(store: Arg1, ...[arg2]: Arg2 extends [] ? [] : [Arg2]) => this;
    /**
     * Add an entity to the framework.
     */
    entity: <Arg1 extends Type<Entity<any>>, Arg2 extends Deps | ComponentFactory<EntityType>, EntityType = IdentifierType<Arg1>, Deps = Arg1 extends Type<EntityType> ? TypesToDeps<ConstructorParameters<Arg1>> : []>(entity: Arg1, ...[arg2]: Arg2 extends [] ? [] : [Arg2]) => this;
    /**
     * Add an implementation for identifier to the collection.
     *
     * @see {@link Framework}
     *
     * @example
     * ```ts
     * addImpl(Identifier, Class, [dependencies, ...])
     * or
     * addImpl(Identifier, Instance)
     * or
     * addImpl(Identifier, Factory)
     * ```
     */
    impl: <Arg1 extends Identifier<any>, Arg2 extends Type<Trait> | ComponentFactory<Trait> | Trait, Arg3 extends Deps, Trait = IdentifierType<Arg1>, Deps = Arg2 extends Type<Trait> ? TypesToDeps<ConstructorParameters<Arg2>> : []>(identifier: Arg1, arg2: Arg2, ...[arg3]: Arg3 extends [] ? [] : [Arg3]) => this;
    /**
     * same as {@link impl} but this method will override the component if it exists.
     *
     * @see {@link Framework}
     *
     * @example
     * ```ts
     * override(Identifier, Class, [dependencies, ...])
     * or
     * override(Identifier, Instance)
     * or
     * override(Identifier, Factory)
     * ```
     */
    override: <Arg1 extends Identifier<any>, Arg2 extends Type<Trait> | ComponentFactory<Trait> | Trait, Arg3 extends Deps, Trait = IdentifierType<Arg1>, Deps = Arg2 extends Type<Trait> ? TypesToDeps<ConstructorParameters<Arg2>> : []>(identifier: Arg1, arg2: Arg2, ...[arg3]: Arg3 extends [] ? [] : [Arg3]) => this;
    /**
     * Set the scope for the service registered subsequently
     *
     * @example
     *
     * ```ts
     * const ScopeA = createScope('a');
     *
     * services.scope(ScopeA).add(XXXService, ...);
     * ```
     */
    scope: (scope: Type<Scope<any>>) => this;
}
export {};
//# sourceMappingURL=framework.d.ts.map