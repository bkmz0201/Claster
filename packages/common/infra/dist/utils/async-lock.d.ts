export declare class AsyncLock {
    private _lock;
    acquire(): Promise<{
        release: () => void;
        [Symbol.dispose]: () => void;
    }>;
}
//# sourceMappingURL=async-lock.d.ts.map