import { type Awareness } from 'y-protocols/awareness';
import type { AwarenessSync } from '../sync/awareness';
export declare class AwarenessFrontend {
    private readonly sync;
    constructor(sync: AwarenessSync);
    connectAwareness(awareness: Awareness): () => void;
}
//# sourceMappingURL=awareness.d.ts.map