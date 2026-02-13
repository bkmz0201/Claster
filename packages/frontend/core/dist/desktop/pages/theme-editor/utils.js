export const variableNameToParts = (name) => name.slice(9).split('-');
export const partsToVariableName = (parts) => `--affine-${parts.join('-')}`;
export const isColor = (value) => {
    return value.startsWith('#') || value.startsWith('rgb');
};
//# sourceMappingURL=utils.js.map