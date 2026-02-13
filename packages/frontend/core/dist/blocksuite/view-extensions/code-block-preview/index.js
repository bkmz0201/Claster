import { ViewExtensionProvider, } from '@blocksuite/affine/ext-loader';
import { FrameworkProvider } from '@toeverything/infra';
import { z } from 'zod';
import { CodeBlockHtmlPreview, effects as htmlPreviewEffects, } from './html-preview';
import { CodeBlockMermaidPreview, effects as mermaidPreviewEffects, } from './mermaid-preview';
const optionsSchema = z.object({
    framework: z.instanceof(FrameworkProvider).optional(),
});
export class CodeBlockPreviewViewExtension extends ViewExtensionProvider {
    constructor() {
        super(...arguments);
        this.name = 'code-block-preview';
        this.schema = optionsSchema;
    }
    effect() {
        super.effect();
        htmlPreviewEffects();
        mermaidPreviewEffects();
    }
    setup(context, options) {
        super.setup(context, options);
        context.register(CodeBlockHtmlPreview);
        context.register(CodeBlockMermaidPreview);
    }
}
//# sourceMappingURL=index.js.map