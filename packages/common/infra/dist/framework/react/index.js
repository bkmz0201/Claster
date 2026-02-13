import { jsx as _jsx } from "react/jsx-runtime";
import React, { useContext, useMemo } from 'react';
import { Framework, FrameworkStackProvider } from '../core';
export const FrameworkProviderContext = React.createContext(Framework.EMPTY.provider());
export function useFramework() {
    return useContext(FrameworkProviderContext); // never null, because the default value
}
export function useService(identifier) {
    return useContext(FrameworkProviderContext).get(identifier);
}
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
export function useServices(identifiers) {
    const provider = useContext(FrameworkProviderContext);
    const services = {};
    for (const [key, value] of Object.entries(identifiers)) {
        services[key.charAt(0).toLowerCase() + key.slice(1)] = provider.get(value);
    }
    return services;
}
export function useServiceOptional(identifier) {
    return useContext(FrameworkProviderContext).getOptional(identifier);
}
export const FrameworkRoot = ({ framework, children, }) => {
    return (_jsx(FrameworkProviderContext.Provider, { value: framework, children: children }));
};
export const FrameworkScope = ({ scope, children, }) => {
    const provider = useContext(FrameworkProviderContext);
    const nextStack = useMemo(() => {
        if (!scope)
            return provider;
        // make sure the stack order is inside to outside
        return new FrameworkStackProvider([scope.framework, provider]);
    }, [scope, provider]);
    return (_jsx(FrameworkProviderContext.Provider, { value: nextStack, children: children }));
};
//# sourceMappingURL=index.js.map