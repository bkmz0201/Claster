import { jsx as _jsx } from "react/jsx-runtime";
import { ConfirmModal, MenuItem } from '@affine/component';
import { useI18n } from '@affine/i18n';
import { DeleteIcon } from '@blocksuite/icons/rc';
export const MoveToTrash = (props) => {
    const t = useI18n();
    return (_jsx(MenuItem, { prefixIcon: _jsx(DeleteIcon, {}), type: "danger", ...props, children: t['com.affine.moveToTrash.title']() }));
};
const MoveToTrashConfirm = ({ titles, ...confirmModalProps }) => {
    const t = useI18n();
    const multiple = titles.length > 1;
    const title = multiple
        ? t['com.affine.moveToTrash.confirmModal.title.multiple']({
            number: titles.length.toString(),
        })
        : t['com.affine.moveToTrash.confirmModal.title']();
    const description = multiple
        ? t['com.affine.moveToTrash.confirmModal.description.multiple']({
            number: titles.length.toString(),
        })
        : t['com.affine.moveToTrash.confirmModal.description']({
            title: titles[0] || t['Untitled'](),
        });
    return (_jsx(ConfirmModal, { title: title, description: description, cancelText: t['com.affine.confirmModal.button.cancel'](), confirmText: t.Delete(), confirmButtonOptions: {
            ['data-testid']: 'confirm-delete-page',
            variant: 'error',
        }, ...confirmModalProps }));
};
MoveToTrash.ConfirmModal = MoveToTrashConfirm;
//# sourceMappingURL=move-to-trash.js.map