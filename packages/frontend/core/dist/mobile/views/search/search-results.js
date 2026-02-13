import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useI18n } from '@affine/i18n';
import { DocCard } from '../../components';
import { UniversalSearchResultItem, } from '../../components/search-result/universal-item';
import * as styles from './style.css';
const Empty = () => {
    const t = useI18n();
    return (_jsx("div", { className: styles.empty, children: t['com.affine.mobile.search.empty']() }));
};
export const SearchResults = ({ title, docs, collections, tags, error, }) => {
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: styles.resTitle, children: title }), error && _jsx("p", { className: styles.errorMessage, children: error }), !docs?.length && !collections?.length && !tags?.length ? (_jsx(Empty, {})) : null, docs?.length ? (_jsxs("div", { className: styles.resBlock, "data-scroll": true, children: [_jsx("div", { className: styles.resBlockTitle, children: "Docs" }), _jsx("div", { className: styles.resBlockScrollContent, children: _jsx("div", { className: styles.scrollDocsContent, children: docs.map(doc => (_jsx(DocCard, { meta: doc, className: styles.docCard }, doc.id))) }) })] })) : null, collections?.length ? (_jsxs("div", { className: styles.resBlock, children: [_jsx("div", { className: styles.resBlockTitle, children: "Collections" }), _jsx("div", { className: styles.resBlockListContent, children: collections.map(collection => (_jsx(UniversalSearchResultItem, { category: "collection", id: collection.payload.collectionId, item: collection }, collection.id))) })] })) : null, tags?.length ? (_jsxs("div", { className: styles.resBlock, children: [_jsx("div", { className: styles.resBlockTitle, children: "Tags" }), _jsx("div", { className: styles.resBlockListContent, children: tags.map(tag => (_jsx(UniversalSearchResultItem, { category: "tag", id: tag.payload.tagId, item: tag }, tag.id))) })] })) : null] }));
};
//# sourceMappingURL=search-results.js.map