import { type AwarenessRecord, AwarenessStorageBase } from '../../storage';
import { BroadcastChannelConnection } from './channel';
interface BroadcastChannelAwarenessStorageOptions {
    id: string;
}
export declare class BroadcastChannelAwarenessStorage extends AwarenessStorageBase {
    private readonly options;
    static readonly identifier = "BroadcastChannelAwarenessStorage";
    readonly storageType = "awareness";
    readonly connection: BroadcastChannelConnection;
    get channel(): BroadcastChannel;
    constructor(options: BroadcastChannelAwarenessStorageOptions);
    private readonly subscriptions;
    update(record: AwarenessRecord, origin?: string): Promise<void>;
    subscribeUpdate(id: string, onUpdate: (update: AwarenessRecord, origin?: string) => void, onCollect: () => Promise<AwarenessRecord | null>): () => void;
}
export {};
//# sourceMappingURL=awareness.d.ts.map