import type { Page } from '@playwright/test';
/**
 * using page.evaluate to init the embed synced doc state
 * @param page - playwright page
 * @param data.title - the title of the doc
 * @param data.content - the content of the doc
 * @param data.inEdgeless - whether this doc is in parent doc's canvas, default is in page
 * @param option.chain - doc1 -> doc2 -> doc3 -> ..., if chain is false, doc1 will be the parent of remaining docs
 * @returns the ids of created docs
 */
export declare function initEmbedSyncedDocState(page: Page, data: {
    title: string;
    content: string;
    inEdgeless?: boolean;
}[], option?: {
    chain?: boolean;
}): Promise<string[]>;
//# sourceMappingURL=utils.d.ts.map