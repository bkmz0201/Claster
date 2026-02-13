import { AIChatBlockSchemaExtension } from '@affine/core/blocksuite/ai/blocks';
import { TranscriptionBlockSchemaExtension } from '@affine/core/blocksuite/ai/blocks/transcription-block/model';
import { StoreExtensionProvider, } from '@blocksuite/affine/ext-loader';
export class AIStoreExtension extends StoreExtensionProvider {
    constructor() {
        super(...arguments);
        this.name = 'affine-store-extensions';
    }
    setup(context) {
        super.setup(context);
        context.register(AIChatBlockSchemaExtension);
        context.register(TranscriptionBlockSchemaExtension);
    }
}
//# sourceMappingURL=index.js.map