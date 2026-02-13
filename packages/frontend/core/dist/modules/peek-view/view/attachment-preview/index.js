import { jsx as _jsx } from "react/jsx-runtime";
import { AttachmentViewer } from '@affine/core/blocksuite/attachment-viewer';
import { useMemo } from 'react';
import { useEditor } from '../utils';
export const AttachmentPreviewPeekView = ({ docId, blockId, }) => {
    const { doc } = useEditor(docId);
    const blocksuiteDoc = doc?.blockSuiteDoc;
    const model = useMemo(() => blocksuiteDoc?.getModelById(blockId) ?? null, [blockId, blocksuiteDoc]);
    if (model) {
        return _jsx(AttachmentViewer, { model: model });
    }
    return null;
};
//# sourceMappingURL=index.js.map