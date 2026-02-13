import type { WorkerInitOptions } from '@affine/nbstore/worker/client';
import { Service } from '@toeverything/infra';
import type { NbstoreProvider } from '../providers/nbstore';
export declare class NbstoreService extends Service {
    private readonly nbstoreProvider;
    constructor(nbstoreProvider: NbstoreProvider);
    openStore(key: string, options: WorkerInitOptions): {
        store: import("@affine/nbstore/worker/client").StoreClient;
        dispose: () => void;
    };
}
//# sourceMappingURL=nbstore.d.ts.map