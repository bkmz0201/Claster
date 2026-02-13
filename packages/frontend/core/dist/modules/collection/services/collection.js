import { LiveData, ObjectPool, Service } from '@toeverything/infra';
import { map } from 'rxjs';
import { Collection } from '../entities/collection';
export class CollectionService extends Service {
    constructor(store) {
        super();
        this.store = store;
        this.pool = new ObjectPool({
            onDelete(obj) {
                obj.dispose();
            },
        });
        this.collectionDataReady$ = LiveData.from(this.store.watchCollectionDataReady(), false);
        // collection metas used in collection list, only include `id` and `name`, without `rules` and `allowList`
        this.collectionMetas$ = LiveData.from(this.store.watchCollectionMetas(), []);
        this.collections$ = LiveData.from(this.store.watchCollectionIds().pipe(map(ids => new Map(ids.map(id => {
            const exists = this.pool.get(id);
            if (exists) {
                return [id, exists.obj];
            }
            const record = this.framework.createEntity(Collection, { id });
            this.pool.put(id, record);
            return [id, record];
        })))), new Map());
    }
    collection$(id) {
        return this.collections$.selector(collections => {
            return collections.get(id);
        });
    }
    createCollection(collectionInfo) {
        return this.store.createCollection(collectionInfo);
    }
    updateCollection(id, collectionInfo) {
        return this.store.updateCollectionInfo(id, collectionInfo);
    }
    addDocToCollection(collectionId, docId) {
        const collection = this.collection$(collectionId).value;
        collection?.addDoc(docId);
    }
    removeDocFromCollection(collectionId, docId) {
        const collection = this.collection$(collectionId).value;
        collection?.removeDoc(docId);
    }
    deleteCollection(id) {
        this.store.deleteCollection(id);
    }
}
//# sourceMappingURL=collection.js.map