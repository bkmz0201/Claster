import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ConfirmModal } from '@affine/component';
import { useNavigateHelper } from '@affine/core/components/hooks/use-navigate-helper';
import { useI18n } from '@affine/i18n';
import { useCallback } from 'react';
import * as styles from './index.css';
export const DeletedAccountDialog = ({ close, }) => {
    const t = useI18n();
    const { jumpToIndex } = useNavigateHelper();
    const callback = useCallback(() => {
        jumpToIndex();
    }, [jumpToIndex]);
    const handleOpenChange = useCallback(() => {
        callback();
        close();
    }, [callback, close]);
    return (_jsx(ConfirmModal, { open: true, persistent: true, title: t['com.affine.setting.account.delete.success-title'](), description: _jsxs("span", { className: styles.successDeleteAccountContainer, children: [t['com.affine.setting.account.delete.success-description-1'](), _jsx("span", { children: t['com.affine.setting.account.delete.success-description-2']() })] }), confirmText: t['Confirm'](), onOpenChange: handleOpenChange, onConfirm: handleOpenChange, confirmButtonOptions: {
            variant: 'primary',
        }, cancelButtonOptions: {
            style: {
                display: 'none',
            },
        } }));
};
//# sourceMappingURL=index.js.map