import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { GlobalContextService } from '@affine/core/modules/global-context';
import { NavigationPanelService } from '@affine/core/modules/navigation-panel';
import { TagService } from '@affine/core/modules/tag';
import { useI18n } from '@affine/i18n';
import { useLiveData, useService, useServices } from '@toeverything/infra';
import clsx from 'clsx';
import { useCallback, useMemo } from 'react';
import { AddItemPlaceholder } from '../../layouts/add-item-placeholder';
import { NavigationPanelTreeNode } from '../../tree/node';
import { NavigationPanelDocNode } from '../doc';
import { useNavigationPanelTagNodeOperations, useNavigationPanelTagNodeOperationsMenu, } from './operations';
import * as styles from './styles.css';
export const NavigationPanelTagNode = ({ tagId, operations: additionalOperations, parentPath, }) => {
    const t = useI18n();
    const { tagService, globalContextService } = useServices({
        TagService,
        GlobalContextService,
    });
    const navigationPanelService = useService(NavigationPanelService);
    const active = useLiveData(globalContextService.globalContext.tagId.$) === tagId;
    const path = useMemo(() => [...parentPath, `tag-${tagId}`], [parentPath, tagId]);
    const collapsed = useLiveData(navigationPanelService.collapsed$(path));
    const setCollapsed = useCallback((value) => {
        navigationPanelService.setCollapsed(path, value);
    }, [navigationPanelService, path]);
    const tagRecord = useLiveData(tagService.tagList.tagByTagId$(tagId));
    const tagColor = useLiveData(tagRecord?.color$);
    const tagName = useLiveData(tagRecord?.value$);
    const Icon = useCallback(({ className }) => {
        return (_jsx("div", { className: clsx(styles.tagIconContainer, className), children: _jsx("div", { "data-testid": "navigation-panel-tag-icon-dot", className: styles.tagIcon, style: {
                    backgroundColor: tagColor,
                } }) }));
    }, [tagColor]);
    const option = useMemo(() => ({
        openNodeCollapsed: () => setCollapsed(false),
    }), [setCollapsed]);
    const operations = useNavigationPanelTagNodeOperationsMenu(tagId, option);
    const { handleNewDoc } = useNavigationPanelTagNodeOperations(tagId, option);
    const finalOperations = useMemo(() => {
        if (additionalOperations) {
            return [...operations, ...additionalOperations];
        }
        return operations;
    }, [additionalOperations, operations]);
    if (!tagRecord) {
        return null;
    }
    return (_jsx(NavigationPanelTreeNode, { icon: Icon, name: tagName || t['Untitled'](), collapsed: collapsed, setCollapsed: setCollapsed, to: `/tag/${tagId}`, active: active, operations: finalOperations, "data-testid": `navigation-panel-tag-${tagId}`, "aria-label": tagName, "data-role": "navigation-panel-tag", children: _jsx(NavigationPanelTagNodeDocs, { tag: tagRecord, onNewDoc: handleNewDoc, path: path }) }));
};
/**
 * the `tag.pageIds$` has a performance issue,
 * so we split the tag node children into a separate component,
 * so it won't be rendered when the tag node is collapsed.
 */
export const NavigationPanelTagNodeDocs = ({ tag, onNewDoc, path, }) => {
    const t = useI18n();
    const tagDocIds = useLiveData(tag.pageIds$);
    return (_jsxs(_Fragment, { children: [tagDocIds.map(docId => (_jsx(NavigationPanelDocNode, { docId: docId, parentPath: path }, docId))), _jsx(AddItemPlaceholder, { label: t['New Page'](), onClick: onNewDoc })] }));
};
//# sourceMappingURL=index.js.map