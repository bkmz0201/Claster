import EventEmitter2 from 'eventemitter2';
import {} from '../../storage/lock';
export class IndexedDBLocker {
    get db() {
        return this.dbConnection.inner.db;
    }
    get channel() {
        return this.dbConnection.inner.channel;
    }
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
        this.eventEmitter = new EventEmitter2();
    }
    async lock(domain, resource) {
        const key = `${domain}:${resource}`;
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const trx = this.db.transaction('locks', 'readwrite');
            const record = await trx.store.get(key);
            const lockTimestamp = record?.lock.getTime();
            if (lockTimestamp &&
                lockTimestamp > Date.now() - 30000 /* lock timeout 3s */) {
                trx.commit();
                await new Promise(resolve => {
                    const cleanup = () => {
                        this.channel.removeEventListener('message', channelListener);
                        this.eventEmitter.off('unlock', eventListener);
                        clearTimeout(timer);
                    };
                    const channelListener = (event) => {
                        if (event.data.type === 'unlock' && event.data.key === key) {
                            cleanup();
                            resolve();
                        }
                    };
                    const eventListener = (unlockKey) => {
                        if (unlockKey === key) {
                            cleanup();
                            resolve();
                        }
                    };
                    this.channel.addEventListener('message', channelListener); // add listener
                    this.eventEmitter.on('unlock', eventListener);
                    const timer = setTimeout(() => {
                        cleanup();
                        resolve();
                    }, 3000);
                    // timeout to avoid dead lock
                });
                continue;
            }
            else {
                await trx.store.put({ key, lock: new Date() });
                trx.commit();
                break;
            }
        }
        return {
            [Symbol.asyncDispose]: async () => {
                const trx = this.db.transaction('locks', 'readwrite');
                await trx.store.delete(key);
                trx.commit();
                this.channel.postMessage({ type: 'unlock', key });
                this.eventEmitter.emit('unlock', key);
            },
        };
    }
}
//# sourceMappingURL=lock.js.map