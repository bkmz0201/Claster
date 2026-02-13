import { generateFractionalIndexingKeyBetween, LiveData, Service, } from '@toeverything/infra';
export class PinnedCollectionService extends Service {
    constructor(pinnedCollectionStore) {
        super();
        this.pinnedCollectionStore = pinnedCollectionStore;
        this.pinnedCollectionDataReady$ = LiveData.from(this.pinnedCollectionStore.watchPinnedCollectionDataReady(), false);
        this.pinnedCollections$ = LiveData.from(this.pinnedCollectionStore.watchPinnedCollections(), []);
        this.sortedPinnedCollections$ = this.pinnedCollections$.map(records => records.toSorted((a, b) => {
            return a.index > b.index ? 1 : -1;
        }));
    }
    addPinnedCollection(record) {
        this.pinnedCollectionStore.addPinnedCollection(record);
    }
    removePinnedCollection(collectionId) {
        this.pinnedCollectionStore.removePinnedCollection(collectionId);
    }
    indexAt(at, targetId) {
        if (!targetId) {
            if (at === 'before') {
                const first = this.sortedPinnedCollections$.value.at(0);
                return generateFractionalIndexingKeyBetween(null, first?.index || null);
            }
            else {
                const last = this.sortedPinnedCollections$.value.at(-1);
                return generateFractionalIndexingKeyBetween(last?.index || null, null);
            }
        }
        else {
            const sortedChildren = this.sortedPinnedCollections$.value;
            const targetIndex = sortedChildren.findIndex(node => node.collectionId === targetId);
            if (targetIndex === -1) {
                throw new Error('Target node not found');
            }
            const target = sortedChildren[targetIndex];
            const before = sortedChildren[targetIndex - 1] || null;
            const after = sortedChildren[targetIndex + 1] || null;
            if (at === 'before') {
                return generateFractionalIndexingKeyBetween(before?.index || null, target.index);
            }
            else {
                return generateFractionalIndexingKeyBetween(target.index, after?.index || null);
            }
        }
    }
}
//# sourceMappingURL=pinned-collection.js.map