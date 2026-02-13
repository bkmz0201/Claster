import { AwarenessStore, type Doc, type ExtensionType, type GetStoreOptions, type YBlock } from '@blocksuite/affine/store';
import * as Y from 'yjs';
import type { WorkspaceImpl } from './workspace';
type DocOptions = {
    id: string;
    collection: WorkspaceImpl;
    doc: Y.Doc;
};
export declare class DocImpl implements Doc {
    private readonly _collection;
    private readonly _storeContainer;
    private readonly _initSpaceDoc;
    private _loaded;
    /** Indicate whether the block tree is ready */
    private _ready;
    protected readonly _yBlocks: Y.Map<YBlock>;
    /**
     * @internal Used for convenient access to the underlying Yjs map,
     * can be used interchangeably with ySpace
     */
    protected readonly _ySpaceDoc: Y.Doc;
    readonly storeExtensions: ExtensionType[];
    readonly awarenessStore: AwarenessStore;
    readonly id: string;
    readonly rootDoc: Y.Doc;
    get blobSync(): import("@blocksuite/sync").BlobEngine;
    get workspace(): WorkspaceImpl;
    get isEmpty(): boolean;
    get loaded(): boolean;
    get meta(): import("@blocksuite/store").DocMeta | undefined;
    get ready(): boolean;
    get spaceDoc(): Y.Doc;
    get yBlocks(): Y.Map<YBlock>;
    constructor({ id, collection, doc }: DocOptions);
    clear(): void;
    get removeStore(): ({ readonly, query, id }: import("@blocksuite/store").RemoveStoreOptions) => void;
    private _destroy;
    dispose(): void;
    getStore({ readonly, query, provider, extensions, id, }?: GetStoreOptions): import("@blocksuite/store").Store;
    load(initFn?: () => void): this;
    remove(): void;
}
export {};
//# sourceMappingURL=doc.d.ts.map