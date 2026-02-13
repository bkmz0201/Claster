import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Checkbox, ContextMenu, DragHandle as DragHandleIcon, Tooltip, useDraggable, } from '@affine/component';
import { DocsService } from '@affine/core/modules/doc';
import { DocDisplayMetaService } from '@affine/core/modules/doc-display-meta';
import { WorkbenchLink } from '@affine/core/modules/workbench';
import { useI18n } from '@affine/i18n';
import track from '@affine/track';
import { AutoTidyUpIcon, PropertyIcon, ResizeTidyUpIcon, } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { memo, useCallback, useContext, } from 'react';
import { PagePreview } from '../../page-list/page-content-preview';
import { DocExplorerContext } from '../context';
import { quickActions } from '../quick-actions.constants';
import * as styles from './doc-list-item.css';
import { MoreMenuButton, MoreMenuContent } from './more-menu';
import { CardViewProperties, ListViewProperties } from './properties';
export const DocListViewIcon = ({ view, ...props }) => {
    const Component = {
        list: PropertyIcon,
        grid: ResizeTidyUpIcon,
        masonry: AutoTidyUpIcon,
    }[view];
    return _jsx(Component, { ...props });
};
class MixId {
    static { this.connector = '||'; }
    static create(groupId, docId) {
        return `${groupId}${this.connector}${docId}`;
    }
    static parse(mixId) {
        if (!mixId) {
            return { groupId: null, docId: null };
        }
        const [groupId, docId] = mixId.split(this.connector);
        return { groupId, docId };
    }
}
export const DocListItem = ({ ...props }) => {
    const contextValue = useContext(DocExplorerContext);
    const view = useLiveData(contextValue.view$) ?? 'list';
    const groups = useLiveData(contextValue.groups$);
    const selectMode = useLiveData(contextValue.selectMode$);
    const selectedDocIds = useLiveData(contextValue.selectedDocIds$);
    const prevCheckAnchorId = useLiveData(contextValue.prevCheckAnchorId$);
    const handleMultiSelect = useCallback((prevCursor, currCursor) => {
        const flattenList = groups.flatMap(group => group.items.map(docId => MixId.create(group.key, docId)));
        const prev = contextValue.selectedDocIds$?.value ?? [];
        const prevIndex = flattenList.indexOf(prevCursor);
        const currIndex = flattenList.indexOf(currCursor);
        const lowerIndex = Math.min(prevIndex, currIndex);
        const upperIndex = Math.max(prevIndex, currIndex);
        const resSet = new Set(prev);
        const handledSet = new Set();
        for (let i = lowerIndex; i <= upperIndex; i++) {
            const mixId = flattenList[i];
            const { groupId, docId } = MixId.parse(mixId);
            if (groupId === null || docId === null) {
                continue;
            }
            if (handledSet.has(docId) || mixId === prevCursor) {
                continue;
            }
            if (resSet.has(docId)) {
                resSet.delete(docId);
            }
            else {
                resSet.add(docId);
            }
            handledSet.add(docId);
        }
        contextValue.selectedDocIds$?.next(Array.from(resSet));
        contextValue.prevCheckAnchorId$?.next(currCursor);
    }, [contextValue, groups]);
    const handleClick = useCallback((e) => {
        const { docId, groupId } = props;
        const currCursor = MixId.create(groupId, docId);
        if (selectMode || e.shiftKey) {
            e.preventDefault();
        }
        if (selectMode) {
            if (e.shiftKey && prevCheckAnchorId) {
                // do multi select
                handleMultiSelect(prevCheckAnchorId, currCursor);
            }
            else {
                contextValue.selectedDocIds$?.next(contextValue.selectedDocIds$.value.includes(docId)
                    ? contextValue.selectedDocIds$.value.filter(id => id !== docId)
                    : [...contextValue.selectedDocIds$.value, docId]);
                contextValue.prevCheckAnchorId$?.next(currCursor);
            }
        }
        else {
            if (e.shiftKey) {
                contextValue.selectMode$?.next(true);
                contextValue.selectedDocIds$?.next([docId]);
                contextValue.prevCheckAnchorId$?.next(currCursor);
                return;
            }
            else {
                // as link
                track.allDocs.list.doc.openDoc();
                return;
            }
        }
    }, [contextValue, handleMultiSelect, prevCheckAnchorId, props, selectMode]);
    const { dragRef, CustomDragPreview } = useDraggable(() => ({
        canDrag: true,
        data: {
            entity: {
                type: 'doc',
                id: props.docId,
            },
            from: {
                at: 'all-docs:list',
            },
        },
    }), [props.docId]);
    return (_jsxs(_Fragment, { children: [_jsx(WorkbenchLink, { ref: dragRef, draggable: false, to: `/${props.docId}`, onClick: handleClick, "data-selected": selectedDocIds.includes(props.docId), className: styles.root, "data-testid": `doc-list-item`, "data-doc-id": props.docId, children: view === 'list' ? (_jsx(ListViewDoc, { ...props })) : (_jsx(CardViewDoc, { ...props })) }), _jsx(CustomDragPreview, { children: _jsxs("div", { className: styles.dragPreview, children: [_jsx(RawDocIcon, { id: props.docId, className: styles.dragPreviewIcon }), _jsx(RawDocTitle, { id: props.docId })] }) })] }));
};
const RawDocIcon = memo(function RawDocIcon({ id, ...props }) {
    const docDisplayMetaService = useService(DocDisplayMetaService);
    const Icon = useLiveData(id ? docDisplayMetaService.icon$(id) : null);
    return _jsx(Icon, { ...props });
});
const RawDocTitle = memo(function RawDocTitle({ id }) {
    const docDisplayMetaService = useService(DocDisplayMetaService);
    const title = useLiveData(docDisplayMetaService.title$(id));
    return title;
});
const RawDocPreview = memo(function RawDocPreview({ id, loading, }) {
    return _jsx(PagePreview, { pageId: id, fallback: loading });
});
const DragHandle = memo(function DragHandle({ id, ...props }) {
    const contextValue = useContext(DocExplorerContext);
    const selectMode = useLiveData(contextValue.selectMode$);
    const showDragHandle = useLiveData(contextValue.showDragHandle$);
    if (selectMode || !id || !showDragHandle) {
        return null;
    }
    return (_jsx("div", { ...props, children: _jsx(DragHandleIcon, {}) }));
});
const Select = memo(function Select({ id, ...props }) {
    const contextValue = useContext(DocExplorerContext);
    const selectMode = useLiveData(contextValue.selectMode$);
    const selectedDocIds = useLiveData(contextValue.selectedDocIds$);
    const handleSelectChange = useCallback(() => {
        id && contextValue.selectedDocIds$?.next([id]);
    }, [id, contextValue]);
    if (!id) {
        return null;
    }
    return (_jsx("div", { "data-select-mode": selectMode, "data-testid": `doc-list-item-select`, ...props, children: _jsx(Checkbox, { checked: selectedDocIds.includes(id), onChange: handleSelectChange }) }));
});
// Different with RawDocIcon, refer to `ExplorerDisplayPreference.showDocIcon`
const DocIcon = memo(function DocIcon({ id, ...props }) {
    const contextValue = useContext(DocExplorerContext);
    const showDocIcon = useLiveData(contextValue.showDocIcon$);
    if (!showDocIcon) {
        return null;
    }
    return (_jsx("div", { ...props, children: _jsx(RawDocIcon, { id: id }) }));
});
const DocTitle = memo(function DocTitle({ id, ...props }) {
    if (!id)
        return null;
    return (_jsx("div", { ...props, children: _jsx(RawDocTitle, { id: id }) }));
});
const DocPreview = memo(function DocPreview({ id, loading, ...props }) {
    const contextValue = useContext(DocExplorerContext);
    const showDocPreview = useLiveData(contextValue.showDocPreview$);
    if (!id || !showDocPreview)
        return null;
    return (_jsx("div", { ...props, children: _jsx(RawDocPreview, { id: id, loading: loading }) }));
});
const listMoreMenuContentOptions = {
    side: 'bottom',
    align: 'end',
    sideOffset: 12,
    alignOffset: -4,
};
export const ListViewDoc = ({ docId }) => {
    const t = useI18n();
    const docsService = useService(DocsService);
    const doc = useLiveData(docsService.list.doc$(docId));
    const contextValue = useContext(DocExplorerContext);
    const showMoreOperation = useLiveData(contextValue.showMoreOperation$);
    if (!doc) {
        return null;
    }
    return (_jsx(ContextMenu, { asChild: true, disabled: !showMoreOperation, items: _jsx(MoreMenuContent, { docId: docId }), children: _jsxs("li", { className: styles.listViewRoot, children: [_jsx(DragHandle, { id: docId, className: styles.listDragHandle }), _jsx(Select, { id: docId, className: styles.listSelect }), _jsx(DocIcon, { id: docId, className: styles.listIcon }), _jsxs("div", { className: styles.listBrief, children: [_jsx(DocTitle, { id: docId, className: styles.listTitle, "data-testid": "doc-list-item-title" }), _jsx(DocPreview, { id: docId, className: styles.listPreview })] }), _jsx("div", { className: styles.listSpace }), _jsx(ListViewProperties, { docId: docId }), quickActions.map(action => {
                    return (_jsx(Tooltip, { content: t.t(action.name), children: _jsx(action.Component, { doc: doc }) }, action.key));
                }), _jsx(MoreMenuButton, { docId: docId, contentOptions: listMoreMenuContentOptions })] }) }));
};
const cardMoreMenuContentOptions = {
    side: 'bottom',
    align: 'end',
    sideOffset: 12,
    alignOffset: -4,
};
export const CardViewDoc = ({ docId }) => {
    const t = useI18n();
    const contextValue = useContext(DocExplorerContext);
    const selectMode = useLiveData(contextValue.selectMode$);
    const docsService = useService(DocsService);
    const doc = useLiveData(docsService.list.doc$(docId));
    const showMoreOperation = useLiveData(contextValue.showMoreOperation$);
    if (!doc) {
        return null;
    }
    return (_jsx(ContextMenu, { asChild: true, disabled: !showMoreOperation, items: _jsx(MoreMenuContent, { docId: docId }), children: _jsxs("li", { className: styles.cardViewRoot, children: [_jsx(DragHandle, { id: docId, className: styles.cardDragHandle }), _jsxs("header", { className: styles.cardViewHeader, children: [_jsx(DocIcon, { id: docId, className: styles.cardViewIcon }), _jsx(DocTitle, { id: docId, className: styles.cardViewTitle, "data-testid": "doc-list-item-title" }), quickActions.map(action => {
                            return (_jsx(Tooltip, { content: t.t(action.name), children: _jsx(action.Component, { size: "16", doc: doc }) }, action.key));
                        }), selectMode ? (_jsx(Select, { id: docId, className: styles.cardViewCheckbox })) : (_jsx(MoreMenuButton, { docId: docId, contentOptions: cardMoreMenuContentOptions, iconProps: { size: '16' } }))] }), _jsx(DocPreview, { id: docId, className: styles.cardPreviewContainer }), _jsx(CardViewProperties, { docId: docId })] }) }));
};
//# sourceMappingURL=doc-list-item.js.map