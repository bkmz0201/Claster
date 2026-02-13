import EventEmitter2 from 'eventemitter2';
import { pick } from 'lodash-es';
import { defer, from, fromEvent, Observable, of, take, takeUntil } from 'rxjs';
import { MANUALLY_STOP } from '../utils';
import { AutoMessageHandler, fetchTransferables, } from './message';
export class OpConsumer extends AutoMessageHandler {
    constructor() {
        super(...arguments);
        this.eventBus = new EventEmitter2();
        this.registeredOpHandlers = new Map();
        this.processing = new Map();
        this.handleCallMessage = msg => {
            const abortController = new AbortController();
            this.processing.set(msg.id, abortController);
            this.eventBus.emit(`before:${msg.name}`, msg.payload);
            this.ob$(msg, abortController.signal)
                .pipe(take(1))
                .subscribe({
                next: data => {
                    this.eventBus.emit(`after:${msg.name}`, msg.payload, data);
                    const transferables = fetchTransferables(data);
                    this.port.postMessage({
                        type: 'return',
                        id: msg.id,
                        data,
                    }, { transfer: transferables });
                },
                error: error => {
                    this.port.postMessage({
                        type: 'return',
                        id: msg.id,
                        error: pick(error, [
                            'name',
                            'message',
                            'code',
                            'type',
                            'status',
                            'data',
                            'stacktrace',
                        ]),
                    });
                },
                complete: () => {
                    this.processing.delete(msg.id);
                },
            });
        };
        this.handleSubscribeMessage = msg => {
            const abortController = new AbortController();
            this.processing.set(msg.id, abortController);
            this.ob$(msg, abortController.signal).subscribe({
                next: data => {
                    const transferables = fetchTransferables(data);
                    this.port.postMessage({
                        type: 'next',
                        id: msg.id,
                        data,
                    }, { transfer: transferables });
                },
                error: error => {
                    this.port.postMessage({
                        type: 'error',
                        id: msg.id,
                        error: pick(error, [
                            'name',
                            'message',
                            'code',
                            'type',
                            'status',
                            'data',
                            'stacktrace',
                        ]),
                    });
                },
                complete: () => {
                    this.port.postMessage({
                        type: 'complete',
                        id: msg.id,
                    });
                    this.processing.delete(msg.id);
                },
            });
        };
        this.handleCancelMessage = msg => {
            const abortController = this.processing.get(msg.id);
            if (!abortController) {
                return;
            }
            abortController.abort(MANUALLY_STOP);
        };
    }
    get handlers() {
        return {
            call: this.handleCallMessage,
            cancel: this.handleCancelMessage,
            subscribe: this.handleSubscribeMessage,
            unsubscribe: this.handleCancelMessage,
        };
    }
    register(op, handler) {
        this.registeredOpHandlers.set(op, handler);
    }
    registerAll(handlers) {
        for (const [op, handler] of Object.entries(handlers)) {
            this.register(op, handler);
        }
    }
    before(op, handler) {
        this.eventBus.on(`before:${op}`, handler);
    }
    after(op, handler) {
        this.eventBus.on(`after:${op}`, handler);
    }
    /**
     * @internal
     */
    ob$(op, signal) {
        return defer(() => {
            const handler = this.registeredOpHandlers.get(op.name);
            if (!handler) {
                throw new Error(`Handler for operation [${op.name}] is not registered.`);
            }
            const ret$ = handler(op.payload, { signal });
            let ob$;
            if (ret$ instanceof Promise) {
                ob$ = from(ret$);
            }
            else if (ret$ instanceof Observable) {
                ob$ = ret$;
            }
            else {
                ob$ = of(ret$);
            }
            return ob$.pipe(takeUntil(fromEvent(signal, 'abort')));
        });
    }
    destroy() {
        super.close();
        this.registeredOpHandlers.clear();
        this.processing.forEach(controller => {
            controller.abort(MANUALLY_STOP);
        });
        this.processing.clear();
        this.eventBus.removeAllListeners();
    }
}
//# sourceMappingURL=consumer.js.map