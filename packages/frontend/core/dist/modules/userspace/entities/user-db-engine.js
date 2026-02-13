import { ServerDeploymentType } from '@affine/graphql';
import { IndexedDBDocStorage, IndexedDBDocSyncStorage, } from '@affine/nbstore/idb';
import { SqliteDocStorage, SqliteDocSyncStorage } from '@affine/nbstore/sqlite';
import { Entity } from '@toeverything/infra';
export class UserDBEngine extends Entity {
    canGracefulStop() {
        // TODO(@eyhn): Implement this
        return true;
    }
    constructor(nbstoreService, serverService) {
        super();
        this.nbstoreService = nbstoreService;
        this.userId = this.props.userId;
        this.DocStorageType = BUILD_CONFIG.isElectron || BUILD_CONFIG.isIOS || BUILD_CONFIG.isAndroid
            ? SqliteDocStorage
            : IndexedDBDocStorage;
        this.DocSyncStorageType = BUILD_CONFIG.isElectron || BUILD_CONFIG.isIOS || BUILD_CONFIG.isAndroid
            ? SqliteDocSyncStorage
            : IndexedDBDocSyncStorage;
        const { store, dispose } = this.nbstoreService.openStore(`userspace:${serverService.server.id},${this.userId}`, {
            local: {
                doc: {
                    name: this.DocStorageType.identifier,
                    opts: {
                        type: 'userspace',
                        flavour: serverService.server.id,
                        id: this.userId,
                    },
                },
                docSync: {
                    name: this.DocSyncStorageType.identifier,
                    opts: {
                        type: 'userspace',
                        flavour: serverService.server.id,
                        id: this.userId,
                    },
                },
            },
            remotes: {
                cloud: {
                    doc: {
                        name: 'CloudDocStorage',
                        opts: {
                            id: this.userId,
                            serverBaseUrl: serverService.server.baseUrl,
                            type: 'userspace',
                            isSelfHosted: serverService.server.config$.value.type ===
                                ServerDeploymentType.Selfhosted,
                        },
                    },
                },
            },
        });
        this.client = store;
        this.client.docFrontend.start();
        this.disposables.push(() => dispose());
    }
}
//# sourceMappingURL=user-db-engine.js.map