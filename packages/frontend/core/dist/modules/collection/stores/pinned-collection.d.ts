import { Store } from '@toeverything/infra';
import type { Observable } from 'rxjs';
import type { WorkspaceDBService } from '../../db';
export interface PinnedCollectionRecord {
    collectionId: string;
    index: string;
}
export declare class PinnedCollectionStore extends Store {
    private readonly workspaceDBService;
    constructor(workspaceDBService: WorkspaceDBService);
    watchPinnedCollectionDataReady(): import("@toeverything/infra").LiveData<boolean>;
    watchPinnedCollections(): Observable<PinnedCollectionRecord[]>;
    addPinnedCollection(record: PinnedCollectionRecord): void;
    removePinnedCollection(collectionId: string): void;
}
//# sourceMappingURL=pinned-collection.d.ts.map