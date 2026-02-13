import { Entity, LiveData } from '@toeverything/infra';
import type { ReadwiseStore } from '../store/readwise';
import type { ReadwiseCrawlingData } from '../type';
export declare class ReadwiseCrawler extends Entity {
    private readonly readwiseStore;
    crawling$: LiveData<boolean>;
    data$: LiveData<ReadwiseCrawlingData | null>;
    error$: LiveData<Error | null>;
    constructor(readwiseStore: ReadwiseStore);
    private authHeaders;
    private fetchHighlights;
    verifyToken(token: string): Promise<boolean>;
    crawl: import("@toeverything/infra").Effect<unknown>;
    abort(): void;
    reset(): void;
    dispose(): void;
}
//# sourceMappingURL=readwise-crawler.d.ts.map