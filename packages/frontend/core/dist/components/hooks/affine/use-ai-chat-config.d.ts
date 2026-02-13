import { type SearchCollectionMenuAction, type SearchDocMenuAction, type SearchTagMenuAction } from '@affine/core/modules/search-menu/services';
export declare function useAIChatConfig(): {
    networkSearchConfig: {
        visible: import("@preact/signals-core").Signal<boolean | undefined>;
        enabled: import("@preact/signals-core").Signal<boolean | undefined>;
        setEnabled: (enabled: boolean) => void;
    };
    reasoningConfig: {
        enabled: import("@preact/signals-core").Signal<boolean | undefined>;
        setEnabled: (enabled: boolean) => void;
    };
    docDisplayConfig: {
        getIcon: (docId: string) => any;
        getTitle: (docId: string) => string;
        getTitleSignal: (docId: string) => {
            signal: import("@preact/signals-core").Signal<string>;
            cleanup: () => void;
        };
        getDocMeta: (docId: string) => Partial<import("@blocksuite/store").DocMeta> | null;
        getDocPrimaryMode: (docId: string) => import("@blocksuite/affine-model").DocMode;
        getDoc: (docId: string) => import("@blocksuite/store").Store | null;
        getReferenceDocs: (docIds: string[]) => {
            signal: import("@preact/signals-core").Signal<{
                title: string;
                docId: string;
                params: URLSearchParams | undefined;
            }[]>;
            cleanup: () => void;
        };
        getTags: () => {
            signal: import("@preact/signals-core").Signal<{
                id: string;
                name: string;
                color: string;
                createDate: number | Date;
                updatedDate: number | Date;
            }[]>;
            cleanup: () => void;
        };
        getTagTitle: (tagId: string) => string;
        getTagPageIds: (tagId: string) => string[];
        getCollections: () => {
            signal: import("@preact/signals-core").Signal<{
                id: string;
                name: string;
                title: string;
            }[]>;
            cleanup: () => void;
        };
        getCollectionPageIds: (collectionId: string) => string[];
    };
    searchMenuConfig: {
        getDocMenuGroup: (query: string, action: SearchDocMenuAction, abortSignal: AbortSignal) => import("@blocksuite/affine-widget-linked-doc").LinkedMenuGroup;
        getTagMenuGroup: (query: string, action: SearchTagMenuAction, abortSignal: AbortSignal) => import("@blocksuite/affine-widget-linked-doc").LinkedMenuGroup;
        getCollectionMenuGroup: (query: string, action: SearchCollectionMenuAction, abortSignal: AbortSignal) => import("@blocksuite/affine-widget-linked-doc").LinkedMenuGroup;
    };
    playgroundConfig: {
        visible: import("@preact/signals-core").Signal<boolean | undefined>;
    };
};
//# sourceMappingURL=use-ai-chat-config.d.ts.map