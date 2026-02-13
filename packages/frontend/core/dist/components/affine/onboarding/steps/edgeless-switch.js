import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@affine/component';
import clsx from 'clsx';
import { debounce } from 'lodash-es';
import { useCallback, useEffect, useRef, useState } from 'react';
import Logo from '../assets/logo';
import { OnboardingBlock } from '../switch-widgets/block';
import { EdgelessSwitchButtons } from '../switch-widgets/switch';
import { ToolbarSVG } from '../switch-widgets/toolbar';
import * as styles from './edgeless-switch.css';
const offsetXRanges = [-2000, 2000];
const offsetYRanges = [-2000, 2000];
const scaleRange = [0.2, 2];
const defaultState = {
    scale: 0.5,
    offsetX: 0,
    offsetY: 0,
};
export const EdgelessSwitch = ({ article, onBack, onNext, }) => {
    // const windowRef = useRef<HTMLDivElement>(null);
    const docRef = useRef(null);
    const canvasRef = useRef(null);
    const mouseDownRef = useRef(false);
    const prevStateRef = useRef(article.initState ?? null);
    const enableScrollTimerRef = useRef(null);
    const turnOffScalingRef = useRef(() => { });
    const [scrollable, setScrollable] = useState(false);
    const [mode, setMode] = useState('page');
    const [state, setState] = useState({
        scale: 1,
        offsetX: 0,
        offsetY: 0,
    });
    const onSwitchToPageMode = useCallback(() => setMode('page'), []);
    const onSwitchToEdgelessMode = useCallback(() => setMode('edgeless'), []);
    const toggleGrabbing = useCallback((v) => {
        if (!docRef.current)
            return;
        docRef.current.classList.toggle('grabbing', v);
    }, []);
    const turnOnScaling = useCallback(() => {
        if (!docRef.current)
            return;
        docRef.current.classList.add('scaling');
    }, []);
    const enableScrollWithDelay = useCallback(() => {
        return new Promise(resolve => {
            enableScrollTimerRef.current = setTimeout(() => {
                setScrollable(true);
                resolve(true);
            }, 500);
        });
    }, []);
    const disableScroll = useCallback(() => {
        if (enableScrollTimerRef.current)
            clearTimeout(enableScrollTimerRef.current);
        setScrollable(false);
    }, []);
    const setStateAndSave = useCallback((state) => {
        setState(state);
        prevStateRef.current = state;
    }, []);
    const onNextClick = useCallback(() => {
        if (mode === 'page')
            setMode('edgeless');
        else if (mode === 'edgeless')
            setMode('well-done');
        else
            onNext?.();
    }, [mode, onNext]);
    useEffect(() => {
        turnOffScalingRef.current = debounce(() => {
            if (!docRef.current)
                return;
            docRef.current.classList.remove('scaling');
        }, 100);
    }, []);
    useEffect(() => {
        if (mode === 'page')
            return;
        const canvas = canvasRef.current;
        const win = docRef.current;
        if (!win || !canvas)
            return;
        const onWheel = (e) => {
            turnOnScaling();
            const { deltaY } = e;
            const newScale = state.scale - deltaY * 0.001;
            const safeScale = Math.max(Math.min(newScale, scaleRange[1]), scaleRange[0]);
            setStateAndSave({ ...state, scale: safeScale });
            turnOffScalingRef.current?.();
        };
        const onMouseDown = (e) => {
            const target = e.target;
            if (target.closest('[data-no-drag]'))
                return;
            e.preventDefault();
            mouseDownRef.current = true;
            toggleGrabbing(true);
        };
        const onMouseMove = (e) => {
            if (!mouseDownRef.current)
                return;
            const offsetX = state.offsetX + e.movementX / state.scale;
            const offsetY = state.offsetY + e.movementY / state.scale;
            const safeOffsetX = Math.max(Math.min(offsetX, offsetXRanges[1]), offsetXRanges[0]);
            const safeOffsetY = Math.max(Math.min(offsetY, offsetYRanges[1]), offsetYRanges[0]);
            setStateAndSave({
                scale: state.scale,
                offsetX: safeOffsetX,
                offsetY: safeOffsetY,
            });
        };
        const onMouseUp = (_) => {
            mouseDownRef.current = false;
            toggleGrabbing(false);
        };
        win.addEventListener('wheel', onWheel);
        win.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('mousemove', onMouseMove);
        return () => {
            win.removeEventListener('wheel', onWheel);
            win.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, [
        mode,
        state,
        state.offsetX,
        state.offsetY,
        state.scale,
        setStateAndSave,
        toggleGrabbing,
        turnOnScaling,
    ]);
    // to avoid `overflow: auto` clip the content before animation ends
    useEffect(() => {
        if (mode === 'page') {
            enableScrollWithDelay()
                .then(() => {
                // handle scroll
                canvasRef.current?.scrollTo({ top: 0 });
            })
                .catch(console.error);
            setState({ scale: 1, offsetX: 0, offsetY: 0 });
        }
        else {
            disableScroll();
            canvasRef.current?.scrollTo({ top: 0 });
            // save state when switching between modes
            setState(prevStateRef.current ?? defaultState);
        }
    }, [disableScroll, enableScrollWithDelay, mode]);
    const canvasStyle = {
        '--scale': state.scale,
        '--offset-x': state.offsetX + 'px',
        '--offset-y': state.offsetY + 'px',
    };
    return (_jsx("div", { "data-mode": mode, className: styles.edgelessSwitchWindow, style: canvasStyle, children: _jsxs("div", { className: styles.orbit, children: [_jsxs("div", { ref: docRef, className: clsx(styles.orbitItem, styles.doc), "data-scroll": scrollable, children: [_jsx("div", { className: styles.canvas, ref: canvasRef, children: _jsx("div", { className: styles.page, children: 
                                /* render blocks */
                                article.blocks.map((block, key) => {
                                    // eslint-disable-next-line react/no-array-index-key
                                    return _jsx(OnboardingBlock, { mode: mode, ...block }, key);
                                }) }) }), _jsxs("div", { "data-no-drag": true, className: styles.noDragWrapper, children: [_jsxs("header", { className: styles.header, children: [_jsx(Button, { style: {
                                                background: 'white',
                                                borderColor: '#E3E2E4',
                                                color: '#424149',
                                            }, size: "extraLarge", onClick: onBack, children: "Back" }), _jsx(EdgelessSwitchButtons, { mode: mode, onSwitchToPageMode: onSwitchToPageMode, onSwitchToEdgelessMode: onSwitchToEdgelessMode }), _jsx(Button, { size: "extraLarge", variant: "primary", onClick: onNextClick, children: "Next" })] }), _jsx("div", { className: styles.toolbar, children: _jsx(ToolbarSVG, {}) })] })] }), _jsxs("div", { className: clsx(styles.orbitItem, styles.wellDone), children: [_jsx("div", { className: styles.wellDoneEnterAnim, onDoubleClick: () => setMode('edgeless'), children: _jsx(Logo, {}) }), _jsx("h1", { className: clsx(styles.wellDoneTitle, styles.wellDoneEnterAnim), children: "Well Done !" }), _jsxs("p", { className: clsx(styles.wellDoneContent, styles.wellDoneEnterAnim), children: ["You have the flexibility to switch between Page and Edgeless", _jsx("br", {}), " Mode at any point during content creation."] }), _jsx(Button, { className: styles.wellDoneEnterAnim, onClick: onNextClick, variant: "primary", size: "extraLarge", style: { marginTop: 40 }, children: "Get Started" })] })] }) }));
};
//# sourceMappingURL=edgeless-switch.js.map