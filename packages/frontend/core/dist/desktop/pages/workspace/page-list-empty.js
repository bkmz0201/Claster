import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { EmptyDocs, EmptyTags } from '@affine/core/components/affine/empty';
import { EmptyCollections } from '@affine/core/components/affine/empty/collections';
import * as styles from './page-list-empty.css';
export const EmptyPageList = ({ type, heading, tagId, }) => {
    return (_jsxs("div", { className: styles.pageListEmptyStyle, children: [heading && _jsx("div", { children: heading }), _jsx(EmptyDocs, { tagId: tagId, type: type, className: styles.pageListEmptyBody })] }));
};
export const EmptyCollectionList = ({ heading }) => {
    return (_jsxs("div", { className: styles.pageListEmptyStyle, children: [heading && _jsx("div", { children: heading }), _jsx(EmptyCollections, { className: styles.pageListEmptyBody })] }));
};
export const EmptyTagList = ({ heading }) => {
    return (_jsxs("div", { className: styles.pageListEmptyStyle, children: [heading && _jsx("div", { children: heading }), _jsx(EmptyTags, { className: styles.pageListEmptyBody })] }));
};
//# sourceMappingURL=page-list-empty.js.map