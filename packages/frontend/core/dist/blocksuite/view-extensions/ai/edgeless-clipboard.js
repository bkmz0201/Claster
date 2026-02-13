import { AIChatBlockSchema } from '@affine/core/blocksuite/ai/blocks';
import { EdgelessClipboardConfig } from '@blocksuite/affine/blocks/surface';
export class EdgelessClipboardAIChatConfig extends EdgelessClipboardConfig {
    static { this.key = AIChatBlockSchema.model.flavour; }
    createBlock(block) {
        if (!this.surface)
            return null;
        const { xywh, scale, messages, sessionId, rootDocId, rootWorkspaceId } = block.props;
        const blockId = this.crud.addBlock(AIChatBlockSchema.model.flavour, {
            xywh,
            scale,
            messages,
            sessionId,
            rootDocId,
            rootWorkspaceId,
        }, this.surface.model.id);
        return blockId;
    }
}
//# sourceMappingURL=edgeless-clipboard.js.map