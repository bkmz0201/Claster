import { getFeatureFlagSyncer } from '@affine/core/blocksuite/store-extensions/feature-flag/feature-flag-syncer';
import { FeatureFlagService } from '@affine/core/modules/feature-flag';
import { StoreExtensionProvider, } from '@blocksuite/affine/ext-loader';
import { z } from 'zod';
const optionsSchema = z.object({
    featureFlagService: z.instanceof(FeatureFlagService).optional(),
});
export class FeatureFlagStoreExtension extends StoreExtensionProvider {
    constructor() {
        super(...arguments);
        this.name = 'feature-flag-store-extension';
        this.schema = optionsSchema;
    }
    setup(context, options) {
        super.setup(context, options);
        const featureFlagService = options?.featureFlagService;
        if (!featureFlagService) {
            return;
        }
        context.register(getFeatureFlagSyncer(featureFlagService));
    }
}
//# sourceMappingURL=index.js.map