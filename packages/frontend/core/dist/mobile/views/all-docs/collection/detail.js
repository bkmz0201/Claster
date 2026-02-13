import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Wrapper } from '@affine/component';
import { EmptyCollectionDetail, EmptyDocs, } from '@affine/core/components/affine/empty';
import { createDocExplorerContext, DocExplorerContext, } from '@affine/core/components/explorer/context';
import { DocsExplorer } from '@affine/core/components/explorer/docs-view/docs-list';
import { PageHeader } from '@affine/core/mobile/components';
import { Page } from '@affine/core/mobile/components/page';
import { ViewLayersIcon } from '@blocksuite/icons/rc';
import { useLiveData } from '@toeverything/infra';
import { useEffect, useState } from 'react';
import * as styles from './detail.css';
export const DetailHeader = ({ collection }) => {
    const name = useLiveData(collection.name$);
    return (_jsx(PageHeader, { className: styles.header, back: true, children: _jsxs("div", { className: styles.headerContent, children: [_jsx(ViewLayersIcon, { className: styles.headerIcon }), name] }) }));
};
const CollectionDocs = ({ collection }) => {
    const [explorerContextValue] = useState(() => createDocExplorerContext({
        quickFavorite: true,
        displayProperties: ['createdAt', 'updatedAt', 'tags'],
        view: 'masonry',
        showDragHandle: false,
        groupBy: undefined,
        orderBy: undefined,
    }));
    const groups = useLiveData(explorerContextValue.groups$);
    const isEmpty = groups.length === 0 ||
        (groups.length && groups.every(group => !group.items.length));
    useEffect(() => {
        const subscription = collection.watch().subscribe({
            next: result => {
                explorerContextValue.groups$.next([
                    {
                        key: 'collection',
                        items: result,
                    },
                ]);
            },
            error: console.error,
        });
        return () => subscription.unsubscribe();
    }, [collection, explorerContextValue.groups$]);
    if (isEmpty) {
        return (_jsxs(_Fragment, { children: [_jsx(EmptyDocs, { absoluteCenter: true }), _jsx(Wrapper, { height: 0, flexGrow: 1 })] }));
    }
    return (_jsx(DocExplorerContext.Provider, { value: explorerContextValue, children: _jsx(DocsExplorer, { masonryItemWidthMin: 150 }) }));
};
export const CollectionDetail = ({ collection, }) => {
    const info = useLiveData(collection.info$);
    if (info.allowList.length === 0 && info.rules.filters.length === 0) {
        return (_jsx(Page, { header: _jsx(DetailHeader, { collection: collection }), children: _jsx("div", { style: { flexGrow: 1 }, children: _jsx(EmptyCollectionDetail, { collection: collection, absoluteCenter: true }) }) }));
    }
    return (_jsx(Page, { header: _jsx(DetailHeader, { collection: collection }), children: _jsx(CollectionDocs, { collection: collection }) }));
};
//# sourceMappingURL=detail.js.map