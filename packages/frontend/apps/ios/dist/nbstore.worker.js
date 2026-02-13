import './setup-worker';
import { broadcastChannelStorages } from '@affine/nbstore/broadcast-channel';
import { cloudStorages, configureSocketAuthMethod, } from '@affine/nbstore/cloud';
import { idbStoragesIndexerOnly } from '@affine/nbstore/idb';
import { bindNativeDBApis, sqliteStorages, } from '@affine/nbstore/sqlite';
import { StoreManagerConsumer, } from '@affine/nbstore/worker/consumer';
import { OpConsumer } from '@toeverything/infra/op';
import { AsyncCall } from 'async-call-rpc';
import { readEndpointToken } from './proxy';
configureSocketAuthMethod((endpoint, cb) => {
    readEndpointToken(endpoint)
        .then(token => {
        cb({ token });
    })
        .catch(e => {
        console.error(e);
    });
});
globalThis.addEventListener('message', e => {
    if (e.data.type === 'native-db-api-channel') {
        const port = e.ports[0];
        const rpc = AsyncCall({}, {
            channel: {
                on(listener) {
                    const f = (e) => {
                        listener(e.data);
                    };
                    port.addEventListener('message', f);
                    return () => {
                        port.removeEventListener('message', f);
                    };
                },
                send(data) {
                    port.postMessage(data);
                },
            },
        });
        bindNativeDBApis(rpc);
        port.start();
    }
});
const consumer = new OpConsumer(globalThis);
const storeManager = new StoreManagerConsumer([
    ...idbStoragesIndexerOnly,
    ...sqliteStorages,
    ...broadcastChannelStorages,
    ...cloudStorages,
]);
storeManager.bindConsumer(consumer);
//# sourceMappingURL=nbstore.worker.js.map