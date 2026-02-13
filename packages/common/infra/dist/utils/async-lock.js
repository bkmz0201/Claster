export class AsyncLock {
    constructor() {
        this._lock = null;
    }
    async acquire() {
        let release = null;
        const nextLock = new Promise(resolve => {
            release = () => {
                this._lock = null;
                resolve();
            };
        });
        // Atomic check and set of lock state
        const currentLock = this._lock;
        this._lock = nextLock;
        if (currentLock) {
            await currentLock;
        }
        return {
            release: () => {
                if (release) {
                    release();
                    release = null;
                }
            },
            [Symbol.dispose]: () => {
                if (release) {
                    release();
                    release = null;
                }
            },
        };
    }
}
//# sourceMappingURL=async-lock.js.map