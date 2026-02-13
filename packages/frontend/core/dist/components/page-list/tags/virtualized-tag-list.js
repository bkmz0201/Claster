import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { WorkspaceService } from '@affine/core/modules/workspace';
import { Trans } from '@affine/i18n';
import { useService } from '@toeverything/infra';
import { useCallback, useMemo, useRef, useState } from 'react';
import { ListFloatingToolbar } from '../components/list-floating-toolbar';
import { tagHeaderColsDef } from '../header-col-def';
import { TagOperationCell } from '../operation-cell';
import { TagListItemRenderer } from '../page-group';
import { ListTableHeader } from '../page-header';
import { VirtualizedList } from '../virtualized-list';
import { CreateOrEditTag } from './create-tag';
import { TagListHeader } from './tag-list-header';
export const VirtualizedTagList = ({ tags, tagMetas, onTagDelete, }) => {
    const listRef = useRef(null);
    const [showFloatingToolbar, setShowFloatingToolbar] = useState(false);
    const [showCreateTagInput, setShowCreateTagInput] = useState(false);
    const [selectedTagIds, setSelectedTagIds] = useState([]);
    const currentWorkspace = useService(WorkspaceService).workspace;
    const tagOperations = useCallback((tag) => {
        return _jsx(TagOperationCell, { tag: tag, onTagDelete: onTagDelete });
    }, [onTagDelete]);
    const filteredSelectedTagIds = useMemo(() => {
        const ids = new Set(tags.map(tag => tag.id));
        return selectedTagIds.filter(id => ids.has(id));
    }, [selectedTagIds, tags]);
    const hideFloatingToolbar = useCallback(() => {
        listRef.current?.toggleSelectable();
    }, []);
    const tagOperationRenderer = useCallback((item) => {
        const tag = item;
        return tagOperations(tag);
    }, [tagOperations]);
    const tagHeaderRenderer = useCallback(() => {
        return (_jsxs(_Fragment, { children: [_jsx(ListTableHeader, { headerCols: tagHeaderColsDef }), _jsx(CreateOrEditTag, { open: showCreateTagInput, onOpenChange: setShowCreateTagInput })] }));
    }, [showCreateTagInput]);
    const tagItemRenderer = useCallback((item) => {
        return _jsx(TagListItemRenderer, { ...item });
    }, []);
    const handleDelete = useCallback(() => {
        if (selectedTagIds.length === 0) {
            return;
        }
        onTagDelete(selectedTagIds);
        hideFloatingToolbar();
        return;
    }, [hideFloatingToolbar, onTagDelete, selectedTagIds]);
    const onOpenCreate = useCallback(() => {
        setShowCreateTagInput(true);
    }, [setShowCreateTagInput]);
    return (_jsxs(_Fragment, { children: [_jsx(VirtualizedList, { ref: listRef, selectable: "toggle", draggable: true, atTopThreshold: 80, onSelectionActiveChange: setShowFloatingToolbar, heading: _jsx(TagListHeader, { onOpen: onOpenCreate }), selectedIds: filteredSelectedTagIds, onSelectedIdsChange: setSelectedTagIds, items: tagMetas, itemRenderer: tagItemRenderer, rowAsLink: true, docCollection: currentWorkspace.docCollection, operationsRenderer: tagOperationRenderer, headerRenderer: tagHeaderRenderer }), _jsx(ListFloatingToolbar, { open: showFloatingToolbar, content: _jsxs(Trans, { i18nKey: "com.affine.tag.toolbar.selected", count: selectedTagIds.length, children: [_jsx("div", { style: { color: 'var(--affine-text-secondary-color)' }, children: { count: selectedTagIds.length } }), "selected"] }), onClose: hideFloatingToolbar, onDelete: handleDelete })] }));
};
//# sourceMappingURL=virtualized-tag-list.js.map