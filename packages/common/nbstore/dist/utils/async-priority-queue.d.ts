import { PriorityQueue } from './priority-queue';
export declare class AsyncPriorityQueue extends PriorityQueue {
    private _resolveUpdate;
    private _waitForUpdate;
    asyncPop(minimumPriority?: number, abort?: AbortSignal): Promise<string>;
    push(id: string, priority?: number): void;
}
//# sourceMappingURL=async-priority-queue.d.ts.map