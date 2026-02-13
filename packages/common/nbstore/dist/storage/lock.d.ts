export interface Locker {
    lock(domain: string, resource: string): Promise<AsyncDisposable>;
}
export declare class SingletonLocker implements Locker {
    lockedResource: Map<string, Lock>;
    constructor();
    lock(domain: string, resource: string): Promise<Lock>;
}
export declare class Lock {
    private inner;
    private release;
    acquire(): Promise<void>;
    [Symbol.asyncDispose](): Promise<void>;
}
//# sourceMappingURL=lock.d.ts.map