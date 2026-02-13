import { Entity, LiveData } from '@toeverything/infra';
import type { DocsService } from '../../doc';
import type { IntegrationRefStore } from '../store/integration-ref';
import type { ReadwiseStore } from '../store/readwise';
import type { ReadwiseBook, ReadwiseBookMap, ReadwiseConfig, ReadwiseHighlight, ReadwiseRefMeta } from '../type';
import { ReadwiseCrawler } from './readwise-crawler';
import type { IntegrationWriter } from './writer';
export declare class ReadwiseIntegration extends Entity<{
    writer: IntegrationWriter;
}> {
    private readonly integrationRefStore;
    private readonly readwiseStore;
    private readonly docsService;
    writer: IntegrationWriter;
    crawler: ReadwiseCrawler;
    constructor(integrationRefStore: IntegrationRefStore, readwiseStore: ReadwiseStore, docsService: DocsService);
    importing$: LiveData<boolean>;
    settings$: LiveData<ReadwiseConfig | undefined>;
    setting$<T extends keyof ReadwiseConfig>(key: T): LiveData<ReadwiseConfig[T]>;
    updateSetting<T extends keyof ReadwiseConfig>(key: T, value: ReadwiseConfig[T]): void;
    /**
     * Get all integration metas of current user & token in current workspace
     */
    getRefs(): Promise<{
        refMeta: ReadwiseRefMeta;
        id: string;
        type: "readwise";
        integrationId: string;
    }[]>;
    highlightsToAffineDocs(highlights: ReadwiseHighlight[], books: ReadwiseBookMap, options: {
        signal?: AbortSignal;
        onProgress?: (progress: number) => void;
        onComplete?: () => void;
        onAbort?: (finished: number) => void;
    }): Promise<void>;
    highlightToAffineDoc(highlight: ReadwiseHighlight, book: Omit<ReadwiseBook, 'highlights'>, docId: string | undefined, options: {
        integrationId: string;
        userId: string;
        updateStrategy?: ReadwiseConfig['updateStrategy'];
        tags?: string[];
    }): Promise<void>;
    getAction(info: {
        localUpdatedAt?: string;
        remoteUpdatedAt?: string;
        updateStrategy?: ReadwiseConfig['updateStrategy'];
        syncNewHighlights?: ReadwiseConfig['syncNewHighlights'];
    }): "skip" | "update" | "new";
    connect(token: string): void;
    disconnect(): void;
    /**
     * Delete all highlights of current user in current workspace
     */
    deleteAll(): Promise<void>;
}
//# sourceMappingURL=readwise.d.ts.map