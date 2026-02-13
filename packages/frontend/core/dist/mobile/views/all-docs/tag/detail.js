import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Wrapper } from '@affine/component';
import { EmptyDocs } from '@affine/core/components/affine/empty';
import { createDocExplorerContext, DocExplorerContext, } from '@affine/core/components/explorer/context';
import { DocsExplorer } from '@affine/core/components/explorer/docs-view/docs-list';
import { Page } from '@affine/core/mobile/components/page';
import { CollectionRulesService } from '@affine/core/modules/collection-rules';
import { useLiveData, useService } from '@toeverything/infra';
import { useEffect, useState } from 'react';
import { TagDetailHeader } from './detail-header';
const TagDocs = ({ tag }) => {
    const [explorerContextValue] = useState(() => createDocExplorerContext({
        quickFavorite: true,
        displayProperties: ['createdAt', 'updatedAt', 'tags'],
        view: 'masonry',
        showDragHandle: false,
        groupBy: undefined,
        orderBy: undefined,
    }));
    const collectionRulesService = useService(CollectionRulesService);
    const groups = useLiveData(explorerContextValue.groups$);
    const isEmpty = groups.length === 0 ||
        (groups.length && groups.every(group => !group.items.length));
    useEffect(() => {
        const subscription = collectionRulesService
            .watch({
            filters: [
                { type: 'system', key: 'trash', method: 'is', value: 'false' },
                {
                    type: 'system',
                    key: 'tags',
                    method: 'include-all',
                    value: tag.id,
                },
            ],
            extraFilters: [
                { type: 'system', key: 'trash', method: 'is', value: 'false' },
                {
                    type: 'system',
                    key: 'empty-journal',
                    method: 'is',
                    value: 'false',
                },
            ],
            orderBy: {
                type: 'system',
                key: 'updatedAt',
                desc: true,
            },
        })
            .subscribe({
            next: result => {
                explorerContextValue.groups$.next(result.groups);
            },
            error: console.error,
        });
        return () => subscription.unsubscribe();
    }, [collectionRulesService, explorerContextValue.groups$, tag.id]);
    if (isEmpty) {
        return (_jsxs(_Fragment, { children: [_jsx(EmptyDocs, { absoluteCenter: true, tagId: tag.id }), _jsx(Wrapper, { height: 0, flexGrow: 1 })] }));
    }
    return (_jsx(DocExplorerContext.Provider, { value: explorerContextValue, children: _jsx(DocsExplorer, { masonryItemWidthMin: 150 }) }));
};
export const TagDetail = ({ tag }) => {
    return (_jsx(Page, { header: _jsx(TagDetailHeader, { tag: tag }), tab: true, children: _jsx(TagDocs, { tag: tag }) }));
};
//# sourceMappingURL=detail.js.map