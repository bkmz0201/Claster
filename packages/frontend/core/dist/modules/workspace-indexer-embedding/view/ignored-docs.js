import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Loading } from '@affine/component';
import { DocsService } from '@affine/core/modules/doc';
import { DocDisplayMetaService } from '@affine/core/modules/doc-display-meta';
import { i18nTime } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { docItem, docItemIcon, docItemInfo, docItemTitle, excludeDocsWrapper, } from './styles-css';
const DocItem = ({ doc }) => {
    const docDisplayService = useService(DocDisplayMetaService);
    const docService = useService(DocsService);
    const docTitle = docDisplayService.title$(doc.docId).value;
    const DocIcon = docDisplayService.icon$(doc.docId).value;
    const docRecord = useLiveData(docService.list.doc$(doc.docId));
    if (!docRecord) {
        return null;
    }
    const updatedDate = docRecord.meta$.value.updatedDate;
    const createdDate = docRecord.meta$.value.createDate;
    const updateDate = updatedDate
        ? i18nTime(updatedDate, {
            relative: true,
        })
        : '-';
    const createDate = createdDate
        ? i18nTime(createdDate, {
            absolute: {
                accuracy: 'day',
                noYear: true,
            },
        })
        : '-';
    return (_jsxs("div", { className: docItem, "data-testid": "workspace-embedding-setting-ignore-docs-list-item", children: [_jsxs("div", { className: docItemTitle, children: [_jsx(DocIcon, { className: docItemIcon }), _jsx("span", { className: "ignore-doc-title", "data-testid": "ignore-doc-title", children: docTitle })] }), _jsxs("div", { className: docItemInfo, children: [_jsx("span", { children: updateDate }), _jsx("span", { children: createDate })] })] }));
};
export const IgnoredDocs = ({ ignoredDocs, isLoading, }) => {
    return (_jsx("div", { className: excludeDocsWrapper, "data-testid": "workspace-embedding-setting-ignore-docs-list", children: isLoading ? (_jsx(Loading, {})) : (ignoredDocs.map(doc => _jsx(DocItem, { doc: doc }, doc.docId))) }));
};
//# sourceMappingURL=ignored-docs.js.map