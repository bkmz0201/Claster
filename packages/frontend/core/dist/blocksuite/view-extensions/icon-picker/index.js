import { ViewExtensionProvider, } from '@blocksuite/affine/ext-loader';
import { FrameworkProvider } from '@toeverything/infra';
import { z } from 'zod';
import { patchIconPickerService } from './icon-picker-service';
const optionsSchema = z.object({
    framework: z.instanceof(FrameworkProvider).optional(),
});
export class AffineIconPickerExtension extends ViewExtensionProvider {
    constructor() {
        super(...arguments);
        this.name = 'affine-icon-picker-extension';
        this.schema = optionsSchema;
    }
    setup(context, options) {
        super.setup(context, options);
        if (!options?.framework) {
            return;
        }
        const { framework } = options;
        context.register(patchIconPickerService(framework));
    }
}
//# sourceMappingURL=index.js.map