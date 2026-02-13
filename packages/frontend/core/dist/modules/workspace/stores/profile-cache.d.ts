import { Store } from '@toeverything/infra';
import type { GlobalCache } from '../../storage';
import type { WorkspaceProfileInfo } from '../entities/profile';
export declare class WorkspaceProfileCacheStore extends Store {
    private readonly cache;
    constructor(cache: GlobalCache);
    watchProfileCache(workspaceId: string): import("rxjs").Observable<WorkspaceProfileInfo | null>;
    setProfileCache(workspaceId: string, info: WorkspaceProfileInfo): void;
}
//# sourceMappingURL=profile-cache.d.ts.map