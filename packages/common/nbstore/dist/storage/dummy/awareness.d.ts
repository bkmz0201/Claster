import { DummyConnection } from '../../connection';
import { type AwarenessRecord, AwarenessStorageBase } from '../awareness';
export declare class DummyAwarenessStorage extends AwarenessStorageBase {
    update(_record: AwarenessRecord, _origin?: string): Promise<void>;
    subscribeUpdate(_id: string, _onUpdate: (update: AwarenessRecord, origin?: string) => void, _onCollect: () => Promise<AwarenessRecord | null>): () => void;
    connection: DummyConnection;
}
//# sourceMappingURL=awareness.d.ts.map