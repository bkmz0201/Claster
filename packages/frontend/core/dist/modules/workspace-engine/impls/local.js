import { DebugLogger } from '@affine/debug';
import { universalId, } from '@affine/nbstore';
import { IndexedDBBlobStorage, IndexedDBBlobSyncStorage, IndexedDBDocStorage, IndexedDBDocSyncStorage, IndexedDBIndexerStorage, } from '@affine/nbstore/idb';
import { IndexedDBV1BlobStorage, IndexedDBV1DocStorage, } from '@affine/nbstore/idb/v1';
import { SqliteBlobStorage, SqliteBlobSyncStorage, SqliteDocStorage, SqliteDocSyncStorage, SqliteIndexerStorage, } from '@affine/nbstore/sqlite';
import { SqliteV1BlobStorage, SqliteV1DocStorage, } from '@affine/nbstore/sqlite/v1';
import { LiveData, Service } from '@toeverything/infra';
import { isEqual } from 'lodash-es';
import { nanoid } from 'nanoid';
import { Observable } from 'rxjs';
import { Doc as YDoc, encodeStateAsUpdate } from 'yjs';
import { DesktopApiService } from '../../desktop-api';
import { WorkspaceImpl } from '../../workspace/impls/workspace';
import { getWorkspaceProfileWorker } from './out-worker';
export const LOCAL_WORKSPACE_LOCAL_STORAGE_KEY = 'affine-local-workspace';
const LOCAL_WORKSPACE_CHANGED_BROADCAST_CHANNEL_KEY = 'affine-local-workspace-changed';
const logger = new DebugLogger('local-workspace');
export function getLocalWorkspaceIds() {
    try {
        return JSON.parse(localStorage.getItem(LOCAL_WORKSPACE_LOCAL_STORAGE_KEY) ?? '[]');
    }
    catch (e) {
        logger.error('Failed to get local workspace ids', e);
        return [];
    }
}
export function setLocalWorkspaceIds(idsOrUpdater) {
    localStorage.setItem(LOCAL_WORKSPACE_LOCAL_STORAGE_KEY, JSON.stringify(typeof idsOrUpdater === 'function'
        ? idsOrUpdater(getLocalWorkspaceIds())
        : idsOrUpdater));
}
class LocalWorkspaceFlavourProvider {
    constructor(framework) {
        this.framework = framework;
        this.flavour = 'local';
        this.notifyChannel = new BroadcastChannel(LOCAL_WORKSPACE_CHANGED_BROADCAST_CHANNEL_KEY);
        this.DocStorageType = BUILD_CONFIG.isElectron || BUILD_CONFIG.isIOS || BUILD_CONFIG.isAndroid
            ? SqliteDocStorage
            : IndexedDBDocStorage;
        this.DocStorageV1Type = BUILD_CONFIG.isElectron
            ? SqliteV1DocStorage
            : BUILD_CONFIG.isWeb || BUILD_CONFIG.isMobileWeb
                ? IndexedDBV1DocStorage
                : undefined;
        this.BlobStorageType = BUILD_CONFIG.isElectron || BUILD_CONFIG.isIOS || BUILD_CONFIG.isAndroid
            ? SqliteBlobStorage
            : IndexedDBBlobStorage;
        this.BlobStorageV1Type = BUILD_CONFIG.isElectron
            ? SqliteV1BlobStorage
            : BUILD_CONFIG.isWeb || BUILD_CONFIG.isMobileWeb
                ? IndexedDBV1BlobStorage
                : undefined;
        this.DocSyncStorageType = BUILD_CONFIG.isElectron || BUILD_CONFIG.isIOS || BUILD_CONFIG.isAndroid
            ? SqliteDocSyncStorage
            : IndexedDBDocSyncStorage;
        this.BlobSyncStorageType = BUILD_CONFIG.isElectron || BUILD_CONFIG.isIOS || BUILD_CONFIG.isAndroid
            ? SqliteBlobSyncStorage
            : IndexedDBBlobSyncStorage;
        this.IndexerStorageType = BUILD_CONFIG.isElectron
            ? SqliteIndexerStorage
            : IndexedDBIndexerStorage;
        this.workspaces$ = LiveData.from(new Observable(subscriber => {
            let last = null;
            const emit = () => {
                const value = getLocalWorkspaceIds().map(id => ({
                    id,
                    flavour: 'local',
                }));
                if (isEqual(last, value))
                    return;
                subscriber.next(value);
                last = value;
            };
            emit();
            const channel = new BroadcastChannel(LOCAL_WORKSPACE_CHANGED_BROADCAST_CHANNEL_KEY);
            channel.addEventListener('message', emit);
            return () => {
                channel.removeEventListener('message', emit);
                channel.close();
            };
        }), []);
        this.isRevalidating$ = new LiveData(false);
    }
    async deleteWorkspace(id) {
        setLocalWorkspaceIds(ids => ids.filter(x => x !== id));
        // TODO(@forehalo): deleting logic for indexeddb workspaces
        if (BUILD_CONFIG.isElectron) {
            const electronApi = this.framework.get(DesktopApiService);
            await electronApi.handler.workspace.moveToTrash(universalId({ peer: 'local', type: 'workspace', id }));
        }
        // notify all browser tabs, so they can update their workspace list
        this.notifyChannel.postMessage(id);
    }
    async createWorkspace(initial) {
        const id = nanoid();
        // save the initial state to local storage, then sync to cloud
        const docStorage = new this.DocStorageType({
            id: id,
            flavour: this.flavour,
            type: 'workspace',
        });
        docStorage.connection.connect();
        await docStorage.connection.waitForConnected();
        const blobStorage = new this.BlobStorageType({
            id: id,
            flavour: this.flavour,
            type: 'workspace',
        });
        blobStorage.connection.connect();
        await blobStorage.connection.waitForConnected();
        const docList = new Set();
        const docCollection = new WorkspaceImpl({
            id: id,
            rootDoc: new YDoc({ guid: id }),
            blobSource: {
                get: async (key) => {
                    const record = await blobStorage.get(key);
                    return record ? new Blob([record.data], { type: record.mime }) : null;
                },
                delete: async () => {
                    return;
                },
                list: async () => {
                    return [];
                },
                set: async (id, blob) => {
                    await blobStorage.set({
                        key: id,
                        data: new Uint8Array(await blob.arrayBuffer()),
                        mime: blob.type,
                    });
                    return id;
                },
                name: 'blob',
                readonly: false,
            },
            onLoadDoc(doc) {
                docList.add(doc);
            },
        });
        try {
            // apply initial state
            await initial(docCollection, blobStorage, docStorage);
            for (const subdocs of docList) {
                await docStorage.pushDocUpdate({
                    docId: subdocs.guid,
                    bin: encodeStateAsUpdate(subdocs),
                });
            }
            docStorage.connection.disconnect();
            blobStorage.connection.disconnect();
            // save workspace id to local storage
            setLocalWorkspaceIds(ids => [...ids, id]);
            // notify all browser tabs, so they can update their workspace list
            this.notifyChannel.postMessage(id);
        }
        finally {
            docCollection.dispose();
        }
        return { id, flavour: 'local' };
    }
    revalidate() {
        // notify livedata to re-scan workspaces
        this.notifyChannel.postMessage(null);
    }
    async getWorkspaceProfile(id) {
        const docStorage = new this.DocStorageType({
            id: id,
            flavour: this.flavour,
            type: 'workspace',
            readonlyMode: true,
        });
        docStorage.connection.connect();
        await docStorage.connection.waitForConnected();
        const localData = await docStorage.getDoc(id);
        docStorage.connection.disconnect();
        if (!localData) {
            return {
                isOwner: true,
            };
        }
        const client = getWorkspaceProfileWorker();
        const result = await client.call('renderWorkspaceProfile', [localData.bin].filter(Boolean));
        return {
            name: result.name,
            avatar: result.avatar,
            isOwner: true,
        };
    }
    async getWorkspaceBlob(id, blobKey) {
        const storage = new this.BlobStorageType({
            id: id,
            flavour: this.flavour,
            type: 'workspace',
        });
        storage.connection.connect();
        await storage.connection.waitForConnected();
        const blob = await storage.get(blobKey);
        return blob ? new Blob([blob.data], { type: blob.mime }) : null;
    }
    async listBlobs(id) {
        const storage = new this.BlobStorageType({
            id: id,
            flavour: this.flavour,
            type: 'workspace',
        });
        storage.connection.connect();
        await storage.connection.waitForConnected();
        return storage.list();
    }
    async deleteBlob(id, blob, permanent) {
        const storage = new this.BlobStorageType({
            id: id,
            flavour: this.flavour,
            type: 'workspace',
        });
        storage.connection.connect();
        await storage.connection.waitForConnected();
        await storage.delete(blob, permanent);
    }
    getEngineWorkerInitOptions(workspaceId) {
        return {
            local: {
                doc: {
                    name: this.DocStorageType.identifier,
                    opts: {
                        flavour: this.flavour,
                        type: 'workspace',
                        id: workspaceId,
                    },
                },
                blob: {
                    name: this.BlobStorageType.identifier,
                    opts: {
                        flavour: this.flavour,
                        type: 'workspace',
                        id: workspaceId,
                    },
                },
                blobSync: {
                    name: this.BlobSyncStorageType.identifier,
                    opts: {
                        flavour: this.flavour,
                        type: 'workspace',
                        id: workspaceId,
                    },
                },
                docSync: {
                    name: this.DocSyncStorageType.identifier,
                    opts: {
                        flavour: this.flavour,
                        type: 'workspace',
                        id: workspaceId,
                    },
                },
                awareness: {
                    name: 'BroadcastChannelAwarenessStorage',
                    opts: {
                        id: workspaceId,
                    },
                },
                indexer: {
                    name: this.IndexerStorageType.identifier,
                    opts: {
                        flavour: this.flavour,
                        type: 'workspace',
                        id: workspaceId,
                    },
                },
                indexerSync: {
                    name: 'IndexedDBIndexerSyncStorage',
                    opts: {
                        flavour: this.flavour,
                        type: 'workspace',
                        id: workspaceId,
                    },
                },
            },
            remotes: {
                v1: {
                    doc: this.DocStorageV1Type
                        ? {
                            name: this.DocStorageV1Type.identifier,
                            opts: {
                                id: workspaceId,
                                type: 'workspace',
                            },
                        }
                        : undefined,
                    blob: this.BlobStorageV1Type
                        ? {
                            name: this.BlobStorageV1Type.identifier,
                            opts: {
                                id: workspaceId,
                                type: 'workspace',
                            },
                        }
                        : undefined,
                },
            },
        };
    }
}
export class LocalWorkspaceFlavoursProvider extends Service {
    constructor() {
        super();
        this.workspaceFlavours$ = new LiveData([
            new LocalWorkspaceFlavourProvider(this.framework),
        ]);
    }
}
//# sourceMappingURL=local.js.map