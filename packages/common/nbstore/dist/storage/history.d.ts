import { type DocRecord, DocStorageBase, type DocStorageOptions } from './doc';
export interface HistoryFilter {
    before?: Date;
    limit?: Date;
}
export interface ListedHistory {
    userId: string | null;
    timestamp: Date;
}
export declare abstract class HistoricalDocStorage<Options extends DocStorageOptions = DocStorageOptions> extends DocStorageBase<Options> {
    constructor(opts: Options);
    setDocSnapshot(snapshot: DocRecord, prevSnapshot: DocRecord | null): Promise<boolean>;
    /**
     * Update the doc snapshot in storage or create a new one if not exists.
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
    abstract upsertDocSnapshot(snapshot: DocRecord, prevSnapshot: DocRecord | null): Promise<boolean>;
    abstract listHistories(docId: string, filter?: HistoryFilter): Promise<ListedHistory[]>;
    abstract getHistory(docId: string, timestamp: Date): Promise<DocRecord | null>;
    abstract deleteHistory(docId: string, timestamp: Date): Promise<void>;
    rollbackDoc(docId: string, timestamp: Date, editor?: string): Promise<void>;
    protected abstract createHistory(docId: string, snapshot: DocRecord): Promise<void>;
    protected generateRevertUpdate(fromNewerBin: Uint8Array, toOlderBin: Uint8Array): Uint8Array;
}
//# sourceMappingURL=history.d.ts.map