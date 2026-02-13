import EventEmitter2 from 'eventemitter2';
import { DummyAwarenessStorage } from './dummy/awareness';
import { DummyBlobStorage } from './dummy/blob';
import { DummyBlobSyncStorage } from './dummy/blob-sync';
import { DummyDocStorage } from './dummy/doc';
import { DummyDocSyncStorage } from './dummy/doc-sync';
import { DummyIndexerStorage } from './dummy/indexer';
import { DummyIndexerSyncStorage } from './dummy/indexer-sync';
export class SpaceStorage {
    constructor(storages) {
        this.event = new EventEmitter2();
        this.disposables = new Set();
        this.storages = {
            awareness: storages.awareness ?? new DummyAwarenessStorage(),
            blob: storages.blob ?? new DummyBlobStorage(),
            blobSync: storages.blobSync ?? new DummyBlobSyncStorage(),
            doc: storages.doc ?? new DummyDocStorage(),
            docSync: storages.docSync ?? new DummyDocSyncStorage(),
            indexer: storages.indexer ?? new DummyIndexerStorage(),
            indexerSync: storages.indexerSync ?? new DummyIndexerSyncStorage(),
        };
    }
    get(type) {
        const storage = this.storages[type];
        if (!storage) {
            throw new Error(`Storage ${type} not registered.`);
        }
        return storage;
    }
    connect() {
        Object.values(this.storages).forEach(storage => {
            storage.connection.connect();
        });
    }
    disconnect() {
        Object.values(this.storages).forEach(storage => {
            storage.connection.disconnect();
        });
    }
    async waitForConnected(signal) {
        await Promise.all(Object.values(this.storages).map(storage => storage.connection.waitForConnected(signal)));
    }
    async destroy() {
        this.disposables.forEach(disposable => disposable());
        this.event.removeAllListeners();
    }
}
export * from './awareness';
export * from './blob';
export * from './blob-sync';
export * from './doc';
export * from './doc-sync';
export * from './errors';
export * from './history';
export * from './indexer';
export * from './storage';
//# sourceMappingURL=index.js.map