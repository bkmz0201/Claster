import { ViewExtensionProvider, } from '@blocksuite/affine/ext-loader';
import { z } from 'zod';
import { turboRendererExtension } from './turbo-renderer';
const optionsSchema = z.object({
    enableTurboRenderer: z.boolean().optional(),
});
export class TurboRendererViewExtension extends ViewExtensionProvider {
    constructor() {
        super(...arguments);
        this.name = 'affine-view-turbo-renderer';
        this.schema = optionsSchema;
    }
    setup(context, options) {
        super.setup(context, options);
        const enableTurboRenderer = options?.enableTurboRenderer;
        const isEdgeless = this.isEdgeless(context.scope);
        if (!enableTurboRenderer || !isEdgeless) {
            return;
        }
        context.register(turboRendererExtension);
    }
}
//# sourceMappingURL=index.js.map