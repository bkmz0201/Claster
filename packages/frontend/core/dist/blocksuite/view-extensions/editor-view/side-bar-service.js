import { WorkbenchService } from '@affine/core/modules/workbench';
import { SidebarExtension } from '@blocksuite/affine/shared/services';
export function patchSideBarService(framework) {
    const { workbench } = framework.get(WorkbenchService);
    return SidebarExtension({
        open: (tabId) => {
            workbench.openSidebar();
            workbench.activeView$.value.activeSidebarTab(tabId ?? null);
        },
        close: () => {
            workbench.closeSidebar();
        },
        getTabIds: () => {
            return workbench.activeView$.value.sidebarTabs$.value.map(tab => tab.id);
        },
    });
}
//# sourceMappingURL=side-bar-service.js.map