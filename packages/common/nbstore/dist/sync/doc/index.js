import { combineLatest, filter, first, lastValueFrom, map, of, ReplaySubject, share, throttleTime, } from 'rxjs';
import { DummyDocStorage } from '../../storage/dummy/doc';
import { DummyDocSyncStorage } from '../../storage/dummy/doc-sync';
import { takeUntilAbort } from '../../utils/take-until-abort';
import { MANUALLY_STOP } from '../../utils/throw-if-aborted';
import { DocSyncPeer } from './peer';
export class DocSyncImpl {
    constructor(storages, sync) {
        this.storages = storages;
        this.sync = sync;
        this.peers = Object.entries(this.storages.remotes).map(([peerId, remote]) => new DocSyncPeer(peerId, this.storages.local, this.sync, remote));
        this.abort = null;
        this._state$ = combineLatest(this.peers.map(peer => peer.peerState$)).pipe(map(allPeers => allPeers.length === 0
            ? {
                total: 0,
                syncing: 0,
                synced: true,
                retrying: false,
                errorMessage: null,
            }
            : {
                total: allPeers.reduce((acc, peer) => Math.max(acc, peer.total), 0),
                syncing: allPeers.reduce((acc, peer) => Math.max(acc, peer.syncing), 0),
                synced: allPeers.every(peer => peer.synced),
                retrying: allPeers.some(peer => peer.retrying),
                errorMessage: allPeers.find(peer => peer.errorMessage)?.errorMessage ?? null,
            }), share({
            connector: () => new ReplaySubject(1),
        }));
        this.state$ = this._state$.pipe(
        // throttle the state to 1 second to avoid spamming the UI
        throttleTime(1000, undefined, {
            leading: true,
            trailing: true,
        }));
    }
    /**
     * for testing
     */
    static get dummy() {
        return new DocSyncImpl({
            local: new DummyDocStorage(),
            remotes: {},
        }, new DummyDocSyncStorage());
    }
    _docState$(docId) {
        if (this.peers.length === 0) {
            return of({
                errorMessage: null,
                retrying: false,
                syncing: false,
                synced: true,
            });
        }
        return combineLatest(this.peers.map(peer => peer.docState$(docId))).pipe(map(allPeers => {
            return {
                errorMessage: allPeers.find(peer => peer.errorMessage)?.errorMessage ?? null,
                retrying: allPeers.some(peer => peer.retrying),
                syncing: allPeers.some(peer => peer.syncing),
                synced: allPeers.every(peer => peer.synced),
            };
        }));
    }
    docState$(docId) {
        return this._docState$(docId).pipe(
        // throttle the state to 1 second to avoid spamming the UI
        throttleTime(1000, undefined, {
            leading: true,
            trailing: true,
        }));
    }
    async waitForSynced(docId, abort) {
        const source$ = docId
            ? this._docState$(docId)
            : this._state$;
        await lastValueFrom(source$.pipe(filter(state => state.synced), takeUntilAbort(abort), first()));
    }
    start() {
        if (this.abort) {
            this.abort.abort(MANUALLY_STOP);
        }
        const abort = new AbortController();
        this.abort = abort;
        Promise.allSettled(this.peers.map(peer => peer.mainLoop(abort.signal))).catch(error => {
            console.error(error);
        });
    }
    stop() {
        this.abort?.abort(MANUALLY_STOP);
        this.abort = null;
    }
    addPriority(id, priority) {
        const undo = this.peers.map(peer => peer.addPriority(id, priority));
        return () => undo.forEach(fn => fn());
    }
    async resetSync() {
        const running = this.abort !== null;
        this.stop();
        await this.sync.clearClocks();
        if (running) {
            this.start();
        }
    }
}
//# sourceMappingURL=index.js.map