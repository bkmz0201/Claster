import type { FrameworkProvider } from './provider';
interface Context {
    provider?: FrameworkProvider;
    props?: any;
}
export declare const CONSTRUCTOR_CONTEXT: {
    current: Context;
};
/**
 * @internal
 */
export declare function withContext<T>(cb: () => T, context: Context): T;
export {};
//# sourceMappingURL=constructor-context.d.ts.map