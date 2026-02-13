import { type DocMeta, type DocsPropertiesMeta, type WorkspaceMeta } from '@blocksuite/affine/store';
import { Subject } from 'rxjs';
import type * as Y from 'yjs';
export declare class WorkspaceMetaImpl implements WorkspaceMeta {
    commonFieldsUpdated: Subject<void>;
    docMetaAdded: Subject<string>;
    docMetaRemoved: Subject<string>;
    docMetaUpdated: Subject<void>;
    private readonly _handleDocCollectionMetaEvents;
    private readonly _id;
    private readonly _doc;
    private readonly _proxy;
    private readonly _yMap;
    private _prevDocs;
    get avatar(): string | undefined;
    setAvatar(avatar: string): void;
    get name(): string | undefined;
    setName(name: string): void;
    get properties(): DocsPropertiesMeta;
    setProperties(meta: DocsPropertiesMeta): void;
    get docMetas(): DocMeta[];
    get docs(): unknown[] | undefined;
    get yDocs(): Y.Array<unknown>;
    constructor(doc: Y.Doc);
    private _handleCommonFieldsEvent;
    private _handleDocMetaEvent;
    addDocMeta(doc: DocMeta, index?: number): void;
    getDocMeta(id: string): DocMeta | undefined;
    initialize(): void;
    removeDocMeta(id: string): void;
    setDocMeta(id: string, props: Partial<DocMeta>): void;
}
//# sourceMappingURL=meta.d.ts.map