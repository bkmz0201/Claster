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
import { describe, expect, test } from 'vitest';
import { AsyncLock } from '../async-lock';
describe('AsyncLock', () => {
    test('should acquire and release lock', async () => {
        const lock = new AsyncLock();
        const lock1 = await lock.acquire();
        lock1.release();
    });
    test('should wait for previous lock to be released', async () => {
        const lock = new AsyncLock();
        const order = [];
        const task1 = async () => {
            const lock1 = await lock.acquire();
            order.push(1);
            await new Promise(resolve => setTimeout(resolve, 10));
            order.push(2);
            lock1.release();
        };
        const task2 = async () => {
            const lock2 = await lock.acquire();
            order.push(3);
            lock2.release();
        };
        await Promise.all([task1(), task2()]);
        expect(order).toEqual([1, 2, 3]);
    });
    test('should work with using statement', async () => {
        const lock = new AsyncLock();
        const order = [];
        const task1 = async () => {
            const env_1 = { stack: [], error: void 0, hasError: false };
            try {
                const _lock1 = __addDisposableResource(env_1, await lock.acquire(), false);
                order.push(1);
                await new Promise(resolve => setTimeout(resolve, 10));
                order.push(2);
            }
            catch (e_1) {
                env_1.error = e_1;
                env_1.hasError = true;
            }
            finally {
                __disposeResources(env_1);
            }
        };
        const task2 = async () => {
            const env_2 = { stack: [], error: void 0, hasError: false };
            try {
                const _lock2 = __addDisposableResource(env_2, await lock.acquire(), false);
                order.push(3);
            }
            catch (e_2) {
                env_2.error = e_2;
                env_2.hasError = true;
            }
            finally {
                __disposeResources(env_2);
            }
        };
        await Promise.all([task1(), task2()]);
        expect(order).toEqual([1, 2, 3]);
    });
    test('should handle multiple concurrent locks', async () => {
        const lock = new AsyncLock();
        const results = [];
        const createTask = (id, delay) => async () => {
            const env_3 = { stack: [], error: void 0, hasError: false };
            try {
                const _lockHandle = __addDisposableResource(env_3, await lock.acquire(), false);
                results.push(id);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
            catch (e_3) {
                env_3.error = e_3;
                env_3.hasError = true;
            }
            finally {
                __disposeResources(env_3);
            }
        };
        await Promise.all([
            createTask(1, 20)(),
            createTask(2, 10)(),
            createTask(3, 5)(),
        ]);
        expect(results).toEqual([1, 2, 3]);
    });
    test('should properly block after a release', async () => {
        const lock = new AsyncLock();
        const order = [];
        // First acquisition
        const lock1 = await lock.acquire();
        order.push(1);
        lock1.release();
        // These two should be properly serialized
        const task1 = async () => {
            const lock2 = await lock.acquire();
            order.push(2);
            await new Promise(resolve => setTimeout(resolve, 10));
            order.push(3);
            lock2.release();
        };
        const task2 = async () => {
            const lock3 = await lock.acquire();
            order.push(4);
            lock3.release();
        };
        await Promise.all([task1(), task2()]);
        expect(order).toEqual([1, 2, 3, 4]); // This might fail due to the bug
    });
    test('should prevent multiple releases', async () => {
        const lock = new AsyncLock();
        const handle = await lock.acquire();
        handle.release();
        // This second release should either throw or be a no-op
        handle.release();
        // The lock should still be usable
        const handle2 = await lock.acquire();
        handle2.release();
    });
});
//# sourceMappingURL=async-lock.spec.js.map