export { CacheStorage, GlobalCache, GlobalSessionState, GlobalState, } from './providers/global';
export { NbstoreProvider } from './providers/nbstore';
export { GlobalCacheService, GlobalSessionStateService, GlobalStateService, } from './services/global';
export { NbstoreService } from './services/nbstore';
import { type Framework } from '@toeverything/infra';
export declare const configureStorageModule: (framework: Framework) => void;
export declare function configureLocalStorageStateStorageImpls(framework: Framework): void;
export declare function configureCommonGlobalStorageImpls(framework: Framework): void;
//# sourceMappingURL=index.d.ts.map