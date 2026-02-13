import { type DocClock, type DocClocks, DocSyncStorageBase } from '../../storage';
import { IDBConnection, type IDBConnectionOptions } from './db';
export declare class IndexedDBDocSyncStorage extends DocSyncStorageBase {
    private readonly options;
    static readonly identifier = "IndexedDBDocSyncStorage";
    constructor(options: IDBConnectionOptions);
    readonly connection: IDBConnection;
    get db(): import("idb").IDBPDatabase<import("./schema").DocStorageSchema>;
    getPeerRemoteClock(peer: string, docId: string): Promise<DocClock | null>;
    getPeerRemoteClocks(peer: string): Promise<DocClocks>;
    setPeerRemoteClock(peer: string, clock: DocClock): Promise<void>;
    getPeerPulledRemoteClock(peer: string, docId: string): Promise<DocClock | null>;
    getPeerPulledRemoteClocks(peer: string): Promise<DocClocks>;
    setPeerPulledRemoteClock(peer: string, clock: DocClock): Promise<void>;
    getPeerPushedClock(peer: string, docId: string): Promise<DocClock | null>;
    getPeerPushedClocks(peer: string): Promise<DocClocks>;
    setPeerPushedClock(peer: string, clock: DocClock): Promise<void>;
    clearClocks(): Promise<void>;
}
//# sourceMappingURL=doc-sync.d.ts.map