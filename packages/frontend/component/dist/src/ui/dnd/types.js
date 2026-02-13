export function draggableGet(get) {
    if (get === undefined) {
        return undefined;
    }
    return ((args) => typeof get === 'function' ? get(args) : get);
}
//# sourceMappingURL=types.js.map