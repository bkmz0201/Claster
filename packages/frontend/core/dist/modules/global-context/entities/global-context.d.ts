import type { DocMode } from '@blocksuite/affine/model';
import { Entity, LiveData, MemoryMemento } from '@toeverything/infra';
export declare class GlobalContext extends Entity {
    memento: MemoryMemento;
    workspaceId: {
        get: () => string | null;
        set: (value: string | null) => void;
        $: LiveData<string | null | undefined>;
    };
    workspaceFlavour: {
        get: () => string | null;
        set: (value: string | null) => void;
        $: LiveData<string | null | undefined>;
    };
    serverId: {
        get: () => string | null;
        set: (value: string | null) => void;
        $: LiveData<string | null | undefined>;
    };
    /**
     * is in doc page
     */
    isDoc: {
        get: () => boolean | null;
        set: (value: boolean | null) => void;
        $: LiveData<boolean | null | undefined>;
    };
    isTrashDoc: {
        get: () => boolean | null;
        set: (value: boolean | null) => void;
        $: LiveData<boolean | null | undefined>;
    };
    docId: {
        get: () => string | null;
        set: (value: string | null) => void;
        $: LiveData<string | null | undefined>;
    };
    docMode: {
        get: () => DocMode | null;
        set: (value: DocMode | null) => void;
        $: LiveData<DocMode | null | undefined>;
    };
    /**
     * is in collection page
     */
    isCollection: {
        get: () => boolean | null;
        set: (value: boolean | null) => void;
        $: LiveData<boolean | null | undefined>;
    };
    collectionId: {
        get: () => string | null;
        set: (value: string | null) => void;
        $: LiveData<string | null | undefined>;
    };
    /**
     * is in trash page
     */
    isTrash: {
        get: () => boolean | null;
        set: (value: boolean | null) => void;
        $: LiveData<boolean | null | undefined>;
    };
    /**
     * is in tag page
     */
    isTag: {
        get: () => boolean | null;
        set: (value: boolean | null) => void;
        $: LiveData<boolean | null | undefined>;
    };
    tagId: {
        get: () => string | null;
        set: (value: string | null) => void;
        $: LiveData<string | null | undefined>;
    };
    /**
     * is in all docs page
     */
    isAllDocs: {
        get: () => boolean | null;
        set: (value: boolean | null) => void;
        $: LiveData<boolean | null | undefined>;
    };
    define<T>(key: string, defaultValue?: T | null): {
        get: () => T | null;
        set: (value: T | null) => void;
        $: LiveData<T | null | undefined>;
    };
}
//# sourceMappingURL=global-context.d.ts.map