import { jsx as _jsx } from "react/jsx-runtime";
import { AttachmentEmbedPreview } from '@affine/core/blocksuite/attachment-viewer/attachment-embed-preview';
import { AttachmentEmbedConfigIdentifier } from '@blocksuite/affine/blocks/attachment';
export function patchForAudioEmbedView(reactToLit) {
    return {
        setup: di => {
            // do not show audio block on mobile
            if (BUILD_CONFIG.isMobileEdition) {
                return;
            }
            di.override(AttachmentEmbedConfigIdentifier('audio'), () => ({
                name: 'audio',
                check: (model, maxFileSize) => model.props.type.startsWith('audio/') &&
                    model.props.size <= maxFileSize,
                render: (model, _) => reactToLit(_jsx(AttachmentEmbedPreview, { model: model }), false),
            }));
        },
    };
}
//# sourceMappingURL=audio-view.js.map