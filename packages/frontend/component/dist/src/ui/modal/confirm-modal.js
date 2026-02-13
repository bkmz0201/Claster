import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DialogTrigger } from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { createContext, useCallback, useContext, useState } from 'react';
import { Button } from '../button';
import { desktopStyles, mobileStyles } from './confirm-modal.css';
import { Modal } from './modal';
const styles = BUILD_CONFIG.isMobileEdition ? mobileStyles : desktopStyles;
export const ConfirmModal = ({ children, confirmButtonOptions, customConfirmButton: CustomConfirmButton, 
// FIXME: we need i18n
confirmText, cancelText = 'Cancel', cancelButtonOptions, reverseFooter, onConfirm, onCancel, width = 480, autoFocusConfirm = true, headerClassName, descriptionClassName, childrenContentClassName, contentOptions, rowFooter = false, ...props }) => {
    const onConfirmClick = useCallback(() => {
        Promise.resolve(onConfirm?.()).catch(err => {
            console.error(err);
        });
    }, [onConfirm]);
    const handleCancel = useCallback(() => {
        if (onCancel === false) {
            return;
        }
        onCancel?.();
    }, [onCancel]);
    return (_jsxs(Modal, { contentOptions: {
            ...contentOptions,
            className: clsx(styles.container, contentOptions?.className),
            onPointerDownOutside: e => {
                e.stopPropagation();
                handleCancel();
            },
        }, width: width, closeButtonOptions: {
            onClick: handleCancel,
        }, headerClassName: clsx(styles.header, headerClassName), descriptionClassName: clsx(styles.description, descriptionClassName), ...props, children: [children ? (_jsx("div", { className: clsx(styles.content, childrenContentClassName), children: children })) : null, _jsxs("div", { className: clsx(styles.footer, {
                    modalFooterWithChildren: !!children,
                    reverse: reverseFooter && !rowFooter,
                    row: rowFooter,
                    rowReverse: reverseFooter && rowFooter,
                }), children: [onCancel !== false ? (_jsx(DialogTrigger, { asChild: true, children: _jsx(Button, { className: clsx(styles.action, {
                                row: rowFooter,
                            }), onClick: handleCancel, "data-testid": "confirm-modal-cancel", ...cancelButtonOptions, variant: cancelButtonOptions?.variant
                                ? cancelButtonOptions.variant
                                : 'secondary', children: cancelText }) })) : null, CustomConfirmButton ? (_jsx(CustomConfirmButton, { "data-testid": "confirm-modal-confirm" })) : (_jsx(Button, { className: clsx(styles.action, {
                            row: rowFooter,
                        }), onClick: onConfirmClick, "data-testid": "confirm-modal-confirm", autoFocus: autoFocusConfirm, ...confirmButtonOptions, children: confirmText }))] })] }));
};
const ConfirmModalContext = createContext({
    modalProps: { open: false },
    openConfirmModal: () => { },
    closeConfirmModal: () => { },
});
export const ConfirmModalProvider = ({ children }) => {
    const [modalProps, setModalProps] = useState({
        open: false,
    });
    const setLoading = useCallback((value) => {
        setModalProps(prev => ({
            ...prev,
            confirmButtonOptions: {
                ...prev.confirmButtonOptions,
                loading: value,
            },
        }));
    }, []);
    const closeConfirmModal = useCallback(() => {
        setModalProps({ open: false });
    }, []);
    const openConfirmModal = useCallback((props, options) => {
        const { autoClose = true, onSuccess } = options ?? {};
        if (!props) {
            setModalProps({ open: true });
            return;
        }
        const { onConfirm: _onConfirm, ...otherProps } = props;
        const onConfirm = () => {
            setLoading(true);
            return Promise.resolve(_onConfirm?.())
                .then(() => onSuccess?.())
                .catch(console.error)
                .finally(() => setLoading(false))
                .finally(() => autoClose && closeConfirmModal());
        };
        setModalProps({ ...otherProps, onConfirm, open: true });
    }, [closeConfirmModal, setLoading]);
    const onOpenChange = useCallback((open) => {
        modalProps.onOpenChange?.(open);
        setModalProps(props => ({ ...props, open }));
    }, [modalProps]);
    return (_jsxs(ConfirmModalContext.Provider, { value: { openConfirmModal, closeConfirmModal, modalProps }, children: [children, _jsx(ConfirmModal, { ...modalProps, onOpenChange: onOpenChange })] }));
};
export const useConfirmModal = () => {
    const context = useContext(ConfirmModalContext);
    if (!context) {
        throw new Error('useConfirmModal must be used within a ConfirmModalProvider');
    }
    return {
        openConfirmModal: context.openConfirmModal,
        closeConfirmModal: context.closeConfirmModal,
    };
};
//# sourceMappingURL=confirm-modal.js.map