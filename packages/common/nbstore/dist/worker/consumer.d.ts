import { OpConsumer } from '@toeverything/infra/op';
import { type StorageConstructor } from '../impls';
import type { WorkerManagerOps } from './ops';
export type { WorkerManagerOps };
export declare class StoreManagerConsumer {
    private readonly availableStorageImplementations;
    private readonly storeDisposers;
    private readonly storePool;
    constructor(availableStorageImplementations: StorageConstructor[]);
    bindConsumer(consumer: OpConsumer<WorkerManagerOps>): void;
    private registerHandlers;
}
//# sourceMappingURL=consumer.d.ts.map