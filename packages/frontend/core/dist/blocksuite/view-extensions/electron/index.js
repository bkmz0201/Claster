import { ViewExtensionProvider, } from '@blocksuite/affine/ext-loader';
import { FrameworkProvider } from '@toeverything/infra';
import { z } from 'zod';
import { patchForClipboardInElectron } from './electron-clipboard';
const optionsSchema = z.object({
    framework: z.instanceof(FrameworkProvider).optional(),
});
export class ElectronViewExtension extends ViewExtensionProvider {
    constructor() {
        super(...arguments);
        this.name = 'electron-view-extensions';
        this.schema = optionsSchema;
    }
    setup(context, options) {
        super.setup(context, options);
        if (!BUILD_CONFIG.isElectron)
            return;
        const framework = options?.framework;
        if (!framework)
            return;
        context.register(patchForClipboardInElectron(framework));
    }
}
//# sourceMappingURL=index.js.map