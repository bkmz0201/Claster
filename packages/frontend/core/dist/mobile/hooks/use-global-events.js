import { useEffect } from 'react';
const _handlesMap = new Map();
function initGlobalEvent(name) {
    const prev = _handlesMap.get(name);
    if (!prev) {
        const handlers = [];
        window.addEventListener(name, e => {
            handlers.forEach(handler => {
                handler(e);
            });
        });
        _handlesMap.set(name, handlers);
        return handlers;
    }
    return prev;
}
function addListener(name, handler) {
    initGlobalEvent(name).push(handler);
}
function removeListener(name, handler) {
    const handlers = _handlesMap.get(name);
    const idx = handlers.indexOf(handler);
    if (idx !== -1) {
        handlers.splice(idx, 1);
    }
}
export const useGlobalEvent = (name, handler) => {
    useEffect(() => {
        addListener(name, handler);
        return () => {
            removeListener(name, handler);
        };
    }, [handler, name]);
};
//# sourceMappingURL=use-global-events.js.map