import { ObjectPool, Service } from '@toeverything/infra';
import type { Doc } from '../entities/doc';
import { DocRecordList } from '../entities/record-list';
import type { DocCreateMiddleware } from '../providers/doc-create-middleware';
import type { DocPropertiesStore } from '../stores/doc-properties';
import type { DocsStore } from '../stores/docs';
import type { DocCreateOptions } from '../types';
export declare class DocsService extends Service {
    private readonly store;
    private readonly docPropertiesStore;
    private readonly docCreateMiddlewares;
    list: DocRecordList;
    pool: ObjectPool<string, Doc>;
    /**
     * Get all property values of a property, used for search
     *
     * Results may include docs in trash or deleted docs
     * Legacy property data such as old `journal` will not be included in the values
     */
    propertyValues$(propertyKey: string): import("rxjs").Observable<Map<string, string | undefined>>;
    /**
     * used for search
     */
    allDocsCreatedDate$(): import("rxjs").Observable<{
        id: string;
        createDate: number;
    }[]>;
    /**
     * used for search
     */
    allDocsUpdatedDate$(): import("rxjs").Observable<{
        id: string;
        updatedDate: number | undefined;
    }[]>;
    allDocsTagIds$(): import("rxjs").Observable<{
        id: string;
        tags: string[];
    }[]>;
    allDocIds$(): import("rxjs").Observable<string[]>;
    allNonTrashDocIds$(): import("rxjs").Observable<string[]>;
    allTrashDocIds$(): import("rxjs").Observable<string[]>;
    allDocTitle$(): import("rxjs").Observable<{
        id: string;
        title: string;
    }[]>;
    constructor(store: DocsStore, docPropertiesStore: DocPropertiesStore, docCreateMiddlewares: DocCreateMiddleware[]);
    loaded(docId: string): {
        doc: Doc;
        release: () => void;
    } | null;
    open(docId: string): {
        doc: Doc;
        release: () => void;
    };
    createDoc(options?: DocCreateOptions): import("..").DocRecord;
    addLinkedDoc(targetDocId: string, linkedDocId: string): Promise<void>;
    changeDocTitle(docId: string, newTitle: string): Promise<void>;
    duplicate(sourceDocId: string, _targetDocId?: string): Promise<string>;
    /**
     * Duplicate a doc from template
     * @param sourceDocId - the id of the source doc to be duplicated
     * @param _targetDocId - the id of the target doc to be duplicated, if not provided, a new doc will be created
     * @returns the id of the new doc
     */
    duplicateFromTemplate(sourceDocId: string, _targetDocId?: string): Promise<string>;
}
//# sourceMappingURL=docs.d.ts.map