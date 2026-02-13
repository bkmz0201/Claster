import { jsx as _jsx } from "react/jsx-runtime";
import { FramePanel } from '@blocksuite/affine/fragments/frame-panel';
import { useCallback, useEffect, useRef } from 'react';
import * as styles from './frame.css';
// A wrapper for FramePanel
export const EditorFramePanel = ({ editor }) => {
    const framePanelRef = useRef(null);
    const onRefChange = useCallback((container) => {
        if (editor && container && container.children.length === 0) {
            framePanelRef.current = new FramePanel();
            framePanelRef.current.host = editor;
            framePanelRef.current.fitPadding = [20, 20, 20, 20];
            container.append(framePanelRef.current);
        }
    }, [editor]);
    useEffect(() => {
        if (editor && framePanelRef.current) {
            framePanelRef.current.host = editor;
        }
    }, [editor]);
    return _jsx("div", { className: styles.root, ref: onRefChange });
};
//# sourceMappingURL=frame.js.map