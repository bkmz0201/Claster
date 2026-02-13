import { DummyConnection } from '../../connection';
import { type DocClock, type DocClocks, type DocDiff, type DocRecord, type DocStorage, type DocUpdate } from '../doc';
export declare class DummyDocStorage implements DocStorage {
    spaceId: string;
    readonly storageType = "doc";
    readonly isReadonly = true;
    getDoc(_docId: string): Promise<DocRecord | null>;
    getDocDiff(_docId: string, _state?: Uint8Array): Promise<DocDiff | null>;
    pushDocUpdate(update: DocUpdate, _origin?: string): Promise<DocClock>;
    getDocTimestamp(_docId: string): Promise<DocClock | null>;
    getDocTimestamps(_after?: Date): Promise<DocClocks>;
    deleteDoc(_docId: string): Promise<void>;
    subscribeDocUpdate(_callback: (update: DocRecord, origin?: string) => void): () => void;
    connection: DummyConnection;
}
//# sourceMappingURL=doc.d.ts.map