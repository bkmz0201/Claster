import { BlobSyncStorageBase } from '../../storage';
import { IDBConnection, type IDBConnectionOptions } from './db';
export declare class IndexedDBBlobSyncStorage extends BlobSyncStorageBase {
    private readonly options;
    static readonly identifier = "IndexedDBBlobSyncStorage";
    readonly connection: IDBConnection;
    constructor(options: IDBConnectionOptions);
    get db(): IDBConnection;
    setBlobUploadedAt(peer: string, blobId: string, uploadedAt: Date | null): Promise<void>;
    getBlobUploadedAt(peer: string, blobId: string): Promise<Date | null>;
}
//# sourceMappingURL=blob-sync.d.ts.map