import { AutoMessageHandler, type MessageCommunicapable, type MessageHandlers } from '../message';
declare class CustomMessageHandler extends AutoMessageHandler {
    handlers: Partial<MessageHandlers>;
}
declare module 'vitest' {
    interface TestContext {
        sendPort: MessageCommunicapable;
        receivePort: MessageCommunicapable;
        handler: CustomMessageHandler;
    }
}
export {};
//# sourceMappingURL=message.spec.d.ts.map