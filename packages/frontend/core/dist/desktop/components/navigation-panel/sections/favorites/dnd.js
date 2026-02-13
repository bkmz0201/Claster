import { isFavoriteSupportType } from '@affine/core/modules/favorite';
export const favoriteChildrenDropEffect = data => {
    if (data.treeInstruction?.type === 'reorder-above' ||
        data.treeInstruction?.type === 'reorder-below') {
        if (data.source.data.from?.at === 'navigation-panel:favorite:list' &&
            data.source.data.entity?.type &&
            isFavoriteSupportType(data.source.data.entity.type)) {
            return 'move';
        }
        else if (data.source.data.entity?.type &&
            isFavoriteSupportType(data.source.data.entity.type)) {
            return 'link';
        }
    }
    return; // not supported
};
export const favoriteRootDropEffect = data => {
    const sourceType = data.source.data.entity?.type;
    if (sourceType && isFavoriteSupportType(sourceType)) {
        return 'link';
    }
    return;
};
export const favoriteRootCanDrop = data => {
    return data.source.data.entity?.type
        ? isFavoriteSupportType(data.source.data.entity.type)
        : false;
};
export const favoriteChildrenCanDrop = 
// Same as favoriteRootCanDrop
data => favoriteRootCanDrop(data);
//# sourceMappingURL=dnd.js.map