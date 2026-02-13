import { type DocClock, type DocClocks, type DocRecord, DocStorageBase, type DocStorageOptions, type DocUpdate } from '../../storage';
import { HttpConnection } from './http';
interface CloudDocStorageOptions extends DocStorageOptions {
    serverBaseUrl: string;
}
export declare class StaticCloudDocStorage extends DocStorageBase<CloudDocStorageOptions> {
    static readonly identifier = "StaticCloudDocStorage";
    constructor(options: CloudDocStorageOptions);
    connection: HttpConnection;
    pushDocUpdate(update: DocUpdate, _origin?: string): Promise<DocClock>;
    getDocTimestamp(docId: string): Promise<DocClock | null>;
    getDocTimestamps(): Promise<DocClocks>;
    deleteDoc(_docId: string): Promise<void>;
    protected getDocSnapshot(docId: string): Promise<DocRecord | null>;
    protected setDocSnapshot(_snapshot: DocRecord, _prevSnapshot: DocRecord | null): Promise<boolean>;
    protected getDocUpdates(_docId: string): Promise<DocRecord[]>;
    protected markUpdatesMerged(_docId: string, _updates: DocRecord[]): Promise<number>;
}
export {};
//# sourceMappingURL=doc-static.d.ts.map