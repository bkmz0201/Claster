import { KeyboardToolbarExtension } from '@affine/core/blocksuite/view-extensions/mobile/keyboard-toolbar-extension';
import { MobileFeatureFlagControl } from '@affine/core/blocksuite/view-extensions/mobile/mobile-feature-flag-control';
import { ViewExtensionProvider, } from '@blocksuite/affine/ext-loader';
import { FrameworkProvider } from '@toeverything/infra';
import { z } from 'zod';
const optionsSchema = z.object({
    framework: z.instanceof(FrameworkProvider).optional(),
});
export class MobileViewExtension extends ViewExtensionProvider {
    constructor() {
        super(...arguments);
        this.name = 'mobile-view-extension';
        this.schema = optionsSchema;
    }
    setup(context, options) {
        super.setup(context, options);
        const isMobile = BUILD_CONFIG.isMobileEdition;
        if (!isMobile)
            return;
        const framework = options?.framework;
        if (framework) {
            context.register(KeyboardToolbarExtension(framework));
        }
        context.register(MobileFeatureFlagControl);
    }
}
//# sourceMappingURL=index.js.map