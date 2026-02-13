import { Entity, LiveData } from '@toeverything/infra';
import { databaseTagColorToAffineLabel } from './utils';
export class Tag extends Entity {
    constructor(store, docs) {
        super();
        this.store = store;
        this.docs = docs;
        this.id = this.props.id;
        this.tagOption$ = LiveData.from(this.store.watchTagInfo(this.id), undefined).map(tagInfo => tagInfo);
        this.value$ = this.tagOption$.map(tag => tag?.value || '');
        this.color$ = this.tagOption$.map(tag => databaseTagColorToAffineLabel(tag?.color ?? '') || '');
        this.createDate$ = this.tagOption$.map(tag => tag?.createDate || Date.now());
        this.updateDate$ = this.tagOption$.map(tag => tag?.updateDate || Date.now());
        this.pageIds$ = LiveData.from(this.store.watchTagPageIds(this.id), []);
    }
    rename(value) {
        this.store.updateTagInfo(this.id, {
            id: this.id,
            value,
            color: this.color$.value,
            createDate: this.createDate$.value,
            updateDate: Date.now(),
        });
    }
    changeColor(color) {
        this.store.updateTagInfo(this.id, {
            color,
        });
    }
    tag(pageId) {
        const pageRecord = this.docs.list.doc$(pageId).value;
        if (!pageRecord) {
            return;
        }
        pageRecord?.setMeta({
            tags: [...(pageRecord.meta$.value.tags ?? []), this.id],
        });
    }
    untag(pageId) {
        const pageRecord = this.docs.list.doc$(pageId).value;
        if (!pageRecord) {
            return;
        }
        pageRecord?.setMeta({
            tags: pageRecord.meta$.value.tags?.filter(tagId => tagId !== this.id),
        });
    }
}
//# sourceMappingURL=tag.js.map