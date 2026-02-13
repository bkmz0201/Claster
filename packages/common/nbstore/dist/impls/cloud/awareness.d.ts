import { type AwarenessRecord, AwarenessStorageBase } from '../../storage/awareness';
import type { SpaceType } from '../../utils/universal-id';
import { SocketConnection } from './socket';
interface CloudAwarenessStorageOptions {
    isSelfHosted: boolean;
    serverBaseUrl: string;
    type: SpaceType;
    id: string;
}
export declare class CloudAwarenessStorage extends AwarenessStorageBase {
    private readonly options;
    static readonly identifier = "CloudAwarenessStorage";
    constructor(options: CloudAwarenessStorageOptions);
    connection: SocketConnection;
    private get socket();
    update(record: AwarenessRecord): Promise<void>;
    subscribeUpdate(id: string, onUpdate: (update: AwarenessRecord, origin?: string) => void, onCollect: () => Promise<AwarenessRecord | null>): () => void;
}
export {};
//# sourceMappingURL=awareness.d.ts.map