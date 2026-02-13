import { vi } from 'vitest';
import { OpConsumer } from '../consumer';
import { type MessageHandlers } from '../message';
import type { OpSchema } from '../types';
interface TestOps extends OpSchema {
    add: [{
        a: number;
        b: number;
    }, number];
    any: [any, any];
}
declare module 'vitest' {
    interface TestContext {
        consumer: OpConsumer<TestOps>;
        handlers: MessageHandlers;
        postMessage: ReturnType<typeof vi.fn>;
    }
}
export {};
//# sourceMappingURL=consumer.spec.d.ts.map