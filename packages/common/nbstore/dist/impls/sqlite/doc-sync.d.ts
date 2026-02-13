import { type DocClock, DocSyncStorageBase } from '../../storage';
import { NativeDBConnection, type SqliteNativeDBOptions } from './db';
export declare class SqliteDocSyncStorage extends DocSyncStorageBase {
    private readonly options;
    static readonly identifier = "SqliteDocSyncStorage";
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
        getDocClocks: (after?: Date | null | undefined) => Promise<DocClock[]>;
        getDocClock: (docId: string) => Promise<DocClock | null>;
        getBlob: (key: string) => Promise<import("../..").BlobRecord | null>;
        setBlob: (blob: import("../..").BlobRecord) => Promise<void>;
        deleteBlob: (key: string, permanently: boolean) => Promise<void>;
        releaseBlobs: () => Promise<void>;
        listBlobs: () => Promise<import("../..").ListedBlobRecord[]>;
        getPeerRemoteClocks: (peer: string) => Promise<DocClock[]>;
        getPeerRemoteClock: (peer: string, docId: string) => Promise<DocClock | null>;
        setPeerRemoteClock: (peer: string, docId: string, clock: Date) => Promise<void>;
        getPeerPulledRemoteClocks: (peer: string) => Promise<DocClock[]>;
        getPeerPulledRemoteClock: (peer: string, docId: string) => Promise<DocClock | null>;
        setPeerPulledRemoteClock: (peer: string, docId: string, clock: Date) => Promise<void>;
        getPeerPushedClocks: (peer: string) => Promise<DocClock[]>;
        getPeerPushedClock: (peer: string, docId: string) => Promise<DocClock | null>;
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
    getPeerRemoteClocks(peer: string): Promise<{
        [k: string]: Date;
    }>;
    getPeerRemoteClock(peer: string, docId: string): Promise<DocClock | null>;
    setPeerRemoteClock(peer: string, clock: DocClock): Promise<void>;
    getPeerPulledRemoteClocks(peer: string): Promise<{
        [k: string]: Date;
    }>;
    getPeerPulledRemoteClock(peer: string, docId: string): Promise<DocClock | null>;
    setPeerPulledRemoteClock(peer: string, clock: DocClock): Promise<void>;
    getPeerPushedClocks(peer: string): Promise<{
        [k: string]: Date;
    }>;
    getPeerPushedClock(peer: string, docId: string): Promise<DocClock | null>;
    setPeerPushedClock(peer: string, clock: DocClock): Promise<void>;
    clearClocks(): Promise<void>;
}
//# sourceMappingURL=doc-sync.d.ts.map