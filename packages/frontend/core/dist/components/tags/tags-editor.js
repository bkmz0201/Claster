import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Divider, IconButton, Menu, MenuItem, RowInput, Scrollable, } from '@affine/component';
import { TagService, useDeleteTagConfirmModal } from '@affine/core/modules/tag';
import { useI18n } from '@affine/i18n';
import { DoneIcon, MoreHorizontalIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import clsx from 'clsx';
import { clamp } from 'lodash-es';
import { useCallback, useImperativeHandle, useMemo, useReducer, useRef, useState, } from 'react';
import { useAsyncCallback } from '../hooks/affine-async-hooks';
import { ConfigModal } from '../mobile';
import { InlineTagList } from './inline-tag-list';
import * as styles from './styles.css';
import { TagItem } from './tag';
import { TagEditMenu } from './tag-edit-menu';
const isCreateNewTag = (tagOption) => {
    return 'create' in tagOption;
};
export const TagsEditor = ({ tags, selectedTags, onSelectTag, onDeselectTag, onCreateTag, tagColors, onDeleteTag, onTagChange, jumpToTag, tagMode, style, }) => {
    const t = useI18n();
    const [inputValue, setInputValue] = useState('');
    const trimmedInputValue = inputValue.trim();
    const filteredTags = tags.filter(tag => tag.name.toLowerCase().includes(trimmedInputValue.toLowerCase()));
    const inputRef = useRef(null);
    const exactMatch = filteredTags.find(tag => tag.name === trimmedInputValue);
    const showCreateTag = !exactMatch && trimmedInputValue;
    // tag option candidates to show in the tag dropdown
    const tagOptions = useMemo(() => {
        if (showCreateTag) {
            return [
                { create: true, value: trimmedInputValue },
                ...filteredTags,
            ];
        }
        else {
            return filteredTags;
        }
    }, [filteredTags, showCreateTag, trimmedInputValue]);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [focusedInlineIndex, setFocusedInlineIndex] = useState(selectedTags.length);
    // -1: no focus
    const safeFocusedIndex = clamp(focusedIndex, -1, tagOptions.length - 1);
    // inline tags focus index can go beyond the length of tagIds
    // using -1 and tagIds.length to make keyboard navigation easier
    const safeInlineFocusedIndex = clamp(focusedInlineIndex, -1, selectedTags.length);
    const scrollContainerRef = useRef(null);
    const onInputChange = useCallback((value) => {
        setInputValue(value);
        if (value.length > 0) {
            setFocusedInlineIndex(selectedTags.length);
        }
    }, [selectedTags.length]);
    const onToggleTag = useCallback((id) => {
        if (!selectedTags.includes(id)) {
            onSelectTag(id);
        }
        else {
            onDeselectTag(id);
        }
    }, [selectedTags, onSelectTag, onDeselectTag]);
    const focusInput = useCallback(() => {
        inputRef.current?.focus();
    }, []);
    const [nextColor, rotateNextColor] = useReducer(color => {
        const idx = tagColors.findIndex(c => c.value === color);
        return tagColors[(idx + 1) % tagColors.length].value;
    }, tagColors[Math.floor(Math.random() * tagColors.length)].value);
    const handleCreateTag = useCallback((name) => {
        rotateNextColor();
        const newTag = onCreateTag(name.trim(), nextColor);
        return newTag.id;
    }, [onCreateTag, nextColor]);
    const handleDeleteTag = useCallback((tagId) => {
        onDeleteTag(tagId);
    }, [onDeleteTag]);
    const onSelectTagOption = useCallback((tagOption) => {
        const id = isCreateNewTag(tagOption)
            ? handleCreateTag(tagOption.value)
            : tagOption.id;
        onToggleTag(id);
        setInputValue('');
        focusInput();
        setFocusedIndex(-1);
        setFocusedInlineIndex(selectedTags.length + 1);
    }, [handleCreateTag, onToggleTag, focusInput, selectedTags.length]);
    const onEnter = useCallback(() => {
        if (safeFocusedIndex >= 0) {
            onSelectTagOption(tagOptions[safeFocusedIndex]);
        }
    }, [onSelectTagOption, safeFocusedIndex, tagOptions]);
    const handleUntag = useCallback((id) => {
        onToggleTag(id);
        focusInput();
    }, [onToggleTag, focusInput]);
    const onInputKeyDown = useCallback((e) => {
        if (e.key === 'Backspace') {
            if (inputValue.length > 0 || selectedTags.length === 0) {
                return;
            }
            e.preventDefault();
            const index = safeInlineFocusedIndex < 0 ||
                safeInlineFocusedIndex >= selectedTags.length
                ? selectedTags.length - 1
                : safeInlineFocusedIndex;
            const tagToRemove = selectedTags.at(index);
            if (tagToRemove) {
                onDeselectTag(tagToRemove);
            }
        }
        else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
            const newFocusedIndex = clamp(safeFocusedIndex + (e.key === 'ArrowUp' ? -1 : 1), 0, tagOptions.length - 1);
            scrollContainerRef.current
                ?.querySelector(`.${styles.tagSelectorItem}:nth-child(${newFocusedIndex + 1})`)
                ?.scrollIntoView({ block: 'nearest' });
            setFocusedIndex(newFocusedIndex);
            // reset inline focus
            setFocusedInlineIndex(selectedTags.length + 1);
        }
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            if (inputValue.length > 0 || selectedTags.length === 0) {
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
        inputValue,
        safeInlineFocusedIndex,
        selectedTags,
        onDeselectTag,
        safeFocusedIndex,
        tagOptions.length,
    ]);
    return (_jsxs("div", { style: style, "data-testid": "tags-editor-popup", className: BUILD_CONFIG.isMobileEdition
            ? styles.tagsEditorRootMobile
            : styles.tagsEditorRoot, children: [_jsxs("div", { className: styles.tagsEditorSelectedTags, children: [_jsx(InlineTagList, { tagMode: tagMode, tags: tags.filter(tag => selectedTags.includes(tag.id)), focusedIndex: safeInlineFocusedIndex, onRemoved: handleUntag, children: _jsx(RowInput, { ref: inputRef, value: inputValue, onChange: onInputChange, onKeyDown: onInputKeyDown, onEnter: onEnter, autoFocus: true, className: styles.searchInput, placeholder: "Type here ..." }) }), BUILD_CONFIG.isMobileEdition ? null : (_jsx(MenuItem, { className: styles.tagsEditorDoneButton, prefixIcon: _jsx(DoneIcon, {}) }))] }), BUILD_CONFIG.isMobileEdition ? null : (_jsx(Divider, { size: "thinner", className: styles.tagDivider })), _jsxs("div", { className: styles.tagsEditorTagsSelector, children: [_jsx("div", { className: styles.tagsEditorTagsSelectorHeader, children: t['com.affine.page-properties.tags.selector-header-title']() }), _jsxs(Scrollable.Root, { children: [_jsxs(Scrollable.Viewport, { ref: scrollContainerRef, className: styles.tagSelectorTagsScrollContainer, children: [tagOptions.length === 0 && (_jsx("div", { className: styles.tagSelectorEmpty, children: "Nothing here yet" })), tagOptions.map((tag, idx) => {
                                        const commonProps = {
                                            ...(safeFocusedIndex === idx ? { focused: 'true' } : {}),
                                            onClick: () => onSelectTagOption(tag),
                                            onMouseEnter: () => setFocusedIndex(idx),
                                            ['data-testid']: 'tag-selector-item',
                                            ['data-focused']: safeFocusedIndex === idx,
                                            className: styles.tagSelectorItem,
                                        };
                                        if (isCreateNewTag(tag)) {
                                            return (_jsxs("div", { ...commonProps, children: [t['Create'](), ' ', _jsx(TagItem, { mode: tagMode, tag: {
                                                            id: 'create-new-tag',
                                                            name: inputValue,
                                                            color: nextColor,
                                                        } })] }, tag.value + '.' + idx));
                                        }
                                        else {
                                            return (_jsxs("div", { ...commonProps, "data-tag-id": tag.id, "data-tag-value": tag.name, children: [_jsx(TagItem, { maxWidth: "100%", tag: tag, mode: tagMode }), _jsx("div", { className: styles.spacer }), _jsx(TagEditMenu, { tag: tag, onTagDelete: handleDeleteTag, onTagChange: (property, value) => {
                                                            onTagChange(tag.id, property, value);
                                                        }, jumpToTag: jumpToTag, colors: tagColors, children: _jsx(IconButton, { className: styles.tagEditIcon, children: _jsx(MoreHorizontalIcon, {}) }) })] }, tag.id));
                                        }
                                    })] }), _jsx(Scrollable.Scrollbar, { style: { transform: 'translateX(6px)' } })] })] })] }));
};
const MobileInlineEditor = ({ readonly, placeholder, className, title, style, onEditorClose, ref, ...props }) => {
    const [editing, setEditing] = useState(false);
    useImperativeHandle(ref, () => ({
        changeOpen: (open) => {
            setEditing(open);
            if (!open) {
                onEditorClose?.();
            }
        },
    }), [onEditorClose]);
    const empty = !props.selectedTags || props.selectedTags.length === 0;
    const selectedTags = useMemo(() => {
        return props.selectedTags
            .map(id => props.tags.find(tag => tag.id === id))
            .filter(tag => tag !== undefined);
    }, [props.selectedTags, props.tags]);
    return (_jsxs(_Fragment, { children: [_jsx(ConfigModal, { title: title, open: editing, onOpenChange: setEditing, onBack: () => {
                    setEditing(false);
                    onEditorClose?.();
                }, children: _jsx(TagsEditor, { ...props }) }), _jsx("div", { className: clsx(styles.tagsInlineEditor, className), "data-empty": empty, "data-readonly": readonly, onClick: () => setEditing(true), style: style, children: empty ? (placeholder) : (_jsx(InlineTagList, { ...props, tags: selectedTags, onRemoved: undefined })) })] }));
};
const DesktopTagsInlineEditor = ({ readonly, placeholder, className, modalMenu, menuClassName, style, ref, onEditorClose, ...props }) => {
    const empty = !props.selectedTags || props.selectedTags.length === 0;
    const selectedTags = useMemo(() => {
        return props.selectedTags
            .map(id => props.tags.find(tag => tag.id === id))
            .filter(tag => tag !== undefined);
    }, [props.selectedTags, props.tags]);
    return (_jsx(Menu, { ref: ref, contentOptions: {
            side: 'bottom',
            align: 'start',
            sideOffset: 0,
            avoidCollisions: false,
            className: clsx(styles.tagsMenu, menuClassName),
            onClick(e) {
                e.stopPropagation();
            },
        }, rootOptions: {
            modal: modalMenu,
            onClose: onEditorClose,
        }, items: _jsx(TagsEditor, { ...props }), children: _jsx("div", { className: clsx(styles.tagsInlineEditor, className), "data-empty": empty, "data-readonly": readonly, style: style, children: empty ? (placeholder) : (_jsx(InlineTagList, { ...props, title: "", tags: selectedTags, onRemoved: undefined })) }) }));
};
export const TagsInlineEditor = BUILD_CONFIG.isMobileEdition
    ? MobileInlineEditor
    : DesktopTagsInlineEditor;
export const WorkspaceTagsInlineEditor = ({ selectedTags, onDeselectTag, ref, onEditorClose, ...otherProps }) => {
    const tagService = useService(TagService);
    const tags = useLiveData(tagService.tagList.tagMetas$);
    const openDeleteTagConfirmModal = useDeleteTagConfirmModal();
    const tagColors = tagService.tagColors;
    const adaptedTagColors = useMemo(() => {
        return tagColors.map(color => ({
            id: color[0],
            value: color[1],
            name: color[0],
        }));
    }, [tagColors]);
    const onDeleteTag = useAsyncCallback(async (tagId) => {
        if (await openDeleteTagConfirmModal([tagId])) {
            tagService.tagList.deleteTag(tagId);
            if (selectedTags.includes(tagId)) {
                onDeselectTag(tagId);
            }
        }
    }, [tagService.tagList, openDeleteTagConfirmModal, selectedTags, onDeselectTag]);
    const onCreateTag = useCallback((name, color) => {
        const newTag = tagService.tagList.createTag(name, color);
        return {
            id: newTag.id,
            name: newTag.value$.value,
            color: newTag.color$.value,
        };
    }, [tagService.tagList]);
    const onTagChange = useCallback((id, property, value) => {
        if (property === 'name') {
            tagService.tagList.tagByTagId$(id).value?.rename(value);
        }
        else if (property === 'color') {
            tagService.tagList.tagByTagId$(id).value?.changeColor(value);
        }
    }, [tagService.tagList]);
    return (_jsx(TagsInlineEditor, { tags: tags, selectedTags: selectedTags, onDeselectTag: onDeselectTag, tagColors: adaptedTagColors, onCreateTag: onCreateTag, onDeleteTag: onDeleteTag, onTagChange: onTagChange, ref: ref, onEditorClose: onEditorClose, ...otherProps }));
};
//# sourceMappingURL=tags-editor.js.map