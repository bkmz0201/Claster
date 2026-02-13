import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, IconButton } from '@affine/component';
import { useI18n } from '@affine/i18n';
import { ToggleRightIcon } from '@blocksuite/icons/rc';
import { useLiveData } from '@toeverything/infra';
import clsx from 'clsx';
import { useCallback, useContext, } from 'react';
import { DocExplorerContext } from '../context';
import * as styles from './group-header.css';
export const DocGroupHeader = ({ className, groupId, ...props }) => {
    const t = useI18n();
    const contextValue = useContext(DocExplorerContext);
    const groups = useLiveData(contextValue.groups$);
    const selectedDocIds = useLiveData(contextValue.selectedDocIds$);
    const collapsedGroups = useLiveData(contextValue.collapsedGroups$);
    const selectMode = useLiveData(contextValue.selectMode$);
    const group = groups.find(g => g.key === groupId);
    const isGroupAllSelected = group?.items.every(id => selectedDocIds.includes(id));
    const handleToggleCollapse = useCallback(() => {
        const prev = contextValue.collapsedGroups$.value;
        contextValue.collapsedGroups$.next(prev.includes(groupId)
            ? prev.filter(id => id !== groupId)
            : [...prev, groupId]);
    }, [groupId, contextValue]);
    const handleSelectAll = useCallback(() => {
        if (!contextValue.selectMode$?.value) {
            contextValue.selectMode$?.next(true);
        }
        const prev = contextValue.selectedDocIds$.value;
        if (isGroupAllSelected) {
            contextValue.selectedDocIds$.next(prev.filter(id => !group?.items.includes(id)));
        }
        else {
            const newSelected = [...prev];
            group?.items.forEach(id => {
                if (!newSelected.includes(id)) {
                    newSelected.push(id);
                }
            });
            contextValue.selectedDocIds$.next(newSelected);
        }
    }, [contextValue, group?.items, isGroupAllSelected]);
    const selectedCount = group?.items.filter(id => selectedDocIds.includes(id)).length;
    return (_jsxs("div", { className: styles.groupHeader, "data-collapsed": collapsedGroups.includes(groupId), children: [_jsx("div", { className: clsx(styles.content, className), ...props }), selectMode ? (_jsxs("div", { className: styles.selectInfo, children: [selectedCount, "/", group?.items.length] })) : null, _jsx(IconButton, { className: styles.collapseButton, icon: _jsx(ToggleRightIcon, { className: styles.collapseButtonIcon }), onClick: handleToggleCollapse }), _jsx("div", { className: styles.space }), _jsx(Button, { size: "custom", className: styles.selectAllButton, variant: "plain", onClick: handleSelectAll, children: t[isGroupAllSelected
                    ? 'com.affine.page.group-header.clear'
                    : 'com.affine.page.group-header.select-all']() })] }));
};
export const PlainTextDocGroupHeader = ({ groupId, docCount, className, children, icon, ...props }) => {
    return (_jsxs(DocGroupHeader, { className: clsx(styles.plainTextGroupHeader, className), groupId: groupId, ...props, children: [icon ? (_jsx("div", { className: styles.plainTextGroupHeaderIcon, children: icon })) : null, _jsx("div", { children: children ?? groupId }), _jsx("div", { children: "\u00B7" }), _jsx("div", { children: docCount })] }));
};
//# sourceMappingURL=group-header.js.map