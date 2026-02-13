import { DummyConnection } from '../../../connection';
import { BlobStorageBase } from '../../../storage';
import type { SpaceType } from '../../../utils/universal-id';
/**
 * @deprecated readonly
 */
export declare class SqliteV1BlobStorage extends BlobStorageBase {
    private readonly options;
    static identifier: string;
    connection: DummyConnection;
    readonly isReadonly = true;
    constructor(options: {
        type: SpaceType;
        id: string;
    });
    private get db();
    get(key: string): Promise<{
        key: string;
        data: Uint8Array<ArrayBufferLike>;
        mime: string;
        createdAt: Date;
    } | null>;
    list(): Promise<{
        key: string;
        mime: string;
        size: number;
        createdAt: Date;
    }[]>;
    delete(): Promise<void>;
    set(): Promise<void>;
    release(): Promise<void>;
}
//# sourceMappingURL=blob.d.ts.map