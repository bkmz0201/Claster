import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Divider, Menu, MenuItem, RowInput, Scrollable, } from '@affine/component';
import { TagService } from '@affine/core/modules/tag';
import { WorkbenchLink } from '@affine/core/modules/workbench';
import { useI18n } from '@affine/i18n';
import { ArrowDownSmallIcon, DoneIcon, SearchIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import clsx from 'clsx';
import { forwardRef, useCallback, useRef, useState, } from 'react';
import * as styles from './list-header.css';
export const TagListHeader = ({ tag }) => {
    const t = useI18n();
    return (_jsxs("header", { className: styles.header, children: [_jsxs("div", { className: styles.breadcrumb, children: [_jsx("div", { className: styles.breadcrumbItem, children: _jsx(WorkbenchLink, { to: "/tag", className: styles.breadcrumbLink, children: t['Tags']() }) }), _jsx("div", { className: styles.breadcrumbSeparator, children: "/" }), _jsx("div", { className: styles.breadcrumbItem, "data-active": true, children: _jsx(TagSelector, { currentTag: tag }) })] }), _jsx("div", { className: styles.headerActions })] }));
};
const contentMenuOptions = {
    align: 'start',
    side: 'bottom',
    sideOffset: 4,
    className: styles.tagSelectorMenuRoot,
};
const TagSelector = ({ currentTag }) => {
    const [isOpen, setIsOpen] = useState(false);
    const onClose = useCallback(() => {
        setIsOpen(false);
    }, []);
    return (_jsx(Menu, { rootOptions: {
            open: isOpen,
            onOpenChange: setIsOpen,
        }, contentOptions: contentMenuOptions, items: _jsx(TagSelectorMenu, { currentTagId: currentTag.id, onClose: onClose }), children: _jsx(TagSelectorTrigger, { currentTag: currentTag }) }));
};
const TagSelectorTrigger = forwardRef(function TagSelectorTrigger({ currentTag, className, ...props }, ref) {
    const tagColor = useLiveData(currentTag.color$);
    const tagName = useLiveData(currentTag.value$);
    return (_jsxs("div", { className: clsx(styles.tagSelectorTrigger, className), ref: ref, ...props, children: [_jsx("div", { className: styles.tagSelectorTriggerIcon, style: { color: tagColor } }), _jsx("div", { className: styles.tagSelectorTriggerName, children: tagName }), _jsx("div", { className: styles.tagSelectorTriggerDropdown, children: _jsx(ArrowDownSmallIcon, {}) })] }));
});
const TagSelectorMenu = ({ currentTagId, onClose, }) => {
    const t = useI18n();
    const [inputValue, setInputValue] = useState('');
    const tagList = useService(TagService).tagList;
    const filteredTags = useLiveData(inputValue ? tagList.filterTagsByName$(inputValue) : tagList.tags$);
    return (_jsxs(_Fragment, { children: [_jsxs("header", { className: styles.tagSelectorMenuHeader, children: [_jsx(SearchIcon, { className: styles.tagSelectorMenuSearchIcon }), _jsx(RowInput, { value: inputValue, onChange: setInputValue, placeholder: t['Search tags']() })] }), _jsx(Divider, { size: "thinner" }), _jsxs(Scrollable.Root, { className: styles.tagSelectorMenuScrollArea, children: [_jsxs(Scrollable.Viewport, { className: styles.tagSelectorMenuViewport, children: [filteredTags.map(tag => {
                                return (_jsx(TagLink, { tag: tag, checked: tag.id === currentTagId, onClick: onClose }, tag.id));
                            }), filteredTags.length === 0 ? (_jsx("div", { className: styles.tagSelectorMenuEmpty, children: t['Find 0 result']() })) : null] }), _jsx(Scrollable.Scrollbar, {})] })] }));
};
const TagLink = ({ tag, checked, onClick, }) => {
    const tagColor = useLiveData(tag.color$);
    const tagTitle = useLiveData(tag.value$);
    const aRef = useRef(null);
    const onSelect = useCallback(() => {
        aRef.current?.click();
    }, []);
    return (_jsx(MenuItem, { onSelect: onSelect, className: styles.tagSelectorMenuItem, children: _jsxs(WorkbenchLink, { ref: aRef, className: styles.tagSelectorItem, "data-tag-id": tag.id, "data-tag-value": tagTitle, to: `/tag/${tag.id}`, onClick: onClick, children: [_jsx("div", { className: styles.tagSelectorItemIcon, style: { color: tagColor } }), _jsx("div", { className: styles.tagSelectorItemText, children: tagTitle }), checked ? (_jsx(DoneIcon, { className: styles.tagSelectorItemCheckedIcon })) : null] }, tag.id) }));
};
//# sourceMappingURL=list-header.js.map