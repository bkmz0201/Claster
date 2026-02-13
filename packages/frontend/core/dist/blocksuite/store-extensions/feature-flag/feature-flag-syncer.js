import { AFFINE_FLAGS, } from '@affine/core/modules/feature-flag';
import { FeatureFlagService as BSFeatureFlagService } from '@blocksuite/affine/shared/services';
import { StoreExtension } from '@blocksuite/affine/store';
export function getFeatureFlagSyncer(featureFlagService) {
    class FeatureFlagSyncer extends StoreExtension {
        static { this.key = 'feature-flag-syncer'; }
        loaded() {
            const bsFeatureFlagService = this.store.get(BSFeatureFlagService);
            Object.entries(AFFINE_FLAGS).forEach(([key, flag]) => {
                if (flag.category === 'blocksuite') {
                    const value = featureFlagService.flags[key].value;
                    if (value !== undefined) {
                        bsFeatureFlagService.setFlag(flag.bsFlag, value);
                    }
                }
            });
        }
    }
    return FeatureFlagSyncer;
}
//# sourceMappingURL=feature-flag-syncer.js.map