import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { usePromptModal } from '@affine/component';
import { NavigationPanelTreeRoot } from '@affine/core/desktop/components/navigation-panel';
import { CollectionService } from '@affine/core/modules/collection';
import { NavigationPanelService } from '@affine/core/modules/navigation-panel';
import { WorkbenchService } from '@affine/core/modules/workbench';
import { useI18n } from '@affine/i18n';
import { track } from '@affine/track';
import { AddCollectionIcon } from '@blocksuite/icons/rc';
import { useLiveData, useServices } from '@toeverything/infra';
import { useCallback, useMemo } from 'react';
import { AddItemPlaceholder } from '../../layouts/add-item-placeholder';
import { CollapsibleSection } from '../../layouts/collapsible-section';
import { NavigationPanelCollectionNode } from '../../nodes/collection';
import * as styles from './index.css';
export const NavigationPanelCollections = () => {
    const t = useI18n();
    const { collectionService, workbenchService, navigationPanelService } = useServices({
        CollectionService,
        WorkbenchService,
        NavigationPanelService,
    });
    const path = useMemo(() => ['collections'], []);
    const collectionMetas = useLiveData(collectionService.collectionMetas$);
    const { openPromptModal } = usePromptModal();
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
        path,
        openPromptModal,
        t,
        workbenchService.workbench,
    ]);
    return (_jsx(CollapsibleSection, { path: path, testId: "navigation-panel-collections", title: t['com.affine.rootAppSidebar.collections'](), children: _jsxs(NavigationPanelTreeRoot, { children: [collectionMetas.map(collection => (_jsx(NavigationPanelCollectionNode, { collectionId: collection.id, parentPath: path }, collection.id))), _jsx(AddItemPlaceholder, { icon: _jsx(AddCollectionIcon, {}), "data-testid": "navigation-panel-bar-add-collection-button", label: t['com.affine.rootAppSidebar.collection.new'](), onClick: () => handleCreateCollection() })] }) }));
};
//# sourceMappingURL=index.js.map