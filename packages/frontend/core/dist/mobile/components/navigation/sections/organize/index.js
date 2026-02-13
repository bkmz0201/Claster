import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Skeleton } from '@affine/component';
import { NavigationPanelTreeRoot } from '@affine/core/desktop/components/navigation-panel';
import { NavigationPanelService } from '@affine/core/modules/navigation-panel';
import { OrganizeService } from '@affine/core/modules/organize';
import { useI18n } from '@affine/i18n';
import track from '@affine/track';
import { AddOrganizeIcon } from '@blocksuite/icons/rc';
import { useLiveData, useServices } from '@toeverything/infra';
import { useCallback, useMemo, useState } from 'react';
import { AddItemPlaceholder } from '../../layouts/add-item-placeholder';
import { CollapsibleSection } from '../../layouts/collapsible-section';
import { NavigationPanelFolderNode } from '../../nodes/folder';
import { FolderCreateTip, FolderRenameDialog } from '../../nodes/folder/dialog';
export const NavigationPanelOrganize = () => {
    const { organizeService, navigationPanelService } = useServices({
        OrganizeService,
        NavigationPanelService,
    });
    const path = useMemo(() => ['organize'], []);
    const [openNewFolderDialog, setOpenNewFolderDialog] = useState(false);
    const t = useI18n();
    const folderTree = organizeService.folderTree;
    const rootFolder = folderTree.rootFolder;
    const folders = useLiveData(rootFolder.sortedChildren$);
    const isLoading = useLiveData(folderTree.isLoading$);
    const handleCreateFolder = useCallback((name) => {
        const newFolderId = rootFolder.createFolder(name, rootFolder.indexAt('before'));
        track.$.navigationPanel.organize.createOrganizeItem({ type: 'folder' });
        navigationPanelService.setCollapsed(path, false);
        return newFolderId;
    }, [navigationPanelService, path, rootFolder]);
    return (_jsxs(CollapsibleSection, { path: path, title: t['com.affine.rootAppSidebar.organize'](), children: [_jsxs(NavigationPanelTreeRoot, { placeholder: isLoading ? _jsx(Skeleton, {}) : null, children: [folders.map(child => (_jsx(NavigationPanelFolderNode, { nodeId: child.id, parentPath: path }, child.id))), _jsx(AddItemPlaceholder, { icon: _jsx(AddOrganizeIcon, {}), "data-testid": "navigation-panel-bar-add-organize-button", label: t['com.affine.rootAppSidebar.organize.add-folder'](), onClick: () => setOpenNewFolderDialog(true) })] }), _jsx(FolderRenameDialog, { open: openNewFolderDialog, onConfirm: handleCreateFolder, onOpenChange: setOpenNewFolderDialog, descRenderer: FolderCreateTip })] }));
};
//# sourceMappingURL=index.js.map