import { Entity, LiveData } from '@toeverything/infra';
import type { DocsService } from '../../doc';
import { Tag } from '../entities/tag';
import type { TagStore } from '../stores/tag';
export declare class TagList extends Entity {
    private readonly store;
    private readonly docs;
    constructor(store: TagStore, docs: DocsService);
    private readonly pool;
    readonly tags$: LiveData<Tag[]>;
    createTag(value: string, color: string): Tag;
    deleteTag(tagId: string): void;
    tagsByPageId$(pageId: string): LiveData<Tag[]>;
    tagIdsByPageId$(pageId: string): LiveData<string[]>;
    tagByTagId$(tagId?: string): LiveData<Tag | undefined>;
    tagMetas$: LiveData<{
        id: string;
        name: string;
        color: string;
        createDate: number | Date;
        updatedDate: number | Date;
    }[]>;
    private filterFn;
    filterTagsByName$(name: string): LiveData<Tag[]>;
}
//# sourceMappingURL=tag-list.d.ts.map