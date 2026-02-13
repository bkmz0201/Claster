const PRODUCER_MESSAGE_TYPES = [
    'call',
    'cancel',
    'subscribe',
    'unsubscribe',
];
const CONSUMER_MESSAGE_TYPES = ['return', 'next', 'error', 'complete'];
export const KNOWN_MESSAGE_TYPES = new Set([
    ...PRODUCER_MESSAGE_TYPES,
    ...CONSUMER_MESSAGE_TYPES,
]);
export function ignoreUnknownEvent(handler) {
    return (event) => {
        const data = event.data;
        if (!data ||
            typeof data !== 'object' ||
            typeof data.type !== 'string' ||
            !KNOWN_MESSAGE_TYPES.has(data.type)) {
            return;
        }
        handler(data);
    };
}
const TRANSFERABLES_CACHE = new Map();
export function transfer(data, transferables) {
    TRANSFERABLES_CACHE.set(data, transferables);
    return data;
}
export function fetchTransferables(data) {
    const transferables = TRANSFERABLES_CACHE.get(data);
    if (transferables) {
        TRANSFERABLES_CACHE.delete(data);
    }
    return transferables;
}
export class AutoMessageHandler {
    constructor(port) {
        this.port = port;
        this.listening = false;
        this.handleMessage = ignoreUnknownEvent((msg) => {
            const handler = this.handlers[msg.type];
            if (!handler) {
                return;
            }
            handler(msg);
        });
        this.listen();
    }
    listen() {
        if (this.listening) {
            return;
        }
        this.port.addEventListener('message', this.handleMessage);
        this.port.addEventListener('messageerror', console.error);
        this.port.start?.();
        this.listening = true;
    }
    close() {
        this.port.close?.();
        this.port.terminate?.(); // For Worker
        this.port.removeEventListener('message', this.handleMessage);
        this.port.removeEventListener('messageerror', console.error);
        this.listening = false;
    }
}
//# sourceMappingURL=message.js.map