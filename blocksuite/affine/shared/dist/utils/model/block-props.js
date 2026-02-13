export function getBlockProps(model) {
    const keys = model.keys;
    return Object.fromEntries(keys.map(key => [key, model.props[key]]));
}
//# sourceMappingURL=block-props.js.map