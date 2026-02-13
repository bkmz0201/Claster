// packages/frontend/core/src/blocksuite/ai/hooks/useChatPanelConfig.ts
import { AINetworkSearchService } from '@affine/core/modules/ai-button/services/network-search';
import { AIPlaygroundService } from '@affine/core/modules/ai-button/services/playground';
import { AIReasoningService } from '@affine/core/modules/ai-button/services/reasoning';
import { CollectionService } from '@affine/core/modules/collection';
import { DocsService } from '@affine/core/modules/doc';
import { DocDisplayMetaService } from '@affine/core/modules/doc-display-meta';
import { DocsSearchService } from '@affine/core/modules/docs-search';
import { SearchMenuService, } from '@affine/core/modules/search-menu/services';
import { TagService } from '@affine/core/modules/tag';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { createSignalFromObservable } from '@blocksuite/affine/shared/utils';
import { useFramework } from '@toeverything/infra';
export function useAIChatConfig() {
    const framework = useFramework();
    const searchService = framework.get(AINetworkSearchService);
    const reasoningService = framework.get(AIReasoningService);
    const playgroundService = framework.get(AIPlaygroundService);
    const docDisplayMetaService = framework.get(DocDisplayMetaService);
    const workspaceService = framework.get(WorkspaceService);
    const searchMenuService = framework.get(SearchMenuService);
    const docsSearchService = framework.get(DocsSearchService);
    const tagService = framework.get(TagService);
    const collectionService = framework.get(CollectionService);
    const docsService = framework.get(DocsService);
    const networkSearchConfig = {
        visible: searchService.visible,
        enabled: searchService.enabled,
        setEnabled: searchService.setEnabled,
    };
    const reasoningConfig = {
        enabled: reasoningService.enabled,
        setEnabled: reasoningService.setEnabled,
    };
    const playgroundConfig = {
        visible: playgroundService.visible,
    };
    const docDisplayConfig = {
        getIcon: (docId) => {
            return docDisplayMetaService.icon$(docId, { type: 'lit' }).value;
        },
        getTitle: (docId) => {
            return docDisplayMetaService.title$(docId).value;
        },
        getTitleSignal: (docId) => {
            const title$ = docDisplayMetaService.title$(docId);
            return createSignalFromObservable(title$, '');
        },
        getDocMeta: (docId) => {
            const docRecord = docsService.list.doc$(docId).value;
            return docRecord?.meta$.value ?? null;
        },
        getDocPrimaryMode: (docId) => {
            const docRecord = docsService.list.doc$(docId).value;
            return docRecord?.primaryMode$.value ?? 'page';
        },
        getDoc: (docId) => {
            const doc = workspaceService.workspace.docCollection.getDoc(docId);
            return doc?.getStore() ?? null;
        },
        getReferenceDocs: (docIds) => {
            const docs$ = docsSearchService.watchRefsFrom(docIds);
            return createSignalFromObservable(docs$, []);
        },
        getTags: () => {
            const tagMetas$ = tagService.tagList.tagMetas$;
            return createSignalFromObservable(tagMetas$, []);
        },
        getTagTitle: (tagId) => {
            const tag$ = tagService.tagList.tagByTagId$(tagId);
            return tag$.value?.value$.value ?? '';
        },
        getTagPageIds: (tagId) => {
            const tag$ = tagService.tagList.tagByTagId$(tagId);
            if (!tag$)
                return [];
            return tag$.value?.pageIds$.value ?? [];
        },
        getCollections: () => {
            const collectionMetas$ = collectionService.collectionMetas$;
            return createSignalFromObservable(collectionMetas$, []);
        },
        getCollectionPageIds: (collectionId) => {
            const collection$ = collectionService.collection$(collectionId);
            // TODO: lack of documents that meet the collection rules
            return collection$?.value?.info$.value.allowList ?? [];
        },
    };
    const searchMenuConfig = {
        getDocMenuGroup: (query, action, abortSignal) => {
            return searchMenuService.getDocMenuGroup(query, action, abortSignal);
        },
        getTagMenuGroup: (query, action, abortSignal) => {
            return searchMenuService.getTagMenuGroup(query, action, abortSignal);
        },
        getCollectionMenuGroup: (query, action, abortSignal) => {
            return searchMenuService.getCollectionMenuGroup(query, action, abortSignal);
        },
    };
    return {
        networkSearchConfig,
        reasoningConfig,
        docDisplayConfig,
        searchMenuConfig,
        playgroundConfig,
    };
}
//# sourceMappingURL=use-ai-chat-config.js.map