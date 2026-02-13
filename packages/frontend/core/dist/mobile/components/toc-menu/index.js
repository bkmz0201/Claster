import { jsx as _jsx } from "react/jsx-runtime";
import { MobileOutlineMenu } from '@blocksuite/affine/fragments/outline';
import { useCallback, useRef } from 'react';
export const MobileTocMenu = ({ editor }) => {
    const outlineMenuRef = useRef(null);
    const onRefChange = useCallback((container) => {
        if (container) {
            if (outlineMenuRef.current === null) {
                console.error('mobile outline menu should be initialized');
                return;
            }
            container.append(outlineMenuRef.current);
        }
    }, []);
    if (!editor)
        return;
    if (!outlineMenuRef.current) {
        outlineMenuRef.current = new MobileOutlineMenu();
    }
    if (outlineMenuRef.current.editor !== editor) {
        outlineMenuRef.current.editor = editor;
    }
    return _jsx("div", { ref: onRefChange });
};
//# sourceMappingURL=index.js.map