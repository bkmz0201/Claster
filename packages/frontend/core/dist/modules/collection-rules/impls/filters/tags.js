import { Service } from '@toeverything/infra';
import { combineLatest, map, of, switchMap } from 'rxjs';
export class TagsFilterProvider extends Service {
    constructor(tagService, docsService) {
        super();
        this.tagService = tagService;
        this.docsService = docsService;
    }
    filter$(params) {
        const method = params.method;
        const tagIds = params.value?.split(',').filter(Boolean) ?? [];
        const tags = tagIds.map(id => this.tagService.tagList.tagByTagId$(id));
        if (method === 'include-all' || method === 'not-include-all') {
            if (tags.length === 0) {
                return of(new Set());
            }
            const includeDocIds$ = combineLatest(tags).pipe(switchMap(tags => combineLatest(tags
                .filter(tag => tag !== undefined)
                .map(tag => tag.pageIds$.map(ids => new Set(ids)))).pipe(map(pageIds => pageIds.reduce((acc, curr) => acc.intersection(curr))))));
            if (method === 'include-all') {
                return includeDocIds$;
            }
            else {
                return combineLatest([
                    this.docsService.allDocIds$(),
                    includeDocIds$,
                ]).pipe(map(([docIds, includeDocIds]) => new Set(docIds.filter(id => !includeDocIds.has(id)))));
            }
        }
        else if (method === 'include-any-of' || method === 'not-include-any-of') {
            if (tags.length === 0) {
                return of(new Set());
            }
            const includeAnyOfDocIds$ = combineLatest(tags).pipe(switchMap(tags => combineLatest(tags.filter(tag => tag !== undefined).map(tag => tag.pageIds$)).pipe(map(pageIds => new Set(pageIds.flat())))));
            if (method === 'include-any-of') {
                return includeAnyOfDocIds$;
            }
            else {
                return combineLatest([
                    this.docsService.allDocIds$(),
                    includeAnyOfDocIds$,
                ]).pipe(map(([docIds, includeAnyOfDocIds]) => new Set(docIds.filter(id => !includeAnyOfDocIds.has(id)))));
            }
        }
        else if (method === 'is-not-empty') {
            return combineLatest([
                this.tagService.tagList.tags$.map(tags => new Set(tags.map(t => t.id))),
                this.docsService.allDocsTagIds$(),
            ]).pipe(map(([tags, docs]) => new Set(docs
                .filter(
            // filter deleted tags
            // oxlint-disable-next-line prefer-array-some
            doc => doc.tags.filter(tag => tags.has(tag)).length > 0)
                .map(doc => doc.id))));
        }
        else if (method === 'is-empty') {
            return this.tagService.tagList.tags$
                .map(tags => new Set(tags.map(t => t.id)))
                .pipe(switchMap(tags => this.docsService.allDocsTagIds$().pipe(map(docs => {
                return new Set(docs
                    .filter(
                // filter deleted tags
                // oxlint-disable-next-lint prefer-array-some
                doc => doc.tags.filter(tag => tags.has(tag)).length === 0)
                    .map(doc => doc.id));
            }))));
        }
        throw new Error(`Unsupported method: ${method}`);
    }
}
//# sourceMappingURL=tags.js.map