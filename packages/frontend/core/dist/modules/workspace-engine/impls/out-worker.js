import { getWorkerUrl } from '@affine/env/worker';
import { OpClient } from '@toeverything/infra/op';
let worker;
export function getWorkspaceProfileWorker() {
    if (worker) {
        return worker;
    }
    const rawWorker = new Worker(getWorkerUrl('workspace-profile'));
    worker = new OpClient(rawWorker);
    return worker;
}
//# sourceMappingURL=out-worker.js.map