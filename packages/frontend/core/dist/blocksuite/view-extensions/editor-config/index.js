import { getEditorConfigExtension } from '@affine/core/blocksuite/view-extensions/editor-config/get-config';
import { ViewExtensionProvider, } from '@blocksuite/affine/ext-loader';
import { FrameworkProvider } from '@toeverything/infra';
import { z } from 'zod';
const optionsSchema = z.object({
    framework: z.instanceof(FrameworkProvider).optional(),
});
export class AffineEditorConfigViewExtension extends ViewExtensionProvider {
    constructor() {
        super(...arguments);
        this.name = 'affine-view-editor-config';
        this.schema = optionsSchema;
    }
    setup(context, options) {
        super.setup(context, options);
        const framework = options?.framework;
        if (!framework) {
            return;
        }
        if (context.scope === 'edgeless' || context.scope === 'page') {
            context.register(getEditorConfigExtension(framework));
        }
    }
}
//# sourceMappingURL=index.js.map