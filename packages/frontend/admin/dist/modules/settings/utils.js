export const isEqual = (a, b) => {
    if (typeof a !== typeof b)
        return false;
    if (typeof a === 'object')
        return JSON.stringify(a) === JSON.stringify(b);
    return a === b;
};
//# sourceMappingURL=utils.js.map