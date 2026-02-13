import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CloseIcon } from '@blocksuite/icons/rc';
import * as Dialog from '@radix-ui/react-dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import clsx from 'clsx';
import { forwardRef, useCallback, useContext, useEffect, useState, } from 'react';
import { startScopedViewTransition } from '../../utils';
import { IconButton } from '../button';
import { SafeArea } from '../safe-area';
import { InsideModalContext, ModalConfigContext } from './context';
import * as styles from './styles.css';
const getVar = (style = '', defaultValue = '') => {
    return style
        ? typeof style === 'number'
            ? `${style}px`
            : style
        : defaultValue;
};
/**
 * This component is a hack to support `startViewTransition` in the modal.
 */
class ModalTransitionContainer extends HTMLElement {
    constructor() {
        super(...arguments);
        this.pendingTransitionNodes = [];
        this.animationFrame = null;
    }
    /**
     * This method will be called when the modal is removed from the DOM
     * https://github.com/facebook/react/blob/e4b4aac2a01b53f8151ca85148873096368a7de2/packages/react-dom-bindings/src/client/ReactFiberConfigDOM.js#L833
     */
    removeChild(child) {
        if (typeof document.startViewTransition === 'function') {
            this.pendingTransitionNodes.push(child);
            this.requestTransition();
            return child;
        }
        else {
            // oxlint-disable-next-line unicorn/prefer-dom-node-remove
            return super.removeChild(child);
        }
    }
    /**
     * We collect all the nodes that are removed in the single frame and then trigger the transition.
     */
    requestTransition() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        this.animationFrame = requestAnimationFrame(() => {
            const nodes = this.pendingTransitionNodes;
            nodes.forEach(child => {
                if (child instanceof HTMLElement) {
                    child.classList.add('vt-active');
                }
            });
            startScopedViewTransition(styles.modalVTScope, () => {
                nodes.forEach(child => {
                    // oxlint-disable-next-line unicorn/prefer-dom-node-remove
                    super.removeChild(child);
                });
            });
            this.pendingTransitionNodes = [];
        });
    }
}
let defined = false;
function createContainer() {
    if (!defined) {
        customElements.define('modal-transition-container', ModalTransitionContainer);
        defined = true;
    }
    const container = new ModalTransitionContainer();
    document.body.append(container);
    return container;
}
export const ModalInner = forwardRef((props, ref) => {
    const { onOpen: modalConfigOnOpen, dynamicKeyboardHeight } = useContext(ModalConfigContext);
    const { modal, portalOptions, open, onOpenChange, width, height, minHeight = 194, title, headerClassName, description, descriptionClassName, withoutCloseButton = false, persistent, contentOptions: { style: contentStyle, className: contentClassName, onPointerDownOutside, onEscapeKeyDown, ...otherContentOptions } = {}, overlayOptions: { className: overlayClassName, style: overlayStyle, ...otherOverlayOptions } = {}, closeButtonOptions, children, contentWrapperClassName, contentWrapperStyle, animation = BUILD_CONFIG.isMobileEdition ? 'slideBottom' : 'fadeScaleTop', fullScreen, disableAutoFocus, ...otherProps } = props;
    const { className: closeButtonClassName, ...otherCloseButtonProps } = closeButtonOptions || {};
    const [container, setContainer] = useState(null);
    useEffect(() => {
        if (open)
            return modalConfigOnOpen?.();
        return;
    }, [modalConfigOnOpen, open]);
    useEffect(() => {
        if (open) {
            const container = createContainer();
            setContainer(container);
            return () => {
                setTimeout(() => {
                    container.remove();
                }, 1000);
            };
        }
        else {
            setContainer(null);
            return;
        }
    }, [open]);
    const handlePointerDownOutSide = useCallback((e) => {
        onPointerDownOutside?.(e);
        persistent && e.preventDefault();
    }, [onPointerDownOutside, persistent]);
    const handleEscapeKeyDown = useCallback((e) => {
        onEscapeKeyDown?.(e);
        persistent && e.preventDefault();
    }, [onEscapeKeyDown, persistent]);
    const handleAutoFocus = useCallback((e) => {
        disableAutoFocus && e.preventDefault();
    }, [disableAutoFocus]);
    if (!container) {
        return;
    }
    return (_jsx(Dialog.Root, { modal: modal, open: open, onOpenChange: onOpenChange, ...otherProps, children: _jsx(Dialog.Portal, { container: container, ...portalOptions, children: _jsx(Dialog.Overlay, { className: clsx(`anim-${animation}`, styles.modalOverlay, overlayClassName, { mobile: BUILD_CONFIG.isMobileEdition }), style: {
                    ...overlayStyle,
                }, ...otherOverlayOptions, children: _jsx(SafeArea, { bottom: BUILD_CONFIG.isMobileEdition, bottomOffset: dynamicKeyboardHeight ?? 12, "data-full-screen": fullScreen, "data-modal": modal, className: clsx(`anim-${animation}`, styles.modalContentWrapper, contentWrapperClassName), "data-mobile": BUILD_CONFIG.isMobileEdition ? '' : undefined, style: contentWrapperStyle, children: _jsxs(Dialog.Content, { onPointerDownOutside: handlePointerDownOutSide, onEscapeKeyDown: handleEscapeKeyDown, className: clsx(styles.modalContent, contentClassName), onOpenAutoFocus: handleAutoFocus, style: {
                            ...assignInlineVars({
                                [styles.widthVar]: getVar(width, fullScreen ? '100dvw' : '50dvw'),
                                [styles.heightVar]: getVar(height, fullScreen ? '100dvh' : 'unset'),
                                [styles.minHeightVar]: getVar(minHeight, '26px'),
                            }),
                            ...contentStyle,
                        }, ...(description ? {} : { 'aria-describedby': undefined }), ...otherContentOptions, ref: ref, children: [withoutCloseButton ? null : (_jsx(Dialog.Close, { asChild: true, children: _jsx(IconButton, { size: "20", className: clsx(styles.closeButton, closeButtonClassName), "aria-label": "Close", "data-testid": "modal-close-button", ...otherCloseButtonProps, children: _jsx(CloseIcon, {}) }) })), title ? (_jsx(Dialog.Title, { className: clsx(styles.modalHeader, headerClassName), children: title })) : (
                            // Refer: https://www.radix-ui.com/primitives/docs/components/dialog#title
                            // If you want to hide the title, wrap it inside our Visually Hidden utility like this <VisuallyHidden asChild>.
                            _jsx(VisuallyHidden.Root, { asChild: true, children: _jsx(Dialog.Title, {}) })), description ? (_jsx(Dialog.Description, { className: clsx(styles.modalDescription, descriptionClassName), children: description })) : null, children] }) }) }) }) }));
});
ModalInner.displayName = 'ModalInner';
export const Modal = forwardRef((props, ref) => {
    const insideModal = useContext(InsideModalContext);
    if (!props.open) {
        return;
    }
    return (_jsx(InsideModalContext.Provider, { value: insideModal + 1, children: _jsx(ModalInner, { ...props, ref: ref }) }));
});
Modal.displayName = 'Modal';
export const useIsInsideModal = () => {
    const context = useContext(InsideModalContext);
    return context > 0;
};
//# sourceMappingURL=modal.js.map