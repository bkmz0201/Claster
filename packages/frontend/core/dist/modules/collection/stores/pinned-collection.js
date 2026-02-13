import { Store } from '@toeverything/infra';
export class PinnedCollectionStore extends Store {
    constructor(workspaceDBService) {
        super();
        this.workspaceDBService = workspaceDBService;
    }
    watchPinnedCollectionDataReady() {
        return this.workspaceDBService.db.pinnedCollections.isReady$;
    }
    watchPinnedCollections() {
        return this.workspaceDBService.db.pinnedCollections.find$();
    }
    addPinnedCollection(record) {
        this.workspaceDBService.db.pinnedCollections.create({
            collectionId: record.collectionId,
            index: record.index,
        });
    }
    removePinnedCollection(collectionId) {
        this.workspaceDBService.db.pinnedCollections.delete(collectionId);
    }
}
//# sourceMappingURL=pinned-collection.js.map