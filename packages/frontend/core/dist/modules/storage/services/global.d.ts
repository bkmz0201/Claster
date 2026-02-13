import { Service } from '@toeverything/infra';
import type { GlobalCache, GlobalSessionState, GlobalState } from '../providers/global';
export declare class GlobalStateService extends Service {
    readonly globalState: GlobalState;
    constructor(globalState: GlobalState);
}
export declare class GlobalCacheService extends Service {
    readonly globalCache: GlobalCache;
    constructor(globalCache: GlobalCache);
}
export declare class GlobalSessionStateService extends Service {
    readonly globalSessionState: GlobalSessionState;
    constructor(globalSessionState: GlobalSessionState);
}
//# sourceMappingURL=global.d.ts.map