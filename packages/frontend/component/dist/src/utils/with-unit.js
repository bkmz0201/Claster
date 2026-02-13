/**
 * get value with unit
 */
export const withUnit = (value, unit) => {
    if (typeof value === 'number') {
        return `${value}${unit}`;
    }
    if (/^\d+(\.\d+)?$/.test(value)) {
        return `${value}${unit}`;
    }
    return value;
};
//# sourceMappingURL=with-unit.js.map