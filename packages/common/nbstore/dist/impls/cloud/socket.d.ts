import { type Socket as SocketIO } from 'socket.io-client';
import { AutoReconnectConnection } from '../../connection';
interface EventError {
    name: string;
    message: string;
}
type WebsocketResponse<T> = {
    error: EventError;
} | {
    data: T;
};
interface ServerEvents {
    'space:broadcast-doc-update': {
        spaceType: string;
        spaceId: string;
        docId: string;
        update: string;
        timestamp: number;
        editor: string;
    };
    'space:collect-awareness': {
        spaceType: string;
        spaceId: string;
        docId: string;
    };
    'space:broadcast-awareness-update': {
        spaceType: string;
        spaceId: string;
        docId: string;
        awarenessUpdate: string;
    };
}
interface ClientEvents {
    'space:join': [
        {
            spaceType: string;
            spaceId: string;
            clientVersion: string;
        },
        {
            clientId: string;
        }
    ];
    'space:leave': {
        spaceType: string;
        spaceId: string;
    };
    'space:join-awareness': [
        {
            spaceType: string;
            spaceId: string;
            docId: string;
            clientVersion: string;
        },
        {
            clientId: string;
        }
    ];
    'space:leave-awareness': {
        spaceType: string;
        spaceId: string;
        docId: string;
    };
    'space:update-awareness': {
        spaceType: string;
        spaceId: string;
        docId: string;
        awarenessUpdate: string;
    };
    'space:load-awarenesses': {
        spaceType: string;
        spaceId: string;
        docId: string;
    };
    'space:push-doc-update': [
        {
            spaceType: string;
            spaceId: string;
            docId: string;
            update: string;
        },
        {
            timestamp: number;
        }
    ];
    'space:load-doc-timestamps': [
        {
            spaceType: string;
            spaceId: string;
            timestamp?: number;
        },
        Record<string, number>
    ];
    'space:load-doc': [
        {
            spaceType: string;
            spaceId: string;
            docId: string;
            stateVector?: string;
        },
        {
            missing: string;
            state: string;
            timestamp: number;
        }
    ];
    'space:delete-doc': {
        spaceType: string;
        spaceId: string;
        docId: string;
    };
}
export type ServerEventsMap = {
    [Key in keyof ServerEvents]: (data: ServerEvents[Key]) => void;
};
export type ClientEventsMap = {
    [Key in keyof ClientEvents]: ClientEvents[Key] extends Array<any> ? (data: ClientEvents[Key][0], ack: (res: WebsocketResponse<ClientEvents[Key][1]>) => void) => void : (data: ClientEvents[Key]) => void;
};
export type Socket = SocketIO<ServerEventsMap, ClientEventsMap>;
export declare function uint8ArrayToBase64(array: Uint8Array): Promise<string>;
export declare function base64ToUint8Array(base64: string): Uint8Array<ArrayBuffer>;
export declare function configureSocketAuthMethod(cb: (endpoint: string, cb: (data: object) => void) => void): void;
declare class SocketManager {
    private readonly socketIOManager;
    socket: Socket;
    refCount: number;
    constructor(endpoint: string, isSelfHosted: boolean);
    connect(): {
        socket: Socket;
        disconnect: () => void;
    };
}
export declare class SocketConnection extends AutoReconnectConnection<{
    socket: Socket;
    disconnect: () => void;
}> {
    private readonly endpoint;
    private readonly isSelfHosted;
    manager: SocketManager;
    constructor(endpoint: string, isSelfHosted: boolean);
    doConnect(signal?: AbortSignal): Promise<{
        socket: Socket;
        disconnect: () => void;
    }>;
    doDisconnect(conn: {
        socket: Socket;
        disconnect: () => void;
    }): void;
    handleDisconnect: (reason: SocketIO.DisconnectReason) => void;
}
export {};
//# sourceMappingURL=socket.d.ts.map