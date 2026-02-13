import { OpClient, transfer } from '@toeverything/infra/op';
import { v4 as uuid } from 'uuid';
import { DummyConnection } from '../connection';
import { AwarenessFrontend, BlobFrontend, DocFrontend, IndexerFrontend, } from '../frontend';
import {} from '../storage';
export class StoreManagerClient {
    constructor(client) {
        this.client = client;
        this.connections = new Map();
    }
    open(key, options) {
        const { port1, port2 } = new MessageChannel();
        const client = new OpClient(port1);
        const closeKey = uuid();
        this.client
            .call('open', transfer({
            key,
            closeKey,
            options,
            port: port2,
        }, [port2]))
            .catch(err => {
            console.error('error opening', err);
        });
        const connection = {
            store: new StoreClient(client),
            dispose: () => {
                this.client.call('close', closeKey).catch(err => {
                    console.error('error closing', err);
                });
                this.connections.delete(closeKey);
            },
        };
        this.connections.set(closeKey, connection);
        return connection;
    }
    dispose() {
        this.connections.forEach(connection => {
            connection.dispose();
        });
    }
    pause() {
        this.connections.forEach(connection => {
            connection.store.pauseSync().catch(err => {
                console.error('error pausing', err);
            });
        });
    }
    resume() {
        this.connections.forEach(connection => {
            connection.store.resumeSync().catch(err => {
                console.error('error resuming', err);
            });
        });
    }
}
export class StoreClient {
    constructor(client) {
        this.client = client;
        this.docStorage = new WorkerDocStorage(this.client);
        this.blobStorage = new WorkerBlobStorage(this.client);
        this.docSync = new WorkerDocSync(this.client);
        this.blobSync = new WorkerBlobSync(this.client);
        this.awarenessSync = new WorkerAwarenessSync(this.client);
        this.docFrontend = new DocFrontend(this.docStorage, this.docSync);
        this.blobFrontend = new BlobFrontend(this.blobStorage, this.blobSync);
        this.awarenessFrontend = new AwarenessFrontend(this.awarenessSync);
        this.indexerSync = new WorkerIndexerSync(this.client);
        this.indexerFrontend = new IndexerFrontend(this.indexerSync);
    }
    enableBatterySaveMode() {
        return this.client.call('sync.enableBatterySaveMode');
    }
    disableBatterySaveMode() {
        return this.client.call('sync.disableBatterySaveMode');
    }
    pauseSync() {
        return this.client.call('sync.pauseSync');
    }
    resumeSync() {
        return this.client.call('sync.resumeSync');
    }
}
class WorkerDocStorage {
    constructor(client) {
        this.client = client;
        this.spaceId = '';
        this.storageType = 'doc';
        this.isReadonly = false;
        this.connection = new WorkerDocConnection(this.client);
    }
    async getDoc(docId) {
        return this.client.call('docStorage.getDoc', docId);
    }
    async getDocDiff(docId, state) {
        return this.client.call('docStorage.getDocDiff', { docId, state });
    }
    async pushDocUpdate(update, origin) {
        return this.client.call('docStorage.pushDocUpdate', { update, origin });
    }
    async getDocTimestamp(docId) {
        return this.client.call('docStorage.getDocTimestamp', docId);
    }
    async getDocTimestamps(after) {
        return this.client.call('docStorage.getDocTimestamps', after ?? null);
    }
    async deleteDoc(docId) {
        return this.client.call('docStorage.deleteDoc', docId);
    }
    subscribeDocUpdate(callback) {
        const subscription = this.client
            .ob$('docStorage.subscribeDocUpdate')
            .subscribe(value => {
            callback(value.update, value.origin);
        });
        return () => {
            subscription.unsubscribe();
        };
    }
}
class WorkerDocConnection extends DummyConnection {
    constructor(client) {
        super();
        this.client = client;
    }
    waitForConnected() {
        if (this.promise) {
            return this.promise;
        }
        this.promise = this.client.call('docStorage.waitForConnected');
        return this.promise;
    }
}
class WorkerBlobStorage {
    constructor(client) {
        this.client = client;
        this.storageType = 'blob';
        this.isReadonly = false;
        this.connection = new WorkerBlobConnection(this.client);
    }
    get(key, _signal) {
        return this.client.call('blobStorage.getBlob', key);
    }
    set(blob, _signal) {
        return this.client.call('blobStorage.setBlob', blob);
    }
    delete(key, permanently, _signal) {
        return this.client.call('blobStorage.deleteBlob', { key, permanently });
    }
    release(_signal) {
        return this.client.call('blobStorage.releaseBlobs');
    }
    list(_signal) {
        return this.client.call('blobStorage.listBlobs');
    }
}
class WorkerBlobConnection extends DummyConnection {
    constructor(client) {
        super();
        this.client = client;
    }
    waitForConnected() {
        if (this.promise) {
            return this.promise;
        }
        this.promise = this.client.call('blobStorage.waitForConnected');
        return this.promise;
    }
}
class WorkerDocSync {
    constructor(client) {
        this.client = client;
    }
    get state$() {
        return this.client.ob$('docSync.state');
    }
    docState$(docId) {
        return this.client.ob$('docSync.docState', docId);
    }
    async waitForSynced(docId, abort) {
        await this.client.call('docSync.waitForSynced', docId ?? null, abort);
    }
    addPriority(docId, priority) {
        const subscription = this.client
            .ob$('docSync.addPriority', { docId, priority })
            .subscribe();
        return () => {
            subscription.unsubscribe();
        };
    }
    resetSync() {
        return this.client.call('docSync.resetSync');
    }
}
class WorkerBlobSync {
    constructor(client) {
        this.client = client;
    }
    get state$() {
        return this.client.ob$('blobSync.state');
    }
    blobState$(blobId) {
        return this.client.ob$('blobSync.blobState', blobId);
    }
    downloadBlob(blobId) {
        return this.client.call('blobSync.downloadBlob', blobId);
    }
    uploadBlob(blob, force) {
        return this.client.call('blobSync.uploadBlob', { blob, force });
    }
    fullDownload(peerId, signal) {
        return new Promise((resolve, reject) => {
            const abortListener = () => {
                reject(signal?.reason);
                subscription.unsubscribe();
            };
            signal?.addEventListener('abort', abortListener);
            const subscription = this.client
                .ob$('blobSync.fullDownload', peerId ?? null)
                .subscribe({
                next() {
                    signal?.removeEventListener('abort', abortListener);
                    resolve();
                },
                error(err) {
                    signal?.removeEventListener('abort', abortListener);
                    reject(err);
                },
            });
        });
    }
}
class WorkerAwarenessSync {
    constructor(client) {
        this.client = client;
    }
    update(record, origin) {
        return this.client.call('awarenessSync.update', {
            awareness: record,
            origin,
        });
    }
    subscribeUpdate(id, onUpdate, onCollect) {
        const subscription = this.client
            .ob$('awarenessSync.subscribeUpdate', id)
            .subscribe({
            next: update => {
                if (update.type === 'awareness-update') {
                    onUpdate(update.awareness, update.origin);
                }
                if (update.type === 'awareness-collect') {
                    onCollect()
                        .then(record => {
                        if (record) {
                            this.client
                                .call('awarenessSync.collect', {
                                awareness: record,
                                collectId: update.collectId,
                            })
                                .catch(err => {
                                console.error('error feedback collected awareness', err);
                            });
                        }
                    })
                        .catch(err => {
                        console.error('error collecting awareness', err);
                    });
                }
            },
        });
        return () => {
            subscription.unsubscribe();
        };
    }
}
class WorkerIndexerSync {
    constructor(client) {
        this.client = client;
    }
    search(table, query, options) {
        return this.client.call('indexerSync.search', { table, query, options });
    }
    aggregate(table, query, field, options) {
        return this.client.call('indexerSync.aggregate', {
            table,
            query,
            field: field,
            options,
        });
    }
    search$(table, query, options) {
        return this.client.ob$('indexerSync.subscribeSearch', {
            table,
            query,
            options,
        });
    }
    aggregate$(table, query, field, options) {
        return this.client.ob$('indexerSync.subscribeAggregate', {
            table,
            query,
            field: field,
            options,
        });
    }
    waitForCompleted(signal) {
        return new Promise((resolve, reject) => {
            const abortListener = () => {
                reject(signal?.reason);
                subscription.unsubscribe();
            };
            signal?.addEventListener('abort', abortListener);
            const subscription = this.client
                .ob$('indexerSync.waitForCompleted')
                .subscribe({
                complete() {
                    signal?.removeEventListener('abort', abortListener);
                    resolve();
                },
                error(err) {
                    signal?.removeEventListener('abort', abortListener);
                    reject(err);
                },
            });
        });
    }
    waitForDocCompleted(docId, signal) {
        return new Promise((resolve, reject) => {
            const abortListener = () => {
                reject(signal?.reason);
                subscription.unsubscribe();
            };
            signal?.addEventListener('abort', abortListener);
            const subscription = this.client
                .ob$('indexerSync.waitForDocCompleted', docId)
                .subscribe({
                complete() {
                    signal?.removeEventListener('abort', abortListener);
                    resolve();
                },
                error(err) {
                    signal?.removeEventListener('abort', abortListener);
                    reject(err);
                },
            });
        });
    }
    get state$() {
        return this.client.ob$('indexerSync.state');
    }
    docState$(docId) {
        return this.client.ob$('indexerSync.docState', docId);
    }
    addPriority(docId, priority) {
        const subscription = this.client
            .ob$('indexerSync.addPriority', { docId, priority })
            .subscribe();
        return () => {
            subscription.unsubscribe();
        };
    }
}
//# sourceMappingURL=client.js.map