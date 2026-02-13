import { LiveData, Service } from '@toeverything/infra';
const DEFAULT_COLLAPSABLE_STATE = {
    recent: true,
    favorites: false,
    organize: false,
    collections: true,
    tags: true,
    favoritesOld: true,
    migrationFavorites: true,
    others: false,
};
export class NavigationPanelService extends Service {
    constructor(globalCache, workspaceService) {
        super();
        this.globalCache = globalCache;
        this.workspaceService = workspaceService;
        this.collapsedCache = new Map();
    }
    collapsed$(path) {
        const pathKey = path.join(':');
        const key = `navigation:${this.workspaceService.workspace.id}:${pathKey}`;
        const cached$ = this.collapsedCache.get(key);
        if (!cached$) {
            const liveData$ = LiveData.from(this.globalCache.watch(key), undefined).map(v => v ?? DEFAULT_COLLAPSABLE_STATE[pathKey] ?? true);
            this.collapsedCache.set(key, liveData$);
            return liveData$;
        }
        return cached$;
    }
    setCollapsed(path, collapsed) {
        const pathKey = path.join(':');
        const key = `navigation:${this.workspaceService.workspace.id}:${pathKey}`;
        this.globalCache.set(key, collapsed);
    }
}
//# sourceMappingURL=navigation-panel.js.map