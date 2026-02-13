import { DesktopApiService } from '@affine/core/modules/desktop-api';
import { CacheStorage, GlobalCache, GlobalState, } from '@affine/core/modules/storage';
import { ElectronGlobalCache, ElectronGlobalState, } from '@affine/core/modules/storage/impls/electron';
import { IDBGlobalState } from '@affine/core/modules/storage/impls/storage';
export function configureElectronStateStorageImpls(framework) {
    framework.impl(GlobalCache, ElectronGlobalCache, [DesktopApiService]);
    framework.impl(GlobalState, ElectronGlobalState, [DesktopApiService]);
    framework.impl(CacheStorage, IDBGlobalState);
}
//# sourceMappingURL=storage.js.map