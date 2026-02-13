import { Observable } from 'rxjs';
import type { BlobRecord, BlobStorage } from '../../storage';
import type { BlobSyncStorage } from '../../storage/blob-sync';
export interface BlobSyncPeerState {
    uploading: number;
    downloading: number;
    error: number;
    overCapacity: boolean;
}
export interface BlobSyncPeerBlobState {
    needUpload: boolean;
    needDownload: boolean;
    uploading: boolean;
    downloading: boolean;
    overSize: boolean;
    errorMessage?: string | null;
}
export declare class BlobSyncPeer {
    readonly peerId: string;
    readonly local: BlobStorage;
    readonly remote: BlobStorage;
    readonly blobSync: BlobSyncStorage;
    private readonly status;
    get peerState$(): Observable<BlobSyncPeerState>;
    blobPeerState$(blobId: string): Observable<BlobSyncPeerBlobState>;
    constructor(peerId: string, local: BlobStorage, remote: BlobStorage, blobSync: BlobSyncStorage);
    private readonly downloadingPromise;
    /**
     * Downloads a blob from the peer with exponential backoff retry logic
     * @param blobId - The ID of the blob to download
     * @param signal - Optional AbortSignal to cancel the download
     * @returns true if the blob is downloaded successfully, false if the blob is not found after retries
     *
     * @throws This method will throw an error if the download operation fails due to network issues or is aborted
     */
    downloadBlob(blobId: string, signal?: AbortSignal): Promise<boolean>;
    uploadingPromise: Map<string, Promise<true>>;
    /**
     * Upload a blob to the peer
     * @param blob - The blob to upload
     * @param force - Whether to force upload the blob, even if it has already been uploaded
     * @param signal - The abort signal
     * @returns The promise should always resolve to true when the upload is complete.
     *
     * @throws This method will throw an error if the upload is aborted or fails due to storage limitations.
     */
    uploadBlob(blob: BlobRecord, force?: boolean, signal?: AbortSignal): Promise<true>;
    fullUploadLoop(signal?: AbortSignal): Promise<void>;
    private fullUpload;
    fullDownload(signal?: AbortSignal): Promise<void>;
    markBlobUploaded(blobKey: string): Promise<void>;
}
//# sourceMappingURL=peer.d.ts.map