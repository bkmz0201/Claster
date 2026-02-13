import { type Doc, type IdGenerator, type Workspace, type WorkspaceMeta } from '@blocksuite/affine/store';
import { BlobEngine, type BlobSource } from '@blocksuite/affine/sync';
import { Subject } from 'rxjs';
import type { Awareness } from 'y-protocols/awareness.js';
import type { Doc as YDoc } from 'yjs';
import type { FeatureFlagService } from '../../feature-flag';
type WorkspaceOptions = {
    id?: string;
    rootDoc: YDoc;
    blobSource?: BlobSource;
    onLoadDoc?: (doc: YDoc) => void;
    onLoadAwareness?: (awareness: Awareness) => void;
    onCreateDoc?: (docId?: string) => string;
    featureFlagService?: FeatureFlagService;
};
export declare class WorkspaceImpl implements Workspace {
    readonly blobSync: BlobEngine;
    readonly blockCollections: Map<string, Doc>;
    readonly doc: YDoc;
    readonly id: string;
    readonly idGenerator: IdGenerator;
    meta: WorkspaceMeta;
    slots: {
        docListUpdated: Subject<void>;
    };
    get docs(): Map<string, Doc>;
    readonly onLoadDoc?: (doc: YDoc) => void;
    readonly onLoadAwareness?: (awareness: Awareness) => void;
    readonly onCreateDoc?: (docId?: string) => string;
    readonly featureFlagService?: FeatureFlagService;
    constructor({ id, rootDoc, blobSource, onLoadDoc, onLoadAwareness, onCreateDoc, featureFlagService, }: WorkspaceOptions);
    private _bindDocMetaEvents;
    private _hasDoc;
    /**
     * By default, only an empty doc will be created.
     * If the `init` parameter is passed, a `surface`, `note`, and `paragraph` block
     * will be created in the doc simultaneously.
     */
    createDoc(docId?: string): Doc;
    private _getDoc;
    getDoc(docId: string): Doc | null;
    removeDoc(docId: string): void;
    dispose(): void;
}
export {};
//# sourceMappingURL=workspace.d.ts.map