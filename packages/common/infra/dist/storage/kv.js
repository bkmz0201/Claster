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
import { AsyncLock } from '../utils';
export class MemoryByteKV {
    constructor(db = new Map()) {
        this.db = db;
        this.lock = new AsyncLock();
    }
    async transaction(cb) {
        const env_1 = { stack: [], error: void 0, hasError: false };
        try {
            const _lock = __addDisposableResource(env_1, await this.lock.acquire(), false);
            return await cb({
                get: async (key) => {
                    return this.db.get(key) ?? null;
                },
                set: async (key, value) => {
                    this.db.set(key, value);
                },
                keys: async () => {
                    return Array.from(this.db.keys());
                },
                del: async (key) => {
                    this.db.delete(key);
                },
                clear: async () => {
                    this.db.clear();
                },
            });
        }
        catch (e_1) {
            env_1.error = e_1;
            env_1.hasError = true;
        }
        finally {
            __disposeResources(env_1);
        }
    }
    get(key) {
        return this.transaction(async (tx) => tx.get(key));
    }
    set(key, value) {
        return this.transaction(async (tx) => tx.set(key, value));
    }
    keys() {
        return this.transaction(async (tx) => tx.keys());
    }
    clear() {
        return this.transaction(async (tx) => tx.clear());
    }
    del(key) {
        return this.transaction(async (tx) => tx.del(key));
    }
}
export class ReadonlyByteKV extends MemoryByteKV {
    transaction(cb) {
        return super.transaction(tx => {
            return cb({
                ...tx,
                set() {
                    return Promise.resolve();
                },
                del() {
                    return Promise.resolve();
                },
                clear() {
                    return Promise.resolve();
                },
            });
        });
    }
    set(_key, _value) {
        return Promise.resolve();
    }
    del(_key) {
        return Promise.resolve();
    }
    clear() {
        return Promise.resolve();
    }
}
//# sourceMappingURL=kv.js.map