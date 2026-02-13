import { jsx as _jsx } from "react/jsx-runtime";
import { Menu, MenuItem, usePromptModal } from '@affine/component';
import { WorkspaceDialogService } from '@affine/core/modules/dialogs';
import { CompatibleFavoriteItemsAdapter } from '@affine/core/modules/favorite';
import { WorkbenchService } from '@affine/core/modules/workbench';
import { useI18n } from '@affine/i18n';
import track from '@affine/track';
import { DeleteIcon, EditIcon, FilterIcon, OpenInNewIcon, PlusIcon, SplitViewIcon, } from '@blocksuite/icons/rc';
import { useLiveData, useService, useServices } from '@toeverything/infra';
import { useCallback, useMemo } from 'react';
import { CollectionService, } from '../../../modules/collection';
import { IsFavoriteIcon } from '../../pure/icons';
import * as styles from './collection-operations.css';
export const CollectionOperations = ({ collection, openRenameModal, onAddDocToCollection, children, }) => {
    const { collectionService: service, workbenchService, workspaceDialogService, } = useServices({
        CollectionService,
        WorkbenchService,
        WorkspaceDialogService,
    });
    const workbench = workbenchService.workbench;
    const t = useI18n();
    const { openPromptModal } = usePromptModal();
    const showEditName = useCallback(() => {
        // use openRenameModal if it is in the sidebar collection list
        if (openRenameModal) {
            return openRenameModal();
        }
        openPromptModal({
            title: t['com.affine.editCollection.renameCollection'](),
            label: t['com.affine.editCollectionName.name'](),
            inputOptions: {
                placeholder: t['com.affine.editCollectionName.name.placeholder'](),
            },
            confirmText: t['com.affine.editCollection.save'](),
            cancelText: t['com.affine.editCollection.button.cancel'](),
            confirmButtonOptions: {
                variant: 'primary',
            },
            onConfirm(name) {
                service.updateCollection(collection.id, {
                    name,
                });
            },
        });
    }, [openRenameModal, openPromptModal, t, service, collection]);
    const showEdit = useCallback(() => {
        track.collection.collection.$.editCollection();
        workspaceDialogService.open('collection-editor', {
            collectionId: collection.id,
        });
    }, [workspaceDialogService, collection.id]);
    const openCollectionSplitView = useCallback(() => {
        workbench.openCollection(collection.id, { at: 'tail' });
    }, [collection.id, workbench]);
    const openCollectionNewTab = useCallback(() => {
        workbench.openCollection(collection.id, { at: 'new-tab' });
    }, [collection.id, workbench]);
    const favAdapter = useService(CompatibleFavoriteItemsAdapter);
    const onToggleFavoritePage = useCallback(() => {
        favAdapter.toggle(collection.id, 'collection');
    }, [favAdapter, collection.id]);
    const favorite = useLiveData(useMemo(() => favAdapter.isFavorite$(collection.id, 'collection'), [collection.id, favAdapter]));
    const actions = useMemo(() => [
        {
            icon: _jsx(EditIcon, {}),
            name: t['com.affine.collection.menu.rename'](),
            click: showEditName,
        },
        {
            icon: _jsx(FilterIcon, {}),
            name: t['com.affine.collection.menu.edit'](),
            click: showEdit,
        },
        ...(onAddDocToCollection
            ? [
                {
                    icon: _jsx(PlusIcon, {}),
                    name: t['New Page'](),
                    click: onAddDocToCollection,
                },
            ]
            : []),
        {
            icon: _jsx(IsFavoriteIcon, { favorite: favorite }),
            name: favorite
                ? t['com.affine.favoritePageOperation.remove']()
                : t['com.affine.favoritePageOperation.add'](),
            click: onToggleFavoritePage,
        },
        {
            icon: _jsx(OpenInNewIcon, {}),
            name: t['com.affine.workbench.tab.page-menu-open'](),
            click: openCollectionNewTab,
        },
        ...(BUILD_CONFIG.isElectron
            ? [
                {
                    icon: _jsx(SplitViewIcon, {}),
                    name: t['com.affine.workbench.split-view.page-menu-open'](),
                    click: openCollectionSplitView,
                },
            ]
            : []),
        {
            element: _jsx("div", { className: styles.divider }, "divider"),
        },
        {
            icon: _jsx(DeleteIcon, {}),
            name: t['Delete'](),
            click: () => {
                service.deleteCollection(collection.id);
            },
            type: 'danger',
        },
    ], [
        t,
        showEditName,
        showEdit,
        onAddDocToCollection,
        favorite,
        onToggleFavoritePage,
        openCollectionNewTab,
        openCollectionSplitView,
        service,
        collection.id,
    ]);
    return (_jsx(Menu, { items: _jsx("div", { style: { minWidth: 150 }, children: actions.map(action => {
                if (action.element) {
                    return action.element;
                }
                return (_jsx(MenuItem, { "data-testid": "collection-option", type: action.type, prefixIcon: action.icon, onClick: action.click, children: action.name }, action.name));
            }) }), children: children }));
};
//# sourceMappingURL=collection-operations.js.map