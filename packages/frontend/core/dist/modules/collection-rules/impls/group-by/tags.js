import { Service } from '@toeverything/infra';
import { combineLatest, map } from 'rxjs';
export class TagsGroupByProvider extends Service {
    constructor(docsService, tagService) {
        super();
        this.docsService = docsService;
        this.tagService = tagService;
    }
    groupBy$(_items$, _params) {
        return combineLatest([
            this.tagService.tagList.tags$.map(tags => new Set(tags.map(t => t.id))),
            this.docsService.allDocsTagIds$(),
        ]).pipe(map(([existsTags, docs]) => {
            const map = new Map();
            for (const { id, tags } of docs) {
                for (const tag of tags) {
                    if (!existsTags.has(tag)) {
                        continue;
                    }
                    const set = map.get(tag) ?? new Set();
                    set.add(id);
                    map.set(tag, set);
                }
            }
            return map;
        }));
    }
}
//# sourceMappingURL=tags.js.map