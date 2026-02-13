import { ViewExtensionProvider, } from '@blocksuite/affine/ext-loader';
import { z } from 'zod';
import { patchForPDFEmbedView } from './pdf-view';
const optionsSchema = z.object({
    enablePDFEmbedPreview: z.boolean().optional(),
    reactToLit: z.optional(z
        .function()
        .args(z.custom(), z.boolean().optional())
        .returns(z.custom())),
});
export class PdfViewExtension extends ViewExtensionProvider {
    constructor() {
        super(...arguments);
        this.name = 'affine-view-pdf';
        this.schema = optionsSchema;
    }
    setup(context, options) {
        super.setup(context, options);
        const enablePDFEmbedPreview = options?.enablePDFEmbedPreview;
        const reactToLit = options?.reactToLit;
        if (!enablePDFEmbedPreview || !reactToLit) {
            return;
        }
        context.register(patchForPDFEmbedView(reactToLit));
    }
}
//# sourceMappingURL=index.js.map