import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as Dialog from '@radix-ui/react-dialog';
import { useLiveData, useService } from '@toeverything/infra';
import { eases, waapi } from 'animejs';
import clsx from 'clsx';
import { createContext, forwardRef, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState, } from 'react';
import { EditorSettingService } from '../../editor-setting';
import * as styles from './modal-container.css';
const contentOptions = {
    ['data-testid']: 'peek-view-modal',
    onPointerDownOutside: e => {
        const el = e.target;
        if (el.closest('[data-peek-view-wrapper]') ||
            // workaround for slash menu click outside issue
            el.closest('affine-slash-menu')) {
            e.preventDefault();
        }
    },
    onEscapeKeyDown: e => {
        // prevent closing the modal when pressing escape key by default
        // this is because radix-ui register the escape key event on the document using capture, which is not possible to prevent in blocksuite
        e.preventDefault();
    },
};
// a dummy context to let elements know they are inside a peek view
export const PeekViewContext = createContext(null);
const emptyContext = {};
export const useInsidePeekView = () => {
    const context = useContext(PeekViewContext);
    return !!context;
};
const PeekViewModalOverlay = 'div';
export const PeekViewModalContainer = forwardRef(function PeekViewModalContainer({ onOpenChange, open, target, controls, children, onAnimationStart, onAnimationEnd, animation = 'fadeBottom', mode = 'fit', dialogFrame = true, }, ref) {
    const [vtOpen, setVtOpen] = useState(open);
    const [animeState, setAnimeState] = useState('idle');
    const contentClipRef = useRef(null);
    const contentRef = useRef(null);
    const overlayRef = useRef(null);
    const controlsRef = useRef(null);
    const prevAnimeMap = useRef({});
    const editorSettings = useService(EditorSettingService).editorSetting;
    const fullWidthLayout = useLiveData(editorSettings.settings$.selector(s => s.fullWidthLayout));
    const animateControls = useCallback((animateIn = false) => {
        const controls = controlsRef.current;
        if (!controls)
            return;
        waapi.animate(controls, {
            opacity: animateIn ? [0, 1] : [1, 0],
            translateX: animateIn ? [-32, 0] : [0, -32],
            ease: eases.inOutSine,
            duration: 230,
        });
    }, []);
    const animateFade = useCallback((animateIn) => {
        setAnimeState('animating');
        onAnimationStart?.();
        return new Promise(resolve => {
            if (animateIn)
                setVtOpen(true);
            setTimeout(() => {
                const overlay = overlayRef.current;
                const contentClip = contentClipRef.current;
                if (!overlay || !contentClip) {
                    resolve();
                    return;
                }
                waapi.animate([overlay, contentClip], {
                    opacity: animateIn ? [0, 1] : [1, 0],
                    ease: eases.inOutSine,
                    duration: 230,
                    onComplete: () => {
                        if (!animateIn)
                            setVtOpen(false);
                        setAnimeState('idle');
                        onAnimationEnd?.();
                        resolve();
                    },
                });
            });
        });
    }, [onAnimationEnd, onAnimationStart]);
    const zoomAnimate = useCallback(async (zoomIn, paramsMap) => {
        // if target has no bounding client rect,
        // find its parent that has bounding client rect
        let iteration = 0;
        while (target &&
            !target.getBoundingClientRect().width &&
            iteration < 10) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            target = target.parentElement || undefined;
            iteration++;
        }
        if (!target) {
            // fallback to fade animation
            return animateFade(!!zoomIn);
        }
        return new Promise(resolve => {
            const contentClip = contentClipRef.current;
            const content = contentRef.current;
            const overlay = overlayRef.current;
            if (!contentClip || !content || !target || !overlay) {
                resolve();
                setAnimeState('idle');
                onAnimationEnd?.();
                return;
            }
            const targets = contentClip;
            const lockSizeEl = content;
            const from = zoomIn ? target : contentClip;
            const to = zoomIn ? contentClip : target;
            const fromRect = from.getBoundingClientRect();
            const toRect = to.getBoundingClientRect();
            targets.style.position = 'fixed';
            targets.style.opacity = '1';
            lockSizeEl.style.width = zoomIn
                ? `${toRect.width}px`
                : `${fromRect.width}px`;
            lockSizeEl.style.height = zoomIn
                ? `${toRect.height}px`
                : `${fromRect.height}px`;
            lockSizeEl.style.overflow = 'hidden';
            overlay.style.pointerEvents = 'none';
            prevAnimeMap.current.overlay?.pause();
            prevAnimeMap.current.content?.pause();
            prevAnimeMap.current.contentWrapper?.pause();
            const overlayAnime = waapi.animate(overlay, {
                opacity: zoomIn ? [0, 1] : [1, 0],
                ease: eases.inOutSine,
                duration: 230,
                ...paramsMap?.overlay,
            });
            const contentAnime = paramsMap?.content &&
                waapi.animate(content, {
                    ...paramsMap.content,
                });
            const contentWrapperAnime = waapi.animate(targets, {
                left: [fromRect.left, toRect.left],
                top: [fromRect.top, toRect.top],
                width: [fromRect.width, toRect.width],
                height: [fromRect.height, toRect.height],
                ease: eases.inOutSine,
                duration: 230,
                ...paramsMap?.contentWrapper,
                onComplete: (ins) => {
                    paramsMap?.contentWrapper?.onComplete?.(ins);
                    setAnimeState('idle');
                    onAnimationEnd?.();
                    overlay.style.pointerEvents = '';
                    if (zoomIn) {
                        Object.assign(targets.style, {
                            position: '',
                            left: '',
                            top: '',
                            width: '',
                            height: '',
                        });
                        Object.assign(lockSizeEl.style, {
                            width: '100%',
                            height: '100%',
                            overflow: '',
                        });
                    }
                    resolve();
                },
            });
            prevAnimeMap.current = {
                overlay: overlayAnime,
                content: contentAnime,
                contentWrapper: contentWrapperAnime,
            };
        });
    }, [target, animateFade, onAnimationEnd]);
    /**
     * ### Animation timeline:
     * ```plain
     *                                      150ms
     *                                   ⎮ - - - - ⎮
     * dialog:     +--------400ms--------+
     * controls:               +-------230ms-------+
     *             ⎮ - - - - - ⎮
     *            controls delay =
     *             400 - 230 + 150
     * ```
     */
    const animateZoomIn = useCallback(() => {
        setAnimeState('animating');
        onAnimationStart?.();
        setVtOpen(true);
        setTimeout(() => {
            zoomAnimate(true, {
                contentWrapper: {
                    opacity: [0.5, 1],
                    easing: 'cubicBezier(.46,.36,0,1)',
                    duration: 400,
                },
                content: {
                    opacity: [0, 1],
                    duration: 100,
                },
            }).catch(console.error);
        }, 0);
        setTimeout(() => animateControls(true), 
        // controls delay: to make sure the time interval for animations of dialog and controls is 150ms.
        400 - 230 + 150);
    }, [animateControls, onAnimationStart, zoomAnimate]);
    const animateZoomOut = useCallback(() => {
        setAnimeState('animating');
        onAnimationStart?.();
        animateControls(false);
        zoomAnimate(false, {
            contentWrapper: {
                easing: 'cubicBezier(.57,.25,.76,.44)',
                opacity: [1, 0.5],
                duration: 180,
            },
            content: {
                opacity: [1, 0],
                duration: 180,
                easing: 'ease',
            },
        })
            .then(() => setVtOpen(false))
            .catch(console.error);
    }, [animateControls, onAnimationStart, zoomAnimate]);
    const animateFadeBottom = useCallback((animateIn) => {
        setAnimeState('animating');
        return new Promise(resolve => {
            if (animateIn)
                setVtOpen(true);
            setTimeout(() => {
                const overlay = overlayRef.current;
                const contentClip = contentClipRef.current;
                if (!overlay || !contentClip) {
                    resolve();
                    return;
                }
                waapi.animate([overlay], {
                    opacity: animateIn ? [0, 1] : [1, 0],
                    ease: eases.inOutSine,
                    duration: 230,
                });
                waapi.animate([contentClip], {
                    opacity: animateIn ? [0, 1] : [1, 0],
                    y: animateIn ? ['-2%', '0%'] : ['0%', '-2%'],
                    scale: animateIn ? [0.96, 1] : [1, 0.96],
                    ease: eases.cubicBezier(0.42, 0, 0.58, 1),
                    duration: 230,
                    onComplete: () => {
                        if (!animateIn)
                            setVtOpen(false);
                        setAnimeState('idle');
                        onAnimationEnd?.();
                        resolve();
                    },
                });
            });
        });
    }, [onAnimationEnd]);
    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === 'Escape') {
                onOpenChange(false);
            }
        };
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [onOpenChange]);
    useLayoutEffect(() => {
        if (animation === 'zoom') {
            open ? animateZoomIn() : animateZoomOut();
        }
        else if (animation === 'fadeBottom') {
            animateFadeBottom(open).catch(console.error);
        }
        else if (animation === 'fade') {
            animateFade(open).catch(console.error);
        }
        else if (animation === 'none') {
            setVtOpen(open);
        }
    }, [
        animateZoomOut,
        animation,
        open,
        target,
        animateZoomIn,
        animateFade,
        animateFadeBottom,
    ]);
    return (_jsx(PeekViewContext.Provider, { value: emptyContext, children: _jsx(Dialog.Root, { modal: true, open: vtOpen, onOpenChange: onOpenChange, children: _jsxs(Dialog.Portal, { children: [_jsx(PeekViewModalOverlay, { ref: overlayRef, className: styles.modalOverlay, "data-anime-state": animeState }), _jsx("div", { ref: ref, "data-mode": mode, "data-peek-view-wrapper": true, className: styles.modalContentWrapper, "data-mobile": BUILD_CONFIG.isMobileEdition ? '' : undefined, children: _jsxs("div", { "data-anime-state": animeState, "data-full-width-layout": fullWidthLayout, "data-mobile": BUILD_CONFIG.isMobileEdition, ref: contentClipRef, className: styles.modalContentContainer, children: [_jsx("div", { className: styles.modalContentClip, children: _jsxs(Dialog.Content, { ...contentOptions, "aria-describedby": undefined, className: clsx({
                                            [styles.modalContent]: true,
                                            [styles.dialog]: dialogFrame,
                                        }), children: [_jsx(Dialog.Title, { style: { display: 'none' } }), _jsx("div", { style: { height: '100%' }, ref: contentRef, children: children })] }) }), controls ? (_jsx("div", { 
                                    // initially hide the controls to prevent flickering for zoom animation
                                    style: { opacity: animation === 'zoom' ? 0 : undefined }, ref: controlsRef, className: styles.modalControls, children: controls })) : null] }) })] }) }) }));
});
//# sourceMappingURL=modal-container.js.map