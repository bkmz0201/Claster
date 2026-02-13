import { Service } from '@toeverything/infra';
export class GlobalStateService extends Service {
    constructor(globalState) {
        super();
        this.globalState = globalState;
    }
}
export class GlobalCacheService extends Service {
    constructor(globalCache) {
        super();
        this.globalCache = globalCache;
    }
}
export class GlobalSessionStateService extends Service {
    constructor(globalSessionState) {
        super();
        this.globalSessionState = globalSessionState;
    }
}
//# sourceMappingURL=global.js.map