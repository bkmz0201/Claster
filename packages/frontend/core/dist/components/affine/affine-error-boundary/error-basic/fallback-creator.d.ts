import type { FC } from 'react';
export interface FallbackProps<T = unknown> {
    error: T;
    resetError?: () => void;
}
export declare const ERROR_REFLECT_KEY: unique symbol;
export declare function createErrorFallback<T extends Error>(ErrorConstructor: abstract new (...args: any[]) => T, Component: FC<FallbackProps<T>>): FC<FallbackProps<T>>;
//# sourceMappingURL=fallback-creator.d.ts.map