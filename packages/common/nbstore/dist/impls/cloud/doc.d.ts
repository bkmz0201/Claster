import type { Socket } from 'socket.io-client';
import { type DocClock, type DocClocks, DocStorageBase, type DocStorageOptions, type DocUpdate } from '../../storage';
import { type IdConverter } from '../../utils/id-converter';
import type { SpaceType } from '../../utils/universal-id';
import { type ServerEventsMap, SocketConnection } from './socket';
interface CloudDocStorageOptions extends DocStorageOptions {
    serverBaseUrl: string;
    isSelfHosted: boolean;
    type: SpaceType;
}
export declare class CloudDocStorage extends DocStorageBase<CloudDocStorageOptions> {
    static readonly identifier = "CloudDocStorage";
    get socket(): import("./socket").Socket;
    get idConverter(): {
        newIdToOldId(newId: string): string;
        oldIdToNewId(oldId: string): string;
    };
    readonly spaceType: SpaceType;
    onServerUpdate: ServerEventsMap['space:broadcast-doc-update'];
    readonly connection: CloudDocStorageConnection;
    getDocSnapshot(docId: string): Promise<{
        docId: string;
        bin: Uint8Array<ArrayBuffer>;
        timestamp: Date;
    } | null>;
    getDocDiff(docId: string, state?: Uint8Array): Promise<{
        docId: string;
        missing: Uint8Array<ArrayBuffer>;
        state: Uint8Array<ArrayBuffer>;
        timestamp: Date;
    } | null>;
    pushDocUpdate(update: DocUpdate): Promise<{
        docId: string;
        timestamp: Date;
    }>;
    /**
     * Just a rough implementation, cloud doc storage should not need this method.
     */
    getDocTimestamp(docId: string): Promise<DocClock | null>;
    getDocTimestamps(after?: Date): Promise<DocClocks>;
    deleteDoc(docId: string): Promise<void>;
    protected setDocSnapshot(): Promise<boolean>;
    protected getDocUpdates(): Promise<never[]>;
    protected markUpdatesMerged(): Promise<number>;
}
declare class CloudDocStorageConnection extends SocketConnection {
    private readonly options;
    private readonly onServerUpdate;
    constructor(options: CloudDocStorageOptions, onServerUpdate: ServerEventsMap['space:broadcast-doc-update']);
    idConverter: IdConverter | null;
    doConnect(signal?: AbortSignal): Promise<{
        socket: import("./socket").Socket;
        disconnect: () => void;
    }>;
    doDisconnect({ socket, disconnect, }: {
        socket: Socket;
        disconnect: () => void;
    }): void;
    getIdConverter(socket: Socket): Promise<{
        newIdToOldId(newId: string): string;
        oldIdToNewId(oldId: string): string;
    }>;
}
export {};
//# sourceMappingURL=doc.d.ts.map