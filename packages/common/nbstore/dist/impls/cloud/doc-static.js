import { DocStorageBase, } from '../../storage';
import { HttpConnection } from './http';
export class StaticCloudDocStorage extends DocStorageBase {
    static { this.identifier = 'StaticCloudDocStorage'; }
    constructor(options) {
        super({ ...options, readonlyMode: true });
        this.connection = new HttpConnection(this.options.serverBaseUrl);
    }
    async pushDocUpdate(update, _origin) {
        // http is readonly
        return { docId: update.docId, timestamp: new Date() };
    }
    async getDocTimestamp(docId) {
        // http doesn't support this, so we just return a new timestamp
        return {
            docId,
            timestamp: new Date(),
        };
    }
    async getDocTimestamps() {
        // http doesn't support this
        return {};
    }
    deleteDoc(_docId) {
        // http is readonly
        return Promise.resolve();
    }
    async getDocSnapshot(docId) {
        try {
            const arrayBuffer = await this.connection.fetchArrayBuffer(`/api/workspaces/${this.spaceId}/docs/${docId}`, {
                priority: 'high',
                headers: {
                    Accept: 'application/octet-stream', // this is necessary for ios native fetch to return arraybuffer
                },
            });
            if (!arrayBuffer) {
                return null;
            }
            return {
                docId: docId,
                bin: new Uint8Array(arrayBuffer),
                timestamp: new Date(),
            };
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
    setDocSnapshot(_snapshot, _prevSnapshot) {
        // http is readonly
        return Promise.resolve(false);
    }
    getDocUpdates(_docId) {
        return Promise.resolve([]);
    }
    markUpdatesMerged(_docId, _updates) {
        return Promise.resolve(0);
    }
}
//# sourceMappingURL=doc-static.js.map