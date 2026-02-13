import { OpConsumer } from '@toeverything/infra/op';
import { Observable } from 'rxjs';
import {} from '../impls';
import { SpaceStorage } from '../storage';
import { Sync } from '../sync';
import { MANUALLY_STOP } from '../utils/throw-if-aborted';
class StoreConsumer {
    get ensureLocal() {
        if (!this.storages) {
            throw new Error('Not initialized');
        }
        return this.storages.local;
    }
    get ensureSync() {
        if (!this.sync) {
            throw new Error('Sync not initialized');
        }
        return this.sync;
    }
    get docStorage() {
        return this.ensureLocal.get('doc');
    }
    get docSync() {
        return this.ensureSync.doc;
    }
    get blobStorage() {
        return this.ensureLocal.get('blob');
    }
    get blobSync() {
        return this.ensureSync.blob;
    }
    get docSyncStorage() {
        return this.ensureLocal.get('docSync');
    }
    get awarenessStorage() {
        return this.ensureLocal.get('awareness');
    }
    get awarenessSync() {
        return this.ensureSync.awareness;
    }
    get indexerStorage() {
        return this.ensureLocal.get('indexer');
    }
    get indexerSync() {
        return this.ensureSync.indexer;
    }
    constructor(availableStorageImplementations, init) {
        this.availableStorageImplementations = availableStorageImplementations;
        this.ENABLE_BATTERY_SAVE_MODE_DELAY = 1000;
        this.syncPauseTimeout = null;
        this.syncPaused = false;
        this.storages = {
            local: new SpaceStorage(Object.fromEntries(Object.entries(init.local).map(([type, opt]) => {
                if (opt === undefined) {
                    return [type, undefined];
                }
                const Storage = this.availableStorageImplementations.find(impl => impl.identifier === opt.name);
                if (!Storage) {
                    throw new Error(`Storage implementation ${opt.name} not found`);
                }
                return [type, new Storage(opt.opts)];
            }))),
            remotes: Object.fromEntries(Object.entries(init.remotes).map(([peer, opts]) => {
                return [
                    peer,
                    new SpaceStorage(Object.fromEntries(Object.entries(opts).map(([type, opt]) => {
                        if (opt === undefined) {
                            return [type, undefined];
                        }
                        const Storage = this.availableStorageImplementations.find(impl => impl.identifier === opt.name);
                        if (!Storage) {
                            throw new Error(`Storage implementation ${opt.name} not found`);
                        }
                        return [type, new Storage(opt.opts)];
                    }))),
                ];
            })),
        };
        this.sync = new Sync(this.storages);
        this.storages.local.connect();
        for (const remote of Object.values(this.storages.remotes)) {
            remote.connect();
        }
        this.sync.start();
    }
    bindConsumer(consumer) {
        this.registerHandlers(consumer);
    }
    async destroy() {
        this.sync?.stop();
        this.storages?.local.disconnect();
        await this.storages?.local.destroy();
        for (const remote of Object.values(this.storages?.remotes ?? {})) {
            remote.disconnect();
            await remote.destroy();
        }
    }
    pauseSync() {
        if (this.syncPauseTimeout || this.syncPaused) {
            return;
        }
        this.syncPauseTimeout = setTimeout(() => {
            if (!this.syncPaused) {
                this.indexerSync.pauseSync();
                this.syncPaused = true;
                console.log('[IndexerSync] paused');
            }
        }, this.ENABLE_BATTERY_SAVE_MODE_DELAY);
    }
    resumeSync() {
        if (this.syncPauseTimeout) {
            clearTimeout(this.syncPauseTimeout);
            this.syncPauseTimeout = null;
        }
        if (this.syncPaused) {
            this.indexerSync.resumeSync();
            this.syncPaused = false;
            console.log('[IndexerSync] resumed');
        }
    }
    enableBatterySaveMode() {
        console.log('[IndexerSync] enable battery save mode');
        this.indexerSync.enableBatterySaveMode();
    }
    disableBatterySaveMode() {
        console.log('[IndexerSync] disable battery save mode');
        this.indexerSync.disableBatterySaveMode();
    }
    registerHandlers(consumer) {
        const collectJobs = new Map();
        let collectId = 0;
        consumer.registerAll({
            'docStorage.getDoc': (docId) => this.docStorage.getDoc(docId),
            'docStorage.getDocDiff': ({ docId, state }) => this.docStorage.getDocDiff(docId, state),
            'docStorage.pushDocUpdate': ({ update, origin }) => this.docStorage.pushDocUpdate(update, origin),
            'docStorage.getDocTimestamps': after => this.docStorage.getDocTimestamps(after ?? undefined),
            'docStorage.getDocTimestamp': docId => this.docStorage.getDocTimestamp(docId),
            'docStorage.deleteDoc': (docId) => this.docStorage.deleteDoc(docId),
            'docStorage.subscribeDocUpdate': () => new Observable(subscriber => {
                return this.docStorage.subscribeDocUpdate((update, origin) => {
                    subscriber.next({ update, origin });
                });
            }),
            'docStorage.waitForConnected': (_, ctx) => this.docStorage.connection.waitForConnected(ctx.signal),
            'blobStorage.getBlob': key => this.blobStorage.get(key),
            'blobStorage.setBlob': blob => this.blobStorage.set(blob),
            'blobStorage.deleteBlob': ({ key, permanently }) => this.blobStorage.delete(key, permanently),
            'blobStorage.releaseBlobs': () => this.blobStorage.release(),
            'blobStorage.listBlobs': () => this.blobStorage.list(),
            'blobStorage.waitForConnected': (_, ctx) => this.blobStorage.connection.waitForConnected(ctx.signal),
            'awarenessStorage.update': ({ awareness, origin }) => this.awarenessStorage.update(awareness, origin),
            'awarenessStorage.subscribeUpdate': docId => new Observable(subscriber => {
                return this.awarenessStorage.subscribeUpdate(docId, (update, origin) => {
                    subscriber.next({
                        type: 'awareness-update',
                        awareness: update,
                        origin,
                    });
                }, () => {
                    const currentCollectId = collectId++;
                    const promise = new Promise(resolve => {
                        collectJobs.set(currentCollectId.toString(), awareness => {
                            resolve(awareness);
                            collectJobs.delete(currentCollectId.toString());
                        });
                    });
                    return promise;
                });
            }),
            'awarenessStorage.collect': ({ collectId, awareness }) => collectJobs.get(collectId)?.(awareness),
            'awarenessStorage.waitForConnected': (_, ctx) => this.awarenessStorage.connection.waitForConnected(ctx.signal),
            'docSync.state': () => this.docSync.state$,
            'docSync.docState': docId => new Observable(subscriber => {
                const subscription = this.docSync
                    .docState$(docId)
                    .subscribe(state => {
                    subscriber.next(state);
                });
                return () => subscription.unsubscribe();
            }),
            'docSync.addPriority': ({ docId, priority }) => new Observable(() => {
                const undo = this.docSync.addPriority(docId, priority);
                return () => undo();
            }),
            'docSync.waitForSynced': (docId, ctx) => this.docSync.waitForSynced(docId ?? undefined, ctx.signal),
            'docSync.resetSync': () => this.docSync.resetSync(),
            'blobSync.state': () => this.blobSync.state$,
            'blobSync.blobState': blobId => this.blobSync.blobState$(blobId),
            'blobSync.downloadBlob': key => this.blobSync.downloadBlob(key),
            'blobSync.uploadBlob': ({ blob, force }) => this.blobSync.uploadBlob(blob, force),
            'blobSync.fullDownload': peerId => new Observable(subscriber => {
                const abortController = new AbortController();
                this.blobSync
                    .fullDownload(peerId ?? undefined, abortController.signal)
                    .then(() => {
                    subscriber.next();
                    subscriber.complete();
                })
                    .catch(error => {
                    subscriber.error(error);
                });
                return () => abortController.abort(MANUALLY_STOP);
            }),
            'awarenessSync.update': ({ awareness, origin }) => this.awarenessSync.update(awareness, origin),
            'awarenessSync.subscribeUpdate': docId => new Observable(subscriber => {
                return this.awarenessSync.subscribeUpdate(docId, (update, origin) => {
                    subscriber.next({
                        type: 'awareness-update',
                        awareness: update,
                        origin,
                    });
                }, () => {
                    const currentCollectId = collectId++;
                    const promise = new Promise(resolve => {
                        collectJobs.set(currentCollectId.toString(), awareness => {
                            resolve(awareness);
                            collectJobs.delete(currentCollectId.toString());
                        });
                    });
                    subscriber.next({
                        type: 'awareness-collect',
                        collectId: currentCollectId.toString(),
                    });
                    return promise;
                });
            }),
            'awarenessSync.collect': ({ collectId, awareness }) => collectJobs.get(collectId)?.(awareness),
            'indexerSync.state': () => this.indexerSync.state$,
            'indexerSync.docState': (docId) => this.indexerSync.docState$(docId),
            'indexerSync.addPriority': ({ docId, priority }) => new Observable(() => {
                const undo = this.indexerSync.addPriority(docId, priority);
                return () => undo();
            }),
            'indexerSync.waitForCompleted': (_, ctx) => this.indexerSync.waitForCompleted(ctx.signal),
            'indexerSync.waitForDocCompleted': (docId, ctx) => this.indexerSync.waitForDocCompleted(docId, ctx.signal),
            'indexerSync.aggregate': ({ table, query, field, options }) => this.indexerSync.aggregate(table, query, field, options),
            'indexerSync.search': ({ table, query, options }) => this.indexerSync.search(table, query, options),
            'indexerSync.subscribeSearch': ({ table, query, options }) => this.indexerSync.search$(table, query, options),
            'indexerSync.subscribeAggregate': ({ table, query, field, options }) => this.indexerSync.aggregate$(table, query, field, options),
            'sync.enableBatterySaveMode': () => this.enableBatterySaveMode(),
            'sync.disableBatterySaveMode': () => this.disableBatterySaveMode(),
            'sync.pauseSync': () => this.pauseSync(),
            'sync.resumeSync': () => this.resumeSync(),
        });
    }
}
export class StoreManagerConsumer {
    constructor(availableStorageImplementations) {
        this.availableStorageImplementations = availableStorageImplementations;
        this.storeDisposers = new Map();
        this.storePool = new Map();
    }
    bindConsumer(consumer) {
        this.registerHandlers(consumer);
    }
    registerHandlers(consumer) {
        consumer.registerAll({
            open: ({ port, key, closeKey, options }) => {
                console.debug('open store', key, closeKey);
                let storeRef = this.storePool.get(key);
                if (!storeRef) {
                    const store = new StoreConsumer(this.availableStorageImplementations, options);
                    storeRef = { store, refCount: 0 };
                }
                storeRef.refCount++;
                const workerConsumer = new OpConsumer(port);
                storeRef.store.bindConsumer(workerConsumer);
                this.storeDisposers.set(closeKey, () => {
                    storeRef.refCount--;
                    if (storeRef.refCount === 0) {
                        storeRef.store.destroy().catch(error => {
                            console.error(error);
                        });
                        this.storePool.delete(key);
                    }
                });
                this.storePool.set(key, storeRef);
                return closeKey;
            },
            close: key => {
                console.debug('close store', key);
                const workerDisposer = this.storeDisposers.get(key);
                if (!workerDisposer) {
                    throw new Error('Worker not found');
                }
                workerDisposer();
                this.storeDisposers.delete(key);
            },
        });
    }
}
//# sourceMappingURL=consumer.js.map