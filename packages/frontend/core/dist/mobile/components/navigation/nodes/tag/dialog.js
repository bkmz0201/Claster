import { jsx as _jsx } from "react/jsx-runtime";
import { useMobileMenuController } from '@affine/component';
import { TagService } from '@affine/core/modules/tag';
import { useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { createContext, useCallback, useContext, useMemo, useState, } from 'react';
import { RenameContent, RenameSubMenu } from '../../../rename';
import { RenameDialog } from '../../../rename/dialog';
import * as styles from './dialog.css';
const TagColorContext = createContext({
    color: '',
    setColor: () => { },
    colors: [],
    show: false,
    setShow: () => { },
});
const ColorPickerTrigger = () => {
    const { color, show, setShow } = useContext(TagColorContext);
    return (_jsx("div", { "data-testid": "tag-color-picker-trigger", className: styles.colorTrigger, style: { color }, "data-active": show, onClick: () => setShow(prev => !prev) }));
};
const ColorPickerSelect = () => {
    const { enableAnimation, colors, color: current, setColor, show, } = useContext(TagColorContext);
    if (!show && !enableAnimation)
        return null;
    return (_jsx("div", { "data-testid": "tag-color-picker-select", className: styles.colorsRow, "data-active": show, "data-enable-fold": enableAnimation || undefined, children: colors.map(color => (_jsx("div", { "aria-checked": color === current, onClick: () => setColor(color), className: styles.colorDot, style: { color }, "data-color": color }, color))) }));
};
const TagRenameContent = ({ initialColor, onConfirm, enableAnimation, ...props }) => {
    const tagService = useService(TagService);
    const colors = useMemo(() => {
        return tagService.tagColors.map(([_, value]) => value);
    }, [tagService.tagColors]);
    const [color, setColor] = useState(initialColor || tagService.randomTagColor());
    const [show, setShow] = useState(false);
    const handleConfirm = useCallback((name) => {
        onConfirm?.(name, color);
    }, [color, onConfirm]);
    return (_jsx(TagColorContext.Provider, { value: { colors, color, setColor, show, setShow, enableAnimation }, children: _jsx(RenameContent, { inputPrefixRenderer: ColorPickerTrigger, inputBelowRenderer: ColorPickerSelect, onConfirm: handleConfirm, ...props }) }));
};
export const TagRenameDialog = ({ title: propsTitle, confirmText: propsConfirmText, open, onOpenChange, ...props }) => {
    const t = useI18n();
    const title = propsTitle || t['com.affine.m.explorer.tag.new-dialog-title']();
    const confirmText = propsConfirmText || t['com.affine.m.explorer.tag.rename-confirm']();
    return (_jsx(RenameDialog, { open: open, onOpenChange: onOpenChange, inputPrefixRenderer: ColorPickerTrigger, title: title, confirmText: confirmText, children: _jsx(TagRenameContent, { ...props }) }));
};
export const TagRenameSubMenu = ({ tagId, title, icon, text, menuProps, onConfirm, }) => {
    const t = useI18n();
    const { close } = useMobileMenuController();
    const tagService = useService(TagService);
    const tagRecord = useLiveData(tagService.tagList.tagByTagId$(tagId));
    const tagName = useLiveData(tagRecord?.value$);
    const tagColor = useLiveData(tagRecord?.color$);
    const handleCloseAndConfirm = useCallback((name, color) => {
        close();
        onConfirm?.(name, color);
    }, [close, onConfirm]);
    return (_jsx(RenameSubMenu, { title: title ?? t['com.affine.m.explorer.tag.rename-menu-title'](), icon: icon, text: text, menuProps: menuProps, children: _jsx(TagRenameContent, { initialName: tagName, initialColor: tagColor, onConfirm: handleCloseAndConfirm }) }));
};
//# sourceMappingURL=dialog.js.map