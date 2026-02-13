import { type Memento } from '@toeverything/infra';
import type { GlobalCache, GlobalState } from '../../storage';
import type { WorkspaceLocalCache, WorkspaceLocalState } from '../providers/storage';
import type { WorkspaceService } from '../services/workspace';
export declare class WorkspaceLocalStateImpl implements WorkspaceLocalState {
    wrapped: Memento;
    constructor(workspaceService: WorkspaceService, globalState: GlobalState);
    keys(): string[];
    get<T>(key: string): T | undefined;
    watch<T>(key: string): import("rxjs").Observable<T | undefined>;
    set<T>(key: string, value: T): void;
    del(key: string): void;
    clear(): void;
}
export declare class WorkspaceLocalCacheImpl implements WorkspaceLocalCache {
    wrapped: Memento;
    constructor(workspaceService: WorkspaceService, globalCache: GlobalCache);
    keys(): string[];
    get<T>(key: string): T | undefined;
    watch<T>(key: string): import("rxjs").Observable<T | undefined>;
    set<T>(key: string, value: T): void;
    del(key: string): void;
    clear(): void;
}
//# sourceMappingURL=storage.d.ts.map