import { OpClient } from '@toeverything/infra/op';
import type { ClientOps } from './ops';
export declare class PDFRenderer extends OpClient<ClientOps> {
    private readonly worker;
    constructor();
    destroy(): void;
    [Symbol.dispose](): void;
}
//# sourceMappingURL=renderer.d.ts.map