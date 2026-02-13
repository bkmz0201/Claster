import { jsx as _jsx } from "react/jsx-runtime";
import { MobileMenuSub, useMobileMenuController } from '@affine/component';
import { useI18n } from '@affine/i18n';
import { EditIcon } from '@blocksuite/icons/rc';
import { useCallback } from 'react';
import { RenameContent } from './content';
export const RenameSubMenu = ({ initialName = '', title, icon, text, children, menuProps, onConfirm, disabled, ...props }) => {
    const t = useI18n();
    const { close } = useMobileMenuController();
    const handleRename = useCallback((value) => {
        onConfirm?.(value);
        close();
    }, [close, onConfirm]);
    const { triggerOptions, ...otherMenuProps } = menuProps ?? {};
    return (_jsx(MobileMenuSub, { triggerOptions: {
            prefixIcon: icon ?? _jsx(EditIcon, {}),
            suffixIcon: null,
            disabled,
            ...triggerOptions,
        }, items: children ?? (_jsx(RenameContent, { initialName: initialName, onConfirm: handleRename, ...props })), title: title, ...otherMenuProps, children: text ?? t['com.affine.m.explorer.folder.rename']() }));
};
//# sourceMappingURL=sub-menu.js.map