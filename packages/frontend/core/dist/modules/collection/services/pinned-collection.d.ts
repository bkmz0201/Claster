import { LiveData, Service } from '@toeverything/infra';
import type { PinnedCollectionRecord, PinnedCollectionStore } from '../stores/pinned-collection';
export declare class PinnedCollectionService extends Service {
    private readonly pinnedCollectionStore;
    constructor(pinnedCollectionStore: PinnedCollectionStore);
    pinnedCollectionDataReady$: LiveData<boolean>;
    pinnedCollections$: LiveData<PinnedCollectionRecord[]>;
    sortedPinnedCollections$: LiveData<PinnedCollectionRecord[]>;
    addPinnedCollection(record: PinnedCollectionRecord): void;
    removePinnedCollection(collectionId: string): void;
    indexAt(at: 'before' | 'after', targetId?: string): string;
}
//# sourceMappingURL=pinned-collection.d.ts.map