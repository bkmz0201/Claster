import { PriorityQueue } from './priority-queue';
export class AsyncPriorityQueue extends PriorityQueue {
    constructor() {
        super(...arguments);
        this._resolveUpdate = null;
        this._waitForUpdate = null;
    }
    async asyncPop(minimumPriority, abort) {
        const update = this.pop(minimumPriority);
        if (update) {
            return update;
        }
        else {
            if (!this._waitForUpdate) {
                this._waitForUpdate = new Promise(resolve => {
                    this._resolveUpdate = resolve;
                });
            }
            await Promise.race([
                this._waitForUpdate,
                new Promise((_, reject) => {
                    if (abort?.aborted) {
                        reject(abort?.reason);
                    }
                    abort?.addEventListener('abort', () => {
                        reject(abort.reason);
                    });
                }),
            ]);
            return this.asyncPop(minimumPriority, abort);
        }
    }
    push(id, priority = 0) {
        super.push(id, priority);
        if (this._resolveUpdate) {
            const resolve = this._resolveUpdate;
            this._resolveUpdate = null;
            this._waitForUpdate = null;
            resolve();
        }
    }
}
//# sourceMappingURL=async-priority-queue.js.map