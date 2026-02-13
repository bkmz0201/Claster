import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { FlexWrapper } from '@affine/component';
import { EmptyCollectionDetail } from '@affine/core/components/affine/empty/collection-detail';
import { createDocExplorerContext, DocExplorerContext, } from '@affine/core/components/explorer/context';
import { DocsExplorer } from '@affine/core/components/explorer/docs-view/docs-list';
import { CollectionService, } from '@affine/core/modules/collection';
import { CollectionRulesService } from '@affine/core/modules/collection-rules';
import { GlobalContextService } from '@affine/core/modules/global-context';
import { WorkspacePermissionService } from '@affine/core/modules/permissions';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { useI18n } from '@affine/i18n';
import { ViewLayersIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService, useServices } from '@toeverything/infra';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigateHelper } from '../../../../components/hooks/use-navigate-helper';
import { useIsActiveView, ViewBody, ViewHeader, ViewIcon, ViewTitle, } from '../../../../modules/workbench';
import { PageNotFound } from '../../404';
import { AllDocSidebarTabs } from '../layouts/all-doc-sidebar-tabs';
import { CollectionDetailHeader } from './header';
import * as styles from './index.css';
import { CollectionListHeader } from './list-header';
export const CollectionDetail = ({ collection, }) => {
    const [explorerContextValue] = useState(createDocExplorerContext);
    const collectionRulesService = useService(CollectionRulesService);
    const permissionService = useService(WorkspacePermissionService);
    const isAdmin = useLiveData(permissionService.permission.isAdmin$);
    const isOwner = useLiveData(permissionService.permission.isOwner$);
    const displayPreference = useLiveData(explorerContextValue.displayPreference$);
    const groupBy = useLiveData(explorerContextValue.groupBy$);
    const orderBy = useLiveData(explorerContextValue.orderBy$);
    const rules = useLiveData(collection.rules$);
    const allowList = useLiveData(collection.allowList$);
    const handleDisplayPreferenceChange = useCallback((displayPreference) => {
        explorerContextValue.displayPreference$.next(displayPreference);
    }, [explorerContextValue]);
    useEffect(() => {
        const subscription = collectionRulesService
            .watch({
            filters: rules.filters,
            groupBy,
            orderBy,
            extraAllowList: allowList,
            extraFilters: [
                {
                    type: 'system',
                    key: 'empty-journal',
                    method: 'is',
                    value: 'false',
                },
                {
                    type: 'system',
                    key: 'trash',
                    method: 'is',
                    value: 'false',
                },
            ],
        })
            .subscribe({
            next: result => {
                explorerContextValue.groups$.next(result.groups);
            },
            error: error => {
                console.error(error);
            },
        });
        return () => {
            subscription.unsubscribe();
        };
    }, [
        allowList,
        collectionRulesService,
        explorerContextValue.groups$,
        groupBy,
        orderBy,
        rules.filters,
    ]);
    return (_jsxs(DocExplorerContext.Provider, { value: explorerContextValue, children: [_jsx(ViewHeader, { children: _jsx(CollectionDetailHeader, { displayPreference: displayPreference, onDisplayPreferenceChange: handleDisplayPreferenceChange }) }), _jsx(ViewBody, { children: _jsxs(FlexWrapper, { flexDirection: "column", alignItems: "stretch", width: "100%", children: [_jsx(CollectionListHeader, { collection: collection }), _jsx("div", { className: styles.scrollArea, children: _jsx(DocsExplorer, { disableMultiDelete: !isAdmin && !isOwner }) })] }) })] }));
};
export const Component = function CollectionPage() {
    const { collectionService, globalContextService } = useServices({
        CollectionService,
        GlobalContextService,
    });
    const globalContext = globalContextService.globalContext;
    const t = useI18n();
    const params = useParams();
    const collection = useLiveData(params.collectionId
        ? collectionService.collection$(params.collectionId)
        : null);
    const name = useLiveData(collection?.name$);
    const isActiveView = useIsActiveView();
    useEffect(() => {
        if (isActiveView && collection) {
            globalContext.collectionId.set(collection.id);
            globalContext.isCollection.set(true);
            return () => {
                globalContext.collectionId.set(null);
                globalContext.isCollection.set(false);
            };
        }
        return;
    }, [collection, globalContext, isActiveView]);
    const info = useLiveData(collection?.info$);
    if (!collection) {
        return _jsx(PageNotFound, {});
    }
    const inner = info?.allowList.length === 0 && info?.rules.filters.length === 0 ? (_jsx(Placeholder, { collection: collection })) : (_jsx(CollectionDetail, { collection: collection }));
    return (_jsxs(_Fragment, { children: [_jsx(ViewIcon, { icon: "collection" }), _jsx(ViewTitle, { title: name ?? t['Untitled']() }), _jsx(AllDocSidebarTabs, {}), inner] }));
};
const Placeholder = ({ collection }) => {
    const workspace = useService(WorkspaceService).workspace;
    const { jumpToCollections } = useNavigateHelper();
    const t = useI18n();
    const name = useLiveData(collection?.name$);
    const handleJumpToCollections = useCallback(() => {
        jumpToCollections(workspace.id);
    }, [jumpToCollections, workspace]);
    return (_jsxs(_Fragment, { children: [_jsx(ViewHeader, { children: _jsxs("div", { style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        fontSize: 'var(--affine-font-xs)',
                    }, children: [_jsxs("div", { style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 4,
                                cursor: 'pointer',
                                color: 'var(--affine-text-secondary-color)',
                                ['WebkitAppRegion']: 'no-drag',
                            }, onClick: handleJumpToCollections, children: [_jsx(ViewLayersIcon, { style: { color: 'var(--affine-icon-color)' }, fontSize: 14 }), t['com.affine.collection.allCollections'](), _jsx("div", { children: "/" })] }), _jsx("div", { "data-testid": "collection-name", style: {
                                fontWeight: 600,
                                color: 'var(--affine-text-primary-color)',
                                ['WebkitAppRegion']: 'no-drag',
                            }, children: name ?? t['Untitled']() }), _jsx("div", { style: { flex: 1 } })] }) }), _jsx(ViewBody, { children: _jsx(EmptyCollectionDetail, { collection: collection, style: { height: '100%' } }) })] }));
};
//# sourceMappingURL=index.js.map