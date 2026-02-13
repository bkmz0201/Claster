import { getPreviewThemeExtension } from '@affine/core/blocksuite/view-extensions/theme/preview-theme';
import { getThemeExtension } from '@affine/core/blocksuite/view-extensions/theme/theme';
import { ViewExtensionProvider, } from '@blocksuite/affine/ext-loader';
import { FrameworkProvider } from '@toeverything/infra';
import { z } from 'zod';
const optionsSchema = z.object({
    framework: z.instanceof(FrameworkProvider).optional(),
});
export class AffineThemeViewExtension extends ViewExtensionProvider {
    constructor() {
        super(...arguments);
        this.name = 'affine-view-theme';
        this.schema = optionsSchema;
    }
    setup(context, options) {
        super.setup(context, options);
        const framework = options?.framework;
        if (!framework) {
            return;
        }
        if (this.isPreview(context.scope)) {
            context.register(getPreviewThemeExtension(framework));
        }
        else {
            context.register(getThemeExtension(framework));
        }
    }
}
//# sourceMappingURL=index.js.map