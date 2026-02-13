export declare class AsyncQueue<T> {
    private _queue;
    private _resolveUpdate;
    private _waitForUpdate;
    constructor(init?: T[]);
    get length(): number;
    next(abort?: AbortSignal, dequeue?: (arr: T[]) => T | undefined): Promise<T>;
    push(...updates: T[]): void;
    remove(predicate: (update: T) => boolean): void;
    find(predicate: (update: T) => boolean): T | undefined;
    clear(): void;
}
export declare class PriorityAsyncQueue<T extends {
    id: string;
}> extends AsyncQueue<T> {
    readonly priorityTarget: SharedPriorityTarget;
    constructor(init?: T[], priorityTarget?: SharedPriorityTarget);
    next(abort?: AbortSignal | undefined): Promise<T>;
}
/**
 * Shared priority target can be shared by multiple queues.
 */
export declare class SharedPriorityTarget {
    priorityRule: ((id: string) => boolean) | null;
}
//# sourceMappingURL=async-queue.d.ts.map