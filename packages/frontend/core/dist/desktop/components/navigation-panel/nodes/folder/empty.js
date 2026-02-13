import { jsx as _jsx } from "react/jsx-runtime";
import { useDropTarget, } from '@affine/component';
import { useI18n } from '@affine/i18n';
import { EmptyNodeChildren } from '../../layouts/empty-node-children';
import { draggedOverHighlight } from './empty.css';
export const FolderEmpty = ({ canDrop, onDrop, }) => {
    const { dropTargetRef } = useDropTarget(() => ({
        onDrop,
        canDrop,
    }), [onDrop, canDrop]);
    const t = useI18n();
    return (_jsx(EmptyNodeChildren, { ref: dropTargetRef, className: draggedOverHighlight, children: t['com.affine.rootAppSidebar.organize.empty-folder']() }));
};
//# sourceMappingURL=empty.js.map