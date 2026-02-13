import { jsx as _jsx } from "react/jsx-runtime";
import { OutlinePanel } from '@blocksuite/affine/fragments/outline';
import { useCallback, useEffect, useRef } from 'react';
import * as styles from './outline.css';
// A wrapper for TOCNotesPanel
export const EditorOutlinePanel = ({ editor, }) => {
    const outlinePanelRef = useRef(null);
    const onRefChange = useCallback((container) => {
        if (container && editor && container.children.length === 0) {
            outlinePanelRef.current = new OutlinePanel();
            outlinePanelRef.current.editor = editor;
            outlinePanelRef.current.fitPadding = [20, 20, 20, 20];
            container.append(outlinePanelRef.current);
        }
    }, [editor]);
    useEffect(() => {
        if (editor && outlinePanelRef.current) {
            outlinePanelRef.current.editor = editor;
        }
    }, [editor]);
    return _jsx("div", { className: styles.root, ref: onRefChange });
};
//# sourceMappingURL=outline.js.map