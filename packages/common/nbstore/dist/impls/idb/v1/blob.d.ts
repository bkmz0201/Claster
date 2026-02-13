import { BlobStorageBase, type ListedBlobRecord } from '../../../storage';
import { BlobIDBConnection, type BlobIDBConnectionOptions } from './db';
/**
 * @deprecated readonly
 */
export declare class IndexedDBV1BlobStorage extends BlobStorageBase {
    private readonly options;
    static readonly identifier = "IndexedDBV1BlobStorage";
    readonly isReadonly = true;
    constructor(options: BlobIDBConnectionOptions);
    readonly connection: BlobIDBConnection;
    get db(): import("idb").IDBPDatabase<import("./db").BlobDBSchema> | null;
    get(key: string): Promise<{
        key: string;
        mime: string;
        createdAt: Date;
        data: Uint8Array<ArrayBuffer>;
    } | null>;
    delete(key: string, permanently: boolean): Promise<void>;
    list(): Promise<ListedBlobRecord[]>;
    set(): Promise<void>;
    release(): Promise<void>;
}
//# sourceMappingURL=blob.d.ts.map