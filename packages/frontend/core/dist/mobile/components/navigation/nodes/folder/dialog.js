import { jsx as _jsx } from "react/jsx-runtime";
import { useI18n } from '@affine/i18n';
import { EditIcon } from '@blocksuite/icons/rc';
import { RenameDialog, RenameSubMenu } from '../../../rename';
export const FolderCreateTip = ({ input, parentName, }) => {
    const t = useI18n();
    const parent = parentName
        ? parentName
        : t['com.affine.m.explorer.folder.root']();
    const tip = input
        ? t['com.affine.m.explorer.folder.new-tip-not-empty']({
            value: input,
            parent,
        })
        : t['com.affine.m.explorer.folder.new-tip-empty']({ parent });
    return tip;
};
export const FolderRenameSubMenu = ({ title: propsTitle, icon: propsIcon, text: propsText, ...props }) => {
    const t = useI18n();
    const title = propsTitle || t['com.affine.m.explorer.folder.rename']();
    const icon = propsIcon || _jsx(EditIcon, {});
    const text = propsText || title;
    return _jsx(RenameSubMenu, { title: title, icon: icon, text: text, ...props });
};
export const FolderRenameDialog = ({ title: propsTitle, confirmText: propsConfirmText, ...props }) => {
    const t = useI18n();
    const title = propsTitle || t['com.affine.m.explorer.folder.new-dialog-title']();
    const confirmText = propsConfirmText || t['com.affine.m.explorer.folder.rename-confirm']();
    return _jsx(RenameDialog, { title: title, confirmText: confirmText, ...props });
};
//# sourceMappingURL=dialog.js.map