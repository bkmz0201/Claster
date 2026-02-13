import { Entity, LiveData } from '@toeverything/infra';
import type { TagService } from '../../tag';
import type { QuickSearchSession } from '../providers/quick-search-provider';
import type { QuickSearchItem } from '../types/item';
export declare class TagsQuickSearchSession extends Entity implements QuickSearchSession<'tags', {
    tagId: string;
}> {
    private readonly tagService;
    constructor(tagService: TagService);
    query$: LiveData<string>;
    items$: LiveData<QuickSearchItem<'tags', {
        tagId: string;
    }>[]>;
    query(query: string): void;
}
//# sourceMappingURL=tags.d.ts.map