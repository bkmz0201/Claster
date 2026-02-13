import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import { AudioBlockEmbedded } from './audio/audio-block';
import { AttachmentPreviewErrorBoundary } from './error';
import { PDFViewerEmbedded } from './pdf/pdf-viewer-embedded';
import { getAttachmentType } from './utils';
// Embed view
export const AttachmentEmbedPreview = ({ model }) => {
    const attachmentType = getAttachmentType(model);
    const element = useMemo(() => {
        switch (attachmentType) {
            case 'pdf':
                return _jsx(PDFViewerEmbedded, { model: model });
            case 'audio':
                return _jsx(AudioBlockEmbedded, { model: model });
            default:
                return null;
        }
    }, [attachmentType, model]);
    return (_jsx(AttachmentPreviewErrorBoundary, { children: element }));
};
//# sourceMappingURL=attachment-embed-preview.js.map