import React, { lazy as reactLazy, Suspense, } from 'react';
export function lazy(factory, fallback) {
    const LazyComponent = reactLazy(() => factory().then(mod => {
        if ('default' in mod) {
            return { default: mod.default };
        }
        else {
            const components = Object.values(mod);
            if (components.length > 1) {
                console.warn('Lazy loaded module has more then one exports');
            }
            return {
                default: components[0],
            };
        }
    }));
    return function LazyRoute(props) {
        return React.createElement(Suspense, {
            fallback,
        }, React.createElement(LazyComponent, props));
    };
}
//# sourceMappingURL=lazy.js.map