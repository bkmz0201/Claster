import { Component } from './component';
export declare class Scope<Props = {}> extends Component<Props> {
    readonly __injectable = true;
    get collection(): import("..").Framework;
    get scope(): import("../types").FrameworkScopeStack;
    get get(): <T>(identifier: import("..").GeneralIdentifier<T>, options?: import("..").ResolveOptions) => T;
    get getAll(): <T>(identifier: import("..").GeneralIdentifier<T>, options?: import("..").ResolveOptions) => Map<string, T>;
    get getOptional(): <T>(identifier: import("..").GeneralIdentifier<T>, options?: import("..").ResolveOptions) => T | undefined;
    get createEntity(): <T extends import("./entity").Entity<any>, Props_1 extends T extends Component<infer P> ? P : never>(identifier: import("..").GeneralIdentifier<T>, ...[props]: Props_1 extends Record<string, never> ? [] : [Props_1]) => T;
    get createScope(): <T extends Scope<any>, Props_1 extends T extends Component<infer P> ? P : never>(root: import("..").GeneralIdentifier<T>, ...[props]: Props_1 extends Record<string, never> ? [] : [Props_1]) => T;
    get emitEvent(): <T>(event: import("..").FrameworkEvent<T>, payload: T) => void;
    dispose(): void;
}
//# sourceMappingURL=scope.d.ts.map