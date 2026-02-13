import { jsx as _jsx } from "react/jsx-runtime";
import { OutlineViewer } from '@blocksuite/affine/fragments/outline';
import { useCallback, useRef } from 'react';
import * as styles from './outline-viewer.css';
export const EditorOutlineViewer = ({ editor, show, openOutlinePanel, }) => {
    const outlineViewerRef = useRef(null);
    const onRefChange = useCallback((container) => {
        if (container && editor) {
            if (outlineViewerRef.current) {
                outlineViewerRef.current.remove();
            }
            outlineViewerRef.current = new OutlineViewer();
            outlineViewerRef.current.editor = editor;
            outlineViewerRef.current.toggleOutlinePanel = openOutlinePanel ?? null;
            container.append(outlineViewerRef.current);
        }
    }, [editor, openOutlinePanel]);
    if (!editor || !show)
        return null;
    return _jsx("div", { className: styles.root, ref: onRefChange });
};
//# sourceMappingURL=index.js.map