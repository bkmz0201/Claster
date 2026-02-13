import { AIStoreExtension } from '@affine/core/blocksuite/store-extensions/ai';
import { StoreExtensionManager } from '@blocksuite/affine/ext-loader';
import { getInternalStoreExtensions } from '@blocksuite/affine/extensions/store';
import { FeatureFlagStoreExtension } from '../store-extensions/feature-flag';
class StoreProvider {
    static { this.instance = null; }
    static getInstance() {
        if (!StoreProvider.instance) {
            StoreProvider.instance = new StoreProvider();
        }
        return StoreProvider.instance;
    }
    constructor() {
        this._initDefaultConfig = () => {
            this.config.featureFlag();
            return this.config;
        };
        this._configureFeatureFlag = (featureFlagService) => {
            this._manager.configure(FeatureFlagStoreExtension, { featureFlagService });
            return this.config;
        };
        this._manager = new StoreExtensionManager([
            ...getInternalStoreExtensions(),
            AIStoreExtension,
            FeatureFlagStoreExtension,
        ]);
    }
    get config() {
        return {
            init: this._initDefaultConfig,
            featureFlag: this._configureFeatureFlag,
            value: this._manager,
        };
    }
    get value() {
        return this._manager;
    }
}
export function getStoreManager() {
    return StoreProvider.getInstance();
}
//# sourceMappingURL=store.js.map