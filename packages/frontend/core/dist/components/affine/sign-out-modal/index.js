import { jsx as _jsx } from "react/jsx-runtime";
import { ConfirmModal } from '@affine/component/ui/modal';
import { useI18n } from '@affine/i18n';
import { useMemo } from 'react';
/**
 * @deprecated use `useSignOut` instead
 */
export const SignOutModal = ({ ...props }) => {
    const { title, description, cancelText, confirmText } = props;
    const t = useI18n();
    const defaultTexts = useMemo(() => {
        const getDefaultText = (key) => {
            return t[`com.affine.auth.sign-out.confirm-modal.${key}`]();
        };
        return {
            title: getDefaultText('title'),
            description: getDefaultText('description'),
            cancelText: getDefaultText('cancel'),
            children: getDefaultText('confirm'),
        };
    }, [t]);
    return (_jsx(ConfirmModal, { title: title ?? defaultTexts.title, description: description ?? defaultTexts.description, cancelText: cancelText ?? defaultTexts.cancelText, confirmText: confirmText ?? defaultTexts.children, confirmButtonOptions: {
            variant: 'error',
            ['data-testid']: 'confirm-sign-out-button',
        }, contentOptions: {
            ['data-testid']: 'confirm-sign-out-modal',
        }, ...props }));
};
//# sourceMappingURL=index.js.map