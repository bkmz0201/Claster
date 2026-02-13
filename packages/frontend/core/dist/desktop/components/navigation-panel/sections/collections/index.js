import { jsx as _jsx } from "react/jsx-runtime";
import { IconButton, usePromptModal } from '@affine/component';
import { CollectionService } from '@affine/core/modules/collection';
import { NavigationPanelService } from '@affine/core/modules/navigation-panel';
import { WorkbenchService } from '@affine/core/modules/workbench';
import { useI18n } from '@affine/i18n';
import { track } from '@affine/track';
import { AddCollectionIcon } from '@blocksuite/icons/rc';
import { useLiveData, useServices } from '@toeverything/infra';
import { useCallback, useMemo } from 'react';
import { CollapsibleSection } from '../../layouts/collapsible-section';
import { NavigationPanelCollectionNode } from '../../nodes/collection';
import { NavigationPanelTreeRoot } from '../../tree';
import { RootEmpty } from './empty';
import * as styles from './index.css';
export const NavigationPanelCollections = () => {
    const t = useI18n();
    const { collectionService, workbenchService, navigationPanelService } = useServices({
        CollectionService,
        WorkbenchService,
        NavigationPanelService,
    });
    const collections = useLiveData(collectionService.collections$);
    const { openPromptModal } = usePromptModal();
    const path = useMemo(() => ['collections'], []);
    const handleCreateCollection = useCallback(() => {
        openPromptModal({
            title: t['com.affine.editCollection.saveCollection'](),
            label: t['com.affine.editCollectionName.name'](),
            inputOptions: {
                placeholder: t['com.affine.editCollectionName.name.placeholder'](),
            },
            children: (_jsx("div", { className: styles.createTips, children: t['com.affine.editCollectionName.createTips']() })),
            confirmText: t['com.affine.editCollection.save'](),
            cancelText: t['com.affine.editCollection.button.cancel'](),
            confirmButtonOptions: {
                variant: 'primary',
            },
            onConfirm(name) {
                const id = collectionService.createCollection({ name });
                track.$.navigationPanel.organize.createOrganizeItem({
                    type: 'collection',
                });
                workbenchService.workbench.openCollection(id);
                navigationPanelService.setCollapsed(path, false);
            },
        });
    }, [
        collectionService,
        navigationPanelService,
        openPromptModal,
        path,
        t,
        workbenchService.workbench,
    ]);
    return (_jsx(CollapsibleSection, { path: path, testId: "navigation-panel-collections", title: t['com.affine.rootAppSidebar.collections'](), actions: _jsx(IconButton, { "data-testid": "navigation-panel-bar-add-collection-button", onClick: handleCreateCollection, size: "16", tooltip: t['com.affine.rootAppSidebar.explorer.collection-section-add-tooltip'](), children: _jsx(AddCollectionIcon, {}) }), children: _jsx(NavigationPanelTreeRoot, { placeholder: _jsx(RootEmpty, { onClickCreate: handleCreateCollection }), children: Array.from(collections.values()).map(collection => (_jsx(NavigationPanelCollectionNode, { collectionId: collection.id, reorderable: false, location: {
                    at: 'navigation-panel:collection:list',
                }, parentPath: path }, collection.id))) }) }));
};
//# sourceMappingURL=index.js.map