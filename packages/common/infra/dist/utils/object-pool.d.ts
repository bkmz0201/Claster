export interface RcRef<T> extends Disposable {
    obj: T;
    release: () => void;
}
export declare class ObjectPool<Key, T> {
    private readonly options;
    objects: Map<Key, {
        obj: T;
        rc: number;
    }>;
    timeoutToGc: NodeJS.Timeout | null;
    constructor(options?: {
        onDelete?: (obj: T) => void;
        onDangling?: (obj: T) => boolean;
    });
    get(key: Key): RcRef<T> | null;
    put(key: Key, obj: T): RcRef<T>;
    private requestGc;
    private gc;
    clear(): void;
}
//# sourceMappingURL=object-pool.d.ts.map