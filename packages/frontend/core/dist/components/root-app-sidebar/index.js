import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Import is already correct, no changes needed
import { AddPageButton, AppDownloadButton, AppSidebar, MenuItem, MenuLinkItem, QuickSearchInput, SidebarContainer, SidebarScrollableContainer, } from '@affine/core/modules/app-sidebar/views';
import { ExternalMenuLinkItem } from '@affine/core/modules/app-sidebar/views/menu-item/external-menu-link-item';
import { AuthService, ServerService } from '@affine/core/modules/cloud';
import { WorkspaceDialogService } from '@affine/core/modules/dialogs';
import { FeatureFlagService } from '@affine/core/modules/feature-flag';
import { CMDKQuickSearchService } from '@affine/core/modules/quicksearch/services/cmdk';
import { useI18n } from '@affine/i18n';
import { track } from '@affine/track';
import { AiOutlineIcon, AllDocsIcon, ImportIcon, JournalIcon, SettingsIcon, } from '@blocksuite/icons/rc';
import { useLiveData, useService, useServices } from '@toeverything/infra';
import { memo, useCallback } from 'react';
import { CollapsibleSection, NavigationPanelCollections, NavigationPanelFavorites, NavigationPanelMigrationFavorites, NavigationPanelOrganize, NavigationPanelTags, } from '../../desktop/components/navigation-panel';
import { WorkbenchService } from '../../modules/workbench';
import { WorkspaceNavigator } from '../workspace-selector';
import { bottomContainer, quickSearch, quickSearchAndNewPage, workspaceAndUserWrapper, workspaceWrapper, } from './index.css';
import { InviteMembersButton } from './invite-members-button';
import { AppSidebarJournalButton } from './journal-button';
import { NotificationButton } from './notification-button';
import { SidebarAudioPlayer } from './sidebar-audio-player';
import { TemplateDocEntrance } from './template-doc-entrance';
import { TrashButton } from './trash-button';
import { UpdaterButton } from './updater-button';
import UserInfo from './user-info';
const AllDocsButton = () => {
    const t = useI18n();
    const { workbenchService } = useServices({
        WorkbenchService,
    });
    const workbench = workbenchService.workbench;
    const allPageActive = useLiveData(workbench.location$.selector(location => location.pathname === '/all'));
    return (_jsx(MenuLinkItem, { icon: _jsx(AllDocsIcon, {}), active: allPageActive, to: '/all', children: _jsx("span", { "data-testid": "all-pages", children: t['com.affine.workspaceSubPath.all']() }) }));
};
const AIChatButton = () => {
    const featureFlagService = useService(FeatureFlagService);
    const serverService = useService(ServerService);
    const serverFeatures = useLiveData(serverService.server.features$);
    const enableAI = useLiveData(featureFlagService.flags.enable_ai.$);
    const { workbenchService } = useServices({
        WorkbenchService,
    });
    const workbench = workbenchService.workbench;
    const aiChatActive = useLiveData(workbench.location$.selector(location => location.pathname === '/chat'));
    if (!enableAI || !serverFeatures?.copilot) {
        return null;
    }
    return (_jsx(MenuLinkItem, { icon: _jsx(AiOutlineIcon, {}), active: aiChatActive, to: '/chat', children: _jsx("span", { "data-testid": "ai-chat", children: "Intelligence" }) }));
};
/**
 * This is for the whole affine app sidebar.
 * This component wraps the app sidebar in `@affine/component` with logic and data.
 *
 */
