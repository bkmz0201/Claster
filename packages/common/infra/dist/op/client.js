import { merge } from 'lodash-es';
import { Observable } from 'rxjs';
import { AutoMessageHandler, fetchTransferables, } from './message';
export class OpClient extends AutoMessageHandler {
    constructor(port, options = {}) {
        super(port);
        this.callIds = new Map();
        this.pendingCalls = new Map();
        this.obs = new Map();
        this.options = {
            timeout: Infinity,
        };
        this.handleReturnMessage = msg => {
            const pending = this.pendingCalls.get(msg.id);
            if (!pending) {
                return;
            }
            if ('error' in msg) {
                pending.reject(Object.assign(new Error(), msg.error));
            }
            else {
                pending.resolve(msg.data);
            }
            clearTimeout(pending.timeout);
            this.pendingCalls.delete(msg.id);
        };
        this.handleSubscriptionNextMessage = msg => {
            const ob = this.obs.get(msg.id);
            if (!ob) {
                return;
            }
            ob.next(msg.data);
        };
        this.handleSubscriptionErrorMessage = msg => {
            const ob = this.obs.get(msg.id);
            if (!ob) {
                return;
            }
            ob.error(Object.assign(new Error(), msg.error));
        };
        this.handleSubscriptionCompleteMessage = msg => {
            const ob = this.obs.get(msg.id);
            if (!ob) {
                return;
            }
            ob.complete();
        };
        merge(this.options, options);
    }
    get handlers() {
        return {
            return: this.handleReturnMessage,
            next: this.handleSubscriptionNextMessage,
            error: this.handleSubscriptionErrorMessage,
            complete: this.handleSubscriptionCompleteMessage,
        };
    }
    nextCallId(op) {
        let id = this.callIds.get(op) ?? 0;
        id++;
        this.callIds.set(op, id);
        return `${op}:${id}`;
    }
    currentCallId(op) {
        return this.callIds.get(op) ?? 0;
    }
    call(op, ...args) {
        const promiseWithResolvers = Promise.withResolvers();
        const abortSignal = args[args.length - 1] instanceof AbortSignal
            ? args.pop()
            : undefined;
        const payload = args.pop();
        const msg = {
            type: 'call',
            id: this.nextCallId(op),
            name: op,
            payload,
        };
        const promise = promiseWithResolvers.promise;
        const raise = (reason) => {
            const pending = this.pendingCalls.get(msg.id);
            if (!pending) {
                return;
            }
            this.port.postMessage({
                type: 'cancel',
                id: msg.id,
            });
            promiseWithResolvers.reject(reason);
            clearTimeout(pending.timeout);
            this.pendingCalls.delete(msg.id);
        };
        abortSignal?.addEventListener('abort', () => {
            raise(abortSignal.reason);
        });
        promise.cancel = () => {
            raise('canceled');
        };
        const timeout = this.options.timeout === Infinity
            ? 0
            : setTimeout(() => {
                raise('timeout');
            }, this.options.timeout);
        const transferables = fetchTransferables(payload);
        this.port.postMessage(msg, { transfer: transferables });
        this.pendingCalls.set(msg.id, {
            ...promiseWithResolvers,
            timeout,
            id: msg.id,
        });
        return promise;
    }
    ob$(op, ...args) {
        const sub$ = new Observable(ob => {
            const payload = args[0];
            const msg = {
                type: 'subscribe',
                id: this.nextCallId(op),
                name: op,
                payload,
            };
            const transferables = fetchTransferables(payload);
            this.port.postMessage(msg, { transfer: transferables });
            this.obs.set(msg.id, ob);
            return () => {
                ob.complete();
                this.obs.delete(msg.id);
                this.port.postMessage({
                    type: 'unsubscribe',
                    id: msg.id,
                });
            };
        });
        return sub$;
    }
    destroy() {
        super.close();
        this.pendingCalls.forEach(call => {
            call.reject(new Error('client destroyed'));
        });
        this.pendingCalls.clear();
        this.obs.forEach(ob => {
            ob.complete();
        });
        this.obs.clear();
    }
}
//# sourceMappingURL=client.js.map