import { type DocClock, type DocClocks, type DocRecord, DocStorageBase, type DocUpdate } from '../../storage';
import { IDBConnection, type IDBConnectionOptions } from './db';
import { IndexedDBLocker } from './lock';
interface ChannelMessage {
    type: 'update';
    update: DocRecord;
    origin?: string;
}
export declare class IndexedDBDocStorage extends DocStorageBase<IDBConnectionOptions> {
    static readonly identifier = "IndexedDBDocStorage";
    readonly connection: IDBConnection;
    get db(): import("idb").IDBPDatabase<import("./schema").DocStorageSchema>;
    get channel(): BroadcastChannel;
    locker: IndexedDBLocker;
    pushDocUpdate(update: DocUpdate, origin?: string): Promise<{
        docId: string;
        timestamp: Date;
    }>;
    protected getDocSnapshot(docId: string): Promise<{
        docId: string;
        bin: Uint8Array<ArrayBufferLike>;
        timestamp: Date;
    } | null>;
    deleteDoc(docId: string): Promise<void>;
    getDocTimestamps(after?: Date): Promise<DocClocks>;
    getDocTimestamp(docId: string): Promise<DocClock | null>;
    protected setDocSnapshot(snapshot: DocRecord): Promise<boolean>;
    protected getDocUpdates(docId: string): Promise<DocRecord[]>;
    protected markUpdatesMerged(docId: string, updates: DocRecord[]): Promise<number>;
    private docUpdateListener;
    subscribeDocUpdate(callback: (update: DocRecord, origin?: string) => void): () => void;
    handleChannelMessage: (event: MessageEvent<ChannelMessage>) => void;
}
export {};
//# sourceMappingURL=doc.d.ts.map