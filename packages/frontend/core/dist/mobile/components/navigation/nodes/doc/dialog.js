import { jsx as _jsx } from "react/jsx-runtime";
import { useI18n } from '@affine/i18n';
import { RenameSubMenu } from '../../../rename';
export const DocRenameSubMenu = ({ title, text, ...props }) => {
    const t = useI18n();
    return (_jsx(RenameSubMenu, { title: title || t['com.affine.m.explorer.doc.rename'](), text: text || t['com.affine.m.explorer.doc.rename'](), ...props }));
};
//# sourceMappingURL=dialog.js.map