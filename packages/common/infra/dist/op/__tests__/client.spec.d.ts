import { vi } from 'vitest';
import { OpClient } from '../client';
import { type MessageHandlers } from '../message';
import type { OpSchema } from '../types';
interface TestOps extends OpSchema {
    add: [{
        a: number;
        b: number;
    }, number];
    bin: [Uint8Array, Uint8Array];
    sub: [Uint8Array, number];
}
declare module 'vitest' {
    interface TestContext {
        producer: OpClient<TestOps>;
        handlers: MessageHandlers;
        postMessage: ReturnType<typeof vi.fn>;
    }
}
export {};
//# sourceMappingURL=client.spec.d.ts.map