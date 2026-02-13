import { nanoid } from 'nanoid';
import { applyAwarenessUpdate, encodeAwarenessUpdate, } from 'y-protocols/awareness';
export class AwarenessFrontend {
    constructor(sync) {
        this.sync = sync;
    }
    connectAwareness(awareness) {
        const uniqueId = nanoid();
        const handleAwarenessUpdate = (changes, origin) => {
            if (origin === uniqueId) {
                return;
            }
            const changedClients = Object.values(changes).reduce((res, cur) => res.concat(cur));
            const update = encodeAwarenessUpdate(awareness, changedClients);
            this.sync
                .update({
                docId: awareness.doc.guid,
                bin: update,
            }, uniqueId)
                .catch(error => {
                console.error('update awareness error', error);
            });
        };
        awareness.on('change', handleAwarenessUpdate);
        const handleSyncUpdate = (update, origin) => {
            if (origin === uniqueId) {
                // skip self update
                return;
            }
            applyAwarenessUpdate(awareness, update.bin, uniqueId);
        };
        const handleSyncCollect = () => {
            return Promise.resolve({
                docId: awareness.doc.guid,
                bin: encodeAwarenessUpdate(awareness, [awareness.clientID]),
            });
        };
        const unsubscribe = this.sync.subscribeUpdate(awareness.doc.guid, handleSyncUpdate, handleSyncCollect);
        awareness.once('destroy', () => {
            awareness.off('change', handleAwarenessUpdate);
            unsubscribe();
        });
        return () => {
            awareness.off('change', handleAwarenessUpdate);
            unsubscribe();
        };
    }
}
//# sourceMappingURL=awareness.js.map