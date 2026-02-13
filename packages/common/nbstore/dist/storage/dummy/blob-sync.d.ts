import { type Connection } from '../../connection';
import type { BlobSyncStorage } from '../blob-sync';
export declare class DummyBlobSyncStorage implements BlobSyncStorage {
    storageType: "blobSync";
    connection: Connection<any>;
    setBlobUploadedAt(): Promise<void>;
    getBlobUploadedAt(): Promise<Date | null>;
}
//# sourceMappingURL=blob-sync.d.ts.map