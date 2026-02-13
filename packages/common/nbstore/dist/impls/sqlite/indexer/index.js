import { merge, Observable, of, Subject } from 'rxjs';
import { filter, throttleTime } from 'rxjs/operators';
import { share } from '../../../connection';
import { IndexerStorageBase } from '../../../storage';
import { IndexerSchema } from '../../../storage/indexer/schema';
import { fromPromise } from '../../../utils/from-promise';
import { backoffRetry, exhaustMapWithTrailing } from '../../idb/indexer/utils';
import { NativeDBConnection } from '../db';
import { createNode } from './node-builder';
import { queryRaw } from './query';
import { getText, tryParseArrayField } from './utils';
export class SqliteIndexerStorage extends IndexerStorageBase {
    static { this.identifier = 'SqliteIndexerStorage'; }
    constructor(options) {
        super();
        this.recommendRefreshInterval = 30 * 1000; // 5 seconds
        this.isReadonly = false;
        this.tableUpdate$ = new Subject();
        this.connection = share(new NativeDBConnection(options));
    }
    watchTableUpdated(table) {
        return this.tableUpdate$.asObservable().pipe(filter(t => t === table));
    }
    async search(table, query, options) {
        const match = await queryRaw(this.connection, table, query);
        // Pagination
        const limit = options?.pagination?.limit ?? 10;
        const skip = options?.pagination?.skip ?? 0;
        const ids = match.toArray();
        const pagedIds = ids.slice(skip, skip + limit);
        const nodes = [];
        for (const id of pagedIds) {
            const node = await createNode(this.connection, table, id, match.getScore(id), options ?? {}, query);
            nodes.push(node);
        }
        return {
            pagination: {
                count: ids.length,
                limit,
                skip,
                hasMore: ids.length > skip + limit,
            },
            nodes,
        };
    }
    async aggregate(table, query, field, options) {
        const match = await queryRaw(this.connection, table, query);
        const ids = match.toArray();
        const buckets = [];
        for (const id of ids) {
            const text = await this.connection.apis.ftsGetDocument(`${table}:${field}`, id);
            if (text) {
                let values = [text];
                const parsed = tryParseArrayField(text);
                if (parsed) {
                    values = parsed;
                }
                for (const val of values) {
                    let bucket = buckets.find(b => b.key === val);
                    if (!bucket) {
                        bucket = { key: val, count: 0, score: 0 };
                        if (options?.hits) {
                            bucket.hits = {
                                pagination: { count: 0, limit: 0, skip: 0, hasMore: false },
                                nodes: [],
                            };
                        }
                        buckets.push(bucket);
                    }
                    bucket.count++;
                    if (options?.hits) {
                        const hitLimit = options.hits.pagination?.limit ?? 3;
                        if (bucket.hits.nodes.length < hitLimit) {
                            const node = await createNode(this.connection, table, id, match.getScore(id), options.hits, query);
                            bucket.hits.nodes.push(node);
                            bucket.hits.pagination.count++;
                        }
                    }
                }
            }
        }
        return {
            pagination: {
                count: buckets.length,
                limit: 0,
                skip: 0,
                hasMore: false,
            },
            buckets,
        };
    }
    search$(table, query, options) {
        return merge(of(1), this.watchTableUpdated(table)).pipe(throttleTime(3000, undefined, { leading: true, trailing: true }), exhaustMapWithTrailing(() => {
            return fromPromise(async () => {
                return await this.search(table, query, options);
            }).pipe(backoffRetry());
        }));
    }
    aggregate$(table, query, field, options) {
        return merge(of(1), this.watchTableUpdated(table)).pipe(throttleTime(3000, undefined, { leading: true, trailing: true }), exhaustMapWithTrailing(() => {
            return fromPromise(async () => {
                return await this.aggregate(table, query, field, options);
            }).pipe(backoffRetry());
        }));
    }
    async deleteByQuery(table, query) {
        const match = await queryRaw(this.connection, table, query);
        const ids = match.toArray();
        for (const id of ids) {
            await this.delete(table, id);
        }
    }
    async insert(table, document) {
        const schema = IndexerSchema[table];
        for (const [field, values] of document.fields) {
            const fieldSchema = schema[field];
            // @ts-expect-error
            const shouldIndex = fieldSchema.index !== false;
            // @ts-expect-error
            const shouldStore = fieldSchema.store !== false;
            if (!shouldStore && !shouldIndex)
                continue;
            const text = getText(values);
            if (typeof text === 'string') {
                await this.connection.apis.ftsAddDocument(`${table}:${field}`, document.id, text, shouldIndex);
            }
        }
        this.tableUpdate$.next(table);
    }
    async delete(table, id) {
        const schema = IndexerSchema[table];
        for (const field of Object.keys(schema)) {
            await this.connection.apis.ftsDeleteDocument(`${table}:${field}`, id);
        }
        this.tableUpdate$.next(table);
    }
    async update(table, document) {
        // Update is essentially insert (overwrite)
        return this.insert(table, document);
    }
    async refresh(_table) {
        // No-op for memory index
    }
    async refreshIfNeed() {
        await this.connection.apis.ftsFlushIndex();
    }
}
//# sourceMappingURL=index.js.map