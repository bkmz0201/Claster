import { FeatureFlagService } from '@blocksuite/affine/shared/services';
import { LifeCycleWatcher } from '@blocksuite/affine/std';
export class MobileFeatureFlagControl extends LifeCycleWatcher {
    static { this.key = 'mobile-patches'; }
    constructor(std) {
        super(std);
        const featureFlagService = std.get(FeatureFlagService);
        featureFlagService.setFlag('enable_mobile_keyboard_toolbar', true);
        featureFlagService.setFlag('enable_mobile_linked_doc_menu', true);
    }
}
//# sourceMappingURL=mobile-feature-flag-control.js.map