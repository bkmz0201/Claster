import { Service } from '@toeverything/infra';
import { combineLatest, map } from 'rxjs';
export class TagsOrderByProvider extends Service {
    constructor(docsService, tagService) {
        super();
        this.docsService = docsService;
        this.tagService = tagService;
    }
    orderBy$(_items$, params) {
        const isDesc = params.desc;
        return combineLatest([
            this.tagService.tagList.tags$.map(tags => new Set(tags.map(t => t.id))),
            this.docsService.allDocsTagIds$(),
        ]).pipe(map(([existsTags, docs]) => docs
            .map(doc => {
            const filteredTags = doc.tags
                .filter(tag => existsTags.has(tag)) // filter out tags that don't exist
                .sort() // sort tags by ids
                .join(','); // convert to string
            return [doc.id, filteredTags];
        })
            .sort((a, b) => (a[1] === b[1] ? 0 : a[1] > b[1] ? 1 : -1) * (isDesc ? -1 : 1))
            .map(i => i[0])));
    }
}
//# sourceMappingURL=tags.js.map