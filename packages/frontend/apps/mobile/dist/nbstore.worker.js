import '@affine/core/bootstrap/browser';
import { broadcastChannelStorages } from '@affine/nbstore/broadcast-channel';
import { cloudStorages } from '@affine/nbstore/cloud';
import { idbStorages } from '@affine/nbstore/idb';
import { idbV1Storages } from '@affine/nbstore/idb/v1';
import { StoreManagerConsumer, } from '@affine/nbstore/worker/consumer';
import { OpConsumer } from '@toeverything/infra/op';
const consumer = new StoreManagerConsumer([
    ...idbStorages,
    ...idbV1Storages,
    ...broadcastChannelStorages,
    ...cloudStorages,
]);
if ('onconnect' in globalThis) {
    // if in shared worker
    globalThis.onconnect = (event) => {
        const port = event.ports[0];
        consumer.bindConsumer(new OpConsumer(port));
    };
}
else {
    // if in worker
    consumer.bindConsumer(new OpConsumer(globalThis));
}
//# sourceMappingURL=nbstore.worker.js.map