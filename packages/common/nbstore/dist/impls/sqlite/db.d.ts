import { AutoReconnectConnection } from '../../connection';
import type { BlobRecord, CrawlResult, DocClock, DocRecord, ListedBlobRecord } from '../../storage';
import { type SpaceType } from '../../utils/universal-id';
export interface SqliteNativeDBOptions {
    readonly flavour: string;
    readonly type: SpaceType;
    readonly id: string;
}
export interface NativeDBApis {
    connect: (id: string) => Promise<void>;
    disconnect: (id: string) => Promise<void>;
    pushUpdate: (id: string, docId: string, update: Uint8Array) => Promise<Date>;
    getDocSnapshot: (id: string, docId: string) => Promise<DocRecord | null>;
    setDocSnapshot: (id: string, snapshot: DocRecord) => Promise<boolean>;
    getDocUpdates: (id: string, docId: string) => Promise<DocRecord[]>;
    markUpdatesMerged: (id: string, docId: string, updates: Date[]) => Promise<number>;
    deleteDoc: (id: string, docId: string) => Promise<void>;
    getDocClocks: (id: string, after?: Date | null) => Promise<DocClock[]>;
    getDocClock: (id: string, docId: string) => Promise<DocClock | null>;
    getBlob: (id: string, key: string) => Promise<BlobRecord | null>;
    setBlob: (id: string, blob: BlobRecord) => Promise<void>;
    deleteBlob: (id: string, key: string, permanently: boolean) => Promise<void>;
    releaseBlobs: (id: string) => Promise<void>;
    listBlobs: (id: string) => Promise<ListedBlobRecord[]>;
    getPeerRemoteClocks: (id: string, peer: string) => Promise<DocClock[]>;
    getPeerRemoteClock: (id: string, peer: string, docId: string) => Promise<DocClock | null>;
    setPeerRemoteClock: (id: string, peer: string, docId: string, clock: Date) => Promise<void>;
    getPeerPulledRemoteClocks: (id: string, peer: string) => Promise<DocClock[]>;
    getPeerPulledRemoteClock: (id: string, peer: string, docId: string) => Promise<DocClock | null>;
    setPeerPulledRemoteClock: (id: string, peer: string, docId: string, clock: Date) => Promise<void>;
    getPeerPushedClocks: (id: string, peer: string) => Promise<DocClock[]>;
    getPeerPushedClock: (id: string, peer: string, docId: string) => Promise<DocClock | null>;
    setPeerPushedClock: (id: string, peer: string, docId: string, clock: Date) => Promise<void>;
    clearClocks: (id: string) => Promise<void>;
    setBlobUploadedAt: (id: string, peer: string, blobId: string, uploadedAt: Date | null) => Promise<void>;
    getBlobUploadedAt: (id: string, peer: string, blobId: string) => Promise<Date | null>;
    crawlDocData: (id: string, docId: string) => Promise<CrawlResult>;
    ftsAddDocument: (id: string, indexName: string, docId: string, text: string, index: boolean) => Promise<void>;
    ftsDeleteDocument: (id: string, indexName: string, docId: string) => Promise<void>;
    ftsSearch: (id: string, indexName: string, query: string) => Promise<{
        id: string;
        score: number;
    }[]>;
    ftsGetDocument: (id: string, indexName: string, docId: string) => Promise<string | null>;
    ftsGetMatches: (id: string, indexName: string, docId: string, query: string) => Promise<{
        start: number;
        end: number;
    }[]>;
    ftsFlushIndex: (id: string) => Promise<void>;
}
type NativeDBApisWrapper = NativeDBApis extends infer APIs ? {
    [K in keyof APIs]: APIs[K] extends (...args: any[]) => any ? Parameters<APIs[K]> extends [string, ...infer Rest] ? (...args: Rest) => ReturnType<APIs[K]> : never : never;
} : never;
export declare function bindNativeDBApis(a: NativeDBApis): void;
export declare class NativeDBConnection extends AutoReconnectConnection<void> {
    private readonly options;
    readonly apis: NativeDBApisWrapper;
    readonly flavour: string;
    readonly type: SpaceType;
    readonly id: string;
    constructor(options: SqliteNativeDBOptions);
    get shareId(): string;
    warpApis(originalApis: NativeDBApis): NativeDBApisWrapper;
    doConnect(): Promise<void>;
    doDisconnect(): void;
}
export {};
//# sourceMappingURL=db.d.ts.map