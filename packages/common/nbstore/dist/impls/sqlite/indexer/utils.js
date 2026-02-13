export function getText(val) {
    if (Array.isArray(val)) {
        return JSON.stringify(val);
    }
    return val;
}
export function tryParseArrayField(text) {
    if (text.startsWith('[') && text.endsWith(']')) {
        try {
            const parsed = JSON.parse(text);
            if (Array.isArray(parsed)) {
                return parsed;
            }
        }
        catch { }
    }
    return null;
}
//# sourceMappingURL=utils.js.map