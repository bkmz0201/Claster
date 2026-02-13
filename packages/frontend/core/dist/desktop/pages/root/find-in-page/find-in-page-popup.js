import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { IconButton, observeResize, RowInput } from '@affine/component';
import { FindInPageService } from '@affine/core/modules/find-in-page';
import { ArrowDownSmallIcon, ArrowUpSmallIcon, CloseIcon, SearchIcon, } from '@blocksuite/icons/rc';
import * as Popover from '@radix-ui/react-popover';
import { useLiveData, useService } from '@toeverything/infra';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState, } from 'react';
import { useTransitionState } from 'react-transition-state';
import * as styles from './find-in-page-popup.css';
const animationTimeout = 120;
const drawText = (canvas, text, scrollLeft) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        return;
    }
    const dpr = window.devicePixelRatio || 1;
    // the container will be animated,
    // so we need to use clientWidth and clientHeight instead of getBoundingClientRect
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    const rootStyles = getComputedStyle(document.documentElement);
    const textColor = rootStyles
        .getPropertyValue('--affine-text-primary-color')
        .trim();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const offsetX = -scrollLeft;
    ctx.fillStyle = textColor;
    ctx.font = '15px Inter';
    ctx.letterSpacing = '0.01em';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(text, offsetX, 22);
};
const CanvasText = ({ text, scrollLeft, className, }) => {
    const ref = useRef(null);
    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) {
            return;
        }
        drawText(canvas, text, scrollLeft);
        return observeResize(canvas, () => drawText(canvas, text, scrollLeft));
    }, [text, scrollLeft]);
    return _jsx("canvas", { className: className, ref: ref });
};
export const FindInPagePopup = () => {
    const [value, setValue] = useState('');
    const findInPage = useService(FindInPageService).findInPage;
    const visible = useLiveData(findInPage.visible$);
    const result = useLiveData(findInPage.result$);
    const isSearching = useLiveData(findInPage.isSearching$);
    const inputRef = useRef(null);
    const [active, setActive] = useState(false);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [composing, setComposing] = useState(false);
    const [{ status }, toggle] = useTransitionState({
        timeout: animationTimeout,
    });
    useEffect(() => {
        toggle(visible);
        setValue(findInPage.searchText$.value || '');
    }, [findInPage.searchText$.value, toggle, visible]);
    const handleValueChange = useCallback((value) => {
        setValue(value);
        if (!composing) {
            findInPage.findInPage(value);
        }
        if (value.length === 0) {
            findInPage.clear();
        }
        inputRef.current?.focus();
    }, [composing, findInPage]);
    const handleFocus = useCallback(() => {
        setActive(true);
    }, []);
    const handleBlur = useCallback(() => {
        setActive(false);
    }, []);
    useEffect(() => {
        const unsub = findInPage.isSearching$.subscribe(() => {
            inputRef.current?.focus();
            setTimeout(() => {
                inputRef.current?.focus();
            });
        });
        return () => {
            unsub.unsubscribe();
        };
    }, [findInPage.isSearching$]);
    const handleBackWard = useCallback(() => {
        findInPage.backward();
    }, [findInPage]);
    const handleForward = useCallback(() => {
        findInPage.forward();
    }, [findInPage]);
    const onChangeVisible = useCallback((visible) => {
        if (!visible) {
            findInPage.clear();
        }
        findInPage.onChangeVisible(visible);
    }, [findInPage]);
    const handleDone = useCallback(() => {
        onChangeVisible(false);
    }, [onChangeVisible]);
    const handleKeydown = useCallback(e => {
        if (e.key === 'Enter' || e.key === 'ArrowDown') {
            handleForward();
        }
        if (e.key === 'ArrowUp') {
            handleBackWard();
        }
    }, [handleBackWard, handleForward]);
    const handleScroll = useCallback((e) => {
        setScrollLeft(e.currentTarget.scrollLeft);
    }, []);
    const handleCompositionStart = useCallback(() => {
        setComposing(true);
    }, []);
    const handleCompositionEnd = useCallback(e => {
        setComposing(false);
        findInPage.findInPage(e.currentTarget.value);
    }, [findInPage]);
    return (_jsxs(Popover.Root, { open: status !== 'exited', onOpenChange: onChangeVisible, children: [_jsx(Popover.Anchor, { className: styles.anchor, "data-find-in-page-anchor": true }), _jsx(Popover.Portal, { children: _jsxs(Popover.Content, { style: assignInlineVars({
                        [styles.animationTimeout]: `${animationTimeout}ms`,
                    }), className: styles.contentContainer, "data-state": status, sideOffset: 5, side: "left", onInteractOutside: e => {
                        // do not close the popup when focus outside (like focus in the editor)
                        e.preventDefault();
                    }, children: [_jsxs("div", { className: clsx(styles.inputContainer, {
                                active: active || isSearching,
                            }), children: [_jsx(SearchIcon, { className: styles.searchIcon }), _jsxs("div", { className: styles.inputMain, children: [_jsx(RowInput, { type: "text", autoFocus: true, value: value, ref: inputRef, style: {
                                                visibility: isSearching ? 'hidden' : 'visible',
                                            }, onBlur: handleBlur, onFocus: handleFocus, className: styles.input, onKeyDown: handleKeydown, onChange: handleValueChange, onScroll: handleScroll, onCompositionStart: handleCompositionStart, onCompositionEnd: handleCompositionEnd }), _jsx(CanvasText, { className: styles.inputHack, text: value, scrollLeft: scrollLeft })] }), _jsx("div", { className: styles.count, children: value.length > 0 && result && result.matches !== 0 ? (_jsxs(_Fragment, { children: [_jsx("span", { children: result?.activeMatchOrdinal || 0 }), _jsx("span", { children: "/" }), _jsx("span", { children: result?.matches || 0 })] })) : value.length ? (_jsx("span", { children: "No matches" })) : null })] }), _jsxs("div", { className: styles.arrowButtonContainer, children: [_jsx(IconButton, { size: "24", className: styles.arrowButton, onClick: handleBackWard, icon: _jsx(ArrowUpSmallIcon, {}) }), _jsx(IconButton, { size: "24", className: styles.arrowButton, onClick: handleForward, icon: _jsx(ArrowDownSmallIcon, {}) })] }), _jsx(IconButton, { onClick: handleDone, icon: _jsx(CloseIcon, {}) })] }) })] }));
};
//# sourceMappingURL=find-in-page-popup.js.map