import { DummyConnection } from '../../../connection';
import { type DocRecord, DocStorageBase, type DocUpdate } from '../../../storage';
import { type IdConverter } from '../../../utils/id-converter';
import type { SpaceType } from '../../../utils/universal-id';
/**
 * @deprecated readonly
 */
export declare class SqliteV1DocStorage extends DocStorageBase<{
    type: SpaceType;
    id: string;
}> {
    static identifier: string;
    cachedIdConverter: Promise<IdConverter> | null;
    connection: DummyConnection;
    constructor(options: {
        type: SpaceType;
        id: string;
    });
    private get db();
    pushDocUpdate(update: DocUpdate): Promise<{
        docId: string;
        timestamp: Date;
    }>;
    getDoc(docId: string): Promise<{
        docId: string;
        bin: Uint8Array<ArrayBufferLike>;
        timestamp: Date;
    } | null>;
    getDocTimestamps(): Promise<Record<string, Date>>;
    deleteDoc(): Promise<void>;
    protected getDocSnapshot(): Promise<null>;
    getDocTimestamp(): Promise<null>;
    protected setDocSnapshot(): Promise<boolean>;
    protected getDocUpdates(): Promise<DocRecord[]>;
    protected markUpdatesMerged(): Promise<number>;
    private getIdConverter;
}
//# sourceMappingURL=doc.d.ts.map