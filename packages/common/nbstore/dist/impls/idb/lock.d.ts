import { type Locker } from '../../storage/lock';
import type { IDBConnection } from './db';
export declare class IndexedDBLocker implements Locker {
    private readonly dbConnection;
    get db(): import("idb").IDBPDatabase<import("./schema").DocStorageSchema>;
    private readonly eventEmitter;
    get channel(): BroadcastChannel;
    constructor(dbConnection: IDBConnection);
    lock(domain: string, resource: string): Promise<{
        [Symbol.asyncDispose]: () => Promise<void>;
    }>;
}
//# sourceMappingURL=lock.d.ts.map