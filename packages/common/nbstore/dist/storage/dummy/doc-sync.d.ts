import { DummyConnection } from '../../connection';
import type { DocClock, DocClocks } from '../doc';
import { DocSyncStorageBase } from '../doc-sync';
export declare class DummyDocSyncStorage extends DocSyncStorageBase {
    getPeerRemoteClock(_peer: string, _docId: string): Promise<DocClock | null>;
    getPeerRemoteClocks(_peer: string): Promise<DocClocks>;
    setPeerRemoteClock(_peer: string, _clock: DocClock): Promise<void>;
    getPeerPulledRemoteClock(_peer: string, _docId: string): Promise<DocClock | null>;
    getPeerPulledRemoteClocks(_peer: string): Promise<DocClocks>;
    setPeerPulledRemoteClock(_peer: string, _clock: DocClock): Promise<void>;
    getPeerPushedClock(_peer: string, _docId: string): Promise<DocClock | null>;
    getPeerPushedClocks(_peer: string): Promise<DocClocks>;
    setPeerPushedClock(_peer: string, _clock: DocClock): Promise<void>;
    clearClocks(): Promise<void>;
    connection: DummyConnection;
}
//# sourceMappingURL=doc-sync.d.ts.map