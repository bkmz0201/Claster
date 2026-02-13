import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DialogTrigger } from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { createContext, useCallback, useContext, useState } from 'react';
import { Button } from '../button';
import Input, {} from '../input';
import { Modal } from './modal';
import { desktopStyles, mobileStyles } from './prompt-modal.css';
const styles = BUILD_CONFIG.isMobileEdition ? mobileStyles : desktopStyles;
export const PromptModal = ({ children, confirmButtonOptions, 
// FIXME: we need i18n
confirmText, cancelText = 'Cancel', cancelButtonOptions, reverseFooter, onConfirm, onCancel, label, required = true, inputOptions, defaultValue, width = 480, autoFocusConfirm = true, headerClassName, descriptionClassName, ...props }) => {
    const [value, setValue] = useState(defaultValue ?? '');
    const onConfirmClick = useCallback(() => {
        Promise.resolve(onConfirm?.(value))
            .catch(err => {
            console.error(err);
        })
            .finally(() => {
            setValue('');
        });
    }, [onConfirm, value]);
    const onKeyDown = useCallback((e) => {
        if (e.key === 'Escape') {
            if (value) {
                e.preventDefault();
                return;
            }
            else {
                e.currentTarget.blur();
            }
        }
    }, [value]);
    return (_jsxs(Modal, { contentOptions: {
            className: styles.container,
            onPointerDownOutside: e => {
                e.stopPropagation();
                onCancel?.();
            },
        }, width: width, closeButtonOptions: {
            onClick: onCancel,
        }, headerClassName: clsx(styles.header, headerClassName), descriptionClassName: clsx(styles.description, descriptionClassName), ...props, children: [_jsx("div", { className: styles.label, children: label }), _jsx("div", { className: styles.inputContainer, children: _jsx(Input, { value: value, onChange: setValue, autoFocus: true, className: styles.input, onKeyDown: onKeyDown, "data-testid": "prompt-modal-input", ...inputOptions }) }), children ? _jsx("div", { className: styles.content, children: children }) : null, _jsxs("div", { className: clsx(styles.footer, {
                    modalFooterWithChildren: !!children,
                    reverse: reverseFooter,
                }), children: [_jsx(DialogTrigger, { asChild: true, children: _jsx(Button, { className: styles.action, onClick: onCancel, "data-testid": "prompt-modal-cancel", ...cancelButtonOptions, children: cancelText }) }), _jsx(Button, { className: styles.action, onClick: onConfirmClick, disabled: required && !value, "data-testid": "prompt-modal-confirm", autoFocus: autoFocusConfirm, ...confirmButtonOptions, children: confirmText })] })] }));
};
const PromptModalContext = createContext({
    modalProps: { open: false },
    openPromptModal: () => { },
    closePromptModal: () => { },
});
export const PromptModalProvider = ({ children }) => {
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
    const closePromptModal = useCallback(() => {
        setModalProps({ open: false });
    }, []);
    const openPromptModal = useCallback((props, options) => {
        const { autoClose = true, onSuccess } = options ?? {};
        if (!props) {
            setModalProps({ open: true });
            return;
        }
        const { onConfirm: _onConfirm, ...otherProps } = props;
        const onConfirm = (text) => {
            setLoading(true);
            return Promise.resolve(_onConfirm?.(text))
                .then(() => onSuccess?.())
                .catch(console.error)
                .finally(() => setLoading(false))
                .finally(() => autoClose && closePromptModal());
        };
        setModalProps({ ...otherProps, onConfirm, open: true });
    }, [closePromptModal, setLoading]);
    const onOpenChange = useCallback((open) => {
        modalProps.onOpenChange?.(open);
        setModalProps(props => ({ ...props, open }));
    }, [modalProps]);
    return (_jsxs(PromptModalContext.Provider, { value: {
            openPromptModal: openPromptModal,
            closePromptModal: closePromptModal,
            modalProps,
        }, children: [children, _jsx(PromptModal, { ...modalProps, onOpenChange: onOpenChange })] }));
};
export const usePromptModal = () => {
    const context = useContext(PromptModalContext);
    if (!context) {
        throw new Error('useConfirmModal must be used within a ConfirmModalProvider');
    }
    return {
        openPromptModal: context.openPromptModal,
        closePromptModal: context.closePromptModal,
    };
};
//# sourceMappingURL=prompt-modal.js.map