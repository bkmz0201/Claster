import { base64ToUint8Array, uint8ArrayToBase64, } from '@affine/core/modules/workspace-engine';
import { parseUniversalId, } from '@affine/nbstore';
import {} from '@affine/nbstore/sqlite';
import { registerPlugin } from '@capacitor/core';
export * from './definitions';
export const NbStore = registerPlugin('NbStoreDocStorage');
export const NbStoreNativeDBApis = {
    connect: async function (id) {
        const { peer, type, id: spaceId } = parseUniversalId(id);
        return await NbStore.connect({ id, spaceId, spaceType: type, peer });
    },
    disconnect: function (id) {
        return NbStore.disconnect({ id });
    },
    pushUpdate: async function (id, docId, update) {
        const { timestamp } = await NbStore.pushUpdate({
            id,
            docId,
            data: await uint8ArrayToBase64(update),
        });
        return new Date(timestamp);
    },
    getDocSnapshot: async function (id, docId) {
        const snapshot = await NbStore.getDocSnapshot({ id, docId });
        return snapshot
            ? {
                bin: base64ToUint8Array(snapshot.bin),
                docId: snapshot.docId,
                timestamp: new Date(snapshot.timestamp),
            }
            : null;
    },
    setDocSnapshot: async function (id, snapshot) {
        const { success } = await NbStore.setDocSnapshot({
            id,
            docId: snapshot.docId,
            bin: await uint8ArrayToBase64(snapshot.bin),
            timestamp: snapshot.timestamp.getTime(),
        });
        return success;
    },
    getDocUpdates: async function (id, docId) {
        const { updates } = await NbStore.getDocUpdates({ id, docId });
        return updates.map(update => ({
            bin: base64ToUint8Array(update.bin),
            docId: update.docId,
            timestamp: new Date(update.timestamp),
        }));
    },
    markUpdatesMerged: async function (id, docId, updates) {
        const { count } = await NbStore.markUpdatesMerged({
            id,
            docId,
            timestamps: updates.map(t => t.getTime()),
        });
        return count;
    },
    deleteDoc: async function (id, docId) {
        await NbStore.deleteDoc({
            id,
            docId,
        });
    },
    getDocClocks: async function (id, after) {
        const clocks = (await NbStore.getDocClocks({
            id,
            after: after?.getTime(),
        })).clocks;
        return clocks.map(c => ({
            docId: c.docId,
            timestamp: new Date(c.timestamp),
        }));
    },
    getDocClock: async function (id, docId) {
        const clock = await NbStore.getDocClock({
            id,
            docId,
        });
        return clock
            ? {
                timestamp: new Date(clock.timestamp),
                docId: clock.docId,
            }
            : null;
    },
    getBlob: async function (id, key) {
        const record = await NbStore.getBlob({
            id,
            key,
        });
        return record
            ? {
                data: base64ToUint8Array(record.data),
                key: record.key,
                mime: record.mime,
                createdAt: new Date(record.createdAt),
            }
            : null;
    },
    setBlob: async function (id, blob) {
        await NbStore.setBlob({
            id,
            data: await uint8ArrayToBase64(blob.data),
            key: blob.key,
            mime: blob.mime,
        });
    },
    deleteBlob: async function (id, key, permanently) {
        await NbStore.deleteBlob({
            id,
            key,
            permanently,
        });
    },
    releaseBlobs: async function (id) {
        await NbStore.releaseBlobs({
            id,
        });
    },
    listBlobs: async function (id) {
        const listed = await NbStore.listBlobs({
            id,
        });
        return listed.blobs.map(b => ({
            key: b.key,
            mime: b.mime,
            size: b.size,
            createdAt: new Date(b.createdAt),
        }));
    },
    getPeerRemoteClocks: async function (id, peer) {
        const clocks = (await NbStore.getPeerRemoteClocks({
            id,
            peer,
        })).clocks;
        return clocks.map(c => ({
            docId: c.docId,
            timestamp: new Date(c.timestamp),
        }));
    },
    getPeerRemoteClock: async function (id, peer, docId) {
        const clock = await NbStore.getPeerRemoteClock({
            id,
            peer,
            docId,
        });
        return clock
            ? {
                docId: clock.docId,
                timestamp: new Date(clock.timestamp),
            }
            : null;
    },
    setPeerRemoteClock: async function (id, peer, docId, clock) {
        await NbStore.setPeerRemoteClock({
            id,
            peer,
            docId,
            timestamp: clock.getTime(),
        });
    },
    getPeerPulledRemoteClocks: async function (id, peer) {
        const clocks = (await NbStore.getPeerPulledRemoteClocks({
            id,
            peer,
        })).clocks;
        return clocks.map(c => ({
            docId: c.docId,
            timestamp: new Date(c.timestamp),
        }));
    },
    getPeerPulledRemoteClock: async function (id, peer, docId) {
        const clock = await NbStore.getPeerPulledRemoteClock({
            id,
            peer,
            docId,
        });
        return clock
            ? {
                docId: clock.docId,
                timestamp: new Date(clock.timestamp),
            }
            : null;
    },
    setPeerPulledRemoteClock: async function (id, peer, docId, clock) {
        await NbStore.setPeerPulledRemoteClock({
            id,
            peer,
            docId,
            timestamp: clock.getTime(),
        });
    },
    getPeerPushedClocks: async function (id, peer) {
        const clocks = (await NbStore.getPeerPushedClocks({
            id,
            peer,
        })).clocks;
        return clocks.map(c => ({
            docId: c.docId,
            timestamp: new Date(c.timestamp),
        }));
    },
    getPeerPushedClock: async function (id, peer, docId) {
        const clock = await NbStore.getPeerPushedClock({
            id,
            peer,
            docId,
        });
        return clock
            ? {
                docId: clock.docId,
                timestamp: new Date(clock.timestamp),
            }
            : null;
    },
    setPeerPushedClock: async function (id, peer, docId, clock) {
        await NbStore.setPeerPushedClock({
            id,
            peer,
            docId,
            timestamp: clock.getTime(),
        });
    },
    clearClocks: async function (id) {
        await NbStore.clearClocks({
            id,
        });
    },
    getBlobUploadedAt: async function (id, peer, blobId) {
        const result = await NbStore.getBlobUploadedAt({
            id,
            peer,
            blobId,
        });
        return result.uploadedAt ? new Date(result.uploadedAt) : null;
    },
    setBlobUploadedAt: async function (id, peer, blobId, uploadedAt) {
        await NbStore.setBlobUploadedAt({
            id,
            peer,
            blobId,
            uploadedAt: uploadedAt ? uploadedAt.getTime() : null,
        });
    },
    crawlDocData: async function (id, docId) {
        return await NbStore.crawlDocData({ id, docId });
    },
    ftsAddDocument: async function (id, indexName, docId, text, index) {
        await NbStore.ftsAddDocument({
            id,
            indexName,
            docId,
            text,
            index,
        });
    },
    ftsDeleteDocument: async function (id, indexName, docId) {
        await NbStore.ftsDeleteDocument({
            id,
            indexName,
            docId,
        });
    },
    ftsSearch: async function (id, indexName, query) {
        return await NbStore.ftsSearch({
            id,
            indexName,
            query,
        });
    },
    ftsGetDocument: async function (id, indexName, docId) {
        const result = await NbStore.ftsGetDocument({
            id,
            indexName,
            docId,
        });
        return result.text;
    },
    ftsGetMatches: async function (id, indexName, docId, query) {
        return await NbStore.ftsGetMatches({
            id,
            indexName,
            docId,
            query,
        });
    },
    ftsFlushIndex: async function (id) {
        await NbStore.ftsFlushIndex({
            id,
        });
    },
};
//# sourceMappingURL=index.js.map