import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Modal, Scrollable } from '@affine/component';
import { BlocksuiteHeaderTitle } from '@affine/core/blocksuite/block-suite-header/title';
import { DocsService } from '@affine/core/modules/doc';
import { FrameworkScope, useService } from '@toeverything/infra';
import { useEffect, useState } from 'react';
import { InfoTable } from './info-modal';
import * as styles from './styles.css';
export const DocInfoDialog = ({ close, docId, }) => {
    const docsService = useService(DocsService);
    const [doc, setDoc] = useState(null);
    useEffect(() => {
        if (!docId)
            return;
        const docRef = docsService.open(docId);
        setDoc(docRef.doc);
        return () => {
            docRef.release();
            setDoc(null);
        };
    }, [docId, docsService]);
    if (!doc || !docId)
        return null;
    return (_jsx(FrameworkScope, { scope: doc.scope, children: _jsx(Modal, { contentOptions: {
                className: styles.container,
            }, open: true, onOpenChange: () => close(), withoutCloseButton: true, children: _jsxs(Scrollable.Root, { children: [_jsxs(Scrollable.Viewport, { className: styles.viewport, "data-testid": "info-modal", children: [_jsx("div", { className: styles.titleContainer, "data-testid": "info-modal-title", children: _jsx(BlocksuiteHeaderTitle, { className: styles.titleStyle }) }), _jsx(InfoTable, { docId: docId, onClose: () => close() })] }), _jsx(Scrollable.Scrollbar, { className: styles.scrollBar })] }) }) }));
};
//# sourceMappingURL=index.js.map