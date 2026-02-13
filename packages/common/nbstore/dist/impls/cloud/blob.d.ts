import { type BlobRecord, BlobStorageBase } from '../../storage';
import { HttpConnection } from './http';
interface CloudBlobStorageOptions {
    serverBaseUrl: string;
    id: string;
}
export declare class CloudBlobStorage extends BlobStorageBase {
    private readonly options;
    static readonly identifier = "CloudBlobStorage";
    readonly isReadonly = false;
    constructor(options: CloudBlobStorageOptions);
    readonly connection: HttpConnection;
    get(key: string, signal?: AbortSignal): Promise<{
        key: string;
        data: Uint8Array<ArrayBuffer>;
        mime: string;
        size: number;
        createdAt: Date;
    } | null>;
    set(blob: BlobRecord, signal?: AbortSignal): Promise<void>;
    delete(key: string, permanently: boolean): Promise<void>;
    release(): Promise<void>;
    list(): Promise<{
        createdAt: Date;
        __typename?: "ListedBlob";
        key: string;
        size: number;
        mime: string;
    }[]>;
    private humanReadableBlobSizeLimitCache;
    private blobSizeLimitCache;
    private blobSizeLimitCacheTime;
    private getBlobSizeLimit;
}
export {};
//# sourceMappingURL=blob.d.ts.map