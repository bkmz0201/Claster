export class SingletonLocker {
    constructor() {
        this.lockedResource = new Map();
    }
    async lock(domain, resource) {
        const key = `${domain}:${resource}`;
        let lock = this.lockedResource.get(key);
        if (!lock) {
            lock = new Lock();
            this.lockedResource.set(key, lock);
        }
        await lock.acquire();
        return lock;
    }
}
export class Lock {
    constructor() {
        this.inner = Promise.resolve();
        this.release = () => { };
    }
    async acquire() {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        let release = null;
        const nextLock = new Promise(resolve => {
            release = resolve;
        });
        await this.inner;
        this.inner = nextLock;
        this.release = release;
    }
    [Symbol.asyncDispose]() {
        this.release();
        return Promise.resolve();
    }
}
//# sourceMappingURL=lock.js.map