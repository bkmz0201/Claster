import { Observable } from 'rxjs';
import { AutoMessageHandler, type CallMessage, type SubscribeMessage } from './message';
import type { OpInput, OpNames, OpOutput, OpSchema } from './types';
interface OpCallContext {
    signal: AbortSignal;
}
export type OpHandler<Ops extends OpSchema, Op extends OpNames<Ops>> = (payload: OpInput<Ops, Op>[0], ctx: OpCallContext) => OpOutput<Ops, Op> | Promise<OpOutput<Ops, Op>> | Observable<OpOutput<Ops, Op>>;
export declare class OpConsumer<Ops extends OpSchema> extends AutoMessageHandler {
    private readonly eventBus;
    private readonly registeredOpHandlers;
    private readonly processing;
    get handlers(): {
        call: (message: CallMessage) => void;
        cancel: ((message: import("./message").CancelMessage) => void) & ((message: import("./message").UnsubscribeMessage) => void);
        subscribe: (message: SubscribeMessage) => void;
        unsubscribe: ((message: import("./message").CancelMessage) => void) & ((message: import("./message").UnsubscribeMessage) => void);
    };
    private readonly handleCallMessage;
    private readonly handleSubscribeMessage;
    private readonly handleCancelMessage;
    register<Op extends OpNames<Ops>>(op: Op, handler: OpHandler<Ops, Op>): void;
    registerAll(handlers: OpNames<Ops> extends string ? {
        [K in OpNames<Ops>]: OpHandler<Ops, K>;
    } : never): void;
    before<Op extends OpNames<Ops>>(op: Op, handler: (...input: OpInput<Ops, Op>) => void): void;
    after<Op extends OpNames<Ops>>(op: Op, handler: (...args: [...OpInput<Ops, Op>, OpOutput<Ops, Op>]) => void): void;
    /**
     * @internal
     */
    ob$(op: CallMessage | SubscribeMessage, signal: AbortSignal): Observable<any>;
    destroy(): void;
}
export {};
//# sourceMappingURL=consumer.d.ts.map