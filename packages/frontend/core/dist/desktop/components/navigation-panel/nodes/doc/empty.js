import { jsx as _jsx } from "react/jsx-runtime";
import { useDropTarget } from '@affine/component';
import { useI18n } from '@affine/i18n';
import { EmptyNodeChildren } from '../../layouts/empty-node-children';
export const Empty = ({ onDrop, noAccessible = false, }) => {
    const { dropTargetRef } = useDropTarget(() => ({
        onDrop,
    }), [onDrop]);
    const t = useI18n();
    return (_jsx(EmptyNodeChildren, { ref: dropTargetRef, children: noAccessible
            ? t['com.affine.share-menu.option.permission.no-access']()
            : t['com.affine.rootAppSidebar.docs.no-subdoc']() }));
};
//# sourceMappingURL=empty.js.map