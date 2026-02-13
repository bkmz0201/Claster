import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconButton, Menu } from '@affine/component';
import { CollectionRulesService, } from '@affine/core/modules/collection-rules';
import { ShareDocsListService } from '@affine/core/modules/share-doc';
import { Trans, useI18n } from '@affine/i18n';
import { FilterIcon } from '@blocksuite/icons/rc';
import { useLiveData, useServices } from '@toeverything/infra';
import { memo, useCallback, useEffect, useState } from 'react';
import { createDocExplorerContext, DocExplorerContext, } from '../../explorer/context';
import { DocsExplorer } from '../../explorer/docs-view/docs-list';
import { Filters } from '../../filter';
import { AddFilterMenu } from '../../filter/add-filter';
import { AffineShapeIcon } from '..';
import { SelectorLayout } from '../selector/selector-layout';
import * as styles from './select-page.css';
export const SelectPage = memo(function SelectPage({ init = [], onConfirm, onCancel, onChange: propsOnChange, header, buttons, }) {
    const t = useI18n();
    const [searchText, setSearchText] = useState('');
    const { shareDocsListService, collectionRulesService } = useServices({
        ShareDocsListService,
        CollectionRulesService,
    });
    const [docExplorerContextValue] = useState(() => {
        return createDocExplorerContext({
            displayProperties: ['createdAt', 'updatedAt', 'tags'],
            quickFavorite: true,
            showMoreOperation: false,
            showDragHandle: false,
            groupBy: undefined,
            orderBy: undefined,
        });
    });
    // init context value
    useEffect(() => {
        docExplorerContextValue.selectMode$.next(true);
        docExplorerContextValue.selectedDocIds$.next(init);
    }, [
        docExplorerContextValue.selectMode$,
        docExplorerContextValue.selectedDocIds$,
        init,
    ]);
    const groups = useLiveData(docExplorerContextValue.groups$);
    const selectedDocIds = useLiveData(docExplorerContextValue.selectedDocIds$);
    const isEmpty = groups.length === 0 ||
        (groups.length && groups.every(group => group.items.length === 0));
    const confirm = useCallback(() => {
        onConfirm?.(docExplorerContextValue.selectedDocIds$.value);
    }, [onConfirm, docExplorerContextValue.selectedDocIds$]);
    const clearSelected = useCallback(() => {
        docExplorerContextValue.selectedDocIds$.next([]);
    }, [docExplorerContextValue.selectedDocIds$]);
    useEffect(() => {
        const ob = docExplorerContextValue.selectedDocIds$.subscribe(value => {
            propsOnChange?.(value);
        });
        return () => {
            ob.unsubscribe();
        };
    }, [propsOnChange, docExplorerContextValue.selectedDocIds$]);
    useEffect(() => {
        shareDocsListService.shareDocs?.revalidate();
    }, [shareDocsListService.shareDocs]);
    const [filters, setFilters] = useState([]);
    useEffect(() => {
        const searchFilter = searchText
            ? {
                type: 'system',
                key: 'title',
                method: 'match',
                value: searchText,
            }
            : null;
        const watchFilters = filters.length > 0
            ? filters
            : [
                // if no filters are present, match all non-trash documents
                {
                    type: 'system',
                    key: 'trash',
                    method: 'is',
                    value: 'false',
                },
            ];
        if (searchFilter) {
            watchFilters.push(searchFilter);
        }
        const subscription = collectionRulesService
            .watch({
            filters: watchFilters,
            extraFilters: [
                {
                    type: 'system',
                    key: 'empty-journal',
                    method: 'is',
                    value: 'false',
                },
                {
                    type: 'system',
                    key: 'trash',
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
            .subscribe(result => {
            docExplorerContextValue.groups$.next(result.groups);
        });
        return () => {
            subscription.unsubscribe();
        };
    }, [
        collectionRulesService,
        docExplorerContextValue.groups$,
        filters,
        searchText,
    ]);
    return (_jsx(SelectorLayout, { searchPlaceholder: t['com.affine.editCollection.search.placeholder'](), selectedCount: selectedDocIds.length, onSearch: setSearchText, onClear: clearSelected, onCancel: onCancel, onConfirm: confirm, actions: buttons, children: _jsxs("div", { className: styles.pagesTab, children: [_jsxs("div", { className: styles.pagesTabContent, children: [header ?? (_jsx("div", { style: { fontSize: 12, lineHeight: '20px', fontWeight: 600 }, children: t['com.affine.selectPage.title']() })), filters.length === 0 ? (_jsx(Menu, { items: _jsx(AddFilterMenu, { onAdd: params => setFilters([...filters, params]) }), children: _jsx(IconButton, { icon: _jsx(FilterIcon, {}) }) })) : null] }), filters.length !== 0 ? (_jsx("div", { style: { padding: '12px 16px 16px' }, children: _jsx(Filters, { filters: filters, onChange: setFilters }) })) : null, !isEmpty ? (_jsx(DocExplorerContext.Provider, { value: docExplorerContextValue, children: _jsx(DocsExplorer, { disableMultiSelectToolbar: true }) })) : (_jsx(EmptyList, { search: searchText }))] }) }));
});
export const EmptyList = ({ search }) => {
    const t = useI18n();
    return (_jsxs("div", { style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            flex: 1,
        }, children: [_jsx(AffineShapeIcon, {}), _jsx("div", { style: {
                    margin: '18px 0',
                    fontSize: 20,
                    lineHeight: '28px',
                    fontWeight: 600,
                }, children: t['com.affine.selectPage.empty']() }), search ? (_jsx("div", { className: styles.ellipsis, style: { maxWidth: 300, fontSize: 15, lineHeight: '24px' }, children: _jsxs(Trans, { i18nKey: "com.affine.selectPage.empty.tips", values: { search }, children: ["No page titles contain", _jsx("span", { style: { fontWeight: 600, color: 'var(--affine-primary-color)' }, children: "search" })] }) })) : null] }));
};
//# sourceMappingURL=select-page.js.map