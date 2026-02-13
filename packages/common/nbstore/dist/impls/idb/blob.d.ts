import { type BlobRecord, BlobStorageBase, type ListedBlobRecord } from '../../storage';
import { IDBConnection, type IDBConnectionOptions } from './db';
export declare class IndexedDBBlobStorage extends BlobStorageBase {
    private readonly options;
    static readonly identifier = "IndexedDBBlobStorage";
    readonly isReadonly = false;
    readonly connection: IDBConnection;
    constructor(options: IDBConnectionOptions);
    get db(): import("idb").IDBPDatabase<import("./schema").DocStorageSchema>;
    get(key: string): Promise<{
        data: Uint8Array<ArrayBufferLike>;
        key: string;
        mime: string;
        size: number;
        createdAt: Date;
        deletedAt: Date | null;
    } | null>;
    set(blob: BlobRecord): Promise<void>;
    delete(key: string, permanently: boolean): Promise<void>;
    release(): Promise<void>;
    list(): Promise<ListedBlobRecord[]>;
}
//# sourceMappingURL=blob.d.ts.map