import { jsx as _jsx } from "react/jsx-runtime";
import { RadioGroup } from '@affine/component';
import { registerAffineCommand } from '@affine/core/commands';
import { EditorService } from '@affine/core/modules/editor';
import { ViewService, WorkbenchService } from '@affine/core/modules/workbench';
import { useI18n } from '@affine/i18n';
import { track } from '@affine/track';
import { EdgelessIcon, PageIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService, useServiceOptional, } from '@toeverything/infra';
import { useCallback, useEffect, useMemo } from 'react';
import { switchItem } from './style.css';
import { EdgelessSwitchItem, PageSwitchItem } from './switch-items';
const EdgelessRadioItem = {
    value: 'edgeless',
    label: _jsx(EdgelessSwitchItem, {}),
    testId: 'switch-edgeless-mode-button',
    className: switchItem,
};
const PageRadioItem = {
    value: 'page',
    label: _jsx(PageSwitchItem, {}),
    testId: 'switch-page-mode-button',
    className: switchItem,
};
export const EditorModeSwitch = () => {
    const t = useI18n();
    const editor = useService(EditorService).editor;
    const trash = useLiveData(editor.doc.trash$);
    const isSharedMode = editor.isSharedMode;
    const currentMode = useLiveData(editor.mode$);
    const view = useServiceOptional(ViewService)?.view;
    const workbench = useServiceOptional(WorkbenchService)?.workbench;
    const activeView = useLiveData(workbench?.activeView$);
    const isActiveView = activeView?.id && activeView?.id === view?.id;
    const togglePage = useCallback(() => {
        if (currentMode === 'page' || isSharedMode || trash)
            return;
        editor.setMode('page');
        editor.setSelector(undefined);
        track.$.header.actions.switchPageMode({ mode: 'page' });
    }, [currentMode, editor, isSharedMode, trash]);
    const toggleEdgeless = useCallback(() => {
        if (currentMode === 'edgeless' || isSharedMode || trash)
            return;
        editor.setMode('edgeless');
        editor.setSelector(undefined);
        track.$.header.actions.switchPageMode({ mode: 'edgeless' });
    }, [currentMode, editor, isSharedMode, trash]);
    const onModeChange = useCallback((mode) => {
        mode === 'page' ? togglePage() : toggleEdgeless();
    }, [toggleEdgeless, togglePage]);
    const shouldHide = useCallback((mode) => (trash || isSharedMode) && currentMode !== mode, [currentMode, isSharedMode, trash]);
    useEffect(() => {
        if (trash || isSharedMode || currentMode === undefined || !isActiveView)
            return;
        return registerAffineCommand({
            id: 'affine:doc-mode-switch',
            category: 'editor:page',
            label: currentMode === 'page'
                ? t['com.affine.cmdk.switch-to-edgeless']()
                : t['com.affine.cmdk.switch-to-page'](),
            icon: currentMode === 'page' ? _jsx(EdgelessIcon, {}) : _jsx(PageIcon, {}),
            keyBinding: {
                binding: 'Alt+KeyS',
                capture: true,
            },
            run: () => onModeChange(currentMode === 'edgeless' ? 'page' : 'edgeless'),
        });
    }, [currentMode, isActiveView, isSharedMode, onModeChange, t, trash]);
    return (_jsx(PureEditorModeSwitch, { mode: currentMode, setMode: onModeChange, hidePage: shouldHide('page'), hideEdgeless: shouldHide('edgeless') }));
};
export const PureEditorModeSwitch = ({ mode, setMode, hidePage, hideEdgeless, }) => {
    const items = useMemo(() => [
        ...(hidePage ? [] : [PageRadioItem]),
        ...(hideEdgeless ? [] : [EdgelessRadioItem]),
    ], [hideEdgeless, hidePage]);
    return (_jsx(RadioGroup, { iconMode: true, itemHeight: 24, borderRadius: 8, padding: 4, gap: 8, value: mode, items: items, onChange: setMode }));
};
//# sourceMappingURL=index.js.map