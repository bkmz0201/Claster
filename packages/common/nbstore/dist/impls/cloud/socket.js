import { Manager as SocketIOManager, } from 'socket.io-client';
import { AutoReconnectConnection } from '../../connection';
import { throwIfAborted } from '../../utils/throw-if-aborted';
export function uint8ArrayToBase64(array) {
    return new Promise(resolve => {
        // Create a blob from the Uint8Array
        const blob = new Blob([array]);
        const reader = new FileReader();
        reader.onload = function () {
            const dataUrl = reader.result;
            if (!dataUrl) {
                resolve('');
                return;
            }
            // The result includes the `data:` URL prefix and the MIME type. We only want the Base64 data
            const base64 = dataUrl.split(',')[1];
            resolve(base64);
        };
        reader.readAsDataURL(blob);
    });
}
export function base64ToUint8Array(base64) {
    const binaryString = atob(base64);
    const binaryArray = [...binaryString].map(function (char) {
        return char.charCodeAt(0);
    });
    return new Uint8Array(binaryArray);
}
let authMethod;
export function configureSocketAuthMethod(cb) {
    authMethod = cb;
}
class SocketManager {
    constructor(endpoint, isSelfHosted) {
        this.refCount = 0;
        this.socketIOManager = new SocketIOManager(endpoint, {
            autoConnect: false,
            transports: isSelfHosted ? ['polling', 'websocket'] : ['websocket'], // self-hosted server may not support websocket
            secure: new URL(endpoint).protocol === 'https:',
            // we will handle reconnection by ourselves
            reconnection: false,
        });
        this.socket = this.socketIOManager.socket('/', {
            auth(cb) {
                if (authMethod) {
                    authMethod(endpoint, cb);
                }
                else {
                    cb({});
                }
            },
        });
    }
    connect() {
        let disconnected = false;
        this.refCount++;
        this.socket.connect();
        return {
            socket: this.socket,
            disconnect: () => {
                if (disconnected) {
                    return;
                }
                disconnected = true;
                this.refCount--;
                if (this.refCount === 0) {
                    this.socket.disconnect();
                }
            },
        };
    }
}
const SOCKET_MANAGER_CACHE = new Map();
function getSocketManager(endpoint, isSelfHosted) {
    let manager = SOCKET_MANAGER_CACHE.get(endpoint);
    if (!manager) {
        manager = new SocketManager(endpoint, isSelfHosted);
        SOCKET_MANAGER_CACHE.set(endpoint, manager);
    }
    return manager;
}
export class SocketConnection extends AutoReconnectConnection {
    constructor(endpoint, isSelfHosted) {
        super();
        this.endpoint = endpoint;
        this.isSelfHosted = isSelfHosted;
        this.manager = getSocketManager(this.endpoint, this.isSelfHosted);
        this.handleDisconnect = (reason) => {
            this.error = new Error(reason);
        };
    }
    async doConnect(signal) {
        const { socket, disconnect } = this.manager.connect();
        try {
            throwIfAborted(signal);
            await Promise.race([
                new Promise((resolve, reject) => {
                    if (socket.connected) {
                        resolve();
                        return;
                    }
                    socket.once('connect', () => {
                        resolve();
                    });
                    socket.once('connect_error', err => {
                        reject(err);
                    });
                }),
                new Promise((_resolve, reject) => {
                    signal?.addEventListener('abort', () => {
                        reject(signal.reason);
                    });
                }),
            ]);
        }
        catch (err) {
            disconnect();
            throw err;
        }
        socket.on('disconnect', this.handleDisconnect);
        return {
            socket,
            disconnect,
        };
    }
    doDisconnect(conn) {
        conn.socket.off('disconnect', this.handleDisconnect);
        conn.disconnect();
    }
}
//# sourceMappingURL=socket.js.map