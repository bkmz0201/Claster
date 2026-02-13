import type { AwarenessRecord, AwarenessStorage } from '../../storage/awareness';
import type { PeerStorageOptions } from '../types';
export interface AwarenessSync {
    update(record: AwarenessRecord, origin?: string): Promise<void>;
    subscribeUpdate(id: string, onUpdate: (update: AwarenessRecord, origin?: string) => void, onCollect: () => Promise<AwarenessRecord | null>): () => void;
}
export declare class AwarenessSyncImpl implements AwarenessSync {
    readonly storages: PeerStorageOptions<AwarenessStorage>;
    constructor(storages: PeerStorageOptions<AwarenessStorage>);
    update(record: AwarenessRecord, origin?: string): Promise<void>;
    subscribeUpdate(id: string, onUpdate: (update: AwarenessRecord, origin?: string) => void, onCollect: () => Promise<AwarenessRecord | null>): () => void;
}
//# sourceMappingURL=index.d.ts.map