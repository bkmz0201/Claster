import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input } from '@affine/component';
import { ConfirmModal } from '@affine/component/ui/modal';
import { useWorkspaceInfo } from '@affine/core/components/hooks/use-workspace-info';
import { UNTITLED_WORKSPACE_NAME } from '@affine/env/constant';
import { Trans, useI18n } from '@affine/i18n';
import { useCallback, useState } from 'react';
import * as styles from './style.css';
export const WorkspaceDeleteModal = ({ workspaceMetadata, ...props }) => {
    const { onConfirm } = props;
    const [deleteStr, setDeleteStr] = useState('');
    const info = useWorkspaceInfo(workspaceMetadata);
    const workspaceName = info?.name ?? UNTITLED_WORKSPACE_NAME;
    const allowDelete = deleteStr === workspaceName;
    const t = useI18n();
    const handleOnEnter = useCallback(() => {
        if (allowDelete) {
            return onConfirm?.();
        }
    }, [allowDelete, onConfirm]);
    return (_jsxs(ConfirmModal, { title: `${t['com.affine.workspaceDelete.title']()}?`, cancelText: t['com.affine.workspaceDelete.button.cancel'](), confirmText: t['com.affine.workspaceDelete.button.delete'](), confirmButtonOptions: {
            variant: 'error',
            disabled: !allowDelete,
            'data-testid': 'delete-workspace-confirm-button',
        }, ...props, children: [workspaceMetadata.flavour === 'local' ? (_jsxs(Trans, { i18nKey: "com.affine.workspaceDelete.description", children: ["Deleting (", _jsx("span", { className: styles.workspaceName, children: { workspace: workspaceName } }), ") cannot be undone, please proceed with caution. All contents will be lost."] })) : (_jsxs(Trans, { i18nKey: "com.affine.workspaceDelete.description2", children: ["Deleting (", _jsx("span", { className: styles.workspaceName, children: { workspace: workspaceName } }), ") will delete both local and cloud data, this operation cannot be undone, please proceed with caution."] })), _jsx("div", { className: styles.inputContent, children: _jsx(Input, { autoFocus: true, onChange: setDeleteStr, "data-testid": "delete-workspace-input", onEnter: handleOnEnter, placeholder: t['com.affine.workspaceDelete.placeholder'](), size: "large" }) })] }));
};
//# sourceMappingURL=index.js.map