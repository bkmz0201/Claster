import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Checkbox, SafeArea, Scrollable, useThemeColorMeta, } from '@affine/component';
import { PageHeader } from '@affine/core/mobile/components';
import { useI18n } from '@affine/i18n';
import { ArrowRightSmallIcon } from '@blocksuite/icons/rc';
import { cssVarV2 } from '@toeverything/theme/v2';
import { useCallback, useEffect, useMemo, useRef, useState, } from 'react';
import * as styles from './generic.css';
const ChangedRenderer = ({ type, added, removed, }) => {
    const t = useI18n();
    const addedText = added
        ? t['com.affine.m.selector.info-added']({ count: `${added}`, type })
        : '';
    const removedText = removed
        ? t['com.affine.m.selector.info-removed']({
            count: `${removed}`,
            type,
        })
        : '';
    const connector = added && removed ? ' · ' : '';
    return addedText + connector + removedText;
};
export const GenericSelector = ({ initial: originalInitial, data, title, confirmText, typeName, onBack, onConfirm, onBeforeConfirm, }) => {
    const t = useI18n();
    useThemeColorMeta(cssVarV2('layer/background/secondary'));
    const listRef = useRef(null);
    const quickScrollRef = useRef(null);
    const typeText = typeName;
    // make sure "initial ids" exist in list
    const [initial] = useState(originalInitial.filter(id => data.some(el => el.id === id)));
    const [selected, setSelected] = useState(initial);
    const added = useMemo(() => selected.filter(id => !initial.includes(id)), [initial, selected]);
    const removed = useMemo(() => initial.filter(id => !selected.includes(id)), [initial, selected]);
    const disableConfirm = added.length === 0 && removed.length === 0;
    const handleToggleSelected = useCallback((id) => {
        setSelected(prev => {
            if (prev.includes(id)) {
                return prev.filter(v => v !== id);
            }
            else {
                return [...prev, id];
            }
        });
    }, []);
    const handleConfirm = useCallback(() => {
        if (onBeforeConfirm) {
            onBeforeConfirm(selected, () => {
                onConfirm?.(selected);
            });
        }
        else {
            onConfirm?.(selected);
        }
    }, [onBeforeConfirm, onConfirm, selected]);
    // touch & move to select
    useEffect(() => {
        const quickSelect = quickScrollRef.current;
        if (!quickSelect)
            return;
        const reverseThresholdPx = 10;
        const onTouchStart = (e) => {
            e.stopPropagation();
            e.preventDefault();
            let prevIndex = null;
            let prevY = null;
            let prevDir = null;
            let reverseAt = null;
            const check = (e) => {
                const list = listRef.current;
                if (!list)
                    return;
                const { clientY } = e.touches[0];
                if (clientY === prevY)
                    return;
                const rect = list.getBoundingClientRect();
                const index = Math.floor(((clientY - rect.top) / rect.height) * data.length);
                const newDir = prevY === null ? null : clientY > prevY ? 'down' : 'up';
                const dirChanged = prevDir && newDir && newDir !== prevDir;
                const indexChanged = index !== prevIndex;
                if (dirChanged) {
                    reverseAt = clientY;
                }
                const reverseAndMoved = reverseAt && Math.abs(clientY - reverseAt) > reverseThresholdPx;
                if (reverseAndMoved) {
                    reverseAt = null;
                }
                if (index >= 0 &&
                    index < data.length &&
                    (reverseAndMoved || indexChanged)) {
                    handleToggleSelected(data[index].id);
                }
                // update prev
                prevIndex = index;
                prevY = clientY;
                prevDir = newDir;
            };
            check(e);
            const onTouchMove = (e) => {
                e.preventDefault();
                check(e);
            };
            const onTouchEnd = () => {
                document.removeEventListener('touchmove', onTouchMove);
                document.removeEventListener('touchend', onTouchEnd);
            };
            document.addEventListener('touchmove', onTouchMove, { passive: false });
            document.addEventListener('touchend', onTouchEnd);
        };
        quickSelect.addEventListener('touchstart', onTouchStart, {
            passive: false,
        });
        return () => {
            quickSelect.removeEventListener('touchstart', onTouchStart);
        };
    }, [data, handleToggleSelected]);
    return (_jsxs("div", { className: styles.root, children: [_jsx(PageHeader, { back: true, backAction: onBack, children: _jsx("span", { className: styles.headerTitle, children: title ?? t['com.affine.m.selector.title']({ type: typeText }) }) }), _jsxs(Scrollable.Root, { className: styles.scrollArea, children: [_jsx(Scrollable.Scrollbar, {}), _jsx(Scrollable.Viewport, { children: _jsxs("ul", { className: styles.list, ref: listRef, children: [data.map(({ id, icon, label }) => {
                                    return (_jsxs("li", { className: styles.listItem, onClick: () => handleToggleSelected(id), children: [_jsx("div", { className: styles.listItemCheckbox, children: _jsx(Checkbox, { checked: selected.includes(id), onChange: () => handleToggleSelected(id) }) }), _jsx("div", { className: styles.listItemIcon, children: icon }), _jsx("div", { className: styles.listItemLabel, children: label }), _jsx("div", { className: styles.listItemArrow, children: _jsx(ArrowRightSmallIcon, {}) })] }, id));
                                }), _jsx("div", { className: styles.quickSelect, ref: quickScrollRef })] }) })] }), _jsxs(SafeArea, { bottom: true, className: styles.footer, children: [_jsxs("div", { className: styles.info, children: [!disableConfirm ? (_jsx("div", { className: styles.changedInfo, children: _jsx(ChangedRenderer, { added: added.length, removed: removed.length, type: typeText }) })) : null, _jsx("div", { className: styles.totalInfo, children: t['com.affine.m.selector.info-total']({
                                    total: initial.length + '',
                                }) })] }), _jsx("div", { className: styles.actions, children: _jsx(Button, { disabled: disableConfirm, variant: "primary", className: styles.actionButton, onClick: handleConfirm, children: confirmText ?? t['com.affine.m.selector.confirm-default']() }) })] })] }));
};
//# sourceMappingURL=generic-selector.js.map