export const RootAppSidebar = memo(() => {
    const { workbenchService, cMDKQuickSearchService, authService } = useServices({
        WorkbenchService,
        CMDKQuickSearchService,
        AuthService,
    });
    const sessionStatus = useLiveData(authService.session.status$);
    const t = useI18n();
    const workspaceDialogService = useService(WorkspaceDialogService);
    const workbench = workbenchService.workbench;
    const workspaceSelectorOpen = useLiveData(workbench.workspaceSelectorOpen$);
    const onOpenQuickSearchModal = useCallback(() => {
        cMDKQuickSearchService.toggle();
    }, [cMDKQuickSearchService]);
    const onWorkspaceSelectorOpenChange = useCallback((open) => {
        workbench.setWorkspaceSelectorOpen(open);
    }, [workbench]);
    const onOpenSettingModal = useCallback(() => {
        workspaceDialogService.open('setting', {
            activeTab: 'appearance',
        });
        track.$.navigationPanel.$.openSettings();
    }, [workspaceDialogService]);
    const handleOpenDocs = useCallback((result) => {
        const { docIds, entryId, isWorkspaceFile } = result;
        // If the imported file is a workspace file, open the entry page.
        if (isWorkspaceFile && entryId) {
            workbench.openDoc(entryId);
        }
        else if (!docIds.length) {
            return;
        }
        // Open all the docs when there are multiple docs imported.
        if (docIds.length > 1) {
            workbench.openAll();
        }
        else {
            // Otherwise, open the only doc.
            workbench.openDoc(docIds[0]);
        }
    }, [workbench]);
    const onOpenImportModal = useCallback(() => {
        track.$.navigationPanel.importModal.open();
        workspaceDialogService.open('import', undefined, payload => {
            if (!payload) {
                return;
            }
            handleOpenDocs(payload);
        });
    }, [workspaceDialogService, handleOpenDocs]);
    return (_jsxs(AppSidebar, { children: [_jsxs(SidebarContainer, { children: [_jsxs("div", { className: workspaceAndUserWrapper, children: [_jsx("div", { className: workspaceWrapper, children: _jsx(WorkspaceNavigator, { showEnableCloudButton: true, showSyncStatus: true, open: workspaceSelectorOpen, onOpenChange: onWorkspaceSelectorOpenChange, dense: true }) }), _jsx(UserInfo, {})] }), _jsxs("div", { className: quickSearchAndNewPage, children: [_jsx(QuickSearchInput, { className: quickSearch, "data-testid": "slider-bar-quick-search-button", "data-event-props": "$.navigationPanel.$.quickSearch", onClick: onOpenQuickSearchModal }), _jsx(AddPageButton, {})] }), _jsx(AllDocsButton, {}), _jsx(AppSidebarJournalButton, {}), sessionStatus === 'authenticated' && _jsx(NotificationButton, {}), _jsx(AIChatButton, {}), _jsx(MenuItem, { "data-testid": "slider-bar-workspace-setting-button", icon: _jsx(SettingsIcon, {}), onClick: onOpenSettingModal, children: _jsx("span", { "data-testid": "settings-modal-trigger", children: t['com.affine.settingSidebar.title']() }) })] }), _jsxs(SidebarScrollableContainer, { children: [_jsx(NavigationPanelFavorites, {}), _jsx(NavigationPanelOrganize, {}), _jsx(NavigationPanelMigrationFavorites, {}), _jsx(NavigationPanelTags, {}), _jsx(NavigationPanelCollections, {}), _jsxs(CollapsibleSection, { path: ['others'], title: t['com.affine.rootAppSidebar.others'](), contentStyle: { padding: '6px 8px 0 8px' }, children: [_jsx(TrashButton, {}), _jsx(MenuItem, { "data-testid": "slider-bar-import-button", icon: _jsx(ImportIcon, {}), onClick: onOpenImportModal, children: _jsx("span", { "data-testid": "import-modal-trigger", children: t['Import']() }) }), _jsx(InviteMembersButton, {}), _jsx(TemplateDocEntrance, {}), _jsx(ExternalMenuLinkItem, { href: "https://affine.pro/blog?tag=Release+Note", icon: _jsx(JournalIcon, {}), label: t['com.affine.app-sidebar.learn-more']() })] })] }), _jsxs(SidebarContainer, { className: bottomContainer, children: [_jsx(SidebarAudioPlayer, {}), BUILD_CONFIG.isElectron ? _jsx(UpdaterButton, {}) : _jsx(AppDownloadButton, {})] })] }));
});
RootAppSidebar.displayName = 'memo(RootAppSidebar)';
//# sourceMappingURL=index.js.map