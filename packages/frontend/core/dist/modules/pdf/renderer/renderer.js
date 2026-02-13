import { getWorkerUrl } from '@affine/env/worker';
import { OpClient } from '@toeverything/infra/op';
export class PDFRenderer extends OpClient {
    constructor() {
        const worker = new Worker(getWorkerUrl('pdf'));
        super(worker);
        this.worker = worker;
    }
    destroy() {
        super.destroy();
        this.worker.terminate();
    }
    [Symbol.dispose]() {
        this.destroy();
    }
}
//# sourceMappingURL=renderer.js.map