import { AsyncLock } from '../utils';
export interface ByteKV extends ByteKVBehavior {
    transaction<T>(cb: (transaction: ByteKVBehavior) => Promise<T>): Promise<T>;
}
export interface ByteKVBehavior {
    get(key: string): Promise<Uint8Array | null> | Uint8Array | null;
    set(key: string, value: Uint8Array): Promise<void> | void;
    del(key: string): Promise<void> | void;
    keys(): Promise<string[]> | string[];
    clear(): Promise<void> | void;
}
export declare class MemoryByteKV implements ByteKV {
    readonly db: Map<string, Uint8Array<ArrayBufferLike>>;
    readonly lock: AsyncLock;
    constructor(db?: Map<string, Uint8Array<ArrayBufferLike>>);
    transaction<T>(cb: (transaction: ByteKVBehavior) => Promise<T>): Promise<T>;
    get(key: string): Promise<Uint8Array<ArrayBufferLike> | null>;
    set(key: string, value: Uint8Array): Promise<void>;
    keys(): Promise<string[]>;
    clear(): Promise<void>;
    del(key: string): Promise<void>;
}
export declare class ReadonlyByteKV extends MemoryByteKV implements ByteKV {
    transaction<T>(cb: (transaction: ByteKVBehavior) => Promise<T>): Promise<T>;
    set(_key: string, _value: Uint8Array): Promise<void>;
    del(_key: string): Promise<void>;
    clear(): Promise<void>;
}
//# sourceMappingURL=kv.d.ts.map