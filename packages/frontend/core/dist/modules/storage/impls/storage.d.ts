import type { AsyncMemento, Memento } from '@toeverything/infra';
import { Observable } from 'rxjs';
import type { CacheStorage, GlobalCache, GlobalSessionState, GlobalState } from '../providers/global';
export declare class StorageMemento implements Memento {
    private readonly storage;
    private readonly prefix;
    private readonly eventEmitter;
    private readonly channel;
    constructor(storage: Storage, prefix: string);
    keys(): string[];
    get<T>(key: string): T | undefined;
    watch<T>(key: string): Observable<T | undefined>;
    set<T>(key: string, value: T): void;
    del(key: string): void;
    clear(): void;
}
export declare class LocalStorageGlobalCache extends StorageMemento implements GlobalCache {
    constructor();
}
export declare class LocalStorageGlobalState extends StorageMemento implements GlobalState {
    constructor();
}
export declare class SessionStorageGlobalSessionState extends StorageMemento implements GlobalSessionState {
    constructor();
}
export declare class AsyncStorageMemento implements AsyncMemento {
    private readonly dbName;
    private readonly table;
    private readonly eventEmitter;
    private readonly channel;
    constructor(dbName: string, table: string);
    private _db;
    private getDB;
    get<T>(key: string): Promise<T | undefined>;
    watch<T>(key: string): Observable<T | undefined>;
    set<T>(key: string, value: T | undefined): Promise<void>;
    del(key: string): Promise<void>;
    clear(): Promise<void>;
    keys(): Promise<string[]>;
}
export declare class IDBGlobalState extends AsyncStorageMemento implements CacheStorage {
    constructor();
}
//# sourceMappingURL=storage.d.ts.map