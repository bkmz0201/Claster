const setScope = (scope) => document.body.setAttribute(`data-${scope}`, '');
const rmScope = (scope) => document.body.removeAttribute(`data-${scope}`);
/**
 * A wrapper around `document.startViewTransition` that adds a scope attribute to the body element.
 */
export function startScopedViewTransition(scope, cb, options) {
    if (typeof document === 'undefined')
        return;
    if (typeof document.startViewTransition === 'function') {
        const scopes = Array.isArray(scope) ? scope : [scope];
        const timeout = options?.timeout ?? 2000;
        scopes.forEach(setScope);
        const vt = document.startViewTransition(cb);
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('View transition timeout')), timeout);
        });
        Promise.race([vt.finished, timeoutPromise])
            .catch(err => console.error(`View transition[${scope}] failed: ${err}`))
            .finally(() => scopes.forEach(rmScope));
    }
    else {
        cb()?.catch(console.error);
    }
}
export function vtScopeSelector(scope) {
    return `[data-${scope}]`;
}
//# sourceMappingURL=view-transition.js.map