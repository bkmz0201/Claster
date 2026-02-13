import type { FeatureFlagService } from '@affine/core/modules/feature-flag';
import { StoreExtensionManager } from '@blocksuite/affine/ext-loader';
interface Configure {
    init: () => Configure;
    featureFlag: (featureFlagService?: FeatureFlagService) => Configure;
    value: StoreExtensionManager;
}
declare class StoreProvider {
    static instance: StoreProvider | null;
    static getInstance(): StoreProvider;
    private readonly _manager;
    constructor();
    get config(): Configure;
    get value(): StoreExtensionManager;
    private readonly _initDefaultConfig;
    private readonly _configureFeatureFlag;
}
export declare function getStoreManager(): StoreProvider;
export {};
//# sourceMappingURL=store.d.ts.map