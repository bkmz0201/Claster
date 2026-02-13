import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { InsideModalContext, ModalConfigContext, Scrollable, } from '@affine/component';
import { PageHeader } from '@affine/core/mobile/components';
import { ArrowLeftSmallIcon } from '@blocksuite/icons/rc';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { animate } from 'animejs';
import { createContext, useCallback, useContext, useEffect, useRef, } from 'react';
import { createPortal } from 'react-dom';
import { SwipeHelper } from '../../utils';
import * as styles from './swipe-dialog.css';
const overlayOpacityRange = [0, 0.1];
const tick = (overlay, dialog, prev, deltaX, fullWidth) => {
    const limitedDeltaX = Math.min(fullWidth, Math.max(0, deltaX));
    const percent = limitedDeltaX / fullWidth;
    const opacity = overlayOpacityRange[1] -
        (overlayOpacityRange[1] - overlayOpacityRange[0]) * percent;
    overlay.style.background = `rgba(0, 0, 0, ${opacity})`;
    dialog.style.transform = `translate3d(${limitedDeltaX}px, 0, 0)`;
    if (prev) {
        const range = [-80, 0];
        const offset = range[0] + (range[1] - range[0]) * percent;
        prev.style.transform = `translate3d(${offset}px, 0, 0)`;
    }
};
const reset = (overlay, dialog, prev) => {
    overlay && (overlay.style.background = 'transparent');
    dialog && (dialog.style.transform = 'unset');
    const prevEl = prev ?? document.querySelector('#app');
    if (prevEl) {
        prevEl.style.transform = 'unset';
    }
};
const getAnimeProxy = (overlay, dialog, maybePrev, init) => {
    const prev = maybePrev ?? document.querySelector('#app');
    return new Proxy({ deltaX: init }, {
        set(target, key, value) {
            if (key === 'deltaX') {
                target.deltaX = value;
                tick(overlay, dialog, prev, value, overlay.clientWidth);
            }
            return true;
        },
    });
};
const cancel = (overlay, dialog, prev, deltaX, onComplete) => {
    animate(getAnimeProxy(overlay, dialog, prev, Math.min(overlay.clientWidth, Math.max(0, deltaX))), {
        deltaX: 0,
        easing: 'cubicBezier(.25,.36,.24,.97)',
        duration: 320,
        onComplete: () => {
            onComplete?.();
            setTimeout(() => {
                reset(overlay, dialog, prev);
            }, 0);
        },
    });
};
const close = (overlay, dialog, prev, deltaX, onComplete) => {
    animate(getAnimeProxy(overlay, dialog, prev, Math.min(overlay.clientWidth, Math.max(0, deltaX))), {
        deltaX: overlay.clientWidth,
        easing: 'cubicBezier(.25,.36,.24,.97)',
        duration: 320,
        onComplete: () => {
            onComplete?.();
            setTimeout(() => {
                reset(overlay, dialog, prev);
            }, 0);
        },
    });
};
const SwipeDialogContext = createContext({
    stack: [],
});
export const SwipeDialog = ({ title, children, open, triggerSize = 25, onOpenChange, }) => {
    const insideModal = useContext(InsideModalContext);
    const { onOpen: globalOnOpen } = useContext(ModalConfigContext);
    const swiperTriggerRef = useRef(null);
    const overlayRef = useRef(null);
    const dialogRef = useRef(null);
    const { stack } = useContext(SwipeDialogContext);
    const prev = stack[stack.length - 1]?.current;
    const handleClose = useCallback(() => {
        onOpenChange?.(false);
    }, [onOpenChange]);
    const animateClose = useCallback(() => {
        const overlay = overlayRef.current;
        const dialog = dialogRef.current;
        if (overlay && dialog) {
            close(overlay, dialog, prev, 0, handleClose);
        }
        else {
            handleClose();
        }
    }, [handleClose, prev]);
    useEffect(() => {
        if (!open)
            return;
        const overlay = overlayRef.current;
        const dialog = dialogRef.current;
        const swipeBackTrigger = swiperTriggerRef.current;
        if (!overlay || !dialog || !swipeBackTrigger)
            return;
        const swipeHelper = new SwipeHelper();
        return swipeHelper.init(swipeBackTrigger, {
            preventScroll: true,
            onSwipeStart: () => { },
            onSwipe({ deltaX }) {
                const prevOrAppRoot = prev ?? document.querySelector('#app');
                if (!overlay || !dialog)
                    return;
                tick(overlay, dialog, prevOrAppRoot, deltaX, overlay.clientWidth);
            },
            onSwipeEnd: ({ deltaX }) => {
                if (!overlay || !dialog)
                    return;
                const shouldClose = deltaX > overlay.clientWidth * 0.2;
                if (shouldClose) {
                    close(overlay, dialog, prev, deltaX, handleClose);
                }
                else {
                    cancel(overlay, dialog, prev, deltaX);
                }
            },
        });
    }, [handleClose, open, prev]);
    useEffect(() => {
        if (!open)
            return;
        const overlay = overlayRef.current;
        const dialog = dialogRef.current;
        if (overlay && dialog) {
            cancel(overlay, dialog, prev, overlay.clientWidth);
        }
    }, [open, prev]);
    useEffect(() => {
        if (open)
            return globalOnOpen?.();
        return;
    }, [globalOnOpen, open]);
    if (!open)
        return null;
    return (_jsx(SwipeDialogContext.Provider, { value: { stack: [...stack, dialogRef] }, children: _jsx(InsideModalContext.Provider, { value: insideModal + 1, children: createPortal(_jsxs("div", { className: styles.root, children: [_jsx("div", { className: styles.overlay, ref: overlayRef }), _jsxs("div", { role: "dialog", className: styles.dialog, ref: dialogRef, children: [_jsxs("div", { className: styles.content, children: [_jsx(PageHeader, { back: true, backIcon: _jsx(ArrowLeftSmallIcon, {}), backAction: animateClose, className: styles.header, children: _jsx("span", { className: styles.dialogTitle, children: title }) }), _jsxs(Scrollable.Root, { className: styles.scrollArea, children: [_jsx(Scrollable.Viewport, { children: children }), _jsx(Scrollable.Scrollbar, { orientation: "vertical" })] })] }), _jsx("div", { ref: swiperTriggerRef, className: styles.swipeBackTrigger, style: assignInlineVars({
                                    [styles.triggerSizeVar]: `${triggerSize}px`,
                                }) })] })] }), document.body) }) }));
};
//# sourceMappingURL=swipe-dialog.js.map