export function ignoreFields(target, keys) {
    if (Array.isArray(target)) {
        return target.map((item) => ignoreFields(item, keys));
    }
    else if (typeof target === 'object' && target !== null) {
        return Object.keys(target).reduce((acc, key) => {
            if (keys.includes(key)) {
                acc[key] = '*';
            }
            else {
                acc[key] = ignoreFields(target[key], keys);
            }
            return acc;
        }, {});
    }
    return target;
}
export function ignoreSnapshotId(snapshot) {
    const ignored = ignoreFields(snapshot, ['id']);
    return JSON.stringify(ignored, null, 2);
}
//# sourceMappingURL=ignore.js.map