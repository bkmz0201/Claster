import { AIChatBlockSchema } from '@affine/core/blocksuite/ai/blocks/ai-chat-block/model';
import { TranscriptionBlockSchema } from '@affine/core/blocksuite/ai/blocks/transcription-block/model';
import { AffineSchemas } from '@blocksuite/affine/schemas';
import { Schema } from '@blocksuite/affine/store';
let _schema = null;
export function getAFFiNEWorkspaceSchema() {
    if (!_schema) {
        _schema = new Schema();
        _schema.register([
            ...AffineSchemas,
            AIChatBlockSchema,
            TranscriptionBlockSchema,
        ]);
    }
    return _schema;
}
//# sourceMappingURL=global-schema.js.map