import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Scrollable } from '@affine/component';
import { FeatureFlagService } from '@affine/core/modules/feature-flag';
import {} from '@affine/core/utils/island';
import { ArrowLeftBigIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { eases, waapi } from 'animejs';
import clsx from 'clsx';
import { createContext, useCallback, useContext, useEffect, useRef, useState, } from 'react';
import { centerContainer, content, wrapper } from './style.css';
import * as styles from './sub-page.css';
export const SubPageContext = createContext({
    islands: [],
    addIsland: () => ({
        // must be initialized
        island: null,
        dispose: () => { },
    }),
});
const SubPageTargetItem = ({ island }) => {
    const provided = useLiveData(island.provided$);
    return (_jsx(island.Target, { "data-open": provided, "data-setting-page": true, className: styles.root }));
};
export const SubPageTarget = () => {
    const context = useContext(SubPageContext);
    const islands = context.islands;
    return islands.map(island => (_jsx(SubPageTargetItem, { island: island }, island.id)));
};
const ease = eases.cubicBezier(0.25, 0.36, 0.24, 0.97);
export const SubPageProvider = ({ island, open, onClose, children, backText = 'Back', animation = true, }) => {
    const featureFlagService = useService(FeatureFlagService);
    const enableSettingSubpageAnimation = useLiveData(featureFlagService.flags.enable_setting_subpage_animation.$);
    const duration = enableSettingSubpageAnimation ? (animation ? 320 : 0) : 0;
    const maskRef = useRef(null);
    const pageRef = useRef(null);
    const [innerOpen, setInnerOpen] = useState(open);
    const [animateState, setAnimateState] = useState('idle');
    const [played, setPlayed] = useState(false);
    const prevPageRef = useRef(null);
    const getPrevPage = useCallback((_root) => {
        const root = _root ?? pageRef.current?.parentElement;
        if (!root) {
            return null;
        }
        const prevPage = root.previousElementSibling;
        if (!prevPage) {
            return null;
        }
        if (prevPage.dataset.settingPage && prevPage.dataset.open === 'true') {
            prevPageRef.current = prevPage;
            return prevPage;
        }
        return getPrevPage(prevPage);
    }, []);
    const animateOpen = useCallback(() => {
        setAnimateState('animating');
        requestAnimationFrame(() => {
            const mask = maskRef.current;
            const page = pageRef.current;
            if (!mask || !page) {
                setAnimateState('idle');
                return;
            }
            waapi.animate(mask, { opacity: [0, 1], duration, ease });
            waapi
                .animate(page, { x: ['100%', 0], duration, ease })
                .then(() => setAnimateState('finished'))
                .catch(console.error)
                .finally(() => {
                setAnimateState('finished');
                setPlayed(true);
            });
            const prevPage = getPrevPage();
            if (!prevPage)
                return;
            waapi.animate(prevPage, { x: [0, '-20%'], duration, ease });
        });
    }, [duration, getPrevPage]);
    const animateClose = useCallback(() => {
        setAnimateState('animating');
        requestAnimationFrame(() => {
            const mask = maskRef.current;
            const page = pageRef.current;
            if (!mask || !page) {
                setAnimateState('idle');
                return;
            }
            waapi.animate(mask, { opacity: [1, 0], duration, ease });
            waapi
                .animate(page, { x: [0, '100%'], duration, ease })
                .then(() => setAnimateState('idle'))
                .catch(console.error)
                .finally(() => setAnimateState('idle'));
            const prevPage = getPrevPage();
            if (!prevPage)
                return;
            waapi.animate(prevPage, { x: ['-20%', 0], duration, ease });
        });
    }, [duration, getPrevPage]);
    useEffect(() => {
        setAnimateState('ready');
        setInnerOpen(open);
    }, [open]);
    useEffect(() => {
        if (animateState !== 'ready')
            return;
        if (innerOpen) {
            animateOpen();
            return;
        }
        // the first played animation must be open
        if (!played) {
            setAnimateState('idle');
            return;
        }
        animateClose();
    }, [animateClose, animateOpen, animateState, innerOpen, played]);
    /**
     * for some situation like:
     *
     * ```tsx
     * const [open, setOpen] = useState(false);
     * if (!open) return null;
     * return <SubPageProvider open={open} onClose={() => setOpen(false)} />
     * ```
     *
     * The subpage is closed unexpectedly, so we need to reset the previous page's position.
     */
    useEffect(() => {
        return () => {
            const prevPage = prevPageRef.current;
            if (!prevPage)
                return;
            waapi.animate(prevPage, { x: 0, duration: 0 });
        };
    }, []);
    if (animateState === 'idle') {
        return null;
    }
    return (_jsxs(island.Provider, { children: [_jsx("div", { className: styles.mask, ref: maskRef }), _jsxs("div", { className: styles.page, ref: pageRef, children: [_jsx("header", { className: styles.header, children: _jsx(Button, { className: styles.backButton, onClick: onClose, prefix: _jsx(ArrowLeftBigIcon, {}), variant: "plain", children: backText }) }), _jsx(Scrollable.Root, { className: styles.content, children: _jsxs(Scrollable.Viewport, { className: clsx(wrapper, styles.viewport), children: [_jsx("div", { className: centerContainer, children: _jsx("div", { className: content, children: children }) }), _jsx(Scrollable.Scrollbar, {})] }) })] })] }));
};
/**
 * Create a new island when the component is mounted,
 * and dispose it when the component is unmounted.
 */
export const useSubPageIsland = () => {
    const { addIsland } = useContext(SubPageContext);
    const [island, setIsland] = useState(null);
    useEffect(() => {
        const { island, dispose } = addIsland();
        setIsland(island);
        return dispose;
    }, [addIsland]);
    return island;
};
//# sourceMappingURL=sub-page.js.map