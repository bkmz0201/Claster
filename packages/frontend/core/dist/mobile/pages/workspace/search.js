import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, SafeArea, startScopedViewTransition, useThemeColorV2, } from '@affine/component';
import { CollectionService } from '@affine/core/modules/collection';
import { QuickSearchTagIcon, } from '@affine/core/modules/quicksearch';
import { TagService } from '@affine/core/modules/tag';
import { UserFriendlyError } from '@affine/error';
import { useI18n } from '@affine/i18n';
import { sleep } from '@blocksuite/affine/global/utils';
import { ViewLayersIcon } from '@blocksuite/icons/rc';
import { LiveData, useLiveData, useService, useServices, } from '@toeverything/infra';
import { bodyEmphasized } from '@toeverything/theme/typography';
import { useCallback, useMemo } from 'react';
import { NavigationBackButton, SearchInput, SearchResLabel, } from '../../components';
import { searchVTScope } from '../../components/search-input/style.css';
import { MobileSearchService } from '../../modules/search';
import { SearchResults } from '../../views/search/search-results';
import * as styles from '../../views/search/style.css';
const searchInput$ = new LiveData('');
const RecentList = () => {
    const { mobileSearchService, collectionService, tagService } = useServices({
        MobileSearchService,
        CollectionService,
        TagService,
    });
    const recentDocsList = useLiveData(mobileSearchService.recentDocs.items$);
    const collectionMetas = useLiveData(collectionService.collectionMetas$);
    const tags = useLiveData(LiveData.computed(get => get(tagService.tagList.tags$).map(tag => ({
        id: tag.id,
        title: get(tag.value$),
        color: get(tag.color$),
    }))));
    const docs = useMemo(() => recentDocsList.map(item => ({
        id: item.payload.docId,
        icon: item.icon,
        title: _jsx(SearchResLabel, { item: item }),
    })), [recentDocsList]);
    const collectionList = useMemo(() => {
        return collectionMetas.slice(0, 3).map(item => {
            return {
                id: 'collection:' + item.id,
                source: 'collection',
                label: { title: item.name },
                icon: _jsx(ViewLayersIcon, {}),
                payload: { collectionId: item.id },
            };
        });
    }, [collectionMetas]);
    const tagList = useMemo(() => {
        return tags
            .reverse()
            .slice(0, 3)
            .map(item => {
            return {
                id: 'tag:' + item.id,
                source: 'tag',
                label: { title: item.title },
                icon: _jsx(QuickSearchTagIcon, { color: item.color }),
                payload: { tagId: item.id },
            };
        });
    }, [tags]);
    return (_jsx(SearchResults, { title: "Recent", docs: docs, collections: collectionList, tags: tagList }));
};
const WithQueryList = () => {
    const searchService = useService(MobileSearchService);
    const collectionList = useLiveData(searchService.collections.items$);
    const docList = useLiveData(searchService.docs.items$);
    const tagList = useLiveData(searchService.tags.items$);
    const error = useLiveData(searchService.docs.error$);
    const docs = useMemo(() => docList
        .filter(item => item.id !== 'search-locally')
        .map(item => ({
        id: item.payload.docId,
        icon: item.icon,
        title: _jsx(SearchResLabel, { item: item }),
    })), [docList]);
    return (_jsx(SearchResults, { title: "Search result", docs: docs, collections: collectionList, tags: tagList, error: error ? UserFriendlyError.fromAny(error).message : null }));
};
export const Component = () => {
    const t = useI18n();
    useThemeColorV2('layer/background/mobile/primary');
    const searchInput = useLiveData(searchInput$);
    const searchService = useService(MobileSearchService);
    const onSearch = useCallback((v) => {
        searchInput$.next(v);
        searchService.recentDocs.query(v);
        searchService.collections.query(v);
        searchService.docs.query(v);
        searchService.tags.query(v);
    }, [
        searchService.collections,
        searchService.docs,
        searchService.recentDocs,
        searchService.tags,
    ]);
    const transitionBack = useCallback(() => {
        startScopedViewTransition(searchVTScope, async () => {
            history.back();
            await sleep(10);
        });
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx(SafeArea, { top: true, children: _jsxs("div", { className: styles.searchHeader, "data-testid": "search-header", children: [_jsx(SearchInput, { className: styles.searchInput, debounce: 300, autoFocus: !searchInput, value: searchInput, onInput: onSearch, placeholder: "Search Docs, Collections" }), _jsx(NavigationBackButton, { children: _jsx(Button, { variant: "plain", className: styles.searchCancel, onClick: transitionBack, children: _jsx("span", { className: bodyEmphasized, children: t['Cancel']() }) }) })] }) }), searchInput ? _jsx(WithQueryList, {}) : _jsx(RecentList, {})] }));
};
//# sourceMappingURL=search.js.map