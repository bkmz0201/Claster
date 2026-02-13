import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, usePromptModal } from '@affine/component';
import { createDocExplorerContext, DocExplorerContext, } from '@affine/core/components/explorer/context';
import { DocsExplorer } from '@affine/core/components/explorer/docs-view/docs-list';
import { Filters } from '@affine/core/components/filter';
import { CollectionService, PinnedCollectionService, } from '@affine/core/modules/collection';
import { CollectionRulesService } from '@affine/core/modules/collection-rules';
import { WorkspaceLocalState } from '@affine/core/modules/workspace';
import { useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback, useEffect, useState } from 'react';
import { ViewBody, ViewHeader, ViewIcon, ViewTitle, } from '../../../../modules/workbench';
import { AllDocSidebarTabs } from '../layouts/all-doc-sidebar-tabs';
import * as styles from './all-page.css';
import { AllDocsHeader } from './all-page-header';
import { MigrationAllDocsDataNotification } from './migration-data';
import { PinnedCollections } from './pinned-collections';
const DefaultDisplayPreference = {
    grid: {
        view: 'grid',
        displayProperties: [
            'system:createdAt',
            'system:updatedAt',
            'system:createdBy',
            'system:tags',
        ],
        orderBy: {
            type: 'system',
            key: 'updatedAt',
            desc: true,
        },
        groupBy: undefined,
        showDocIcon: true,
        showDocPreview: true,
        quickFavorite: true,
        showDragHandle: true,
        showMoreOperation: true,
    },
    masonry: {
        view: 'masonry',
        displayProperties: [
            'system:createdAt',
            'system:updatedAt',
            'system:createdBy',
            'system:tags',
        ],
        orderBy: {
            type: 'system',
            key: 'updatedAt',
            desc: true,
        },
        groupBy: undefined,
        showDocIcon: true,
        showDocPreview: true,
        quickFavorite: true,
        showDragHandle: true,
        showMoreOperation: true,
    },
    list: {
        view: 'list',
        displayProperties: [
            'system:createdAt',
            'system:updatedAt',
            'system:createdBy',
            'system:tags',
        ],
        orderBy: {
            type: 'system',
            key: 'updatedAt',
            desc: true,
        },
        groupBy: {
            type: 'system',
            key: 'updatedAt',
        },
        showDocIcon: true,
        showDocPreview: true,
        quickFavorite: true,
        showDragHandle: true,
        showMoreOperation: true,
    },
};
export const AllPage = () => {
    const t = useI18n();
    const collectionService = useService(CollectionService);
    const pinnedCollectionService = useService(PinnedCollectionService);
    const { viewMode, setViewMode, selectedCollectionId, setSelectedCollectionId, displayPreference, setDisplayPreference, } = useAllDocsOptions();
    const isCollectionDataReady = useLiveData(collectionService.collectionDataReady$);
    const isPinnedCollectionDataReady = useLiveData(pinnedCollectionService.pinnedCollectionDataReady$);
    const pinnedCollections = useLiveData(pinnedCollectionService.pinnedCollections$);
    const selectedCollection = useLiveData(selectedCollectionId
        ? collectionService.collection$(selectedCollectionId)
        : null);
    useEffect(() => {
        // if selected collection is not in pinned collections, set selected collection id to null
        if (isPinnedCollectionDataReady &&
            selectedCollectionId &&
            !pinnedCollections.some(c => c.collectionId === selectedCollectionId)) {
            setSelectedCollectionId(null);
        }
    }, [
        isPinnedCollectionDataReady,
        pinnedCollections,
        selectedCollectionId,
        setSelectedCollectionId,
    ]);
    useEffect(() => {
        // if selected collection is not found, set selected collection id to null
        if (!selectedCollection && selectedCollectionId && isCollectionDataReady) {
            setSelectedCollectionId(null);
        }
    }, [
        isCollectionDataReady,
        selectedCollection,
        selectedCollectionId,
        setSelectedCollectionId,
    ]);
    const selectedCollectionInfo = useLiveData(selectedCollection ? selectedCollection.info$ : null);
    const [tempFilters, setTempFilters] = useState(null);
    const [tempFiltersInitial, setTempFiltersInitial] = useState(null);
    const [explorerContextValue] = useState(() => createDocExplorerContext(displayPreference));
    useEffect(() => {
        explorerContextValue.displayPreference$.next(displayPreference);
    }, [displayPreference, explorerContextValue]);
    const groupBy = displayPreference.groupBy;
    const orderBy = displayPreference.orderBy;
    const { openPromptModal } = usePromptModal();
    const collectionRulesService = useService(CollectionRulesService);
    useEffect(() => {
        const subscription = collectionRulesService
            .watch(selectedCollectionInfo
            ? {
                filters: selectedCollectionInfo.rules.filters,
                groupBy,
                orderBy,
                extraAllowList: selectedCollectionInfo.allowList,
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
            }
            : {
                filters: tempFilters && tempFilters.length > 0
                    ? tempFilters
                    : [
                        // if no filters are present, match all non-trash documents
                        {
                            type: 'system',
                            key: 'trash',
                            method: 'is',
                            value: 'false',
                        },
                    ],
                groupBy,
                orderBy,
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
        collectionRulesService,
        explorerContextValue,
        groupBy,
        orderBy,
        selectedCollection,
        selectedCollectionInfo,
        tempFilters,
    ]);
    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === 'Escape') {
                explorerContextValue.selectMode$.next(false);
                explorerContextValue.selectedDocIds$.next([]);
                explorerContextValue.prevCheckAnchorId$.next(null);
            }
        };
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [explorerContextValue]);
    const handleFilterChange = useCallback((filters) => {
        setTempFilters(filters);
    }, []);
    const handleSelectCollection = useCallback((collectionId) => {
        setSelectedCollectionId(collectionId);
        setTempFilters(null);
    }, [setSelectedCollectionId]);
    const handleSelectAll = useCallback(() => {
        setSelectedCollectionId(null);
        setTempFilters(null);
    }, [setSelectedCollectionId]);
    const handleSaveFilters = useCallback(() => {
        if (selectedCollectionId) {
            collectionService.updateCollection(selectedCollectionId, {
                rules: {
                    filters: tempFilters ?? [],
                },
            });
            setTempFilters(null);
        }
        else {
            openPromptModal({
                title: t['com.affine.editCollection.saveCollection'](),
                label: t['com.affine.editCollectionName.name'](),
                inputOptions: {
                    placeholder: t['com.affine.editCollectionName.name.placeholder'](),
                },
                children: t['com.affine.editCollectionName.createTips'](),
                confirmText: t['com.affine.editCollection.save'](),
                cancelText: t['com.affine.editCollection.button.cancel'](),
                confirmButtonOptions: {
                    variant: 'primary',
                },
                onConfirm(name) {
                    const id = collectionService.createCollection({
                        name,
                        rules: {
                            filters: tempFilters ?? [],
                        },
                    });
                    pinnedCollectionService.addPinnedCollection({
                        collectionId: id,
                        index: pinnedCollectionService.indexAt('after'),
                    });
                    setTempFilters(null);
                    setSelectedCollectionId(id);
                },
            });
        }
    }, [
        collectionService,
        openPromptModal,
        pinnedCollectionService,
        selectedCollectionId,
        setSelectedCollectionId,
        t,
        tempFilters,
    ]);
    const handleNewTempFilter = useCallback((params) => {
        setSelectedCollectionId(null);
        setTempFilters([]);
        setTempFiltersInitial(params);
    }, [setSelectedCollectionId]);
    const handleDisplayPreferenceChange = useCallback((displayPreference) => {
        setDisplayPreference(displayPreference);
    }, [setDisplayPreference]);
    return (_jsxs(DocExplorerContext.Provider, { value: explorerContextValue, children: [_jsx(ViewTitle, { title: t['All pages']() }), _jsx(ViewIcon, { icon: "allDocs" }), _jsx(ViewHeader, { children: _jsx(AllDocsHeader, { displayPreference: displayPreference, onDisplayPreferenceChange: handleDisplayPreferenceChange, view: viewMode, onViewChange: setViewMode }) }), _jsx(ViewBody, { children: _jsxs("div", { className: styles.body, children: [_jsx(MigrationAllDocsDataNotification, {}), _jsx("div", { className: styles.pinnedCollection, children: _jsx(PinnedCollections, { activeCollectionId: selectedCollectionId, onActiveAll: handleSelectAll, onActiveCollection: handleSelectCollection, onAddFilter: handleNewTempFilter, hiddenAdd: tempFilters !== null }) }), _jsx("div", { className: styles.filterArea, children: tempFilters !== null && (_jsxs("div", { className: styles.filterInnerArea, children: [_jsx(Filters
                                    // When the selected collection changes, the filters internal state should be reset
                                    , { className: styles.filters, filters: tempFilters, onChange: handleFilterChange, defaultDraftFilter: tempFiltersInitial }, selectedCollectionId ?? 'all'), _jsx(Button, { variant: "plain", onClick: () => {
                                            setTempFilters(null);
                                        }, children: t['Cancel']() }), _jsx(Button, { onClick: handleSaveFilters, children: t['save']() })] })) }), _jsx("div", { className: styles.scrollArea, children: _jsx(DocsExplorer, {}) })] }) }), _jsx(AllDocSidebarTabs, {})] }));
};
export const Component = () => {
    return _jsx(AllPage, {});
};
/**
 * Since split view allows users to open multiple all docs simultaneously, each with its own state,
 * we only read the stored state once during useState initialization to maintain independent states.
 */
