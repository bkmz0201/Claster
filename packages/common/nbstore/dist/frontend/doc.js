import { groupBy } from 'lodash-es';
import { nanoid } from 'nanoid';
import { combineLatest, filter, first, lastValueFrom, map, Observable, ReplaySubject, share, Subject, throttleTime, } from 'rxjs';
import { applyUpdate, encodeStateAsUpdate, Map as YMap, mergeUpdates, } from 'yjs';
import { AsyncPriorityQueue } from '../utils/async-priority-queue';
import { isEmptyUpdate } from '../utils/is-empty-update';
import { takeUntilAbort } from '../utils/take-until-abort';
import { MANUALLY_STOP, throwIfAborted } from '../utils/throw-if-aborted';
const NBSTORE_ORIGIN = 'nbstore-frontend';
export class DocFrontend {
    constructor(storage, sync, options = {}) {
        this.storage = storage;
        this.sync = sync;
        this.options = options;
        this.uniqueId = `frontend:${nanoid()}`;
        this.prioritySettings = new Map();
        this.status = {
            docs: new Map(),
            connectedDocs: new Set(),
            readyDocs: new Set(),
            jobDocQueue: new AsyncPriorityQueue(),
            jobMap: new Map(),
            currentJob: null,
        };
        this.statusUpdatedSubject$ = new Subject();
        this.abort = new AbortController();
        this._state$ = combineLatest([
            new Observable(subscriber => {
                const next = () => {
                    subscriber.next({
                        total: this.status.docs.size,
                        loaded: this.status.connectedDocs.size,
                        updating: this.status.jobMap.size > 0 || this.status.currentJob !== null,
                    });
                };
                next();
                return this.statusUpdatedSubject$.subscribe(() => {
                    next();
                });
            }),
            this.sync.state$,
        ]).pipe(map(([frontend, sync]) => ({
            total: sync.total ?? frontend.total,
            loaded: frontend.loaded,
            updating: frontend.updating,
            syncing: sync.syncing,
            synced: sync.synced,
            syncRetrying: sync.retrying,
            syncErrorMessage: sync.errorMessage,
        })), share({
            connector: () => new ReplaySubject(1),
        }));
        this.state$ = this._state$.pipe(throttleTime(1000, undefined, {
            leading: true,
            trailing: true,
        }));
        this.jobs = {
            load: async (job, signal) => {
                const doc = this.status.docs.get(job.docId);
                if (!doc) {
                    return;
                }
                const existingData = encodeStateAsUpdate(doc);
                if (!isEmptyUpdate(existingData)) {
                    this.schedule({
                        type: 'save',
                        docId: doc.guid,
                        update: existingData,
                    });
                }
                // mark doc as loaded
                doc.emit('sync', [true, doc]);
                const docRecord = await this.storage.getDoc(job.docId);
                throwIfAborted(signal);
                if (docRecord && !isEmptyUpdate(docRecord.bin)) {
                    this.applyUpdate(job.docId, docRecord.bin);
                    this.status.readyDocs.add(job.docId);
                }
                this.status.connectedDocs.add(job.docId);
                this.statusUpdatedSubject$.next(job.docId);
            },
            save: async (docId, jobs, signal) => {
                if (!this.status.docs.has(docId)) {
                    return;
                }
                if (this.status.connectedDocs.has(docId)) {
                    const merged = await this.mergeUpdates(jobs.map(j => j.update).filter(update => !isEmptyUpdate(update)));
                    throwIfAborted(signal);
                    await this.storage.pushDocUpdate({
                        docId,
                        bin: merged,
                    }, this.uniqueId);
                }
            },
            apply: async (job, signal) => {
                throwIfAborted(signal);
                if (!this.status.docs.has(job.docId)) {
                    return;
                }
                if (this.status.connectedDocs.has(job.docId)) {
                    this.applyUpdate(job.docId, job.update);
                }
                if (!isEmptyUpdate(job.update)) {
                    this.status.readyDocs.add(job.docId);
                    this.statusUpdatedSubject$.next(job.docId);
                }
            },
        };
        this.event = {
            onStorageUpdate: (update, origin) => {
                if (origin !== this.uniqueId) {
                    this.schedule({
                        type: 'apply',
                        docId: update.docId,
                        update: update.bin,
                    });
                }
            },
        };
        this.isApplyingUpdate = false;
        this.handleDocUpdate = (update, origin, doc, transaction) => {
            if (origin === NBSTORE_ORIGIN) {
                return;
            }
            if (this.isApplyingUpdate && BUILD_CONFIG.debug) {
                let changedList = '';
                for (const [changed, keys] of transaction.changed) {
                    for (const key of keys) {
                        if (changed instanceof YMap && key) {
                            changedList += `${key} => ${changed.get(key)}\n`;
                        }
                    }
                }
                console.warn(`⚠️ When nbstore applies a remote update, some code triggers a local change to the doc.
This will causes the document's 'edited by' to become the current user, even if the user has not actually modified the document.
This is usually caused by a coding error and needs to be fixed by the developer.
Changed:
${changedList}
`);
            }
            if (!this.status.docs.has(doc.guid)) {
                return;
            }
            this.schedule({
                type: 'save',
                docId: doc.guid,
                update,
            });
        };
    }
    _docState$(docId) {
        const frontendState$ = new Observable(subscribe => {
            const next = () => {
                subscribe.next({
                    ready: this.status.readyDocs.has(docId),
                    loaded: this.status.connectedDocs.has(docId),
                    updating: (this.status.jobMap.get(docId)?.length ?? 0) > 0 ||
                        this.status.currentJob?.docId === docId,
                });
            };
            next();
            return this.statusUpdatedSubject$.subscribe(updatedId => {
                if (updatedId === docId)
                    next();
            });
        });
        const syncState$ = this.sync.docState$(docId);
        return combineLatest([frontendState$, syncState$]).pipe(map(([frontend, sync]) => ({
            ...frontend,
            synced: sync.synced,
            syncing: sync.syncing,
            syncRetrying: sync.retrying,
            syncErrorMessage: sync.errorMessage,
        })));
    }
    docState$(docId) {
        return this._docState$(docId).pipe(throttleTime(1000, undefined, {
            trailing: true,
            leading: true,
        }));
    }
    start() {
        if (this.abort.signal.aborted) {
            throw new Error('doc frontend can only start once');
        }
        this.mainLoop(this.abort.signal).catch(error => {
            console.error(error);
        });
    }
    stop() {
        this.abort.abort(MANUALLY_STOP);
    }
    async mainLoop(signal) {
        await this.storage.connection.waitForConnected(signal);
        const dispose = this.storage.subscribeDocUpdate((record, origin) => {
            this.event.onStorageUpdate(record, origin);
        });
        try {
            // wait for storage to connect
            await Promise.race([
                this.storage.connection.waitForConnected(signal),
                new Promise((_, reject) => {
                    signal?.addEventListener('abort', reason => {
                        reject(reason);
                    });
                }),
            ]);
            while (true) {
                throwIfAborted(signal);
                const docId = await this.status.jobDocQueue.asyncPop(undefined, signal);
                const jobs = this.status.jobMap.get(docId);
                this.status.jobMap.delete(docId);
                if (!jobs) {
                    this.statusUpdatedSubject$.next(docId);
                    continue;
                }
                this.status.currentJob = { docId, jobs };
                this.statusUpdatedSubject$.next(docId);
                const { apply, load, save } = groupBy(jobs, job => job.type);
                if (load?.length) {
                    await this.jobs.load(load[0], signal);
                }
                for (const applyJob of apply ?? []) {
                    await this.jobs.apply(applyJob, signal);
                }
                if (save?.length) {
                    await this.jobs.save(docId, save, signal);
                }
                this.status.currentJob = null;
                this.statusUpdatedSubject$.next(docId);
            }
        }
        finally {
            dispose();
        }
    }
    /**
     * Connect a doc to the frontend, the doc will sync with the doc storage.
     * @param doc - The doc to connect
     */
    connectDoc(doc) {
        this._connectDoc(doc);
    }
    /**
     * Disconnect a doc from the frontend, the doc will stop syncing with the doc storage.
     * It's not recommended to use this method directly, better to use `doc.destroy()`.
     *
     * @param doc - The doc to disconnect
     */
    disconnectDoc(doc) {
        this.status.docs.delete(doc.guid);
        this.status.connectedDocs.delete(doc.guid);
        this.status.readyDocs.delete(doc.guid);
        this.status.jobDocQueue.remove(doc.guid);
        this.status.jobMap.delete(doc.guid);
        this.statusUpdatedSubject$.next(doc.guid);
        doc.off('update', this.handleDocUpdate);
    }
    addPriority(id, priority) {
        const undoSyncPriority = this.sync?.addPriority(id, priority);
        const oldPriority = this.prioritySettings.get(id) ?? 0;
        this.prioritySettings.set(id, priority);
        this.status.jobDocQueue.setPriority(id, oldPriority + priority);
        return () => {
            const currentPriority = this.prioritySettings.get(id) ?? 0;
            this.prioritySettings.set(id, currentPriority - priority);
            this.status.jobDocQueue.setPriority(id, currentPriority - priority);
            undoSyncPriority?.();
        };
    }
    _connectDoc(doc) {
        if (this.status.docs.has(doc.guid)) {
            throw new Error('doc already connected');
        }
        this.schedule({
            type: 'load',
            docId: doc.guid,
        });
        this.status.docs.set(doc.guid, doc);
        this.statusUpdatedSubject$.next(doc.guid);
        doc.on('update', this.handleDocUpdate);
        doc.on('destroy', () => {
            this.disconnectDoc(doc);
        });
    }
    schedule(job) {
        const priority = this.prioritySettings.get(job.docId) ?? 0;
        this.status.jobDocQueue.push(job.docId, priority);
        const existingJobs = this.status.jobMap.get(job.docId) ?? [];
        existingJobs.push(job);
        this.status.jobMap.set(job.docId, existingJobs);
        this.statusUpdatedSubject$.next(job.docId);
    }
    applyUpdate(docId, update) {
        const doc = this.status.docs.get(docId);
        if (doc && !isEmptyUpdate(update)) {
            try {
                this.isApplyingUpdate = true;
                applyUpdate(doc, update, NBSTORE_ORIGIN);
            }
            catch (err) {
                console.error('failed to apply update yjs doc', err);
            }
            finally {
                this.isApplyingUpdate = false;
            }
        }
    }
    mergeUpdates(updates) {
        const merge = this.options?.mergeUpdates ?? mergeUpdates;
        return merge(updates.filter(bin => !isEmptyUpdate(bin)));
    }
    async waitForUpdated(docId, abort) {
        const source$ = docId
            ? this._docState$(docId)
            : this._state$;
        await lastValueFrom(source$.pipe(filter(status => !status.updating), takeUntilAbort(abort), first()));
        return;
    }
    async waitForDocLoaded(docId, abort) {
        await lastValueFrom(this._docState$(docId).pipe(filter(state => state.loaded), takeUntilAbort(abort), first()));
    }
    async waitForSynced(docId, abort) {
        await this.waitForUpdated(docId, abort);
        await this.sync.waitForSynced(docId, abort);
    }
    async waitForDocReady(docId, abort) {
        await lastValueFrom(this._docState$(docId).pipe(filter(state => state.ready), takeUntilAbort(abort), first()));
    }
    async resetSync() {
        await this.sync.resetSync();
    }
}
//# sourceMappingURL=doc.js.map