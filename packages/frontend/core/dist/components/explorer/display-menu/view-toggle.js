import { jsx as _jsx } from "react/jsx-runtime";
import { RadioGroup } from '@affine/component';
import track from '@affine/track';
import { useCallback } from 'react';
import { DocListViewIcon, } from '../docs-view/doc-list-item';
import * as styles from './view-toggle.css';
const views = [
    {
        label: _jsx(DocListViewIcon, { view: "masonry" }),
        value: 'masonry',
        className: styles.viewToggleItem,
    },
    {
        label: _jsx(DocListViewIcon, { view: "grid" }),
        value: 'grid',
        className: styles.viewToggleItem,
    },
    {
        label: _jsx(DocListViewIcon, { view: "list" }),
        value: 'list',
        className: styles.viewToggleItem,
    },
];
export const ViewToggle = ({ view, onViewChange, }) => {
    const handleViewChange = useCallback((view) => {
        track.allDocs.header.viewMode.editDisplayMenu({
            type: view,
        });
        onViewChange(view);
    }, [onViewChange]);
    return (_jsx(RadioGroup, { itemHeight: 24, gap: 8, padding: 0, items: views, value: view, onChange: handleViewChange, className: styles.viewToggle, borderRadius: 4, indicatorClassName: styles.viewToggleIndicator }));
};
//# sourceMappingURL=view-toggle.js.map