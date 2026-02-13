import { Entity, LiveData } from '@toeverything/infra';
import { Tag } from '../entities/tag';
export class TagList extends Entity {
    constructor(store, docs) {
        super();
        this.store = store;
        this.docs = docs;
        this.pool = new Map();
        this.tags$ = LiveData.from(this.store.watchTagIds(), []).map(ids => {
            return ids.map(id => {
                const exists = this.pool.get(id);
                if (exists) {
                    return exists;
                }
                const record = this.framework.createEntity(Tag, { id });
                this.pool.set(id, record);
                return record;
            });
        });
        this.tagMetas$ = LiveData.computed(get => {
            return get(this.tags$).map(tag => {
                return {
                    id: tag.id,
                    name: get(tag.value$),
                    color: get(tag.color$),
                    createDate: get(tag.createDate$),
                    updatedDate: get(tag.updateDate$),
                };
            });
        });
    }
    createTag(value, color) {
        const newId = this.store.createNewTag(value, color);
        const newTag = this.framework.createEntity(Tag, { id: newId });
        return newTag;
    }
    deleteTag(tagId) {
        this.store.deleteTag(tagId);
    }
    tagsByPageId$(pageId) {
        return LiveData.computed(get => {
            const docRecord = get(this.docs.list.doc$(pageId));
            if (!docRecord)
                return [];
            const tagIds = get(docRecord.meta$).tags;
            return get(this.tags$).filter(tag => (tagIds ?? []).includes(tag.id));
        });
    }
    tagIdsByPageId$(pageId) {
        return this.tagsByPageId$(pageId).map(tags => tags.map(tag => tag.id));
    }
    tagByTagId$(tagId) {
        return this.tags$.map(tags => tags.find(tag => tag.id === tagId));
    }
    filterFn(value, query) {
        const trimmedQuery = query?.trim().toLowerCase() ?? '';
        const trimmedValue = value.trim().toLowerCase();
        return trimmedValue.includes(trimmedQuery);
    }
    filterTagsByName$(name) {
        return LiveData.computed(get => {
            return get(this.tags$).filter(tag => this.filterFn(get(tag.value$), name));
        });
    }
}
//# sourceMappingURL=tag-list.js.map