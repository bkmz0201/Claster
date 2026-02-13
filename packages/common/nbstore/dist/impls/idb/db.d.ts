import { type IDBPDatabase } from 'idb';
import { AutoReconnectConnection } from '../../connection';
import type { SpaceType } from '../../utils/universal-id';
import { type DocStorageSchema } from './schema';
export interface IDBConnectionOptions {
    flavour: string;
    type: SpaceType;
    id: string;
}
export declare class IDBConnection extends AutoReconnectConnection<{
    db: IDBPDatabase<DocStorageSchema>;
    channel: BroadcastChannel;
}> {
    private readonly opts;
    readonly dbName: string;
    get shareId(): string;
    constructor(opts: IDBConnectionOptions);
    doConnect(): Promise<{
        db: IDBPDatabase<DocStorageSchema>;
        channel: BroadcastChannel;
    }>;
    doDisconnect(db: {
        db: IDBPDatabase<DocStorageSchema>;
        channel: BroadcastChannel;
    }): void;
    handleVersionChange: (e: IDBVersionChangeEvent) => void;
}
//# sourceMappingURL=db.d.ts.map