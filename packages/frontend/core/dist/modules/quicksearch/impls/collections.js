import { ViewLayersIcon } from '@blocksuite/icons/rc';
import { Entity, LiveData } from '@toeverything/infra';
import Fuse from 'fuse.js';
import { highlighter } from '../utils/highlighter';
const group = {
    id: 'collections',
    label: {
        i18nKey: 'com.affine.cmdk.affine.category.affine.collections',
    },
    score: 10,
};
export class CollectionsQuickSearchSession extends Entity {
    constructor(collectionService) {
        super();
        this.collectionService = collectionService;
        this.query$ = new LiveData('');
        this.items$ = LiveData.computed(get => {
            const query = get(this.query$);
            const collections = get(this.collectionService.collectionMetas$);
            const fuse = new Fuse(collections, {
                keys: ['name'],
                includeMatches: true,
                includeScore: true,
                ignoreLocation: true,
                threshold: 0.0,
            });
            const result = fuse.search(query);
            return result.map(({ item, matches, score = 1 }) => {
                const nomalizedRange = ([start, end]) => [
                    start,
                    end + 1 /* in fuse, the `end` is different from the `substring` */,
                ];
                const titleMatches = matches
                    ?.filter(match => match.key === 'name')
                    .flatMap(match => match.indices.map(nomalizedRange));
                return {
                    id: 'collection:' + item.id,
                    source: 'collections',
                    label: {
                        title: (highlighter(item.name, '<b>', '</b>', titleMatches ?? []) ??
                            item.name) || {
                            i18nKey: 'Untitled',
                        },
                    },
                    group,
                    score: 1 -
                        score /* in fuse, the smaller the score, the better the match, so we need to reverse it */,
                    icon: ViewLayersIcon,
                    payload: { collectionId: item.id },
                };
            });
        });
    }
    query(query) {
        this.query$.next(query);
    }
}
//# sourceMappingURL=collections.js.map