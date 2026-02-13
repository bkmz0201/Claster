import EventEmitter2 from 'eventemitter2';
import { openDB } from 'idb';
import { Observable } from 'rxjs';
export class StorageMemento {
    constructor(storage, prefix) {
        this.storage = storage;
        this.prefix = prefix;
        // eventEmitter is used for same tab event
        this.eventEmitter = new EventEmitter2();
        // channel is used for cross-tab event
        this.channel = new BroadcastChannel(this.prefix);
    }
    keys() {
        const keys = [];
        for (let i = 0; i < this.storage.length; i++) {
            const key = this.storage.key(i);
            if (key && key.startsWith(this.prefix)) {
                keys.push(key.slice(this.prefix.length));
            }
        }
        return keys;
    }
    get(key) {
        const json = this.storage.getItem(this.prefix + key);
        return json ? JSON.parse(json) : undefined;
    }
    watch(key) {
        return new Observable(subscriber => {
            const json = this.storage.getItem(this.prefix + key);
            const first = json ? JSON.parse(json) : undefined;
            subscriber.next(first);
            const eventEmitterCb = (value) => {
                subscriber.next(value);
            };
            this.eventEmitter.on(key, eventEmitterCb);
            const channelCb = (event) => {
                if (event.data.key === key) {
                    subscriber.next(event.data.value);
                }
            };
            this.channel.addEventListener('message', channelCb);
            return () => {
                this.eventEmitter.off(key, eventEmitterCb);
                this.channel.removeEventListener('message', channelCb);
            };
        });
    }
    set(key, value) {
        this.storage.setItem(this.prefix + key, JSON.stringify(value));
        this.eventEmitter.emit(key, value);
        this.channel.postMessage({ key, value });
    }
    del(key) {
        this.storage.removeItem(this.prefix + key);
    }
    clear() {
        for (const key of this.keys()) {
            this.del(key);
        }
    }
}
export class LocalStorageGlobalCache extends StorageMemento {
    constructor() {
        super(localStorage, 'global-cache:');
    }
}
export class LocalStorageGlobalState extends StorageMemento {
    constructor() {
        super(localStorage, 'global-state:');
    }
}
export class SessionStorageGlobalSessionState extends StorageMemento {
    constructor() {
        super(sessionStorage, 'global-session-state:');
    }
}
export class AsyncStorageMemento {
    constructor(dbName, table) {
        this.dbName = dbName;
        this.table = table;
        // eventEmitter is used for same tab event
        this.eventEmitter = new EventEmitter2();
        // channel is used for cross-tab event
        this.channel = new BroadcastChannel(this.dbName);
        this._db = null;
    }
    async getDB() {
        const { dbName, table } = this;
        if (!this._db) {
            this._db = await openDB(dbName, 1, {
                upgrade(db) {
                    if (!db.objectStoreNames.contains(table)) {
                        db.createObjectStore(table, { keyPath: 'key' });
                    }
                },
            });
        }
        return this._db;
    }
    async get(key) {
        const db = await this.getDB();
        const tx = db.transaction(this.table, 'readonly');
        const store = tx.objectStore(this.table);
        const result = await store.get(key);
        return result?.value;
    }
    watch(key) {
        return new Observable(subscriber => {
            // Get initial value
            this.get(key).then(value => {
                subscriber.next(value);
            }, error => {
                console.error('Error getting initial value:', error);
                subscriber.next(undefined);
            });
            // Listen for same tab events
            const eventEmitterCb = (value) => {
                subscriber.next(value);
            };
            this.eventEmitter.on(key, eventEmitterCb);
            // Listen for cross-tab events
            // eslint-disable-next-line sonarjs/no-identical-functions
            const channelCb = (event) => {
                if (event.data.key === key) {
                    subscriber.next(event.data.value);
                }
            };
            this.channel.addEventListener('message', channelCb);
            return () => {
                this.eventEmitter.off(key, eventEmitterCb);
                this.channel.removeEventListener('message', channelCb);
            };
        });
    }
    async set(key, value) {
        const db = await this.getDB();
        const tx = db.transaction(this.table, 'readwrite');
        const store = tx.objectStore(this.table);
        if (value === undefined) {
            await store.delete(key);
        }
        else {
            await store.put({ key, value });
        }
        // Emit events
        this.eventEmitter.emit(key, value);
        this.channel.postMessage({ key, value });
    }
    async del(key) {
        const db = await this.getDB();
        const tx = db.transaction(this.table, 'readwrite');
        const store = tx.objectStore(this.table);
        await store.delete(key);
        // Emit events
        this.eventEmitter.emit(key, undefined);
        this.channel.postMessage({ key, value: undefined });
    }
    async clear() {
        const keys = await this.keys();
        const db = await this.getDB();
        const tx = db.transaction(this.table, 'readwrite');
        const store = tx.objectStore(this.table);
        await store.clear();
        // Notify observers about each deleted key
        for (const key of keys) {
            this.eventEmitter.emit(key, undefined);
            this.channel.postMessage({ key, value: undefined });
        }
    }
    async keys() {
        const db = await this.getDB();
        const tx = db.transaction(this.table, 'readonly');
        const store = tx.objectStore(this.table);
        const allObjects = await store.getAll();
        return allObjects.map(obj => obj.key);
    }
}
export class IDBGlobalState extends AsyncStorageMemento {
    constructor() {
        super('global-storage', 'global-state');
    }
}
//# sourceMappingURL=storage.js.map