const useAllDocsOptions = () => {
    const workspaceLocalState = useService(WorkspaceLocalState);
    const readSavedViewMode = useCallback(() => {
        return workspaceLocalState.get('allDocsMode') ?? 'list';
    }, [workspaceLocalState]);
    const readSavedDisplayPreference = useCallback((mode) => {
        const saved = workspaceLocalState.get('allDocsDisplayPreference:' + mode);
        return {
            ...DefaultDisplayPreference[mode],
            ...saved,
            view: mode,
        };
    }, [workspaceLocalState]);
    const [viewMode, setViewMode] = useState(readSavedViewMode);
    const [displayPreference, setDisplayPreference] = useState(() => readSavedDisplayPreference(viewMode));
    const [selectedCollectionId, setSelectedCollectionId] = useState(() => workspaceLocalState.get('allDocsSelectedCollectionId') ??
        null);
    const handleViewModeChange = useCallback((mode) => {
        workspaceLocalState.set('allDocsMode', mode);
        setViewMode(mode);
        setDisplayPreference(readSavedDisplayPreference(mode));
    }, [workspaceLocalState, readSavedDisplayPreference]);
    const handleDisplayPreferenceChange = useCallback((displayPreference) => {
        workspaceLocalState.set('allDocsDisplayPreference:' + viewMode, displayPreference);
        setDisplayPreference(displayPreference);
    }, [viewMode, workspaceLocalState]);
    const handleSelectedCollectionIdChange = useCallback((collectionId) => {
        workspaceLocalState.set('allDocsSelectedCollectionId', collectionId);
        setSelectedCollectionId(collectionId);
    }, [workspaceLocalState]);
    return {
        viewMode,
        setViewMode: handleViewModeChange,
        displayPreference,
        setDisplayPreference: handleDisplayPreferenceChange,
        selectedCollectionId,
        setSelectedCollectionId: handleSelectedCollectionIdChange,
    };
};
//# sourceMappingURL=all-page.js.map