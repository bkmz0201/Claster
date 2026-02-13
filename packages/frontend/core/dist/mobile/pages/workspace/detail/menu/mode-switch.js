import { jsx as _jsx } from "react/jsx-runtime";
import { RadioGroup, useMobileMenuController, } from '@affine/component';
import { EditorService } from '@affine/core/modules/editor';
import track from '@affine/track';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback } from 'react';
import * as styles from './mode-switch.css';
const EdgelessRadioItem = {
    value: 'edgeless',
    label: 'Edgeless',
    testId: 'switch-edgeless-mode-button',
};
const PageRadioItem = {
    value: 'page',
    label: 'Page',
    testId: 'switch-page-mode-button',
};
const items = [PageRadioItem, EdgelessRadioItem];
export const EditorModeSwitch = () => {
    const { close } = useMobileMenuController();
    const editor = useService(EditorService).editor;
    const trash = useLiveData(editor.doc.trash$);
    const isSharedMode = editor.isSharedMode;
    const currentMode = useLiveData(editor.mode$);
    const onToggle = useCallback((mode) => {
        editor.setMode(mode);
        editor.setSelector(undefined);
        track.$.header.actions.switchPageMode({ mode });
        close();
    }, [close, editor]);
    if (trash || isSharedMode) {
        return null;
    }
    return (_jsx("div", { className: styles.radioWrapper, children: _jsx(RadioGroup, { itemHeight: 28, width: "100%", borderRadius: 8, padding: 2, gap: 4, value: currentMode, items: items, onChange: onToggle }) }));
};
//# sourceMappingURL=mode-switch.js.map