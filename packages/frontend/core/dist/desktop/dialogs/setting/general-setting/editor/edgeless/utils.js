export function getFrameBlock(doc) {
    const blocks = doc.getBlocksByFlavour('affine:frame');
    return blocks.length !== 0 ? blocks[0].model : null;
}
//# sourceMappingURL=utils.js.map