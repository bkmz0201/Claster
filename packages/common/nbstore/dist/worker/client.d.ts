import { OpClient } from '@toeverything/infra/op';
import { AwarenessFrontend, BlobFrontend, DocFrontend, IndexerFrontend } from '../frontend';
import type { StoreInitOptions, WorkerManagerOps, WorkerOps } from './ops';
export type { StoreInitOptions as WorkerInitOptions } from './ops';
export declare class StoreManagerClient {
    private readonly client;
    private readonly connections;
    constructor(client: OpClient<WorkerManagerOps>);
    open(key: string, options: StoreInitOptions): {
        store: StoreClient;
        dispose: () => void;
    };
    dispose(): void;
    pause(): void;
    resume(): void;
}
export declare class StoreClient {
    private readonly client;
    constructor(client: OpClient<WorkerOps>);
    private readonly docStorage;
    private readonly blobStorage;
    private readonly docSync;
    private readonly blobSync;
    private readonly awarenessSync;
    private readonly indexerSync;
    readonly docFrontend: DocFrontend;
    readonly blobFrontend: BlobFrontend;
    readonly awarenessFrontend: AwarenessFrontend;
    readonly indexerFrontend: IndexerFrontend;
    enableBatterySaveMode(): Promise<void>;
    disableBatterySaveMode(): Promise<void>;
    pauseSync(): import("@toeverything/infra/op").CancelablePromise<void>;
    resumeSync(): import("@toeverything/infra/op").CancelablePromise<void>;
}
//# sourceMappingURL=client.d.ts.map