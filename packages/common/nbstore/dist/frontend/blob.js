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
import { SingletonLocker } from '../storage/lock';
export class BlobFrontend {
    constructor(storage, sync) {
        this.storage = storage;
        this.sync = sync;
        // Since 'set' and 'get' operations may be called in rapid succession, we use a lock mechanism
        // to ensure that 'get' requests for the same blob are paused when a 'set' operation is in progress.
        this.lock = new SingletonLocker();
    }
    get state$() {
        return this.sync.state$;
    }
    blobState$(blobId) {
        return this.sync.blobState$(blobId);
    }
    async get(blobId) {
        const env_1 = { stack: [], error: void 0, hasError: false };
        try {
            await this.waitForConnected();
            const lock = __addDisposableResource(env_1, await this.lock.lock('blob', blobId), true);
            const local = await this.storage.get(blobId);
            if (local) {
                return local;
            }
            await lock[Symbol.asyncDispose]();
            await this.sync.downloadBlob(blobId).catch(() => {
                // ignore the error as it has already been recorded in the sync status
            });
            return await this.storage.get(blobId);
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
    async set(blob) {
        const env_2 = { stack: [], error: void 0, hasError: false };
        try {
            await this.waitForConnected();
            const lock = __addDisposableResource(env_2, await this.lock.lock('blob', blob.key), true);
            await this.storage.set(blob);
            await lock[Symbol.asyncDispose]();
            // We don't wait for the upload to complete,
            // as the upload process runs asynchronously in the background
            this.sync.uploadBlob(blob, true /* force upload */).catch(() => {
                // ignore the error as it has already been recorded in the sync status
            });
            return;
        }
        catch (e_2) {
            env_2.error = e_2;
            env_2.hasError = true;
        }
        finally {
            const result_2 = __disposeResources(env_2);
            if (result_2)
                await result_2;
        }
    }
    /**
     * Uploads a blob to the peer. Do nothing if the blob has already been uploaded.
     *
     * @returns Always resolves to true when successful
     *
     * @throws This method will throw an error if the blob is not found locally, if the upload is aborted, or if it fails due to storage limitations.
     */
    async upload(blobIdOrRecord) {
        await this.waitForConnected();
        const blob = typeof blobIdOrRecord === 'string'
            ? await this.storage.get(blobIdOrRecord)
            : blobIdOrRecord;
        if (!blob) {
            throw new Error(`Blob ${blobIdOrRecord} not found`);
        }
        return this.sync.uploadBlob(blob, false);
    }
    fullDownload(peerId, signal) {
        return this.sync.fullDownload(peerId, signal);
    }
    waitForConnected(signal) {
        return this.storage.connection.waitForConnected(signal);
    }
}
//# sourceMappingURL=blob.js.map