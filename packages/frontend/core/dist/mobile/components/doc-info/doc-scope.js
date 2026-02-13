import { jsx as _jsx } from "react/jsx-runtime";
import { DocsService } from '@affine/core/modules/doc';
import { FrameworkScope, useService } from '@toeverything/infra';
import { useEffect, useState } from 'react';
export const DocFrameScope = ({ children, docId, }) => {
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
    return _jsx(FrameworkScope, { scope: doc.scope, children: children });
};
//# sourceMappingURL=doc-scope.js.map