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
import EventEmitter2 from 'eventemitter2';
import { diffUpdate, encodeStateVectorFromUpdate, mergeUpdates } from 'yjs';
import { isEmptyUpdate } from '../utils/is-empty-update';
import { SingletonLocker } from './lock';
import {} from './storage';
export class DocStorageBase {
    get isReadonly() {
        return this.options.readonlyMode ?? false;
    }
    constructor(options) {
        this.options = options;
        this.event = new EventEmitter2();
        this.storageType = 'doc';
        this.locker = new SingletonLocker();
        this.spaceId = this.options.id;
    }
    async getDoc(docId) {
        const env_1 = { stack: [], error: void 0, hasError: false };
        try {
            const _lock = __addDisposableResource(env_1, this.isReadonly
                ? undefined
                : await this.lockDocForUpdate(docId), true);
            const snapshot = await this.getDocSnapshot(docId);
            const updates = await this.getDocUpdates(docId);
            if (updates.length) {
                const { timestamp, bin, editor } = await this.squash(snapshot ? [snapshot, ...updates] : updates);
                const newSnapshot = {
                    spaceId: this.spaceId,
                    docId,
                    bin,
                    timestamp,
                    editor,
                };
                // if is readonly, we will not set the new snapshot
                if (!this.isReadonly) {
                    await this.setDocSnapshot(newSnapshot, snapshot);
                    // always mark updates as merged unless throws
                    await this.markUpdatesMerged(docId, updates);
                }
                return newSnapshot;
            }
            return snapshot;
        }
        catch (e_1) {
            env_1.error = e_1;
            env_1.hasError = true;
        }
        finally {
            const result_1 = __disposeResources(env_1);
            if (result_1)
                await result_1;
        }
    }
    async getDocDiff(docId, state) {
        const doc = await this.getDoc(docId);
        if (!doc) {
            return null;
        }
        return {
            docId,
            missing: state && state.length > 0 ? diffUpdate(doc.bin, state) : doc.bin,
            state: encodeStateVectorFromUpdate(doc.bin),
            timestamp: doc.timestamp,
        };
    }
    subscribeDocUpdate(callback) {
        this.event.on('update', callback);
        return () => {
            this.event.off('update', callback);
        };
    }
    async crawlDocData(_docId) {
        return null;
    }
    on(event, callback) {
        this.event.on(event, callback);
        return () => {
            this.event.off(event, callback);
        };
    }
    emit(event, ...args) {
        this.event.emit(event, ...args);
    }
    off(event, callback) {
        this.event.off(event, callback);
    }
    /**
     * Merge doc updates into a single update.
     */
    async squash(updates) {
        const lastUpdate = updates.at(-1);
        if (!lastUpdate) {
            throw new Error('No updates to be squashed.');
        }
        // fast return
        if (updates.length === 1) {
            return lastUpdate;
        }
        const finalUpdate = await this.mergeUpdates(updates.map(u => u.bin));
        return {
            docId: lastUpdate.docId,
            bin: finalUpdate,
            timestamp: lastUpdate.timestamp,
            editor: lastUpdate.editor,
        };
    }
    mergeUpdates(updates) {
        const merge = this.options?.mergeUpdates ?? mergeUpdates;
        return merge(updates.filter(bin => !isEmptyUpdate(bin)));
    }
    async lockDocForUpdate(docId) {
        return this.locker.lock(`workspace:${this.spaceId}:update`, docId);
    }
}
//# sourceMappingURL=doc.js.map