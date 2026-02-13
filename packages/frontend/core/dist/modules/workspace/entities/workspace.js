import { Entity, LiveData, yjsGetPath } from '@toeverything/infra';
import { Doc as YDoc, transact } from 'yjs';
import { DocsService } from '../../doc';
import { WorkspaceImpl } from '../impls/workspace';
import { WorkspaceEngineService } from '../services/engine';
export class Workspace extends Entity {
    constructor(scope, featureFlagService) {
        super();
        this.scope = scope;
        this.featureFlagService = featureFlagService;
        this.id = this.scope.props.openOptions.metadata.id;
        this.openOptions = this.scope.props.openOptions;
        this.meta = this.scope.props.openOptions.metadata;
        this.flavour = this.meta.flavour;
        this.rootYDoc = new YDoc({ guid: this.openOptions.metadata.id });
        this._docCollection = null;
        this.name$ = LiveData.from(yjsGetPath(this.rootYDoc.getMap('meta'), 'name'), undefined);
        this.avatar$ = LiveData.from(yjsGetPath(this.rootYDoc.getMap('meta'), 'avatar'), undefined);
    }
    get docCollection() {
        if (!this._docCollection) {
            this._docCollection = new WorkspaceImpl({
                id: this.openOptions.metadata.id,
                rootDoc: this.rootYDoc,
                featureFlagService: this.featureFlagService,
                blobSource: {
                    get: async (key) => {
                        const record = await this.engine.blob.get(key);
                        return record
                            ? new Blob([record.data], { type: record.mime })
                            : null;
                    },
                    delete: async () => {
                        return;
                    },
                    list: async () => {
                        return [];
                    },
                    set: async (id, blob) => {
                        await this.engine.blob.set({
                            key: id,
                            data: new Uint8Array(await blob.arrayBuffer()),
                            mime: blob.type,
                        });
                        return id;
                    },
                    /* eslint-disable rxjs/finnish */
                    blobState$: key => this.engine.blob.blobState$(key),
                    upload: key => this.engine.blob.upload(key),
                    name: 'blob',
                    readonly: false,
                },
                onLoadDoc: doc => this.engine.doc.connectDoc(doc),
                onLoadAwareness: awareness => this.engine.awareness.connectAwareness(awareness),
                onCreateDoc: docId => this.docs.createDoc({ id: docId, skipInit: true }).id,
            });
        }
        return this._docCollection;
    }
    get docs() {
        return this.scope.get(DocsService);
    }
    get canGracefulStop() {
        // TODO
        return true;
    }
    get engine() {
        return this.framework.get(WorkspaceEngineService).engine;
    }
    setAvatar(avatar) {
        transact(this.rootYDoc, () => {
            this.rootYDoc.getMap('meta').set('avatar', avatar);
        }, { force: true });
    }
    setName(name) {
        transact(this.rootYDoc, () => {
            this.rootYDoc.getMap('meta').set('name', name);
        }, { force: true });
    }
    dispose() {
        this.docCollection.dispose();
    }
}
//# sourceMappingURL=workspace.js.map