import { BlobSyncStorageBase } from '../../storage';
import { NativeDBConnection, type SqliteNativeDBOptions } from './db';
export declare class SqliteBlobSyncStorage extends BlobSyncStorageBase {
    private readonly options;
    static readonly identifier = "SqliteBlobSyncStorage";
    connection: NativeDBConnection;
    constructor(options: SqliteNativeDBOptions);
    get db(): {
        connect: () => Promise<void>;
        disconnect: () => Promise<void>;
        pushUpdate: (docId: string, update: Uint8Array<ArrayBufferLike>) => Promise<Date>;
        getDocSnapshot: (docId: string) => Promise<import("../..").DocRecord | null>;
        setDocSnapshot: (snapshot: import("../..").DocRecord) => Promise<boolean>;
        getDocUpdates: (docId: string) => Promise<import("../..").DocRecord[]>;
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
        crawlDocData: (docId: string) => Promise<import("../..").CrawlResult>;
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
    setBlobUploadedAt(peer: string, blobId: string, uploadedAt: Date | null): Promise<void>;
    getBlobUploadedAt(peer: string, blobId: string): Promise<Date | null>;
}
//# sourceMappingURL=blob-sync.d.ts.map