export const ERROR_REFLECT_KEY = Symbol('ERROR_REFLECT_KEY');
export function createErrorFallback(ErrorConstructor, Component) {
    Reflect.set(Component, ERROR_REFLECT_KEY, ErrorConstructor);
    return Component;
}
//# sourceMappingURL=fallback-creator.js.map