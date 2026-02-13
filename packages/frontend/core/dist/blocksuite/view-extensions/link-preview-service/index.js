import { ViewExtensionProvider, } from '@blocksuite/affine/ext-loader';
import { FrameworkProvider } from '@toeverything/infra';
import { z } from 'zod';
import { patchLinkPreviewService } from './link-preview-service';
const optionsSchema = z.object({
    framework: z.instanceof(FrameworkProvider).optional(),
});
export class AffineLinkPreviewExtension extends ViewExtensionProvider {
    constructor() {
        super(...arguments);
        this.name = 'affine-link-preview-extension';
        this.schema = optionsSchema;
    }
    setup(context, options) {
        super.setup(context, options);
        if (!options?.framework) {
            return;
        }
        const { framework } = options;
        context.register(patchLinkPreviewService(framework));
    }
}
//# sourceMappingURL=index.js.map