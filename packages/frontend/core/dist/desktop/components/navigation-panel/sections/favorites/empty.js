import { jsx as _jsx } from "react/jsx-runtime";
import { Skeleton, useDropTarget, } from '@affine/component';
import { useI18n } from '@affine/i18n';
import { FavoriteIcon } from '@blocksuite/icons/rc';
import { NavigationPanelEmptySection } from '../../layouts/empty-section';
import { DropEffect } from '../../tree';
import { favoriteRootCanDrop, favoriteRootDropEffect } from './dnd';
const RootEmptyLoading = () => {
    return _jsx(Skeleton, {});
};
const RootEmptyReady = ({ onDrop }) => {
    const t = useI18n();
    const { dropTargetRef, draggedOverDraggable, draggedOverPosition } = useDropTarget(() => ({
        data: {
            at: 'navigation-panel:favorite:root',
        },
        onDrop: onDrop,
        canDrop: favoriteRootCanDrop,
        allowExternal: true,
    }), [onDrop]);
    return (_jsx(NavigationPanelEmptySection, { ref: dropTargetRef, icon: FavoriteIcon, message: t['com.affine.rootAppSidebar.favorites.empty'](), messageTestId: "slider-bar-favorites-empty-message", children: draggedOverDraggable && (_jsx(DropEffect, { position: draggedOverPosition, dropEffect: favoriteRootDropEffect({
                source: draggedOverDraggable,
                treeInstruction: null,
            }) })) }));
};
export const RootEmpty = ({ isLoading, ...props }) => {
    return isLoading ? _jsx(RootEmptyLoading, {}) : _jsx(RootEmptyReady, { ...props });
};
//# sourceMappingURL=empty.js.map