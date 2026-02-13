import { combineLatest, map, ReplaySubject, share, throttleTime, } from 'rxjs';
import { BlobSyncPeer } from './peer';
export class BlobSyncImpl {
    blobState$(blobId) {
        return combineLatest(this.peers.map(peer => peer.blobPeerState$(blobId))).pipe(throttleTime(1000, undefined, { leading: true, trailing: true }), map(peers => ({
            uploading: peers.some(p => p.uploading),
            downloading: peers.some(p => p.downloading),
            errorMessage: peers.find(p => p.errorMessage)?.errorMessage,
            overSize: peers.some(p => p.overSize),
            needUpload: peers.some(p => p.needUpload),
            needDownload: peers.some(p => p.needDownload),
        })), share({
            connector: () => new ReplaySubject(1),
        }));
    }
    constructor(storages, blobSync) {
        this.storages = storages;
        this.blobSync = blobSync;
        // abort all pending jobs when the sync is destroyed
        this.abortController = new AbortController();
        this.started = false;
        this.peers = Object.entries(this.storages.remotes).map(([peerId, remote]) => new BlobSyncPeer(peerId, this.storages.local, remote, this.blobSync));
        this.state$ = combineLatest(this.peers.map(peer => peer.peerState$)).pipe(
        // throttle the state to 1 second to avoid spamming the UI
        throttleTime(1000), map(allPeers => allPeers.length === 0
            ? {
                uploading: 0,
                downloading: 0,
                error: 0,
                overCapacity: false,
            }
            : {
                uploading: allPeers.reduce((acc, peer) => acc + peer.uploading, 0),
                downloading: allPeers.reduce((acc, peer) => acc + peer.downloading, 0),
                error: allPeers.reduce((acc, peer) => acc + peer.error, 0),
                overCapacity: allPeers.some(p => p.overCapacity),
            }), share({
            connector: () => new ReplaySubject(1),
        }));
        // cache the download promise for each peer
        // this is used to avoid downloading the same peer multiple times
        this.fullDownloadPromise = new Map();
    }
    downloadBlob(blobId) {
        const signal = this.abortController.signal;
        return new Promise((resolve, reject) => {
            let completed = 0;
            const totalPeers = this.peers.length;
            if (totalPeers === 0) {
                resolve(false);
                return;
            }
            // download from all peers concurrently
            // resolve if any peer has success
            this.peers.forEach(peer => {
                peer
                    .downloadBlob(blobId, signal)
                    .then(result => {
                    if (result === true) {
                        // resolve if the peer has success
                        resolve(true);
                    }
                })
                    .catch(err => {
                    reject(err);
                })
                    .finally(() => {
                    completed++;
                    if (completed === totalPeers) {
                        // resolve if all peers finish
                        resolve(false);
                    }
                });
            });
        });
    }
    uploadBlob(blob, force = false) {
        return Promise.all(this.peers.map(p => p.uploadBlob(blob, force, this.abortController.signal))).then(() => true);
    }
    // start the upload loop
    start() {
        if (this.started) {
            return;
        }
        this.started = true;
        const signal = this.abortController.signal;
        Promise.allSettled(this.peers.map(p => p.fullUploadLoop(signal))).catch(err => {
            // should never reach here
            console.error(err);
        });
    }
    // download all blobs from a peer
    async fullDownload(peerId, outerSignal) {
        return Promise.race([
            Promise.all(peerId
                ? [this.fullDownloadPeer(peerId)]
                : this.peers.map(p => this.fullDownloadPeer(p.peerId))),
            new Promise((_, reject) => {
                // Reject the promise if the outer signal is aborted
                // The outer signal only controls the API promise, not the actual download process
                if (outerSignal?.aborted) {
                    reject(outerSignal.reason);
                }
                outerSignal?.addEventListener('abort', reason => {
                    reject(reason);
                });
            }),
        ]);
    }
    fullDownloadPeer(peerId) {
        const peer = this.peers.find(p => p.peerId === peerId);
        if (!peer) {
            return;
        }
        const existing = this.fullDownloadPromise.get(peerId);
        if (existing) {
            return existing;
        }
        const promise = peer
            .fullDownload(this.abortController.signal)
            .finally(() => {
            this.fullDownloadPromise.delete(peerId);
        });
        this.fullDownloadPromise.set(peerId, promise);
        return promise;
    }
    stop() {
        this.abortController.abort();
        this.abortController = new AbortController();
        this.started = false;
    }
}
//# sourceMappingURL=index.js.map