import { jsx as _jsx } from "react/jsx-runtime";
import { useDropTarget } from '@affine/component';
import { useI18n } from '@affine/i18n';
import { EmptyNodeChildren } from '../../layouts/empty-node-children';
export const Empty = ({ onDrop, }) => {
    const { dropTargetRef } = useDropTarget(() => ({
        onDrop,
    }), [onDrop]);
    const t = useI18n();
    return (_jsx(EmptyNodeChildren, { ref: dropTargetRef, children: t['com.affine.rootAppSidebar.tags.no-doc']() }));
};
//# sourceMappingURL=empty.js.map