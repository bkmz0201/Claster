import { LiveData, Service } from '@toeverything/infra';
import type { GlobalCache } from '../../storage/providers/global';
import type { WorkspaceService } from '../../workspace';
export declare class NavigationPanelService extends Service {
    private readonly globalCache;
    private readonly workspaceService;
    constructor(globalCache: GlobalCache, workspaceService: WorkspaceService);
    private readonly collapsedCache;
    collapsed$(path: string[]): LiveData<boolean>;
    setCollapsed(path: string[], collapsed: boolean): void;
}
//# sourceMappingURL=navigation-panel.d.ts.map