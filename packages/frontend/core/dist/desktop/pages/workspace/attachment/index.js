import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Skeleton } from '@affine/component';
import { AttachmentViewerView } from '@affine/core/blocksuite/attachment-viewer';
import { DocsService } from '@affine/core/modules/doc';
import {} from '@blocksuite/affine/model';
import { FrameworkScope, useLiveData, useService } from '@toeverything/infra';
import { useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ViewIcon, ViewTitle } from '../../../../modules/workbench';
import { PageNotFound } from '../../404';
import * as styles from './index.css';
const useLoadAttachment = (pageId, attachmentId) => {
    const [loading, setLoading] = useState(true);
    const docsService = useService(DocsService);
    const docRecord = useLiveData(docsService.list.doc$(pageId));
    const [doc, setDoc] = useState(null);
    const [model, setModel] = useState(null);
    useLayoutEffect(() => {
        if (!docRecord) {
            setLoading(false);
            return;
        }
        const { doc, release } = docsService.open(pageId);
        setDoc(doc);
        if (!doc.blockSuiteDoc.ready) {
            doc.blockSuiteDoc.load();
        }
        const dispose = doc.addPriorityLoad(10);
        doc
            .waitForSyncReady()
            .then(() => {
            const model = doc.blockSuiteDoc.getModelById(attachmentId);
            setModel(model);
        })
            .catch(console.error)
            .finally(() => setLoading(false));
        return () => {
            release();
            dispose();
        };
    }, [docRecord, docsService, pageId, attachmentId, setLoading]);
    return { doc, model, loading };
};
const Loading = () => {
    return (_jsxs("div", { className: styles.attachmentSkeletonStyle, children: [_jsx(Skeleton, { className: styles.attachmentSkeletonItemStyle, animation: "wave", height: 30 }), _jsx(Skeleton, { className: styles.attachmentSkeletonItemStyle, animation: "wave", height: 30, width: "80%" }), _jsx(Skeleton, { className: styles.attachmentSkeletonItemStyle, animation: "wave", height: 30 }), _jsx(Skeleton, { className: styles.attachmentSkeletonItemStyle, animation: "wave", height: 30, width: "70%" }), _jsx(Skeleton, { className: styles.attachmentSkeletonItemStyle, animation: "wave", height: 30 })] }));
};
export const AttachmentPage = ({ pageId, attachmentId, }) => {
    const { doc, model, loading } = useLoadAttachment(pageId, attachmentId);
    if (loading) {
        return _jsx(Loading, {});
    }
    if (doc && model) {
        return (_jsxs(FrameworkScope, { scope: doc.scope, children: [_jsx(ViewTitle, { title: model.props.name }), _jsx(ViewIcon, { icon: model.props.type.endsWith('pdf') ? 'pdf' : 'attachment' }), _jsx(AttachmentViewerView, { model: model })] }));
    }
    return _jsx(PageNotFound, { noPermission: false });
};
export const Component = () => {
    const { pageId, attachmentId } = useParams();
    if (pageId && attachmentId) {
        return _jsx(AttachmentPage, { pageId: pageId, attachmentId: attachmentId });
    }
    return _jsx(PageNotFound, { noPermission: true });
};
//# sourceMappingURL=index.js.map