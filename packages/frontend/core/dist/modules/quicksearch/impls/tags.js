import { Entity, LiveData } from '@toeverything/infra';
import Fuse from 'fuse.js';
import { highlighter } from '../utils/highlighter';
import { QuickSearchTagIcon } from '../views/tag-icon';
const group = {
    id: 'tags',
    label: {
        i18nKey: 'com.affine.cmdk.affine.category.affine.tags',
    },
    score: 10,
};
export class TagsQuickSearchSession extends Entity {
    constructor(tagService) {
        super();
        this.tagService = tagService;
        this.query$ = new LiveData('');
        this.items$ = LiveData.computed(get => {
            const query = get(this.query$);
            // has performance issues with `tagList.tagMetas$`
            const tags = get(this.tagService.tagList.tags$).map(tag => ({
                id: tag.id,
                title: get(tag.value$),
                color: get(tag.color$),
            }));
            const fuse = new Fuse(tags, {
                keys: ['title'],
                includeMatches: true,
                includeScore: true,
                ignoreLocation: true,
                threshold: 0.0,
            });
            const result = fuse.search(query);
            return result.map(({ item, matches, score = 1 }) => {
                const normalizedRange = ([start, end]) => [
                    start,
                    end +
                        1 /* in fuse, the `end` is different from the `substring` */,
                ];
                const titleMatches = matches
                    ?.filter(match => match.key === 'title')
                    .flatMap(match => match.indices.map(normalizedRange));
                const Icon = () => QuickSearchTagIcon({ color: item.color });
                return {
                    id: 'tag:' + item.id,
                    source: 'tags',
                    label: {
                        title: (highlighter(item.title, '<b>', '</b>', titleMatches ?? []) ??
                            item.title) || {
                            i18nKey: 'Untitled',
                        },
                    },
                    group,
                    score: 1 - score,
                    icon: Icon,
                    matches: titleMatches,
                    payload: { tagId: item.id },
                };
            });
        });
    }
    query(query) {
        this.query$.next(query);
    }
}
//# sourceMappingURL=tags.js.map