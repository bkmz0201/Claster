import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ViewBody, ViewHeader } from '@affine/core/modules/workbench';
import { AttachmentFallback, AttachmentPreviewErrorBoundary } from './error';
import { PDFViewer } from './pdf/pdf-viewer';
import { buildAttachmentProps } from './utils';
import { Titlebar } from './viewer';
import * as styles from './viewer.css';
// Peek view
export const AttachmentViewer = ({ model }) => {
    const props = buildAttachmentProps(model);
    return (_jsxs("div", { className: styles.viewerContainer, children: [_jsx(Titlebar, { ...props }), _jsx(AttachmentViewerInner, { ...props })] }));
};
// Split view or standalone page
export const AttachmentViewerView = ({ model }) => {
    const props = buildAttachmentProps(model);
    return (_jsxs(_Fragment, { children: [_jsx(ViewHeader, { children: _jsx(Titlebar, { ...props }) }), _jsx(ViewBody, { children: _jsx(AttachmentViewerInner, { ...props }) })] }));
};
const AttachmentViewerInner = (props) => {
    const isPDF = props.model.props.type.endsWith('pdf');
    if (isPDF) {
        return (_jsx(AttachmentPreviewErrorBoundary, { children: _jsx(PDFViewer, { ...props }) }));
    }
    return _jsx(AttachmentFallback, { ...props });
};
//# sourceMappingURL=index.js.map