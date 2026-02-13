import { jsx as _jsx } from "react/jsx-runtime";
import { PropertyCollapsibleSection } from '@affine/component';
import { AffinePageReference } from '@affine/core/components/affine/reference-link';
import * as styles from './links-row.css';
export const LinksRow = ({ references, count, label, className, onClick, }) => {
    return (_jsx(PropertyCollapsibleSection, { title: `${label} · ${count}`, className: className, children: Array.isArray(references)
            ? references.map(link => (_jsx(AffinePageReference, { pageId: link.docId, params: 'params' in link ? link.params : undefined, className: styles.wrapper, onClick: onClick }, link.docId)))
            : references }));
};
//# sourceMappingURL=links-row.js.map