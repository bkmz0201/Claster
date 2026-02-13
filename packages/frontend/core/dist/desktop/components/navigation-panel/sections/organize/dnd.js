import { isOrganizeSupportType } from '@affine/core/modules/organize/constants';
export const organizeChildrenDropEffect = data => {
    if (data.treeInstruction?.type === 'reorder-above' ||
        data.treeInstruction?.type === 'reorder-below') {
        if (data.source.data.entity?.type === 'folder') {
            return 'move';
        }
    }
    else {
        return; // not supported
    }
    return;
};
export const organizeEmptyDropEffect = data => {
    const sourceType = data.source.data.entity?.type;
    if (sourceType && isOrganizeSupportType(sourceType)) {
        return 'link';
    }
    return;
};
/**
 * Check whether the data can be dropped on the empty state of the organize section
 */
export const organizeEmptyRootCanDrop = data => {
    const type = data.source.data.entity?.type;
    return !!type && isOrganizeSupportType(type);
};
//# sourceMappingURL=dnd.js.map