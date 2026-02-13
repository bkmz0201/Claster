import { ReferenceNodeConfigExtension } from '@blocksuite/affine/inlines/reference';
export function patchReferenceRenderer(reactToLit, reactRenderer) {
    const customContent = (reference) => {
        const node = reactRenderer(reference);
        return reactToLit(node, true);
    };
    return ReferenceNodeConfigExtension({
        customContent,
        hidePopup: BUILD_CONFIG.isMobileEdition,
    });
}
//# sourceMappingURL=reference-renderer.js.map