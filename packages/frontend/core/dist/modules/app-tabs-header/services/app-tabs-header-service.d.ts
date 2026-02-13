import { LiveData, Service } from '@toeverything/infra';
import type { ClientEvents, DesktopApiService } from '../../desktop-api';
export type TabStatus = Parameters<Parameters<NonNullable<ClientEvents>['ui']['onTabsStatusChange']>[0]>[0][number];
export declare class AppTabsHeaderService extends Service {
    private readonly desktopApi;
    constructor(desktopApi: DesktopApiService);
    tabsStatus$: LiveData<{
        id: string;
        active: boolean;
        loaded: boolean;
        ready: boolean;
        pinned: boolean;
        activeViewIndex: number;
        views: import("@affine/electron-api").WorkbenchViewMeta[];
        basename: string;
    }[]>;
    showContextMenu: (tabKey: string, viewIndex: number) => Promise<import("@affine/electron-api").TabAction | null>;
    activateView: (tabId: string, viewIndex: number) => Promise<void>;
    closeTab: (id?: string | undefined) => Promise<void>;
    onAddTab: (option?: import("@affine/electron-api").AddTabOption | undefined) => Promise<void>;
    onAddDocTab: (docId: string, targetTabId?: string, edge?: "left" | "right") => Promise<void>;
    onAddTagTab: (tagId: string, targetTabId?: string, edge?: "left" | "right") => Promise<void>;
    onAddCollectionTab: (collectionId: string, targetTabId?: string, edge?: "left" | "right") => Promise<void>;
    onToggleRightSidebar: (tabId?: string | undefined) => Promise<void>;
    moveTab: (from: string, to: string, edge?: "left" | "right" | undefined) => Promise<void>;
}
//# sourceMappingURL=app-tabs-header-service.d.ts.map