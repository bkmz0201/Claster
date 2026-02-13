import { DocStorageBase, } from '../../storage';
import { getIdConverter } from '../../utils/id-converter';
import { base64ToUint8Array, SocketConnection, uint8ArrayToBase64, } from './socket';
export class CloudDocStorage extends DocStorageBase {
    constructor() {
        super(...arguments);
        this.spaceType = this.options.type;
        this.onServerUpdate = message => {
            if (this.spaceType === message.spaceType &&
                this.spaceId === message.spaceId) {
                this.emit('update', {
                    docId: this.idConverter.oldIdToNewId(message.docId),
                    bin: base64ToUint8Array(message.update),
                    timestamp: new Date(message.timestamp),
                    editor: message.editor,
                });
            }
        };
        this.connection = new CloudDocStorageConnection(this.options, this.onServerUpdate);
    }
    static { this.identifier = 'CloudDocStorage'; }
    get socket() {
        return this.connection.inner.socket;
    }
    get idConverter() {
        if (!this.connection.idConverter) {
            throw new Error('Id converter not initialized');
        }
        return this.connection.idConverter;
    }
    async getDocSnapshot(docId) {
        const response = await this.socket.emitWithAck('space:load-doc', {
            spaceType: this.spaceType,
            spaceId: this.spaceId,
            docId: this.idConverter.newIdToOldId(docId),
        });
        if ('error' in response) {
            if (response.error.name === 'DOC_NOT_FOUND') {
                return null;
            }
            // TODO: use [UserFriendlyError]
            throw new Error(response.error.message);
        }
        return {
            docId,
            bin: base64ToUint8Array(response.data.missing),
            timestamp: new Date(response.data.timestamp),
        };
    }
    async getDocDiff(docId, state) {
        const response = await this.socket.emitWithAck('space:load-doc', {
            spaceType: this.spaceType,
            spaceId: this.spaceId,
            docId: this.idConverter.newIdToOldId(docId),
            stateVector: state ? await uint8ArrayToBase64(state) : void 0,
        });
        if ('error' in response) {
            if (response.error.name === 'DOC_NOT_FOUND') {
                return null;
            }
            // TODO: use [UserFriendlyError]
            throw new Error(response.error.message);
        }
        return {
            docId,
            missing: base64ToUint8Array(response.data.missing),
            state: base64ToUint8Array(response.data.state),
            timestamp: new Date(response.data.timestamp),
        };
    }
    async pushDocUpdate(update) {
        const response = await this.socket.emitWithAck('space:push-doc-update', {
            spaceType: this.spaceType,
            spaceId: this.spaceId,
            docId: this.idConverter.newIdToOldId(update.docId),
            update: await uint8ArrayToBase64(update.bin),
        });
        if ('error' in response) {
            // TODO(@forehalo): use [UserFriendlyError]
            throw new Error(response.error.message);
        }
        return {
            docId: update.docId,
            timestamp: new Date(response.data.timestamp),
        };
    }
    /**
     * Just a rough implementation, cloud doc storage should not need this method.
     */
    async getDocTimestamp(docId) {
        const response = await this.socket.emitWithAck('space:load-doc', {
            spaceType: this.spaceType,
            spaceId: this.spaceId,
            docId: this.idConverter.newIdToOldId(docId),
        });
        if ('error' in response) {
            // TODO: use [UserFriendlyError]
            throw new Error(response.error.message);
        }
        return {
            docId,
            timestamp: new Date(response.data.timestamp),
        };
    }
    async getDocTimestamps(after) {
        const response = await this.socket.emitWithAck('space:load-doc-timestamps', {
            spaceType: this.spaceType,
            spaceId: this.spaceId,
            timestamp: after ? after.getTime() : undefined,
        });
        if ('error' in response) {
            // TODO(@forehalo): use [UserFriendlyError]
            throw new Error(response.error.message);
        }
        return Object.entries(response.data).reduce((ret, [docId, timestamp]) => {
            ret[this.idConverter.oldIdToNewId(docId)] = new Date(timestamp);
            return ret;
        }, {});
    }
    async deleteDoc(docId) {
        this.socket.emit('space:delete-doc', {
            spaceType: this.spaceType,
            spaceId: this.spaceId,
            docId: this.idConverter.newIdToOldId(docId),
        });
    }
    async setDocSnapshot() {
        return false;
    }
    async getDocUpdates() {
        return [];
    }
    async markUpdatesMerged() {
        return 0;
    }
}
class CloudDocStorageConnection extends SocketConnection {
    constructor(options, onServerUpdate) {
        super(options.serverBaseUrl, options.isSelfHosted);
        this.options = options;
        this.onServerUpdate = onServerUpdate;
        this.idConverter = null;
    }
    async doConnect(signal) {
        const { socket, disconnect } = await super.doConnect(signal);
        try {
            const res = await socket.emitWithAck('space:join', {
                spaceType: this.options.type,
                spaceId: this.options.id,
                clientVersion: BUILD_CONFIG.appVersion,
            });
            if ('error' in res) {
                throw new Error(res.error.message);
            }
            if (!this.idConverter) {
                this.idConverter = await this.getIdConverter(socket);
            }
            socket.on('space:broadcast-doc-update', this.onServerUpdate);
            return { socket, disconnect };
        }
        catch (e) {
            disconnect();
            throw e;
        }
    }
    doDisconnect({ socket, disconnect, }) {
        socket.emit('space:leave', {
            spaceType: this.options.type,
            spaceId: this.options.id,
        });
        socket.off('space:broadcast-doc-update', this.onServerUpdate);
        super.doDisconnect({ socket, disconnect });
    }
    async getIdConverter(socket) {
        return getIdConverter({
            getDocBuffer: async (id) => {
                const response = await socket.emitWithAck('space:load-doc', {
                    spaceType: this.options.type,
                    spaceId: this.options.id,
                    docId: id,
                });
                if ('error' in response) {
                    if (response.error.name === 'DOC_NOT_FOUND') {
                        return null;
                    }
                    // TODO: use [UserFriendlyError]
                    throw new Error(response.error.message);
                }
                return base64ToUint8Array(response.data.missing);
            },
        }, this.options.id);
    }
}
//# sourceMappingURL=doc.js.map