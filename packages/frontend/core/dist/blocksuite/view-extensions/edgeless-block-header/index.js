import { patchForEdgelessNoteConfig, patchForEmbedSyncedDocConfig, } from '@affine/core/blocksuite/view-extensions/edgeless-block-header/patch';
import { ViewExtensionProvider, } from '@blocksuite/affine/ext-loader';
import { FrameworkProvider } from '@toeverything/infra';
import { z } from 'zod';
const optionsSchema = z.object({
    isInPeekView: z.boolean(),
    framework: z.instanceof(FrameworkProvider),
    reactToLit: z
        .function()
        .args(z.custom(), z.boolean().optional())
        .returns(z.custom()),
});
export class EdgelessBlockHeaderConfigViewExtension extends ViewExtensionProvider {
    constructor() {
        super(...arguments);
        this.name = 'header-config-view';
        this.schema = optionsSchema;
    }
    setup(context, options) {
        super.setup(context, options);
        if (!options)
            return;
        const { framework, isInPeekView, reactToLit } = options;
        context.register(patchForEdgelessNoteConfig(framework, reactToLit, isInPeekView));
        context.register(patchForEmbedSyncedDocConfig(reactToLit));
    }
}
//# sourceMappingURL=index.js.map