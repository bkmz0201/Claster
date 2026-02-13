import { jsx as _jsx } from "react/jsx-runtime";
import { AttachmentEmbedPreview } from '@affine/core/blocksuite/attachment-viewer/attachment-embed-preview';
import { AttachmentEmbedConfigIdentifier } from '@blocksuite/affine/blocks/attachment';
import { Bound } from '@blocksuite/affine/global/gfx';
import { EMBED_CARD_HEIGHT, EMBED_CARD_WIDTH, } from '@blocksuite/affine/shared/consts';
export function patchForPDFEmbedView(reactToLit) {
    return {
        setup: di => {
            di.override(AttachmentEmbedConfigIdentifier('pdf'), () => ({
                name: 'pdf',
                shouldShowStatus: true,
                check: (model, maxFileSize) => model.props.type === 'application/pdf' &&
                    model.props.size <= maxFileSize,
                action: model => {
                    const bound = Bound.deserialize(model.props.xywh);
                    bound.w = EMBED_CARD_WIDTH.pdf;
                    bound.h = EMBED_CARD_HEIGHT.pdf;
                    model.store.updateBlock(model, {
                        embed: true,
                        style: 'pdf',
                        xywh: bound.serialize(),
                    });
                },
                render: (model, _) => reactToLit(_jsx(AttachmentEmbedPreview, { model: model }), true),
            }));
        },
    };
}
//# sourceMappingURL=pdf-view.js.map