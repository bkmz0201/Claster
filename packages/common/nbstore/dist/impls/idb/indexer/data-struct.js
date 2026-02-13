var __addDisposableResource = (this && this.__addDisposableResource) || function (env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose, inner;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
            if (async) inner = dispose;
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        if (inner) dispose = function() { try { inner.call(this); } catch (e) { return Promise.reject(e); } };
        env.stack.push({ value: value, dispose: dispose, async: async });
    }
    else if (async) {
        env.stack.push({ async: true });
    }
    return value;
};
var __disposeResources = (this && this.__disposeResources) || (function (SuppressedError) {
    return function (env) {
        function fail(e) {
            env.error = env.hasError ? new SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
            env.hasError = true;
        }
        var r, s = 0;
        function next() {
            while (r = env.stack.pop()) {
                try {
                    if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
                    if (r.dispose) {
                        var result = r.dispose.call(r.value);
                        if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
                    }
                    else s |= 1;
                }
                catch (e) {
                    fail(e);
                }
            }
            if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
            if (env.hasError) throw env.error;
        }
        return next();
    };
})(typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
import {} from 'idb';
import { IndexerSchema, } from '../../../storage';
import { shallowEqual } from '../../../utils/shallow-equal';
import { highlighter } from './highlighter';
import { BooleanInvertedIndex, FullTextInvertedIndex, IntegerInvertedIndex, StringInvertedIndex, } from './inverted-index';
import { Match } from './match';
let debugMarkCount = 0;
export class DataStruct {
    constructor() {
        this.database = null;
        this.invertedIndex = new Map();
        for (const [tableName, table] of Object.entries(IndexerSchema)) {
            const tableInvertedIndex = new Map();
            for (const [fieldName, type] of Object.entries(table)) {
                const typeInfo = typeof type === 'string' ? { type } : type;
                if ('index' in typeInfo && typeInfo.index === false) {
                    // If index is false, we don't need to create an inverted index for this field.
                    continue;
                }
                if (typeInfo.type === 'String') {
                    tableInvertedIndex.set(fieldName, new StringInvertedIndex(tableName, fieldName));
                }
                else if (typeInfo.type === 'Integer') {
                    tableInvertedIndex.set(fieldName, new IntegerInvertedIndex(tableName, fieldName));
                }
                else if (typeInfo.type === 'FullText') {
                    tableInvertedIndex.set(fieldName, new FullTextInvertedIndex(tableName, fieldName));
                }
                else if (typeInfo.type === 'Boolean') {
                    tableInvertedIndex.set(fieldName, new BooleanInvertedIndex(tableName, fieldName));
                }
                else {
                    throw new Error(`Field type '${typeInfo.type}' not supported`);
                }
            }
            this.invertedIndex.set(tableName, tableInvertedIndex);
        }
    }
    async update(trx, table, document) {
        const env_1 = { stack: [], error: void 0, hasError: false };
        try {
            const _ = __addDisposableResource(env_1, await this.measure(`update`), false);
            const existsNid = await trx
                .objectStore('indexerRecords')
                .index('id')
                .getKey([table, document.id]);
            const exists = existsNid
                ? await trx.objectStore('indexerRecords').get(existsNid)
                : null;
            if (!existsNid || !exists) {
                // if not exists, return
                return;
            }
            // delete exists one
            await this.deleteByNid(trx, existsNid);
            const dataMap = new Map([...exists.data, ...document.fields]); // merge exists data with new data
            const nid = await trx
                .objectStore('indexerRecords')
                .put({ table, id: document.id, data: dataMap });
            for (const [key, values] of dataMap) {
                const type = IndexerSchema[table][key];
                if (!type) {
                    continue;
                }
                const typeInfo = typeof type === 'string' ? { type } : type;
                if (typeInfo.index !== false) {
                    const env_2 = { stack: [], error: void 0, hasError: false };
                    try {
                        // If index is false, the field will not be indexed
                        const iidx = this.invertedIndex.get(table)?.get(key);
                        if (!iidx) {
                            continue;
                        }
                        const _ = __addDisposableResource(env_2, await this.measure(`insert[${typeInfo.type}]`), false);
                        await iidx.insert(trx, nid, values);
                    }
                    catch (e_1) {
                        env_2.error = e_1;
                        env_2.hasError = true;
                    }
                    finally {
                        __disposeResources(env_2);
                    }
                }
            }
        }
        catch (e_2) {
            env_1.error = e_2;
            env_1.hasError = true;
        }
        finally {
            __disposeResources(env_1);
        }
    }
    async insert(trx, table, document) {
        const env_3 = { stack: [], error: void 0, hasError: false };
        try {
            const _ = __addDisposableResource(env_3, await this.measure(`insert`), false);
            const existsNid = await trx
                .objectStore('indexerRecords')
                .index('id')
                .getKey([table, document.id]);
            if (existsNid) {
                // delete exists one
                await this.deleteByNid(trx, existsNid);
            }
            const dataMap = document.fields;
            const nid = await trx
                .objectStore('indexerRecords')
                .put({ table, id: document.id, data: dataMap });
            for (const [key, values] of dataMap) {
                const type = IndexerSchema[table][key];
                if (!type) {
                    continue;
                }
                const typeInfo = typeof type === 'string' ? { type } : type;
                if (typeInfo.index !== false) {
                    const env_4 = { stack: [], error: void 0, hasError: false };
                    try {
                        // If index is false, the field will not be indexed
                        const iidx = this.invertedIndex.get(table)?.get(key);
                        if (!iidx) {
                            continue;
                        }
                        const _ = __addDisposableResource(env_4, await this.measure(`insert[${typeInfo.type}]`), false);
                        await iidx.insert(trx, nid, values);
                    }
                    catch (e_3) {
                        env_4.error = e_3;
                        env_4.hasError = true;
                    }
                    finally {
                        __disposeResources(env_4);
                    }
                }
            }
        }
        catch (e_4) {
            env_3.error = e_4;
            env_3.hasError = true;
        }
        finally {
            __disposeResources(env_3);
        }
    }
    async deleteByNid(trx, nid) {
        await trx.objectStore('indexerRecords').delete(nid);
        const indexIds = await trx
            .objectStore('invertedIndex')
            .index('nid')
            .getAllKeys(nid);
        await Promise.all(indexIds.map(indexId => trx.objectStore('invertedIndex').delete(indexId)));
    }
    async delete(trx, table, id) {
        const env_5 = { stack: [], error: void 0, hasError: false };
        try {
            const _ = __addDisposableResource(env_5, await this.measure(`delete`), false);
            const nid = await trx
                .objectStore('indexerRecords')
                .index('id')
                .getKey([table, id]);
            if (nid) {
                await this.deleteByNid(trx, nid);
            }
            else {
                return;
            }
        }
        catch (e_5) {
            env_5.error = e_5;
            env_5.hasError = true;
        }
        finally {
            __disposeResources(env_5);
        }
    }
    async deleteByQuery(trx, table, query) {
        const env_6 = { stack: [], error: void 0, hasError: false };
        try {
            const _ = __addDisposableResource(env_6, await this.measure(`deleteByQuery`), false);
            const match = await this.queryRaw(trx, table, query);
            for (const nid of match.scores.keys()) {
                await this.deleteByNid(trx, nid);
            }
        }
        catch (e_6) {
            env_6.error = e_6;
            env_6.hasError = true;
        }
        finally {
            __disposeResources(env_6);
        }
    }
    async batchWrite(trx, table, deleteByQueries, deletes, inserts, updates) {
        const env_7 = { stack: [], error: void 0, hasError: false };
        try {
            const _ = __addDisposableResource(env_7, await this.measure(`batchWrite`), false);
            for (const query of deleteByQueries) {
                await this.deleteByQuery(trx, table, query);
            }
            for (const del of deletes) {
                await this.delete(trx, table, del);
            }
            for (const inst of inserts) {
                await this.insert(trx, table, inst);
            }
            for (const update of updates) {
                await this.update(trx, table, update);
            }
        }
        catch (e_7) {
            env_7.error = e_7;
            env_7.hasError = true;
        }
        finally {
            __disposeResources(env_7);
        }
    }
    async matchAll(trx, table) {
        const allNids = await trx
            .objectStore('indexerRecords')
            .index('table')
            .getAllKeys(table);
        const match = new Match();
        for (const nid of allNids) {
            match.addScore(nid, 1);
        }
        return match;
    }
    async queryRaw(trx, table, query, cache = new QueryCache()) {
        const cached = cache.get(query);
        if (cached) {
            return cached;
        }
        const result = await (async () => {
            const env_8 = { stack: [], error: void 0, hasError: false };
            try {
                const _ = __addDisposableResource(env_8, await this.measure(`query[${query.type}]`), false);
                if (query.type === 'match') {
                    const iidx = this.invertedIndex.get(table)?.get(query.field);
                    if (!iidx) {
                        return new Match();
                    }
                    return await iidx.match(trx, query.match);
                }
                else if (query.type === 'boolean') {
                    const weights = [];
                    for (const q of query.queries) {
                        weights.push(await this.queryRaw(trx, table, q, cache));
                    }
                    if (query.occur === 'must') {
                        return weights.reduce((acc, w) => acc.and(w));
                    }
                    else if (query.occur === 'must_not') {
                        const total = weights.reduce((acc, w) => acc.and(w));
                        return (await this.matchAll(trx, table)).exclude(total);
                    }
                    else if (query.occur === 'should') {
                        return weights.reduce((acc, w) => acc.or(w));
                    }
                }
                else if (query.type === 'all') {
                    return await this.matchAll(trx, table);
                }
                else if (query.type === 'boost') {
                    return (await this.queryRaw(trx, table, query.query, cache)).boost(query.boost);
                }
                else if (query.type === 'exists') {
                    const iidx = this.invertedIndex.get(table)?.get(query.field);
                    if (!iidx) {
                        return new Match();
                    }
                    return await iidx.all(trx);
                }
                throw new Error(`Query type '${query.type}' not supported`);
            }
            catch (e_8) {
                env_8.error = e_8;
                env_8.hasError = true;
            }
            finally {
                __disposeResources(env_8);
            }
        })();
        cache.set(query, result);
        return result;
    }
    async clear(trx) {
        await trx.objectStore('indexerRecords').clear();
        await trx.objectStore('invertedIndex').clear();
        await trx.objectStore('indexerMetadata').clear();
    }
    async search(trx, table, query, options = {}) {
        const pagination = {
            skip: options.pagination?.skip ?? 0,
            limit: options.pagination?.limit ?? 100,
        };
        const match = await this.queryRaw(trx, table, query);
        const nids = match
            .toArray()
            .slice(pagination.skip, pagination.skip + pagination.limit);
        const nodes = [];
        for (const nid of nids) {
            const record = await trx.objectStore('indexerRecords').get(nid);
            if (!record) {
                continue;
            }
            nodes.push(this.resultNode(record, options, match, nid));
        }
        return {
            pagination: {
                count: match.size(),
                hasMore: match.size() > pagination.limit + pagination.skip,
                limit: pagination.limit,
                skip: pagination.skip,
            },
            nodes: nodes,
        };
    }
    async aggregate(trx, table, query, field, options = {}) {
        const pagination = {
            skip: options.pagination?.skip ?? 0,
            limit: options.pagination?.limit ?? 100,
        };
        const hitPagination = options.hits
            ? {
                skip: options.hits.pagination?.skip ?? 0,
                limit: options.hits.pagination?.limit ?? 3,
            }
            : { skip: 0, limit: 0 };
        const match = await this.queryRaw(trx, table, query);
        const nids = match.toArray();
        const buckets = [];
        for (const nid of nids) {
            const record = await trx.objectStore('indexerRecords').get(nid);
            if (!record) {
                continue;
            }
            const values = record.data.get(field);
            for (const value of values ?? []) {
                let bucket;
                let bucketIndex = buckets.findIndex(b => b.key === value);
                if (bucketIndex === -1) {
                    bucket = { key: value, nids: [], hits: [] };
                    buckets.push(bucket);
                    bucketIndex = buckets.length - 1;
                }
                else {
                    bucket = buckets[bucketIndex];
                }
                if (bucketIndex >= pagination.skip &&
                    bucketIndex < pagination.skip + pagination.limit) {
                    bucket.nids.push(nid);
                    if (bucket.nids.length - 1 >= hitPagination.skip &&
                        bucket.nids.length - 1 < hitPagination.skip + hitPagination.limit) {
                        bucket.hits.push(this.resultNode(record, options.hits ?? {}, match, nid));
                    }
                }
            }
        }
        return {
            buckets: buckets
                .slice(pagination.skip, pagination.skip + pagination.limit)
                .map(bucket => {
                const result = {
                    key: bucket.key,
                    score: match.getScore(bucket.nids[0]),
                    count: bucket.nids.length,
                };
                if (options.hits) {
                    result.hits = {
                        pagination: {
                            count: bucket.nids.length,
                            hasMore: bucket.nids.length > hitPagination.limit + hitPagination.skip,
                            limit: hitPagination.limit,
                            skip: hitPagination.skip,
                        },
                        nodes: bucket.hits,
                    };
                }
                return result;
            }),
            pagination: {
                count: buckets.length,
                hasMore: buckets.length > pagination.limit + pagination.skip,
                limit: pagination.limit,
                skip: pagination.skip,
            },
        };
    }
    async readonly(database) {
        return database.transaction(['indexerRecords', 'invertedIndex', 'indexerMetadata'], 'readonly', { durability: 'relaxed' });
    }
    async readwrite(database) {
        return database.transaction(['indexerRecords', 'invertedIndex', 'indexerMetadata'], 'readwrite', { durability: 'relaxed' });
    }
    resultNode(record, options, match, nid) {
        const node = {
            id: record.id,
            score: match && nid ? match.getScore(nid) : 1,
        };
        if (options.fields) {
            const fields = {};
            for (const field of options.fields) {
                fields[field] = record.data.get(field) ?? [''];
                if (fields[field].length === 1) {
                    fields[field] = fields[field][0];
                }
            }
            node.fields = fields;
        }
        if (match && nid && options.highlights) {
            const highlights = {};
            for (const { field, before, end } of options.highlights) {
                const highlightValues = match.getHighlighters(nid, field);
                if (highlightValues) {
                    const rawValues = record.data.get(field) ?? [];
                    highlights[field] = Array.from(highlightValues)
                        .map(([index, ranges]) => {
                        const raw = rawValues[index];
                        if (raw) {
                            return (highlighter(raw, before, end, ranges, {
                                maxPrefix: 20,
                                maxLength: 50,
                            }) ?? '');
                        }
                        return '';
                    })
                        .filter(Boolean);
                }
            }
            node.highlights = highlights;
        }
        return node;
    }
    async measure(name) {
        const count = debugMarkCount++;
        performance.mark(`${name}Start(${count})`);
        return {
            [Symbol.dispose]: () => {
                performance.mark(`${name}End(${count})`);
                performance.measure(`${name}`, `${name}Start(${count})`, `${name}End(${count})`);
            },
        };
    }
}
class QueryCache {
    constructor() {
        this.cache = [];
    }
    get(query) {
        return this.cache.find(q => shallowEqual(q[0], query))?.[1];
    }
    set(query, match) {
        this.cache.push([query, match]);
    }
}
//# sourceMappingURL=data-struct.js.map