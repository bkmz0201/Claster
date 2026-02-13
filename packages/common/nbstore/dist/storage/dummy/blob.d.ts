import { DummyConnection } from '../../connection';
import { type BlobRecord, BlobStorageBase, type ListedBlobRecord } from '../blob';
export declare class DummyBlobStorage extends BlobStorageBase {
    readonly isReadonly = true;
    get(_key: string, _signal?: AbortSignal): Promise<BlobRecord | null>;
    set(_blob: BlobRecord, _signal?: AbortSignal): Promise<void>;
    delete(_key: string, _permanently: boolean, _signal?: AbortSignal): Promise<void>;
    release(_signal?: AbortSignal): Promise<void>;
    list(_signal?: AbortSignal): Promise<ListedBlobRecord[]>;
    connection: DummyConnection;
}
//# sourceMappingURL=blob.d.ts.map