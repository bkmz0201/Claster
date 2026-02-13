import type { BlobRecord, BlobStorage } from '../storage';
import type { BlobSync } from '../sync/blob';
export declare class BlobFrontend {
    readonly storage: BlobStorage;
    private readonly sync;
    private readonly lock;
    constructor(storage: BlobStorage, sync: BlobSync);
    get state$(): import("rxjs").Observable<import("..").BlobSyncState>;
    blobState$(blobId: string): import("rxjs").Observable<import("../sync/blob").BlobSyncBlobState>;
    get(blobId: string): Promise<BlobRecord | null>;
    set(blob: BlobRecord): Promise<void>;
    /**
     * Uploads a blob to the peer. Do nothing if the blob has already been uploaded.
     *
     * @returns Always resolves to true when successful
     *
     * @throws This method will throw an error if the blob is not found locally, if the upload is aborted, or if it fails due to storage limitations.
     */
    upload(blobIdOrRecord: string | BlobRecord): Promise<boolean>;
    fullDownload(peerId?: string, signal?: AbortSignal): Promise<void>;
    private waitForConnected;
}
//# sourceMappingURL=blob.d.ts.map