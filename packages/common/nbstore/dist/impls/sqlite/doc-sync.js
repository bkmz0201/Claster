import { share } from '../../connection';
import { DocSyncStorageBase } from '../../storage';
import { NativeDBConnection } from './db';
export class SqliteDocSyncStorage extends DocSyncStorageBase {
    static { this.identifier = 'SqliteDocSyncStorage'; }
    constructor(options) {
        super();
        this.options = options;
        this.connection = share(new NativeDBConnection(this.options));
    }
    get db() {
        return this.connection.apis;
    }
    async getPeerRemoteClocks(peer) {
        return this.db
            .getPeerRemoteClocks(peer)
            .then(clocks => Object.fromEntries(clocks.map(clock => [clock.docId, clock.timestamp])));
    }
    async getPeerRemoteClock(peer, docId) {
        return this.db.getPeerRemoteClock(peer, docId);
    }
    async setPeerRemoteClock(peer, clock) {
        await this.db.setPeerRemoteClock(peer, clock.docId, clock.timestamp);
    }
    async getPeerPulledRemoteClocks(peer) {
        return this.db
            .getPeerPulledRemoteClocks(peer)
            .then(clocks => Object.fromEntries(clocks.map(clock => [clock.docId, clock.timestamp])));
    }
    async getPeerPulledRemoteClock(peer, docId) {
        return this.db.getPeerPulledRemoteClock(peer, docId);
    }
    async setPeerPulledRemoteClock(peer, clock) {
        await this.db.setPeerPulledRemoteClock(peer, clock.docId, clock.timestamp);
    }
    async getPeerPushedClocks(peer) {
        return this.db
            .getPeerPushedClocks(peer)
            .then(clocks => Object.fromEntries(clocks.map(clock => [clock.docId, clock.timestamp])));
    }
    async getPeerPushedClock(peer, docId) {
        return this.db.getPeerPushedClock(peer, docId);
    }
    async setPeerPushedClock(peer, clock) {
        await this.db.setPeerPushedClock(peer, clock.docId, clock.timestamp);
    }
    async clearClocks() {
        await this.db.clearClocks();
    }
}
//# sourceMappingURL=doc-sync.js.map