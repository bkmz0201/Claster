import { share } from '../../connection';
import { DocSyncStorageBase, } from '../../storage';
import { IDBConnection } from './db';
export class IndexedDBDocSyncStorage extends DocSyncStorageBase {
    static { this.identifier = 'IndexedDBDocSyncStorage'; }
    constructor(options) {
        super();
        this.options = options;
        this.connection = share(new IDBConnection(this.options));
    }
    get db() {
        return this.connection.inner.db;
    }
    async getPeerRemoteClock(peer, docId) {
        const trx = this.db.transaction('peerClocks', 'readonly');
        const record = await trx.store.get([peer, docId]);
        return record
            ? {
                docId: record.docId,
                timestamp: record.clock,
            }
            : null;
    }
    async getPeerRemoteClocks(peer) {
        const trx = this.db.transaction('peerClocks', 'readonly');
        const records = await trx.store.index('peer').getAll(peer);
        return records.reduce((clocks, { docId, clock }) => {
            clocks[docId] = clock;
            return clocks;
        }, {});
    }
    async setPeerRemoteClock(peer, clock) {
        const trx = this.db.transaction('peerClocks', 'readwrite');
        const record = await trx.store.get([peer, clock.docId]);
        if (!record || record.clock < clock.timestamp) {
            await trx.store.put({
                peer,
                docId: clock.docId,
                clock: clock.timestamp,
                pulledClock: record?.pulledClock ?? new Date(0),
                pushedClock: record?.pushedClock ?? new Date(0),
            });
        }
    }
    async getPeerPulledRemoteClock(peer, docId) {
        const trx = this.db.transaction('peerClocks', 'readonly');
        const record = await trx.store.get([peer, docId]);
        return record
            ? {
                docId: record.docId,
                timestamp: record.pulledClock,
            }
            : null;
    }
    async getPeerPulledRemoteClocks(peer) {
        const trx = this.db.transaction('peerClocks', 'readonly');
        const records = await trx.store.index('peer').getAll(peer);
        return records.reduce((clocks, { docId, pulledClock }) => {
            clocks[docId] = pulledClock;
            return clocks;
        }, {});
    }
    async setPeerPulledRemoteClock(peer, clock) {
        const trx = this.db.transaction('peerClocks', 'readwrite');
        const record = await trx.store.get([peer, clock.docId]);
        if (!record || record.pulledClock < clock.timestamp) {
            await trx.store.put({
                peer,
                docId: clock.docId,
                clock: record?.clock ?? new Date(0),
                pulledClock: clock.timestamp,
                pushedClock: record?.pushedClock ?? new Date(0),
            });
        }
    }
    async getPeerPushedClock(peer, docId) {
        const trx = this.db.transaction('peerClocks', 'readonly');
        const record = await trx.store.get([peer, docId]);
        return record
            ? {
                docId: record.docId,
                timestamp: record.pushedClock,
            }
            : null;
    }
    async getPeerPushedClocks(peer) {
        const trx = this.db.transaction('peerClocks', 'readonly');
        const records = await trx.store.index('peer').getAll(peer);
        return records.reduce((clocks, { docId, pushedClock }) => {
            clocks[docId] = pushedClock;
            return clocks;
        }, {});
    }
    async setPeerPushedClock(peer, clock) {
        const trx = this.db.transaction('peerClocks', 'readwrite');
        const record = await trx.store.get([peer, clock.docId]);
        if (!record || record.pushedClock < clock.timestamp) {
            await trx.store.put({
                peer,
                docId: clock.docId,
                clock: record?.clock ?? new Date(0),
                pushedClock: clock.timestamp,
                pulledClock: record?.pulledClock ?? new Date(0),
            });
        }
    }
    async clearClocks() {
        const trx = this.db.transaction('peerClocks', 'readwrite');
        await trx.store.clear();
    }
}
//# sourceMappingURL=doc-sync.js.map