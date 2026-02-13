import { GfxCompatible, } from '@blocksuite/affine/std/gfx';
import { BlockModel, BlockSchemaExtension, defineBlockSchema, } from '@blocksuite/affine/store';
export const AIChatBlockSchema = defineBlockSchema({
    flavour: 'affine:embed-ai-chat',
    props: () => ({
        xywh: '[0,0,0,0]',
        index: 'a0',
        lockedBySelf: false,
        scale: 1,
        messages: '',
        sessionId: '',
        rootWorkspaceId: '',
        rootDocId: '',
    }),
    metadata: {
        version: 1,
        role: 'content',
        children: [],
    },
    toModel: () => {
        return new AIChatBlockModel();
    },
});
export const AIChatBlockSchemaExtension = BlockSchemaExtension(AIChatBlockSchema);
export class AIChatBlockModel extends GfxCompatible(BlockModel) {
}
//# sourceMappingURL=ai-chat-model.js.map