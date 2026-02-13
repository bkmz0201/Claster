import { type DBSchema, type IDBPDatabase } from 'idb';
import { AutoReconnectConnection } from '../../../connection';
export interface DocDBSchema extends DBSchema {
    workspace: {
        key: string;
        value: {
            id: string;
            updates: {
                timestamp: number;
                update: Uint8Array;
            }[];
        };
    };
}
export declare class DocIDBConnection extends AutoReconnectConnection<IDBPDatabase<DocDBSchema> | null> {
    get shareId(): string;
    doConnect(): Promise<IDBPDatabase<DocDBSchema> | null>;
    doDisconnect(conn: IDBPDatabase<DocDBSchema> | null): void;
}
export interface BlobDBSchema extends DBSchema {
    blob: {
        key: string;
        value: ArrayBuffer;
    };
}
export interface BlobIDBConnectionOptions {
    id: string;
}
export declare class BlobIDBConnection extends AutoReconnectConnection<IDBPDatabase<BlobDBSchema> | null> {
    private readonly options;
    constructor(options: BlobIDBConnectionOptions);
    get shareId(): string;
    doConnect(): Promise<IDBPDatabase<BlobDBSchema> | null>;
    doDisconnect(conn: IDBPDatabase<BlobDBSchema> | null): void;
}
//# sourceMappingURL=db.d.ts.map