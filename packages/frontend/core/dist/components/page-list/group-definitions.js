import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CompatibleFavoriteItemsAdapter } from '@affine/core/modules/favorite';
import { TagService } from '@affine/core/modules/tag';
import { useI18n } from '@affine/i18n';
import { FavoritedIcon, FavoriteIcon } from '@blocksuite/icons/rc';
import { LiveData, useLiveData, useService } from '@toeverything/infra';
import { useMemo } from 'react';
import * as styles from './group-definitions.css';
import { useAllDocDisplayProperties } from './use-all-doc-display-properties';
import { betweenDaysAgo, withinDaysAgo } from './utils';
const GroupLabel = ({ label, count, icon, id, }) => (_jsxs("div", { className: styles.groupLabelWrapper, children: [icon, _jsx("div", { className: styles.groupLabel, "data-testid": `group-label-${id}`, children: label }), _jsx("div", { className: styles.pageCount, children: ` · ${count}` })] }));
// TODO(@JimmFly): optimize date matchers
export const useDateGroupDefinitions = (key) => {
    const t = useI18n();
    return useMemo(() => [
        {
            id: 'today',
            label: count => (_jsx(GroupLabel, { id: "today", label: t['com.affine.today'](), count: count })),
            match: item => withinDaysAgo(new Date(item[key] ?? item.createDate ?? ''), 1),
        },
        {
            id: 'yesterday',
            label: count => (_jsx(GroupLabel, { id: "yesterday", label: t['com.affine.yesterday'](), count: count })),
            match: item => betweenDaysAgo(new Date(item[key] ?? item.createDate ?? ''), 1, 2),
        },
        {
            id: 'last7Days',
            label: count => (_jsx(GroupLabel, { id: "last7Days", label: t['com.affine.last7Days'](), count: count })),
            match: item => betweenDaysAgo(new Date(item[key] ?? item.createDate ?? ''), 2, 7),
        },
        {
            id: 'last30Days',
            label: count => (_jsx(GroupLabel, { id: "last30Days", label: t['com.affine.last30Days'](), count: count })),
            match: item => betweenDaysAgo(new Date(item[key] ?? item.createDate ?? ''), 7, 30),
        },
        {
            id: 'moreThan30Days',
            label: count => (_jsx(GroupLabel, { id: "moreThan30Days", label: t['com.affine.moreThan30Days'](), count: count })),
            match: item => !withinDaysAgo(new Date(item[key] ?? item.createDate ?? ''), 30),
        },
    ], [key, t]);
};
const GroupTagLabel = ({ tag, count }) => {
    const tagValue = useLiveData(tag.value$);
    const tagColor = useLiveData(tag.color$);
    return (_jsx(GroupLabel, { id: tag.id, label: tagValue, count: count, icon: _jsx("div", { className: styles.tagIcon, style: {
                backgroundColor: tagColor,
            } }) }));
};
export const useTagGroupDefinitions = () => {
    const tagList = useService(TagService).tagList;
    const sortedTagsLiveData$ = useMemo(() => LiveData.computed(get => get(tagList.tags$)
        .slice()
        .sort((a, b) => get(a.value$).localeCompare(get(b.value$)))), [tagList.tags$]);
    const tags = useLiveData(sortedTagsLiveData$);
    const t = useI18n();
    const untagged = useMemo(() => ({
        id: 'Untagged',
        label: (count) => (_jsx(GroupLabel, { id: "Untagged", label: t['com.affine.page.display.grouping.group-by-tag.untagged'](), count: count })),
        match: (item) => item.tags ? !item.tags.length : false,
    }), [t]);
    return useMemo(() => {
        return tags
            .map(tag => ({
            id: tag.id,
            label: (count) => {
                return _jsx(GroupTagLabel, { tag: tag, count: count });
            },
            match: (item) => item.tags?.includes(tag.id),
        }))
            .concat(untagged);
    }, [tags, untagged]);
};
export const useFavoriteGroupDefinitions = () => {
    const t = useI18n();
    const favAdapter = useService(CompatibleFavoriteItemsAdapter);
    const favourites = useLiveData(favAdapter.favorites$);
    return useMemo(() => [
        {
            id: 'favourited',
            label: count => (_jsx(GroupLabel, { id: "favourited", label: t['com.affine.page.group-header.favourited'](), count: count, icon: _jsx(FavoritedIcon, { className: styles.favouritedIcon }) })),
            match: item => favourites.some(fav => fav.id === item.id),
        },
        {
            id: 'notFavourited',
            label: count => (_jsx(GroupLabel, { id: "notFavourited", label: t['com.affine.page.group-header.not-favourited'](), count: count, icon: _jsx(FavoriteIcon, { className: styles.notFavouritedIcon }) })),
            match: item => !favourites.some(fav => fav.id === item.id),
        },
    ], [t, favourites]);
};
export const usePageItemGroupDefinitions = () => {
    const [workspaceProperties] = useAllDocDisplayProperties();
    const tagGroupDefinitions = useTagGroupDefinitions();
    const createDateGroupDefinitions = useDateGroupDefinitions('createDate');
    const updatedDateGroupDefinitions = useDateGroupDefinitions('updatedDate');
    const favouriteGroupDefinitions = useFavoriteGroupDefinitions();
    return useMemo(() => {
        const itemGroupDefinitions = {
            createDate: createDateGroupDefinitions,
            updatedDate: updatedDateGroupDefinitions,
            tag: tagGroupDefinitions,
            favourites: favouriteGroupDefinitions,
            none: undefined,
            // add more here later
            // todo(@JimmFly): some page group definitions maybe dynamic
        };
        return itemGroupDefinitions[workspaceProperties.groupBy];
    }, [
        createDateGroupDefinitions,
        favouriteGroupDefinitions,
        tagGroupDefinitions,
        updatedDateGroupDefinitions,
        workspaceProperties.groupBy,
    ]);
};
//# sourceMappingURL=group-definitions.js.map