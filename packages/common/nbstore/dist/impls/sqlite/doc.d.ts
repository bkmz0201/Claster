import { type CrawlResult, type DocClocks, type DocRecord, DocStorageBase, type DocUpdate } from '../../storage';
import { NativeDBConnection, type SqliteNativeDBOptions } from './db';
export declare class SqliteDocStorage extends DocStorageBase<SqliteNativeDBOptions> {
    static readonly identifier = "SqliteDocStorage";
    connection: NativeDBConnection;
    get db(): {
        connect: () => Promise<void>;
        disconnect: () => Promise<void>;
        pushUpdate: (docId: string, update: Uint8Array<ArrayBufferLike>) => Promise<Date>;
        getDocSnapshot: (docId: string) => Promise<DocRecord | null>;
        setDocSnapshot: (snapshot: DocRecord) => Promise<boolean>;
        getDocUpdates: (docId: string) => Promise<DocRecord[]>;
        markUpdatesMerged: (docId: string, updates: Date[]) => Promise<number>;
        deleteDoc: (docId: string) => Promise<void>;
        getDocClocks: (after?: Date | null | undefined) => Promise<import("../..").DocClock[]>;
        getDocClock: (docId: string) => Promise<import("../..").DocClock | null>;
        getBlob: (key: string) => Promise<import("../..").BlobRecord | null>;
        setBlob: (blob: import("../..").BlobRecord) => Promise<void>;
        deleteBlob: (key: string, permanently: boolean) => Promise<void>;
        releaseBlobs: () => Promise<void>;
        listBlobs: () => Promise<import("../..").ListedBlobRecord[]>;
        getPeerRemoteClocks: (peer: string) => Promise<import("../..").DocClock[]>;
        getPeerRemoteClock: (peer: string, docId: string) => Promise<import("../..").DocClock | null>;
        setPeerRemoteClock: (peer: string, docId: string, clock: Date) => Promise<void>;
        getPeerPulledRemoteClocks: (peer: string) => Promise<import("../..").DocClock[]>;
        getPeerPulledRemoteClock: (peer: string, docId: string) => Promise<import("../..").DocClock | null>;
        setPeerPulledRemoteClock: (peer: string, docId: string, clock: Date) => Promise<void>;
        getPeerPushedClocks: (peer: string) => Promise<import("../..").DocClock[]>;
        getPeerPushedClock: (peer: string, docId: string) => Promise<import("../..").DocClock | null>;
        setPeerPushedClock: (peer: string, docId: string, clock: Date) => Promise<void>;
        clearClocks: () => Promise<void>;
        setBlobUploadedAt: (peer: string, blobId: string, uploadedAt: Date | null) => Promise<void>;
        getBlobUploadedAt: (peer: string, blobId: string) => Promise<Date | null>;
        crawlDocData: (docId: string) => Promise<CrawlResult>;
        ftsAddDocument: (indexName: string, docId: string, text: string, index: boolean) => Promise<void>;
        ftsDeleteDocument: (indexName: string, docId: string) => Promise<void>;
        ftsSearch: (indexName: string, query: string) => Promise<{
            id: string;
            score: number;
        }[]>;
        ftsGetDocument: (indexName: string, docId: string) => Promise<string | null>;
        ftsGetMatches: (indexName: string, docId: string, query: string) => Promise<{
            start: number;
            end: number;
        }[]>;
        ftsFlushIndex: () => Promise<void>;
    };
    pushDocUpdate(update: DocUpdate, origin?: string): Promise<{
        docId: string;
        timestamp: Date;
    }>;
    deleteDoc(docId: string): Promise<void>;
    getDocTimestamps(after?: Date): Promise<DocClocks>;
    getDocTimestamp(docId: string): Promise<import("../..").DocClock | null>;
    protected getDocSnapshot(docId: string): Promise<DocRecord | null>;
    protected setDocSnapshot(snapshot: DocRecord): Promise<boolean>;
    protected getDocUpdates(docId: string): Promise<DocRecord[]>;
    protected markUpdatesMerged(docId: string, updates: DocRecord[]): Promise<number>;
    crawlDocData(docId: string): Promise<CrawlResult | null>;
}
//# sourceMappingURL=doc.d.ts.map