import { Observable } from 'rxjs';
import { AutoMessageHandler, type MessageCommunicapable } from './message';
import type { OpInput, OpInputWithSignal, OpNames, OpOutput, OpSchema } from './types';
export interface CancelablePromise<T> extends Promise<T> {
    cancel(): void;
}
export interface OpClientOptions {
    timeout?: number;
}
export declare class OpClient<Ops extends OpSchema> extends AutoMessageHandler {
    private readonly callIds;
    private readonly pendingCalls;
    private readonly obs;
    private readonly options;
    constructor(port: MessageCommunicapable, options?: OpClientOptions);
    protected get handlers(): {
        return: (message: ({
            type: "return";
            id: string;
        } & {
            data: any;
        }) | ({
            type: "return";
            id: string;
        } & {
            error: Error;
        })) => void;
        next: (message: import("./message").SubscriptionNextMessage) => void;
        error: (message: import("./message").SubscriptionErrorMessage) => void;
        complete: (message: import("./message").SubscriptionCompleteMessage) => void;
    };
    private readonly handleReturnMessage;
    private readonly handleSubscriptionNextMessage;
    private readonly handleSubscriptionErrorMessage;
    private readonly handleSubscriptionCompleteMessage;
    protected nextCallId(op: OpNames<Ops>): string;
    protected currentCallId(op: OpNames<Ops>): number;
    call<Op extends OpNames<Ops>>(op: Op, ...args: OpInputWithSignal<Ops, Op>): CancelablePromise<OpOutput<Ops, Op>>;
    ob$<Op extends OpNames<Ops>, Out extends OpOutput<Ops, Op>>(op: Op, ...args: OpInput<Ops, Op>): Observable<Out>;
    destroy(): void;
}
//# sourceMappingURL=client.d.ts.map