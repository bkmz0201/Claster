export type ConnectionStatus = 'idle' | 'connecting' | 'connected' | 'error' | 'closed';
export interface Connection<T = any> {
    readonly status: ConnectionStatus;
    readonly error?: Error;
    readonly inner: T;
    connect(): void;
    disconnect(): void;
    waitForConnected(signal?: AbortSignal): Promise<void>;
    onStatusChanged(cb: (status: ConnectionStatus, error?: Error) => void): () => void;
}
export declare abstract class AutoReconnectConnection<T = any> implements Connection<T> {
    private readonly event;
    private _inner;
    private _status;
    private _error;
    retryDelay: number;
    connectingTimeout: number;
    private refCount;
    private connectingAbort?;
    private reconnectingAbort?;
    constructor();
    get shareId(): string | undefined;
    get maybeConnection(): T | undefined;
    get inner(): T;
    private set inner(value);
    get status(): ConnectionStatus;
    get error(): Error | undefined;
    protected set error(error: Error | undefined);
    private setStatus;
    protected abstract doConnect(signal?: AbortSignal): Promise<T>;
    protected abstract doDisconnect(conn: T): void;
    private innerConnect;
    private innerDisconnect;
    private handleError;
    connect(): void;
    disconnect(force?: boolean): void;
    waitForConnected(signal?: AbortSignal): Promise<void>;
    onStatusChanged(cb: (status: ConnectionStatus, error?: Error) => void): () => void;
    private readonly emitStatusChanged;
}
export declare class DummyConnection implements Connection<undefined> {
    readonly status: ConnectionStatus;
    readonly inner: undefined;
    connect(): void;
    disconnect(): void;
    waitForConnected(_signal?: AbortSignal): Promise<void>;
    onStatusChanged(_cb: (status: ConnectionStatus, error?: Error) => void): () => void;
}
//# sourceMappingURL=connection.d.ts.map