declare const PRODUCER_MESSAGE_TYPES: readonly ["call", "cancel", "subscribe", "unsubscribe"];
declare const CONSUMER_MESSAGE_TYPES: readonly ["return", "next", "error", "complete"];
export declare const KNOWN_MESSAGE_TYPES: Set<"call" | "next" | "error" | "complete" | "unsubscribe" | "cancel" | "subscribe" | "return">;
type MessageType = (typeof PRODUCER_MESSAGE_TYPES)[number] | (typeof CONSUMER_MESSAGE_TYPES)[number];
export interface Message {
    type: MessageType;
}
export interface CallMessage extends Message {
    type: 'call';
    id: string;
    name: string;
    payload: any;
}
export interface CancelMessage extends Message {
    type: 'cancel';
    id: string;
}
export interface SubscribeMessage extends Message {
    type: 'subscribe';
    id: string;
    name: string;
    payload: any;
}
export interface UnsubscribeMessage extends Message {
    type: 'unsubscribe';
    id: string;
}
export type ReturnMessage = {
    type: 'return';
    id: string;
} & ({
    data: any;
} | {
    error: Error;
});
export interface SubscriptionNextMessage extends Message {
    type: 'next';
    id: string;
    data: any;
}
export interface SubscriptionErrorMessage extends Message {
    type: 'error';
    id: string;
    error: Error;
}
export type SubscriptionCompleteMessage = {
    type: 'complete';
    id: string;
};
export type Messages = CallMessage | CancelMessage | SubscribeMessage | UnsubscribeMessage | ReturnMessage | SubscriptionNextMessage | SubscriptionErrorMessage | SubscriptionCompleteMessage;
export type MessageHandlers = {
    [Type in Messages['type']]: (message: Extract<Messages, {
        type: Type;
    }>) => void;
};
export type MessageCommunicapable = Pick<MessagePort, 'postMessage' | 'addEventListener' | 'removeEventListener'> & {
    start?(): void;
    close?(): void;
    terminate?(): void;
};
export declare function ignoreUnknownEvent(handler: (data: Messages) => void): (event: MessageEvent<Message>) => void;
export declare function transfer<T>(data: T, transferables: Transferable[]): T;
export declare function fetchTransferables(data: any): Transferable[] | undefined;
export declare abstract class AutoMessageHandler {
    protected readonly port: MessageCommunicapable;
    private listening;
    protected abstract handlers: Partial<MessageHandlers>;
    constructor(port: MessageCommunicapable);
    protected handleMessage: (event: MessageEvent<Message>) => void;
    protected listen(): void;
    close(): void;
}
export {};
//# sourceMappingURL=message.d.ts.map