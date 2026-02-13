import { LiveData, ObjectPool, Service } from '@toeverything/infra';
import { Collection } from '../entities/collection';
import type { CollectionInfo, CollectionStore } from '../stores/collection';
export interface CollectionMeta extends Pick<CollectionInfo, 'id' | 'name'> {
    title: string;
}
export declare class CollectionService extends Service {
    private readonly store;
    constructor(store: CollectionStore);
    pool: ObjectPool<string, Collection>;
    readonly collectionDataReady$: LiveData<boolean>;
    readonly collectionMetas$: LiveData<{
        id: string;
        name: string;
        title: string;
    }[]>;
    readonly collections$: LiveData<Map<string, Collection>>;
    collection$(id: string): LiveData<Collection | undefined>;
    createCollection(collectionInfo: Partial<Omit<CollectionInfo, 'id'>>): string;
    updateCollection(id: string, collectionInfo: Partial<Omit<CollectionInfo, 'id'>>): void;
    addDocToCollection(collectionId: string, docId: string): void;
    removeDocFromCollection(collectionId: string, docId: string): void;
    deleteCollection(id: string): void;
}
//# sourceMappingURL=collection.d.ts.map