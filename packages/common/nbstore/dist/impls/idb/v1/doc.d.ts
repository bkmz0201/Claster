import { type DocClocks, type DocRecord, DocStorageBase, type DocStorageOptions, type DocUpdate } from '../../../storage';
import { DocIDBConnection } from './db';
/**
 * @deprecated readonly
 */
export declare class IndexedDBV1DocStorage extends DocStorageBase {
    static readonly identifier = "IndexedDBV1DocStorage";
    readonly connection: DocIDBConnection;
    constructor(opts: DocStorageOptions);
    get db(): import("idb").IDBPDatabase<import("./db").DocDBSchema> | null;
    get name(): string;
    getDoc(docId: string): Promise<{
        docId: string;
        bin: Uint8Array<ArrayBufferLike>;
        timestamp: Date;
    } | null>;
    protected getDocSnapshot(): Promise<null>;
    pushDocUpdate(update: DocUpdate): Promise<{
        docId: string;
        timestamp: Date;
    }>;
    deleteDoc(docId: string): Promise<void>;
    getDocTimestamps(): Promise<DocClocks>;
    getDocTimestamp(_docId: string): Promise<null>;
    protected setDocSnapshot(): Promise<boolean>;
    protected getDocUpdates(): Promise<DocRecord[]>;
    protected markUpdatesMerged(): Promise<number>;
    private rawGetDoc;
    private readonly getIdConverter;
}
//# sourceMappingURL=doc.d.ts.map