import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Avatar, Divider, Menu, MenuItem, RowInput, Scrollable, } from '@affine/component';
import { MemberSearchService, } from '@affine/core/modules/permissions';
import { DoneIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import clsx from 'clsx';
import { clamp, debounce } from 'lodash-es';
import { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState, } from 'react';
import { ConfigModal } from '../mobile';
import { InlineMemberList } from './inline-member-list';
import * as styles from './styles.css';
const MemberSelectItem = ({ member, style }) => {
    const { name, avatarUrl } = member;
    return (_jsxs("div", { className: styles.memberItemListMode, style: style, children: [_jsx(Avatar, { url: avatarUrl, name: name ?? '', size: 20, className: styles.memberItemAvatar }), _jsx("div", { className: styles.memberItemLabel, children: name })] }));
};
export const MemberSelector = ({ selected, className, onChange, style, }) => {
    const [inputValue, setInputValue] = useState('');
    const memberSearchService = useService(MemberSearchService);
    const searchedMembers = useLiveData(memberSearchService.result$);
    useEffect(() => {
        // reset the search text when the component is mounted
        memberSearchService.reset();
        memberSearchService.loadMore();
    }, [memberSearchService]);
    const debouncedSearch = useMemo(() => debounce((value) => memberSearchService.search(value), 300), [memberSearchService]);
    const inputRef = useRef(null);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [focusedInlineIndex, setFocusedInlineIndex] = useState(-1);
    // -1: no focus
    const safeFocusedIndex = clamp(focusedIndex, -1, searchedMembers.length - 1);
    // inline tags focus index can go beyond the length of tagIds
    // using -1 and tagIds.length to make keyboard navigation easier
    const safeInlineFocusedIndex = clamp(focusedInlineIndex, -1, selected.length);
    const scrollContainerRef = useRef(null);
    const onInputChange = useCallback((value) => {
        setInputValue(value);
        if (value.length > 0) {
            setFocusedInlineIndex(selected.length);
        }
        debouncedSearch(value.trim());
    }, [debouncedSearch, selected.length]);
    const onToggleMember = useCallback((id) => {
        if (!selected.includes(id)) {
            onChange([...selected, id]);
        }
        else {
            onChange(selected.filter(itemId => itemId !== id));
        }
    }, [selected, onChange]);
    const focusInput = useCallback(() => {
        inputRef.current?.focus();
    }, []);
    const onSelectTagOption = useCallback((member) => {
        onToggleMember(member.id);
        setInputValue('');
        focusInput();
        setFocusedIndex(-1);
        setFocusedInlineIndex(selected.length + 1);
    }, [onToggleMember, focusInput, selected.length]);
    const onEnter = useCallback(() => {
        if (safeFocusedIndex >= 0) {
            onSelectTagOption(searchedMembers[safeFocusedIndex]);
        }
    }, [onSelectTagOption, safeFocusedIndex, searchedMembers]);
    const handleUnselectMember = useCallback((id) => {
        onToggleMember(id);
        focusInput();
    }, [onToggleMember, focusInput]);
    const onInputKeyDown = useCallback((e) => {
        if (e.key === 'Backspace') {
            if (inputValue.length > 0 || selected.length === 0) {
                return;
            }
            e.preventDefault();
            const index = safeInlineFocusedIndex < 0 ||
                safeInlineFocusedIndex >= selected.length
                ? selected.length - 1
                : safeInlineFocusedIndex;
            const memberToRemove = selected.at(index);
            if (memberToRemove) {
                handleUnselectMember(memberToRemove);
            }
        }
        else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
            const newFocusedIndex = clamp(safeFocusedIndex + (e.key === 'ArrowUp' ? -1 : 1), 0, searchedMembers.length - 1);
            scrollContainerRef.current
                ?.querySelector(`.${styles.memberSelectorItem}:nth-child(${newFocusedIndex + 1})`)
                ?.scrollIntoView({ block: 'nearest' });
            setFocusedIndex(newFocusedIndex);
            // reset inline focus
            setFocusedInlineIndex(selected.length + 1);
        }
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            if (inputValue.length > 0 || selected.length === 0) {
                return;
            }
            const newItemToFocus = e.key === 'ArrowLeft'
                ? safeInlineFocusedIndex - 1
                : safeInlineFocusedIndex + 1;
            e.preventDefault();
            setFocusedInlineIndex(newItemToFocus);
            // reset tag list focus
            setFocusedIndex(-1);
        }
    }, [
        inputValue.length,
        selected,
        safeInlineFocusedIndex,
        handleUnselectMember,
        safeFocusedIndex,
        searchedMembers.length,
    ]);
    return (_jsxs("div", { style: style, "data-testid": "tags-editor-popup", className: clsx(className, BUILD_CONFIG.isMobileEdition
            ? styles.memberSelectorRootMobile
            : styles.memberSelectorRoot), children: [_jsxs("div", { className: styles.memberSelectorSelectedTags, children: [_jsx(InlineMemberList, { members: selected, onRemove: handleUnselectMember, focusedIndex: safeInlineFocusedIndex, children: _jsx(RowInput, { ref: inputRef, value: inputValue, onChange: onInputChange, onKeyDown: onInputKeyDown, onEnter: onEnter, autoFocus: true, className: styles.searchInput, placeholder: "Type here ..." }) }), BUILD_CONFIG.isMobileEdition ? null : (_jsx(MenuItem, { className: styles.memberSelectorDoneButton, prefixIcon: _jsx(DoneIcon, {}) }))] }), BUILD_CONFIG.isMobileEdition ? null : (_jsx(Divider, { size: "thinner", className: styles.memberDivider })), _jsx("div", { className: styles.memberSelectorBody, children: _jsxs(Scrollable.Root, { children: [_jsxs(Scrollable.Viewport, { ref: scrollContainerRef, className: styles.memberSelectorScrollContainer, children: [searchedMembers.length === 0 && (_jsx("div", { className: styles.memberSelectorEmpty, children: "Nothing here yet" })), searchedMembers.map((member, idx) => {
                                    const commonProps = {
                                        ...(safeFocusedIndex === idx ? { focused: 'true' } : {}),
                                        onClick: () => onSelectTagOption(member),
                                        onMouseEnter: () => setFocusedIndex(idx),
                                        ['data-testid']: 'tag-selector-item',
                                        ['data-focused']: safeFocusedIndex === idx,
                                        className: styles.memberSelectorItem,
                                    };
                                    return (_jsx("div", { ...commonProps, "data-member-id": member.id, "data-member-name": member.name, children: _jsx(MemberSelectItem, { member: member }) }, member.id));
                                })] }), _jsx(Scrollable.Scrollbar, { style: { transform: 'translateX(6px)' } })] }) })] }));
};
const MobileMemberSelectorInline = ({ readonly, placeholder, className, title, style, onEditorClose, ref, ...props }) => {
    const [editing, setEditing] = useState(false);
    useImperativeHandle(ref, () => ({
        changeOpen: (open) => {
            setEditing(open);
            if (!open) {
                onEditorClose?.();
            }
        },
    }), [onEditorClose]);
    const empty = !props.selected || props.selected.length === 0;
    return (_jsxs(_Fragment, { children: [_jsx(ConfigModal, { title: title, open: editing, onOpenChange: setEditing, onBack: () => {
                    setEditing(false);
                    onEditorClose?.();
                }, children: _jsx(MemberSelector, { ...props }) }), _jsx("div", { className: clsx(styles.membersSelectorInline, className), "data-empty": empty, "data-readonly": readonly, onClick: () => setEditing(true), style: style, children: empty ? placeholder : _jsx(InlineMemberList, { members: props.selected }) })] }));
};
const DesktopMemberSelectorInline = ({ readonly, placeholder, className, modalMenu, menuClassName, style, selected, ref, onEditorClose, ...props }) => {
    const empty = !selected || selected.length === 0;
    return (_jsx(Menu, { ref: ref, contentOptions: {
            side: 'bottom',
            align: 'start',
            sideOffset: 0,
            avoidCollisions: false,
            className: clsx(styles.memberSelectorMenu, menuClassName),
            onClick(e) {
                e.stopPropagation();
            },
        }, rootOptions: {
            open: readonly ? false : undefined,
            modal: modalMenu,
            onClose: onEditorClose,
        }, items: _jsx(MemberSelector, { selected: selected, ...props }), children: _jsx("div", { className: clsx(styles.membersSelectorInline, className), "data-empty": empty, "data-readonly": readonly, style: style, children: empty ? placeholder : _jsx(InlineMemberList, { members: selected }) }) }));
};
export const MemberSelectorInline = BUILD_CONFIG.isMobileEdition
    ? MobileMemberSelectorInline
    : DesktopMemberSelectorInline;
//# sourceMappingURL=index.js.map