import { Entity, LiveData } from '@toeverything/infra';
import { map } from 'rxjs';
import { DocRecord } from './record';
export class DocRecordList extends Entity {
    constructor(store) {
        super();
        this.store = store;
        this.pool = new Map();
        this.docsMap$ = LiveData.from(this.store.watchDocIds().pipe(map(ids => new Map(ids.map(id => {
            const exists = this.pool.get(id);
            if (exists) {
                return [id, exists];
            }
            const record = this.framework.createEntity(DocRecord, { id });
            this.pool.set(id, record);
            return [id, record];
        })))), new Map());
        this.docs$ = this.docsMap$.selector(d => Array.from(d.values()));
        this.trashDocs$ = LiveData.from(this.store.watchTrashDocIds().pipe(map(ids => ids.map(id => {
            const exists = this.pool.get(id);
            if (exists) {
                return exists;
            }
            const record = this.framework.createEntity(DocRecord, { id });
            this.pool.set(id, record);
            return record;
        }))), []);
        this.nonTrashDocsIds$ = LiveData.from(this.store.watchNonTrashDocIds(), []);
        this.isReady$ = LiveData.from(this.store.watchDocListReady(), false);
    }
    doc$(id) {
        return this.docsMap$.selector(map => map.get(id));
    }
    setPrimaryMode(id, mode) {
        return this.store.setDocPrimaryModeSetting(id, mode);
    }
    getPrimaryMode(id) {
        return this.store.getDocPrimaryModeSetting(id);
    }
    togglePrimaryMode(id) {
        const mode = (this.getPrimaryMode(id) === 'edgeless' ? 'page' : 'edgeless');
        this.setPrimaryMode(id, mode);
        return this.getPrimaryMode(id);
    }
    primaryMode$(id) {
        return LiveData.from(this.store.watchDocPrimaryModeSetting(id), this.getPrimaryMode(id));
    }
}
//# sourceMappingURL=record-list.js.map