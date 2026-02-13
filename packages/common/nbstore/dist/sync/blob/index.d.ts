import { type Observable } from 'rxjs';
import type { BlobRecord, BlobStorage, BlobSyncStorage } from '../../storage';
import type { PeerStorageOptions } from '../types';
export interface BlobSyncState {
    uploading: number;
    downloading: number;
    error: number;
    overCapacity: boolean;
}
export interface BlobSyncBlobState {
    needUpload: boolean;
    needDownload: boolean;
    uploading: boolean;
    downloading: boolean;
    errorMessage?: string | null;
    overSize: boolean;
}
export interface BlobSync {
    readonly state$: Observable<BlobSyncState>;
    blobState$(blobId: string): Observable<BlobSyncBlobState>;
    /**
     * Downloads a blob from all peers
     * @param blobId - The blob ID to download
     * @returns A promise that resolves to true when the download is complete from any peer, false if no peer has the blob
     *
     * @throws This method will throw an error if the download is aborted or fails due to network issues.
     */
    downloadBlob(blobId: string): Promise<boolean>;
    /**
     * Upload a blob to all peers
     * @param blob - The blob to upload
     * @param force - Whether to force upload the blob, even if it has already been uploaded
     * @returns A promise that resolves when the upload is complete, should always resolve to true
     *
     * @throws This method will throw an error if the upload is aborted or fails due to storage limitations.
     */
    uploadBlob(blob: BlobRecord, force?: boolean): Promise<true>;
    /**
     * Download all blobs from a peer
     * @param peerId - The peer id to download from, if not provided, all peers will be downloaded
     * @param signal - The abort signal
     * @returns A promise that resolves when the download is complete
     *
     * @throws This method will never throw an error, but the promise will reject if the signal is aborted.
     */
    fullDownload(peerId?: string, signal?: AbortSignal): Promise<void>;
}
export declare class BlobSyncImpl implements BlobSync {
    readonly storages: PeerStorageOptions<BlobStorage>;
    readonly blobSync: BlobSyncStorage;
    private abortController;
    private started;
    private readonly peers;
    readonly state$: Observable<BlobSyncState>;
    blobState$(blobId: string): Observable<{
        uploading: boolean;
        downloading: boolean;
        errorMessage: string | null | undefined;
        overSize: boolean;
        needUpload: boolean;
        needDownload: boolean;
    }>;
    constructor(storages: PeerStorageOptions<BlobStorage>, blobSync: BlobSyncStorage);
    downloadBlob(blobId: string): Promise<boolean>;
    uploadBlob(blob: BlobRecord, force?: boolean): Promise<true>;
    start(): void;
    fullDownload(peerId?: string, outerSignal?: AbortSignal): Promise<void>;
    private readonly fullDownloadPromise;
    private fullDownloadPeer;
    stop(): void;
}
//# sourceMappingURL=index.d.ts.map