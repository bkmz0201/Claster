import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { IconButton, Skeleton } from '@affine/component';
import { useCatchEventCallback } from '@affine/core/components/hooks/use-catch-event-hook';
import { PagePreview } from '@affine/core/components/page-list/page-content-preview';
import { IsFavoriteIcon } from '@affine/core/components/pure/icons';
import { DocDisplayMetaService } from '@affine/core/modules/doc-display-meta';
import { CompatibleFavoriteItemsAdapter } from '@affine/core/modules/favorite';
import { WorkbenchLink, } from '@affine/core/modules/workbench';
import { useLiveData, useService } from '@toeverything/infra';
import clsx from 'clsx';
import { forwardRef, useMemo, useRef } from 'react';
import * as styles from './styles.css';
import { DocCardTags } from './tag';
export const calcRowsById = (id, min = 2, max = 8) => {
    const code = id.charCodeAt(0);
    return Math.floor((code % (max - min)) + min);
};
export const DocCard = forwardRef(function DocCard({ showTags = true, meta, className, autoHeightById, ...attrs }, outerRef) {
    const containerRef = useRef(null);
    const favAdapter = useService(CompatibleFavoriteItemsAdapter);
    const docDisplayService = useService(DocDisplayMetaService);
    const title = useLiveData(docDisplayService.title$(meta.id));
    const favorited = useLiveData(favAdapter.isFavorite$(meta.id, 'doc'));
    const toggleFavorite = useCatchEventCallback((e) => {
        e.preventDefault();
        favAdapter.toggle(meta.id, 'doc');
    }, [favAdapter, meta.id]);
    const contentStyle = useMemo(() => {
        if (!autoHeightById)
            return { flex: 1 };
        const rows = calcRowsById(meta.id);
        return { height: `${rows * 18}px` };
    }, [autoHeightById, meta.id]);
    return (_jsxs(WorkbenchLink, { to: `/${meta.id}`, ref: ref => {
            containerRef.current = ref;
            if (typeof outerRef === 'function') {
                outerRef(ref);
            }
            else if (outerRef) {
                outerRef.current = ref;
            }
        }, className: clsx(styles.card, className), "data-testid": "doc-card", "data-doc-id": meta.id, ...attrs, children: [_jsxs("header", { className: styles.head, "data-testid": "doc-card-header", children: [_jsx("h3", { className: styles.title, children: title }), _jsx(IconButton, { "aria-label": "favorite", icon: _jsx(IsFavoriteIcon, { onClick: toggleFavorite, favorite: favorited }) })] }), _jsx("main", { className: styles.content, style: contentStyle, children: _jsx(PagePreview, { fallback: _jsxs(_Fragment, { children: [_jsx(Skeleton, {}), _jsx(Skeleton, { width: '60%' })] }), pageId: meta.id, emptyFallback: _jsx("div", { className: styles.contentEmpty, children: "Empty" }) }) }), showTags ? _jsx(DocCardTags, { docId: meta.id, rows: 2 }) : null] }));
});
//# sourceMappingURL=index.js.map