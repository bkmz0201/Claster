import { jsx as _jsx } from "react/jsx-runtime";
import { AnimatedFolderIcon, Skeleton, useDropTarget, } from '@affine/component';
import { useI18n } from '@affine/i18n';
import { NavigationPanelEmptySection } from '../../layouts/empty-section';
import { DropEffect } from '../../tree';
import { organizeEmptyDropEffect, organizeEmptyRootCanDrop } from './dnd';
export const RootEmptyLoading = () => {
    return _jsx(Skeleton, {});
};
export const RootEmptyReady = ({ onClickCreate, onDrop, }) => {
    const t = useI18n();
    const { dropTargetRef, draggedOverDraggable, draggedOverPosition } = useDropTarget(() => ({
        data: { at: 'navigation-panel:organize:root' },
        onDrop,
        canDrop: organizeEmptyRootCanDrop,
    }), [onDrop]);
    return (_jsx(NavigationPanelEmptySection, { ref: dropTargetRef, icon: _jsx(AnimatedFolderIcon, { open: !!draggedOverDraggable }), message: t['com.affine.rootAppSidebar.organize.empty'](), messageTestId: "slider-bar-organize-empty-message", actionText: t['com.affine.rootAppSidebar.organize.empty.new-folders-button'](), onActionClick: onClickCreate, children: draggedOverDraggable && (_jsx(DropEffect, { position: draggedOverPosition, dropEffect: organizeEmptyDropEffect({
                source: draggedOverDraggable,
                treeInstruction: null,
            }) })) }));
};
export const RootEmpty = ({ isLoading, ...props }) => {
    return isLoading ? _jsx(RootEmptyLoading, {}) : _jsx(RootEmptyReady, { ...props });
};
//# sourceMappingURL=empty.js.map