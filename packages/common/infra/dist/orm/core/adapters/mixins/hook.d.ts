declare module '../../types' {
    interface TableOptions {
        hooks?: Hook<unknown>[];
    }
}
export interface Hook<T> {
    deserialize(dbVal: T): T;
}
export interface TableAdapterWithHook<T = unknown> extends Hook<T> {
}
export declare function HookAdapter(): ClassDecorator;
//# sourceMappingURL=hook.d.ts.map