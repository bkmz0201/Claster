import { merge, Observable, of, Subject, throttleTime } from 'rxjs';
import { share } from '../../../connection';
import { IndexerStorageBase } from '../../../storage';
import { fromPromise } from '../../../utils/from-promise';
import { IDBConnection } from '../db';
import { DataStruct } from './data-struct';
import { backoffRetry, exhaustMapWithTrailing } from './utils';
export class IndexedDBIndexerStorage extends IndexerStorageBase {
    static { this.identifier = 'IndexedDBIndexerStorage'; }
    get channel() {
        return this.connection.inner.channel;
    }
    get database() {
        return this.connection.inner.db;
    }
    constructor(options) {
        super();
        this.options = options;
        this.recommendRefreshInterval = 0; // force refresh on each indexer operation
        this.connection = share(new IDBConnection(this.options));
        this.isReadonly = false;
        this.data = new DataStruct();
        this.tableUpdate$ = new Subject();
        /**
         * The write operations of IndexedDBIndexerStorage are first cached in pendingUpdates,
         * and then committed to IndexedDB in a batch through the refresh method.
         */
        this.pendingUpdates = {
            doc: { deleteByQueries: [], deletes: [], inserts: [], updates: [] },
            block: { deleteByQueries: [], deletes: [], inserts: [], updates: [] },
        };
    }
    async search(table, query, options) {
        const trx = await this.data.readonly(this.database);
        return this.data.search(trx, table, query, options);
    }
    async aggregate(table, query, field, options) {
        const trx = await this.data.readonly(this.database);
        return this.data.aggregate(trx, table, query, field, options);
    }
    search$(table, query, options) {
        return merge(of(1), this.watchTableUpdated(table)).pipe(throttleTime(3000, undefined, { leading: true, trailing: true }), exhaustMapWithTrailing(() => {
            return fromPromise(async () => {
                try {
                    const trx = await this.data.readonly(this.database);
                    return await this.data.search(trx, table, query, options);
                }
                catch (error) {
                    console.error('search error', error);
                    throw error;
                }
            }).pipe(backoffRetry());
        }));
    }
    aggregate$(table, query, field, options) {
        return merge(of(1), this.watchTableUpdated(table)).pipe(throttleTime(3000, undefined, { leading: true, trailing: true }), exhaustMapWithTrailing(() => {
            return fromPromise(async () => {
                try {
                    const trx = await this.data.readonly(this.database);
                    return await this.data.aggregate(trx, table, query, field, options);
                }
                catch (error) {
                    console.error('aggregate error', error);
                    throw error;
                }
            }).pipe(backoffRetry());
        }));
    }
    async deleteByQuery(table, query) {
        this.pendingUpdates[table].deleteByQueries.push(query);
    }
    insert(table, document) {
        this.pendingUpdates[table].inserts.push(document);
        return Promise.resolve();
    }
    delete(table, id) {
        this.pendingUpdates[table].deletes.push(id);
        return Promise.resolve();
    }
    update(table, document) {
        this.pendingUpdates[table].updates.push(document);
        return Promise.resolve();
    }
    async refresh(table) {
        const trx = await this.data.readwrite(this.database);
        const tables = table ? [table] : ['doc', 'block'];
        for (const table of tables) {
            await this.data.batchWrite(trx, table, this.pendingUpdates[table].deleteByQueries, this.pendingUpdates[table].deletes, this.pendingUpdates[table].inserts, this.pendingUpdates[table].updates);
            this.pendingUpdates[table] = {
                deleteByQueries: [],
                deletes: [],
                inserts: [],
                updates: [],
            };
        }
        this.emitTableUpdated(table);
    }
    async refreshIfNeed() {
        const needRefreshTable = Object.entries(this.pendingUpdates)
            .filter(([, updates]) => updates.deleteByQueries.length > 0 ||
            updates.deletes.length > 0 ||
            updates.inserts.length > 0 ||
            updates.updates.length > 0)
            .map(([table]) => table);
        for (const table of needRefreshTable) {
            await this.refresh(table);
        }
    }
    watchTableUpdated(table) {
        return new Observable(subscriber => {
            const listener = (ev) => {
                if (ev.data.type === 'indexer-updated' && ev.data.table === table) {
                    subscriber.next(1);
                }
            };
            const subscription = this.tableUpdate$.subscribe(updatedTable => {
                if (updatedTable === table) {
                    subscriber.next(1);
                }
            });
            this.channel.addEventListener('message', listener);
            return () => {
                this.channel.removeEventListener('message', listener);
                subscription.unsubscribe();
            };
        });
    }
    emitTableUpdated(table) {
        this.tableUpdate$.next(table);
        this.channel.postMessage({ type: 'indexer-updated', table });
    }
}
//# sourceMappingURL=index.js.map