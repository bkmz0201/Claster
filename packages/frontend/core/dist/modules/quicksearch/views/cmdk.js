import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Loading } from '@affine/component/ui/loading';
import { i18nTime, isI18nString, useI18n } from '@affine/i18n';
import clsx from 'clsx';
import { Command } from 'cmdk';
import { useCallback, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState, } from 'react';
import * as styles from './cmdk.css';
import { HighlightText } from './highlight-text';
export const CMDK = ({ className, query, groups: newGroups = [], error, inputLabel, placeholder, loading: newLoading = false, loadingProgress, onQueryChange, onSubmit, }) => {
    const [opening, setOpening] = useState(false);
    const [loading, setLoading] = useState(false);
    const [{ groups, selectedValue }, dispatch] = useReducer((state, action) => {
        // control the currently selected item so that when the item list changes, the selected item remains controllable
        if (action.type === 'select') {
            return {
                ...state,
                selectedValue: action.payload,
            };
        }
        if (action.type === 'reset-select') {
            // reset selected item to the first item
            const firstItem = state.groups.at(0)?.items.at(0)?.id;
            return {
                ...state,
                selectedValue: firstItem ?? '',
            };
        }
        if (action.type === 'update-groups') {
            const prevGroups = state.groups;
            const prevSelectedValue = state.selectedValue;
            const prevFirstItem = prevGroups.at(0)?.items.at(0)?.id;
            const newFirstItem = action.payload.at(0)?.items.at(0)?.id;
            const isSelectingFirstItem = prevSelectedValue === prevFirstItem;
            // if previous selected item is the first item, select the new first item
            if (isSelectingFirstItem) {
                return {
                    ...state,
                    groups: action.payload,
                    selectedValue: newFirstItem ?? '',
                };
            }
            const selectedExists = state.groups.some(({ items }) => items.some(item => item.id === prevSelectedValue));
            // if previous selected item exists in the new list, keep it
            if (selectedExists) {
                return {
                    ...state,
                    groups: action.payload,
                    selectedValue: prevSelectedValue,
                };
            }
            // if previous selected item does not exist in the new list, select the new first item
            return {
                ...state,
                groups: action.payload,
                selectedExists: newFirstItem ?? '',
            };
        }
        return state;
    }, { groups: [], selectedValue: '' });
    const listRef = useRef(null);
    const inputRef = useRef(null);
    // fix list height animation on opening
    useLayoutEffect(() => {
        setOpening(true);
        const timeout = setTimeout(() => {
            setOpening(false);
            inputRef.current?.focus();
        }, 150);
        return () => {
            clearTimeout(timeout);
        };
    }, []);
    const handleValueChange = useCallback((query) => {
        onQueryChange?.(query);
        dispatch({
            type: 'reset-select',
        });
        requestAnimationFrame(() => {
            if (listRef.current)
                listRef.current.scrollTop = 0;
        });
    }, [onQueryChange]);
    const handleSelectChange = useCallback((value) => {
        dispatch({
            type: 'select',
            payload: value,
        });
    }, [dispatch]);
    useEffect(() => {
        // on group change
        dispatch({
            type: 'update-groups',
            payload: newGroups,
        });
    }, [newGroups]);
    useEffect(() => {
        // debounce loading state
        const timeout = setTimeout(() => setLoading(newLoading), 1000);
        return () => clearTimeout(timeout);
    }, [newLoading]);
    return (_jsxs(Command, { "data-testid": "cmdk-quick-search", shouldFilter: false, className: clsx(className, styles.root, styles.panelContainer), value: selectedValue, onValueChange: handleSelectChange, loop: true, children: [inputLabel ? (_jsx("div", { className: styles.pageTitleWrapper, children: _jsx("span", { className: styles.pageTitle, children: inputLabel }) })) : null, _jsxs("div", { className: clsx(className, styles.searchInputContainer, {
                    [styles.hasInputLabel]: inputLabel,
                }), children: [_jsx(Command.Input, { placeholder: placeholder, ref: inputRef, value: query, onValueChange: handleValueChange, className: clsx(className, styles.searchInput) }), loading ? (_jsx(Loading, { size: 24, progress: loadingProgress ? Math.max(loadingProgress, 0.2) : undefined, speed: loadingProgress ? 0 : undefined })) : null] }), _jsxs(Command.List, { ref: listRef, "data-opening": opening ? true : undefined, children: [error && _jsx("p", { className: styles.errorMessage, children: error }), groups.map(({ group, items }) => {
                        return (_jsx(CMDKGroup, { onSubmit: onSubmit, query: query, group: { group, items } }, group?.id ?? ''));
                    })] })] }));
};
export const CMDKGroup = ({ group: { group, items }, onSubmit, query, }) => {
    const i18n = useI18n();
    return (_jsx(Command.Group, { heading: group && i18n.t(group.label), style: { overflowAnchor: 'none' }, children: items.map(item => {
            const [title, subTitle] = isI18nString(item.label)
                ? [i18n.t(item.label), null]
                : [
                    i18n.t(item.label.title),
                    item.label.subTitle ? i18n.t(item.label.subTitle) : null,
                ];
            return (_jsxs(Command.Item, { onSelect: () => onSubmit?.(item), value: item.id, disabled: item.disabled, "data-is-danger": item.id === 'editor:page-move-to-trash' ||
                    item.id === 'editor:edgeless-move-to-trash', children: [_jsx("div", { className: styles.itemIcon, children: item.icon &&
                            (typeof item.icon === 'function' ? _jsx(item.icon, {}) : item.icon) }), _jsxs("div", { "data-testid": "cmdk-label", className: styles.itemLabel, "data-value": item.id, children: [_jsx("div", { className: styles.itemTitle, children: _jsx(HighlightText, { text: title, start: "<b>", end: "</b>" }) }), subTitle && (_jsx("div", { className: styles.itemSubtitle, children: _jsx(HighlightText, { text: subTitle, start: "<b>", end: "</b>" }) }))] }), item.timestamp ? (_jsx("div", { className: styles.timestamp, children: i18nTime(new Date(item.timestamp)) })) : null, item.keyBinding ? (_jsx(CMDKKeyBinding, { keyBinding: item.keyBinding })) : null] }, item.id));
        }) }, query + ':' + (group?.id ?? '')));
};
const CMDKKeyBinding = ({ keyBinding }) => {
    const isMacOS = environment.isMacOs;
    const fragments = useMemo(() => {
        return keyBinding.split('+').map(fragment => {
            if (fragment === '$mod') {
                return isMacOS ? '⌘' : 'Ctrl';
            }
            if (fragment === 'Alt') {
                return isMacOS ? '⌥' : 'Alt';
            }
            if (fragment.startsWith('Key')) {
                return fragment.slice(3);
            }
            if (fragment === 'ArrowUp') {
                return '↑';
            }
            if (fragment === 'ArrowDown') {
                return '↓';
            }
            if (fragment === 'ArrowLeft') {
                return '←';
            }
            if (fragment === 'ArrowRight') {
                return '→';
            }
            return fragment;
        });
    }, [isMacOS, keyBinding]);
    return (_jsx("div", { className: styles.keybinding, children: fragments.map(fragment => {
            return (_jsx("div", { className: styles.keybindingFragment, children: fragment }, fragment));
        }) }));
};
//# sourceMappingURL=cmdk.js.map