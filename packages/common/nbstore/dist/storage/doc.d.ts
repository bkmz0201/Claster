import type { Connection } from '../connection';
import type { Locker } from './lock';
import { type Storage } from './storage';
export interface BlockInfo {
    blockId: string;
    flavour: string;
    content?: string[];
    blob?: string[];
    refDocId?: string[];
    refInfo?: string[];
    parentFlavour?: string;
    parentBlockId?: string;
    additional?: string;
}
export interface CrawlResult {
    blocks: BlockInfo[];
    title: string;
    summary: string;
}
export interface DocClock {
    docId: string;
    timestamp: Date;
}
export type DocClocks = Record<string, Date>;
export interface DocRecord extends DocClock {
    bin: Uint8Array;
    editor?: string;
}
export interface DocDiff extends DocClock {
    missing: Uint8Array;
    state: Uint8Array;
}
export interface DocUpdate {
    docId: string;
    bin: Uint8Array;
    editor?: string;
}
export interface Editor {
    name: string;
    avatarUrl: string | null;
}
export interface DocStorageOptions {
    mergeUpdates?: (updates: Uint8Array[]) => Promise<Uint8Array> | Uint8Array;
    id: string;
    /**
     * open as readonly mode.
     */
    readonlyMode?: boolean;
}
export interface DocStorage extends Storage {
    readonly storageType: 'doc';
    readonly isReadonly: boolean;
    readonly spaceId: string;
    /**
     * Get a doc record with latest binary.
     */
    getDoc(docId: string): Promise<DocRecord | null>;
    /**
     * Get a yjs binary diff with the given state vector.
     */
    getDocDiff(docId: string, state?: Uint8Array): Promise<DocDiff | null>;
    /**
     * Push updates into storage
     *
     * @param origin - Internal identifier to recognize the source in the "update" event. Will not be stored or transferred.
     */
    pushDocUpdate(update: DocUpdate, origin?: string): Promise<DocClock>;
    /**
     * Get the timestamp of the latest update of a doc.
     */
    getDocTimestamp(docId: string): Promise<DocClock | null>;
    /**
     * Get all docs timestamps info. especially for useful in sync process.
     */
    getDocTimestamps(after?: Date): Promise<DocClocks>;
    /**
     * Delete a specific doc data with all snapshots and updates
     */
    deleteDoc(docId: string): Promise<void>;
    /**
     * Subscribe on doc updates emitted from storage itself.
     *
     * NOTE:
     *
     *   There is not always update emitted from storage itself.
     *
     *   For example, in Sqlite storage, the update will only come from user's updating on docs,
     *   in other words, the update will never somehow auto generated in storage internally.
     *
     *   But for Cloud storage, there will be updates broadcasted from other clients,
     *   so the storage will emit updates to notify the client to integrate them.
     */
    subscribeDocUpdate(callback: (update: DocRecord, origin?: string) => void): () => void;
    crawlDocData?(docId: string): Promise<CrawlResult | null>;
}
export declare abstract class DocStorageBase<Opts = {}> implements DocStorage {
    protected readonly options: Opts & DocStorageOptions;
    get isReadonly(): boolean;
    private readonly event;
    readonly storageType = "doc";
    abstract readonly connection: Connection;
    protected readonly locker: Locker;
    readonly spaceId: string;
    constructor(options: Opts & DocStorageOptions);
    getDoc(docId: string): Promise<DocRecord | null>;
    getDocDiff(docId: string, state?: Uint8Array): Promise<{
        docId: string;
        missing: Uint8Array<ArrayBufferLike>;
        state: Uint8Array<ArrayBufferLike>;
        timestamp: Date;
    } | null>;
    abstract pushDocUpdate(update: DocUpdate, origin?: string): Promise<DocClock>;
    abstract getDocTimestamp(docId: string): Promise<DocClock | null>;
    abstract getDocTimestamps(after?: Date): Promise<DocClocks>;
    abstract deleteDoc(docId: string): Promise<void>;
    subscribeDocUpdate(callback: (update: DocRecord, origin?: string) => void): () => void;
    crawlDocData(_docId: string): Promise<CrawlResult | null>;
    protected on(event: 'update', callback: (update: DocRecord, origin: string) => void): () => void;
    protected on(event: 'snapshot', callback: (snapshot: DocRecord, prevSnapshot: DocRecord | null) => void): () => void;
    protected emit(event: 'update', update: DocRecord, origin?: string): void;
    protected emit(event: 'snapshot', snapshot: DocRecord, prevSnapshot: DocRecord | null): void;
    protected off(event: string, callback: (...args: any[]) => void): void;
    /**
     * Get a doc snapshot from storage
     */
    protected abstract getDocSnapshot(docId: string): Promise<DocRecord | null>;
    /**
     * Set the doc snapshot into storage
     *
     * @safety
     * be careful when implementing this method.
     *
     * It might be called with outdated snapshot when running in multi-thread environment.
     *
     * A common solution is update the snapshot record is DB only when the coming one's timestamp is newer.
     *
     * @example
     * ```ts
     * await using _lock = await this.lockDocForUpdate(docId);
     * // set snapshot
     *
     * ```
     */
    protected abstract setDocSnapshot(snapshot: DocRecord, prevSnapshot: DocRecord | null): Promise<boolean>;
    /**
     * Get all updates of a doc that haven't been merged into snapshot.
     *
     * Updates queue design exists for a performace concern:
     * A huge amount of write time will be saved if we don't merge updates into snapshot immediately.
     * Updates will be merged into snapshot when the latest doc is requested.
     */
    protected abstract getDocUpdates(docId: string): Promise<DocRecord[]>;
    /**
     * Mark updates as merged into snapshot.
     */
    protected abstract markUpdatesMerged(docId: string, updates: DocRecord[]): Promise<number>;
    /**
     * Merge doc updates into a single update.
     */
    protected squash(updates: DocRecord[]): Promise<DocRecord>;
    protected mergeUpdates(updates: Uint8Array[]): Uint8Array<ArrayBufferLike> | Promise<Uint8Array<ArrayBufferLike>>;
    protected lockDocForUpdate(docId: string): Promise<AsyncDisposable>;
}
//# sourceMappingURL=doc.d.ts.map