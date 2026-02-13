import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconButton } from '@affine/component';
import { RenameModal } from '@affine/component/rename-modal';
import { NavigationPanelService } from '@affine/core/modules/navigation-panel';
import { TagService } from '@affine/core/modules/tag';
import { useI18n } from '@affine/i18n';
import { track } from '@affine/track';
import { AddTagIcon } from '@blocksuite/icons/rc';
import { useLiveData, useServices } from '@toeverything/infra';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { CollapsibleSection } from '../../layouts/collapsible-section';
import { NavigationPanelTagNode } from '../../nodes/tag';
import { NavigationPanelTreeRoot } from '../../tree';
import { RootEmpty } from './empty';
import * as styles from './styles.css';
export const NavigationPanelTags = () => {
    const { tagService, navigationPanelService } = useServices({
        TagService,
        NavigationPanelService,
    });
    const path = useMemo(() => ['tags'], []);
    const collapsed = useLiveData(navigationPanelService.collapsed$(path));
    const [creating, setCreating] = useState(false);
    const tags = useLiveData(tagService.tagList.tags$);
    const t = useI18n();
    const handleCreateNewTag = useCallback((name) => {
        tagService.tagList.createTag(name, tagService.randomTagColor());
        track.$.navigationPanel.organize.createOrganizeItem({ type: 'tag' });
        navigationPanelService.setCollapsed(path, false);
    }, [navigationPanelService, path, tagService]);
    useEffect(() => {
        if (collapsed)
            setCreating(false);
    }, [collapsed]);
    const handleOpenCreateModal = useCallback(() => {
        setCreating(true);
    }, []);
    return (_jsx(CollapsibleSection, { path: path, testId: "navigation-panel-tags", headerClassName: styles.draggedOverHighlight, title: t['com.affine.rootAppSidebar.tags'](), actions: _jsxs("div", { className: styles.iconContainer, children: [_jsx(IconButton, { "data-testid": "navigation-panel-bar-add-tag-button", onClick: handleOpenCreateModal, size: "16", tooltip: t['com.affine.rootAppSidebar.explorer.tag-section-add-tooltip'](), children: _jsx(AddTagIcon, {}) }), creating && (_jsx(RenameModal, { open: true, onOpenChange: setCreating, onRename: handleCreateNewTag, currentName: t['com.affine.rootAppSidebar.tags.new-tag']() }))] }), children: _jsx(NavigationPanelTreeRoot, { placeholder: _jsx(RootEmpty, {}), children: tags.map(tag => (_jsx(NavigationPanelTagNode, { tagId: tag.id, reorderable: false, location: {
                    at: 'navigation-panel:tags:list',
                }, parentPath: path }, tag.id))) }) }));
};
//# sourceMappingURL=index.js.map