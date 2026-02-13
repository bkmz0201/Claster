import React from 'react';
import type { FrameworkProvider, Scope, Service } from '../core';
import type { GeneralIdentifier, IdentifierType, Type } from '../core/types';
export declare const FrameworkProviderContext: React.Context<FrameworkProvider>;
export declare function useFramework(): FrameworkProvider;
export declare function useService<T>(identifier: GeneralIdentifier<T>): T;
/**
 * Hook to get services from the current framework stack.
 *
 * Automatically converts the service name to camelCase.
 *
 * @example
 * ```ts
 * const { authService, userService } = useServices({ AuthService, UserService });
 * ```
 */
export declare function useServices<const T extends {
    [key in string]: GeneralIdentifier<Service>;
}>(identifiers: T): keyof T extends string ? {
    [key in Uncapitalize<keyof T>]: IdentifierType<T[Capitalize<key>]>;
} : never;
export declare function useServiceOptional<T extends Service>(identifier: Type<T>): T | undefined;
export declare const FrameworkRoot: ({ framework, children, }: React.PropsWithChildren<{
    framework: FrameworkProvider;
}>) => import("react/jsx-runtime").JSX.Element;
export declare const FrameworkScope: ({ scope, children, }: React.PropsWithChildren<{
    scope?: Scope;
}>) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map