import { IndexedDBDocStorage, IndexedDBDocSyncStorage } from '@affine/nbstore/idb';
import { SqliteDocStorage, SqliteDocSyncStorage } from '@affine/nbstore/sqlite';
import type { StoreClient } from '@affine/nbstore/worker/client';
import { Entity } from '@toeverything/infra';
import type { ServerService } from '../../cloud';
import type { NbstoreService } from '../../storage';
export declare class UserDBEngine extends Entity<{
    userId: string;
}> {
    private readonly nbstoreService;
    private readonly userId;
    readonly client: StoreClient;
    DocStorageType: typeof SqliteDocStorage | typeof IndexedDBDocStorage;
    DocSyncStorageType: typeof SqliteDocSyncStorage | typeof IndexedDBDocSyncStorage;
    canGracefulStop(): boolean;
    constructor(nbstoreService: NbstoreService, serverService: ServerService);
}
//# sourceMappingURL=user-db-engine.d.ts.map