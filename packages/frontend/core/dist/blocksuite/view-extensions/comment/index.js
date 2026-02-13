import { ViewExtensionProvider, } from '@blocksuite/affine/ext-loader';
import { FrameworkProvider } from '@toeverything/infra';
import z from 'zod';
import { AffineCommentProvider } from './comment-provider';
const optionsSchema = z.object({
    enableComment: z.boolean().optional(),
    framework: z.instanceof(FrameworkProvider).optional(),
});
export class CommentViewExtension extends ViewExtensionProvider {
    constructor() {
        super(...arguments);
        this.name = 'comment';
        this.schema = optionsSchema;
    }
    setup(context, options) {
        super.setup(context, options);
        if (!options?.enableComment)
            return;
        const framework = options.framework;
        if (!framework)
            return;
        context.register([AffineCommentProvider(framework)]);
    }
}
//# sourceMappingURL=index.js.map