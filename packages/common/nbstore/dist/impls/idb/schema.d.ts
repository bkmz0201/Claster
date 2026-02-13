import { type DBSchema } from 'idb';
/**
IndexedDB
  > DB(workspace:${workspaceId})
     > Table(Snapshots)
     > Table(Updates)
     > Table(...)

Table(Snapshots)
| docId | blob | createdAt | updatedAt |
|-------|------|-----------|-----------|
|  str  | bin  |   Date    |   Date    |

Table(Updates)
| id | docId | blob | createdAt |
|----|-------|------|-----------|
|auto|  str  | bin  |   Date    |

Table(Clocks)
| docId |   clock   |
|-------|-----------|
|  str  |   Date    |

Table(Blobs)
| key | mime | size | createdAt | deletedAt |
|-----|------|------|-----------|-----------|
| str |  str | num  |   Date    |   Date    |

Table(BlobData)
| key | data |
|-----|------|
| str | bin  |

Table(PeerClocks)
| peer | docId |   clock   |  pushed   |
|------|-------|-----------|-----------|
| str  |  str  |   Date    |   Date    |

Table(IndexerSync)
| docId | indexedClock | indexerVersion |
|-------|--------------|----------------|
| str   |   Date       |    number      |

Table(BlobSync)
| peer | key | uploadedAt |
|------|-----|------------|
| str  | str |   Date     |
 */
export interface DocStorageSchema extends DBSchema {
    snapshots: {
        key: string;
        value: {
            docId: string;
            bin: Uint8Array;
            createdAt: Date;
            updatedAt: Date;
        };
        indexes: {
            updatedAt: Date;
        };
    };
    updates: {
        key: [string, Date];
        value: {
            docId: string;
            bin: Uint8Array;
            createdAt: Date;
        };
        indexes: {
            docId: string;
        };
    };
    clocks: {
        key: string;
        value: {
            docId: string;
            timestamp: Date;
        };
        indexes: {
            timestamp: Date;
        };
    };
    blobs: {
        key: string;
        value: {
            key: string;
            mime: string;
            size: number;
            createdAt: Date;
            deletedAt: Date | null;
        };
    };
    blobSync: {
        key: [string, string];
        value: {
            peer: string;
            key: string;
            uploadedAt: Date | null;
        };
        indexes: {
            peer: string;
        };
    };
    blobData: {
        key: string;
        value: {
            key: string;
            data: Uint8Array;
        };
    };
    peerClocks: {
        key: [string, string];
        value: {
            peer: string;
            docId: string;
            clock: Date;
            pulledClock: Date;
            pushedClock: Date;
        };
        indexes: {
            peer: string;
        };
    };
    locks: {
        key: string;
        value: {
            key: string;
            lock: Date;
        };
    };
    indexerSync: {
        key: string;
        value: {
            docId: string;
            indexedClock: Date;
            indexerVersion?: number;
        };
    };
    indexerMetadata: {
        key: string;
        value: {
            key: string;
            value: any;
        };
    };
    indexerRecords: {
        key: number;
        value: {
            table: string;
            id: string;
            data: Map<string, string[]>;
        };
        indexes: {
            table: string;
            id: [string, string];
        };
    };
    invertedIndex: {
        key: number;
        value: {
            table: string;
            nid: number;
            pos?: {
                i: number;
                l: number;
                rs: [number, number][];
            }[];
            key: ArrayBuffer;
        };
        indexes: {
            key: [string, ArrayBuffer];
            nid: number;
        };
    };
}
export declare const migrator: {
    version: number;
    migrate: (database: import("idb").IDBPDatabase<DocStorageSchema>, oldVersion: number, newVersion: number | null, transaction: import("idb").IDBPTransaction<DocStorageSchema, ("blobSync" | "indexerSync" | "updates" | "blobs" | "snapshots" | "clocks" | "blobData" | "peerClocks" | "locks" | "indexerMetadata" | "indexerRecords" | "invertedIndex")[], "versionchange">, event: IDBVersionChangeEvent) => void;
};
//# sourceMappingURL=schema.d.ts.map