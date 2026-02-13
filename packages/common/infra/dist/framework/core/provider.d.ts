import type { Component } from './components/component';
import type { Entity } from './components/entity';
import type { Scope } from './components/scope';
import { EventBus, type FrameworkEvent } from './event';
import type { Framework } from './framework';
import type { ComponentVariant, FrameworkScopeStack, GeneralIdentifier, IdentifierValue } from './types';
export interface ResolveOptions {
    sameScope?: boolean;
    optional?: boolean;
    noCache?: boolean;
    props?: any;
}
export declare abstract class FrameworkProvider {
    abstract collection: Framework;
    abstract scope: FrameworkScopeStack;
    abstract getRaw(identifier: IdentifierValue, options?: ResolveOptions): any;
    abstract getAllRaw(identifier: IdentifierValue, options?: ResolveOptions): Map<ComponentVariant, any>;
    abstract dispose(): void;
    abstract eventBus: EventBus;
    get: <T>(identifier: GeneralIdentifier<T>, options?: ResolveOptions) => T;
    getAll: <T>(identifier: GeneralIdentifier<T>, options?: ResolveOptions) => Map<ComponentVariant, T>;
    getOptional: <T>(identifier: GeneralIdentifier<T>, options?: ResolveOptions) => T | undefined;
    createEntity: <T extends Entity<any>, Props extends T extends Component<infer P> ? P : never>(identifier: GeneralIdentifier<T>, ...[props]: Props extends Record<string, never> ? [] : [Props]) => T;
    createScope: <T extends Scope<any>, Props extends T extends Component<infer P> ? P : never>(root: GeneralIdentifier<T>, ...[props]: Props extends Record<string, never> ? [] : [Props]) => T;
    emitEvent: <T>(event: FrameworkEvent<T>, payload: T) => void;
    [Symbol.dispose](): void;
}
export declare class ComponentCachePool {
    cache: Map<string, Map<ComponentVariant, any>>;
    getOrInsert(identifier: IdentifierValue, insert: () => any): any;
    dispose(): void;
    [Symbol.dispose](): void;
}
export declare class BasicFrameworkProvider extends FrameworkProvider {
    readonly scope: string[];
    readonly parent: FrameworkProvider | null;
    readonly cache: ComponentCachePool;
    readonly collection: Framework;
    readonly eventBus: EventBus;
    disposed: boolean;
    constructor(collection: Framework, scope: string[], parent: FrameworkProvider | null);
    getRaw(identifier: IdentifierValue, options?: ResolveOptions): any;
    getAllRaw(identifier: IdentifierValue, options?: ResolveOptions): Map<ComponentVariant, any>;
    dispose(): void;
}
export declare class FrameworkStackProvider extends FrameworkProvider {
    readonly stack: FrameworkProvider[];
    readonly collection: Framework;
    readonly eventBus: EventBus;
    constructor(providers: FrameworkProvider[]);
    get scope(): FrameworkScopeStack;
    getRaw(identifier: IdentifierValue, options?: ResolveOptions): any;
    getAllRaw(identifier: IdentifierValue, options?: ResolveOptions): Map<ComponentVariant, any>;
    dispose(): void;
}
//# sourceMappingURL=provider.d.ts.map