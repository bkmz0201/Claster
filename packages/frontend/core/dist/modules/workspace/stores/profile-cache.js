import { Store } from '@toeverything/infra';
import { map } from 'rxjs';
const WORKSPACE_PROFILE_CACHE_KEY = 'workspace-information:';
export class WorkspaceProfileCacheStore extends Store {
    constructor(cache) {
        super();
        this.cache = cache;
    }
    watchProfileCache(workspaceId) {
        return this.cache.watch(WORKSPACE_PROFILE_CACHE_KEY + workspaceId).pipe(map(data => {
            if (!data || typeof data !== 'object') {
                return null;
            }
            const info = data;
            return info;
        }));
    }
    setProfileCache(workspaceId, info) {
        this.cache.set(WORKSPACE_PROFILE_CACHE_KEY + workspaceId, info);
    }
}
//# sourceMappingURL=profile-cache.js.map