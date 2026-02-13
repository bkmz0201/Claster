import EventEmitter2 from 'eventemitter2';
import { MANUALLY_STOP } from '../utils/throw-if-aborted';
export class AutoReconnectConnection {
    constructor() {
        this.event = new EventEmitter2({
            maxListeners: 100,
        });
        this._inner = undefined;
        this._status = 'idle';
        this._error = undefined;
        this.retryDelay = 3000;
        this.connectingTimeout = 15000;
        this.refCount = 0;
        this.emitStatusChanged = (status, error) => {
            this.event.emit('statusChanged', status, error);
        };
    }
    get shareId() {
        return undefined;
    }
    get maybeConnection() {
        return this._inner;
    }
    get inner() {
        if (this._inner === undefined) {
            throw new Error(`Connection ${this.constructor.name} has not been established.`);
        }
        return this._inner;
    }
    set inner(inner) {
        this._inner = inner;
    }
    get status() {
        return this._status;
    }
    get error() {
        return this._error;
    }
    set error(error) {
        this.handleError(error);
    }
    setStatus(status, error) {
        const shouldEmit = status !== this._status || error !== this._error;
        this._status = status;
        // we only clear-up error when status is connected
        if (error || status === 'connected') {
            this._error = error;
        }
        if (shouldEmit) {
            this.emitStatusChanged(status, this._error);
        }
    }
    innerConnect() {
        if (this.status !== 'connecting') {
            this.setStatus('connecting');
            const connectingAbort = new AbortController();
            this.connectingAbort = connectingAbort;
            const signal = connectingAbort.signal;
            const timeout = setTimeout(() => {
                if (!signal.aborted) {
                    this.handleError(new Error('connecting timeout'));
                }
            }, this.connectingTimeout);
            this.doConnect(signal)
                .then(value => {
                clearTimeout(timeout);
                if (!signal.aborted) {
                    this._inner = value;
                    this.setStatus('connected');
                }
                else {
                    try {
                        this.doDisconnect(value);
                    }
                    catch (error) {
                        console.error('failed to disconnect', error);
                    }
                }
            })
                .catch(error => {
                if (!signal.aborted) {
                    clearTimeout(timeout);
                    console.error('failed to connect', error);
                    this.handleError(error);
                }
            });
        }
    }
    innerDisconnect() {
        this.connectingAbort?.abort(MANUALLY_STOP);
        this.reconnectingAbort?.abort(MANUALLY_STOP);
        try {
            if (this._inner) {
                this.doDisconnect(this._inner);
            }
        }
        catch (error) {
            console.error('failed to disconnect', error);
        }
        this.reconnectingAbort = undefined;
        this.connectingAbort = undefined;
        this._inner = undefined;
    }
    handleError(reason) {
        // on error
        console.error('connection error, will reconnect', reason);
        this.innerDisconnect();
        // if the connection is closed, do not reconnect
        if (this.status === 'closed') {
            return;
        }
        this.setStatus('error', reason);
        // reconnect
        this.reconnectingAbort = new AbortController();
        const signal = this.reconnectingAbort.signal;
        const timeout = setTimeout(() => {
            if (!signal.aborted) {
                this.innerConnect();
            }
        }, this.retryDelay);
        signal.addEventListener('abort', () => {
            clearTimeout(timeout);
        });
    }
    connect() {
        this.refCount++;
        if (this.refCount === 1) {
            this.innerConnect();
        }
    }
    disconnect(force) {
        if (force) {
            this.refCount = 0;
        }
        else {
            this.refCount = Math.max(this.refCount - 1, 0);
        }
        if (this.refCount === 0) {
            this.innerDisconnect();
            this.setStatus('closed');
        }
    }
    waitForConnected(signal) {
        return new Promise((resolve, reject) => {
            if (this.status === 'connected') {
                resolve();
                return;
            }
            const off = this.onStatusChanged(status => {
                if (status === 'connected') {
                    resolve();
                    off();
                }
            });
            signal?.addEventListener('abort', reason => {
                reject(reason);
                off();
            });
        });
    }
    onStatusChanged(cb) {
        this.event.on('statusChanged', cb);
        return () => {
            this.event.off('statusChanged', cb);
        };
    }
}
export class DummyConnection {
    constructor() {
        this.status = 'connected';
    }
    connect() {
        return;
    }
    disconnect() {
        return;
    }
    waitForConnected(_signal) {
        return Promise.resolve();
    }
    onStatusChanged(_cb) {
        return () => { };
    }
}
//# sourceMappingURL=connection.js.map