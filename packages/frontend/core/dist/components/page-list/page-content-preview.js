import { jsx as _jsx } from "react/jsx-runtime";
import { DocSummaryService } from '@affine/core/modules/doc-summary';
import { LiveData, useLiveData, useService } from '@toeverything/infra';
import { useMemo } from 'react';
const PagePreviewInner = ({ pageId, emptyFallback, fallback, }) => {
    const docSummary = useService(DocSummaryService);
    const summary = useLiveData(useMemo(() => LiveData.from(docSummary.watchDocSummary(pageId), null), [docSummary, pageId]));
    const res = summary === null ? fallback : summary === '' ? emptyFallback : summary;
    return res;
};
export const PagePreview = (props) => {
    return _jsx(PagePreviewInner, { ...props });
};
//# sourceMappingURL=page-content-preview.js.map