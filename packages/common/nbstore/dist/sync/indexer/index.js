import { readAllDocsFromRootDoc } from '@affine/reader';
import { omit } from 'lodash-es';
import { filter, first, lastValueFrom, Observable, ReplaySubject, share, Subject, switchMap, throttleTime, } from 'rxjs';
import { applyUpdate, Doc as YDoc } from 'yjs';
import { IndexerDocument, } from '../../storage';
import { DummyIndexerStorage } from '../../storage/dummy/indexer';
import { AsyncPriorityQueue } from '../../utils/async-priority-queue';
import { fromPromise } from '../../utils/from-promise';
import { takeUntilAbort } from '../../utils/take-until-abort';
import { MANUALLY_STOP, throwIfAborted } from '../../utils/throw-if-aborted';
import { crawlingDocData } from './crawler';
export class IndexerSyncImpl {
    docState$(docId) {
        return this.status.docState$(docId).pipe(
        // throttle the state to 1 second to avoid spamming the UI
        throttleTime(1000, undefined, { leading: true, trailing: true }));
    }
    async waitForCompleted(signal) {
        await lastValueFrom(this.status.state$.pipe(filter(state => state.completed), takeUntilAbort(signal), first()));
    }
    async waitForDocCompleted(docId, signal) {
        await lastValueFrom(this.status.docState$(docId).pipe(filter(state => state.completed), takeUntilAbort(signal), first()));
    }
    constructor(doc, peers, indexerSync) {
        this.doc = doc;
        this.peers = peers;
        this.indexerSync = indexerSync;
        /**
         * increase this number to re-index all docs
         */
        this.INDEXER_VERSION = 2;
        this.abort = null;
        this.rootDocId = this.doc.spaceId;
        this.status = new IndexerSyncStatus(this.rootDocId);
        this.lastRefreshed = Date.now();
        this.state$ = this.status.state$.pipe(
        // throttle the state to 1 second to avoid spamming the UI
        throttleTime(1000, undefined, {
            leading: true,
            trailing: true,
        }));
        // sync feature only works on local indexer
        this.indexer = this.peers.local;
        this.remote = Object.values(this.peers.remotes).find(remote => !!remote);
    }
    enableBatterySaveMode() {
        this.status.enableBatterySaveMode();
    }
    disableBatterySaveMode() {
        this.status.disableBatterySaveMode();
    }
    pauseSync() {
        this.status.pauseSync();
    }
    resumeSync() {
        this.status.resumeSync();
    }
    start() {
        if (this.abort) {
            this.abort.abort(MANUALLY_STOP);
        }
        const abort = new AbortController();
        this.abort = abort;
        this.mainLoop(abort.signal).catch(error => {
            if (error === MANUALLY_STOP) {
                return;
            }
            console.error('index error', error);
        });
    }
    stop() {
        this.abort?.abort(MANUALLY_STOP);
        this.abort = null;
    }
    addPriority(id, priority) {
        return this.status.addPriority(id, priority);
    }
    async mainLoop(signal) {
        if (this.indexer.isReadonly) {
            this.status.isReadonly = true;
            this.status.statusUpdatedSubject$.next(true);
            return;
        }
        while (true) {
            try {
                await this.retryLoop(signal);
            }
            catch (error) {
                if (signal?.aborted) {
                    return;
                }
                console.error('index error, retry in 5s', error);
                this.status.errorMessage =
                    error instanceof Error ? error.message : `${error}`;
                this.status.statusUpdatedSubject$.next(true);
            }
            finally {
                // reset all status
                this.status.reset();
                // wait for 5s before next retry
                await Promise.race([
                    new Promise(resolve => {
                        setTimeout(resolve, 5000);
                    }),
                    new Promise((_, reject) => {
                        // exit if manually stopped
                        if (signal?.aborted) {
                            reject(signal.reason);
                        }
                        signal?.addEventListener('abort', () => {
                            reject(signal.reason);
                        });
                    }),
                ]);
            }
        }
    }
    async retryLoop(signal) {
        await Promise.race([
            Promise.all([
                this.doc.connection.waitForConnected(signal),
                this.indexer.connection.waitForConnected(signal),
                this.indexerSync.connection.waitForConnected(signal),
            ]),
            new Promise((_, reject) => {
                setTimeout(() => {
                    reject(new Error('Connect to remote timeout'));
                }, 1000 * 30);
            }),
            new Promise((_, reject) => {
                signal?.addEventListener('abort', reason => {
                    reject(reason);
                });
            }),
        ]);
        this.status.errorMessage = null;
        this.status.statusUpdatedSubject$.next(true);
        console.log('indexer sync start');
        const unsubscribe = this.doc.subscribeDocUpdate(update => {
            if (!this.status.rootDocReady) {
                return;
            }
            if (update.docId === this.rootDocId) {
                applyUpdate(this.status.rootDoc, update.bin);
                const allDocs = this.getAllDocsFromRootDoc();
                for (const [docId, { title }] of allDocs) {
                    const existingDoc = this.status.docsInRootDoc.get(docId);
                    if (!existingDoc) {
                        this.status.scheduleJob(docId);
                        this.status.docsInRootDoc.set(docId, { title });
                        this.status.statusUpdatedSubject$.next(docId);
                    }
                    else {
                        if (existingDoc.title !== title) {
                            this.status.docsInRootDoc.set(docId, { title });
                            this.status.statusUpdatedSubject$.next(docId);
                        }
                    }
                }
                for (const docId of this.status.docsInRootDoc.keys()) {
                    if (!allDocs.has(docId)) {
                        this.status.docsInRootDoc.delete(docId);
                        this.status.statusUpdatedSubject$.next(docId);
                    }
                }
                this.status.scheduleJob(this.rootDocId);
            }
            else {
                const docId = update.docId;
                const existingDoc = this.status.docsInRootDoc.get(docId);
                if (existingDoc) {
                    this.status.scheduleJob(docId);
                }
            }
        });
        try {
            const rootDocBin = (await this.doc.getDoc(this.rootDocId))?.bin;
            if (rootDocBin) {
                applyUpdate(this.status.rootDoc, rootDocBin);
            }
            this.status.scheduleJob(this.rootDocId);
            const allDocs = this.getAllDocsFromRootDoc();
            this.status.docsInRootDoc = allDocs;
            this.status.statusUpdatedSubject$.next(true);
            for (const docId of allDocs.keys()) {
                this.status.scheduleJob(docId);
            }
            this.status.rootDocReady = true;
            this.status.statusUpdatedSubject$.next(true);
            const allIndexedDocs = await this.getAllDocsFromIndexer();
            this.status.docsInIndexer = allIndexedDocs;
            this.status.statusUpdatedSubject$.next(true);
            while (true) {
                throwIfAborted(signal);
                const docId = await this.status.acceptJob(signal);
                if (docId === this.rootDocId) {
                    console.log('[indexer] start indexing root doc', docId);
                    // #region crawl root doc
                    for (const [docId, { title }] of this.status.docsInRootDoc) {
                        const existingDoc = this.status.docsInIndexer.get(docId);
                        if (existingDoc) {
                            if (existingDoc.title !== title) {
                                // need update
                                await this.indexer.update('doc', IndexerDocument.from(docId, {
                                    docId,
                                    title,
                                }));
                                this.status.docsInIndexer.set(docId, { title });
                                this.status.statusUpdatedSubject$.next(docId);
                            }
                        }
                        else {
                            // need add
                            await this.indexer.insert('doc', IndexerDocument.from(docId, {
                                docId,
                                title,
                            }));
                            this.status.docsInIndexer.set(docId, { title });
                            this.status.statusUpdatedSubject$.next(docId);
                        }
                    }
                    for (const docId of this.status.docsInIndexer.keys()) {
                        if (!this.status.docsInRootDoc.has(docId)) {
                            await this.indexer.delete('doc', docId);
                            await this.indexer.deleteByQuery('block', {
                                type: 'match',
                                field: 'docId',
                                match: docId,
                            });
                            await this.indexerSync.clearDocIndexedClock(docId);
                            this.status.docsInIndexer.delete(docId);
                            this.status.statusUpdatedSubject$.next(docId);
                        }
                    }
                    await this.refreshIfNeed();
                    // #endregion
                }
                else {
                    // #region crawl doc
                    const existingDoc = this.status.docsInIndexer.get(docId);
                    if (!existingDoc) {
                        // doc is deleted, just skip
                        continue;
                    }
                    const docClock = await this.doc.getDocTimestamp(docId);
                    if (!docClock) {
                        // doc is deleted, just skip
                        continue;
                    }
                    const docIndexedClock = await this.indexerSync.getDocIndexedClock(docId);
                    if (docIndexedClock &&
                        docIndexedClock.timestamp.getTime() ===
                            docClock.timestamp.getTime() &&
                        docIndexedClock.indexerVersion === this.INDEXER_VERSION) {
                        // doc is already indexed, just skip
                        continue;
                    }
                    console.log('[indexer] start indexing doc', docId);
                    let blocks = [];
                    let preview;
                    const nativeResult = await this.tryNativeCrawlDocData(docId);
                    if (nativeResult) {
                        blocks = nativeResult.block;
                        preview = nativeResult.summary;
                    }
                    else {
                        const docBin = await this.doc.getDoc(docId);
                        if (!docBin) {
                            // doc is deleted, just skip
                            continue;
                        }
                        const docYDoc = new YDoc({ guid: docId });
                        applyUpdate(docYDoc, docBin.bin);
                        try {
                            const result = await crawlingDocData({
                                ydoc: docYDoc,
                                rootYDoc: this.status.rootDoc,
                                spaceId: this.status.rootDocId,
                                docId,
                            });
                            if (!result) {
                                // doc is empty without root block, just skip
                                continue;
                            }
                            blocks = result.blocks;
                            preview = result.preview;
                        }
                        catch (error) {
                            console.error('error crawling doc', error);
                        }
                    }
                    await this.indexer.deleteByQuery('block', {
                        type: 'match',
                        field: 'docId',
                        match: docId,
                    });
                    for (const block of blocks) {
                        await this.indexer.insert('block', block);
                    }
                    if (preview) {
                        await this.indexer.update('doc', IndexerDocument.from(docId, {
                            summary: preview,
                        }));
                    }
                    await this.refreshIfNeed();
                    await this.indexerSync.setDocIndexedClock({
                        docId,
                        timestamp: docClock.timestamp,
                        indexerVersion: this.INDEXER_VERSION,
                    });
                    // #endregion
                }
                console.log('[indexer] complete job', docId);
                await this.refreshIfNeed();
                this.status.completeJob();
            }
        }
        finally {
            await this.refreshIfNeed();
            unsubscribe();
        }
    }
    // ensure the indexer is refreshed according to recommendRefreshInterval
    // recommendRefreshInterval <= 0 means force refresh on each operation
    // recommendRefreshInterval > 0 means refresh if the last refresh is older than recommendRefreshInterval
    async refreshIfNeed() {
        const recommendRefreshInterval = this.indexer.recommendRefreshInterval ?? 0;
        const needRefresh = recommendRefreshInterval > 0 &&
            this.lastRefreshed + recommendRefreshInterval < Date.now();
        const forceRefresh = recommendRefreshInterval <= 0;
        if (needRefresh || forceRefresh) {
            await this.indexer.refreshIfNeed();
            this.lastRefreshed = Date.now();
        }
    }
    /**
     * Get all docs from the root doc, without deleted docs
     */
    getAllDocsFromRootDoc() {
        return readAllDocsFromRootDoc(this.status.rootDoc, {
            includeTrash: false,
        });
    }
    async tryNativeCrawlDocData(docId) {
        try {
            const result = await this.doc.crawlDocData?.(docId);
            if (result) {
                return {
                    title: result.title,
                    block: result.blocks.map(block => IndexerDocument.from(`${docId}:${block.blockId}`, {
                        docId,
                        blockId: block.blockId,
                        content: block.content,
                        flavour: block.flavour,
                        blob: block.blob,
                        refDocId: block.refDocId,
                        ref: block.refInfo,
                        parentFlavour: block.parentFlavour,
                        parentBlockId: block.parentBlockId,
                        additional: block.additional,
                    })),
                    summary: result.summary,
                };
            }
            return null;
        }
        catch (error) {
            console.warn('[indexer] native crawlDocData failed', docId, error);
            return null;
        }
    }
    async getAllDocsFromIndexer() {
        const docs = await this.indexer.search('doc', {
            type: 'all',
        }, {
            pagination: {
                limit: Infinity,
            },
            fields: ['docId', 'title'],
        });
        return new Map(docs.nodes.map(node => {
            const title = node.fields.title;
            return [
                node.id,
                {
                    title: typeof title === 'string' ? title : title.at(0),
                },
            ];
        }));
    }
    async search(table, query, options) {
        if (options?.prefer === 'remote' &&
            this.remote &&
            !(this.remote instanceof DummyIndexerStorage)) {
            await this.remote.connection.waitForConnected();
            return await this.remote.search(table, query, omit(options, 'prefer'));
        }
        else {
            await this.indexer.connection.waitForConnected();
            return await this.indexer.search(table, query, omit(options, 'prefer'));
        }
    }
    async aggregate(table, query, field, options) {
        if (options?.prefer === 'remote' &&
            this.remote &&
            !(this.remote instanceof DummyIndexerStorage)) {
            await this.remote.connection.waitForConnected();
            return await this.remote.aggregate(table, query, field, omit(options, 'prefer'));
        }
        else {
            await this.indexer.connection.waitForConnected();
            return await this.indexer.aggregate(table, query, field, omit(options, 'prefer'));
        }
    }
    search$(table, query, options) {
        if (options?.prefer === 'remote' &&
            this.remote &&
            !(this.remote instanceof DummyIndexerStorage)) {
            const remote = this.remote;
            return fromPromise(signal => remote.connection.waitForConnected(signal)).pipe(switchMap(() => remote.search$(table, query, omit(options, 'prefer'))));
        }
        else {
            return fromPromise(signal => this.indexer.connection.waitForConnected(signal)).pipe(switchMap(() => this.indexer.search$(table, query, omit(options, 'prefer'))));
        }
    }
    aggregate$(table, query, field, options) {
        if (options?.prefer === 'remote' &&
            this.remote &&
            !(this.remote instanceof DummyIndexerStorage)) {
            const remote = this.remote;
            return fromPromise(signal => remote.connection.waitForConnected(signal)).pipe(switchMap(() => remote.aggregate$(table, query, field, omit(options, 'prefer'))));
        }
        else {
            return fromPromise(signal => this.indexer.connection.waitForConnected(signal)).pipe(switchMap(() => this.indexer.aggregate$(table, query, field, omit(options, 'prefer'))));
        }
    }
}
class IndexerSyncStatus {
    docState$(docId) {
        return new Observable(subscribe => {
            const next = () => {
                if (this.isReadonly) {
                    subscribe.next({
                        indexing: false,
                        completed: true,
                    });
                }
                else {
                    subscribe.next({
                        indexing: this.jobs.has(docId),
                        completed: this.docsInIndexer.has(docId) && !this.jobs.has(docId),
                    });
                }
            };
            next();
            const dispose = this.statusUpdatedSubject$.subscribe(updatedDocId => {
                if (updatedDocId === docId || updatedDocId === true) {
                    next();
                }
            });
            return () => {
                dispose.unsubscribe();
            };
        }).pipe(share({
            connector: () => new ReplaySubject(1),
        }));
    }
    constructor(rootDocId) {
        this.rootDocId = rootDocId;
        this.isReadonly = false;
        this.prioritySettings = new Map();
        this.jobs = new AsyncPriorityQueue();
        this.rootDoc = new YDoc({ guid: this.rootDocId });
        this.rootDocReady = false;
        this.docsInIndexer = new Map();
        this.docsInRootDoc = new Map();
        this.currentJob = null;
        this.errorMessage = null;
        this.statusUpdatedSubject$ = new Subject();
        this.paused = null;
        this.batterySaveMode = false;
        this.state$ = new Observable(subscribe => {
            const next = () => {
                if (this.isReadonly) {
                    subscribe.next({
                        indexing: 0,
                        total: 0,
                        errorMessage: this.errorMessage,
                        completed: true,
                        batterySaveMode: this.batterySaveMode,
                        paused: this.paused !== null,
                    });
                }
                else {
                    subscribe.next({
                        indexing: this.jobs.length() + (this.currentJob ? 1 : 0),
                        total: this.docsInRootDoc.size + 1,
                        errorMessage: this.errorMessage,
                        completed: this.rootDocReady && this.jobs.length() === 0,
                        batterySaveMode: this.batterySaveMode,
                        paused: this.paused !== null,
                    });
                }
            };
            next();
            const dispose = this.statusUpdatedSubject$.subscribe(() => {
                next();
            });
            return () => {
                dispose.unsubscribe();
            };
        }).pipe(share({
            connector: () => new ReplaySubject(1),
        }));
        this.prioritySettings.set(this.rootDocId, Infinity);
    }
    scheduleJob(docId) {
        const priority = this.prioritySettings.get(docId) ?? 0;
        this.jobs.push(docId, priority);
        this.statusUpdatedSubject$.next(docId);
    }
    async acceptJob(abort) {
        if (this.paused) {
            await this.paused.promise;
        }
        const job = await this.jobs.asyncPop(
        // if battery save mode is enabled, only accept jobs with priority > 1; otherwise accept all jobs
        this.batterySaveMode ? 1 : undefined, abort);
        this.currentJob = job;
        this.statusUpdatedSubject$.next(job);
        return job;
    }
    completeJob() {
        const job = this.currentJob;
        this.currentJob = null;
        this.statusUpdatedSubject$.next(job ?? true);
    }
    addPriority(id, priority) {
        const oldPriority = this.prioritySettings.get(id) ?? 0;
        this.prioritySettings.set(id, priority);
        this.jobs.setPriority(id, oldPriority + priority);
        return () => {
            const currentPriority = this.prioritySettings.get(id) ?? 0;
            this.prioritySettings.set(id, currentPriority - priority);
            this.jobs.setPriority(id, currentPriority - priority);
        };
    }
    enableBatterySaveMode() {
        if (this.batterySaveMode) {
            return;
        }
        this.batterySaveMode = true;
        this.statusUpdatedSubject$.next(true);
    }
    disableBatterySaveMode() {
        if (!this.batterySaveMode) {
            return;
        }
        this.batterySaveMode = false;
        this.statusUpdatedSubject$.next(true);
    }
    pauseSync() {
        if (this.paused) {
            return;
        }
        this.paused = Promise.withResolvers();
        this.statusUpdatedSubject$.next(true);
    }
    resumeSync() {
        if (!this.paused) {
            return;
        }
        this.paused.resolve();
        this.paused = null;
        this.statusUpdatedSubject$.next(true);
    }
    reset() {
        // reset all state, except prioritySettings
        this.isReadonly = false;
        this.jobs.clear();
        this.docsInRootDoc.clear();
        this.docsInIndexer.clear();
        this.rootDoc = new YDoc();
        this.rootDocReady = false;
        this.currentJob = null;
        this.batterySaveMode = false;
        this.paused = null;
        this.statusUpdatedSubject$.next(true);
    }
}
//# sourceMappingURL=index.js.map