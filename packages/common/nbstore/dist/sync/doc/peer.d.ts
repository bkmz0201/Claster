import { Observable } from 'rxjs';
import type { DocStorage, DocSyncStorage } from '../../storage';
interface PeerState {
    total: number;
    syncing: number;
    retrying: boolean;
    synced: boolean;
    errorMessage: string | null;
}
interface PeerDocState {
    syncing: boolean;
    synced: boolean;
    retrying: boolean;
    errorMessage: string | null;
}
interface DocSyncPeerOptions {
    mergeUpdates?: (updates: Uint8Array[]) => Promise<Uint8Array> | Uint8Array;
}
export declare class DocSyncPeer {
    readonly peerId: string;
    readonly local: DocStorage;
    readonly syncMetadata: DocSyncStorage;
    readonly remote: DocStorage;
    readonly options: DocSyncPeerOptions;
    /**
     * random unique id for recognize self in "update" event
     */
    private readonly uniqueId;
    private readonly prioritySettings;
    constructor(peerId: string, local: DocStorage, syncMetadata: DocSyncStorage, remote: DocStorage, options?: DocSyncPeerOptions);
    private status;
    private readonly statusUpdatedSubject$;
    peerState$: Observable<PeerState>;
    docState$(docId: string): Observable<PeerDocState>;
    private readonly jobs;
    private readonly actions;
    readonly events: {
        localUpdated: ({ docId, update, clock, }: {
            docId: string;
            update: Uint8Array;
            clock: Date;
        }) => void;
        remoteUpdated: ({ docId, update, remoteClock, }: {
            docId: string;
            update: Uint8Array;
            remoteClock: Date;
        }) => void;
    };
    mainLoop(signal?: AbortSignal): Promise<void>;
    private retryLoop;
    private schedule;
    addPriority(id: string, priority: number): () => void;
    protected mergeUpdates: (updates: Uint8Array[]) => Uint8Array<ArrayBufferLike> | Promise<Uint8Array<ArrayBufferLike>>;
}
export {};
//# sourceMappingURL=peer.d.ts.map