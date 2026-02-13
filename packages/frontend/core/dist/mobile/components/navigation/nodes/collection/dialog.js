import { jsx as _jsx } from "react/jsx-runtime";
import { useI18n } from '@affine/i18n';
import { RenameDialog, RenameSubMenu, } from '../../../rename';
export const CollectionRenameSubMenu = ({ title, text, ...props }) => {
    const t = useI18n();
    return (_jsx(RenameSubMenu, { title: title || t['com.affine.m.explorer.collection.rename-menu-title'](), text: text || t['com.affine.m.explorer.collection.rename'](), ...props }));
};
const CollectionDesc = () => {
    const t = useI18n();
    return t['com.affine.collection.emptyCollectionDescription']();
};
export const CollectionRenameDialog = ({ title, confirmText, ...props }) => {
    return (_jsx(RenameDialog, { title: title, confirmText: confirmText, ...props, descRenderer: CollectionDesc }));
};
//# sourceMappingURL=dialog.js.map