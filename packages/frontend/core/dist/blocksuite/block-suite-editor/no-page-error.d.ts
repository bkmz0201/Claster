import type { Store } from '@blocksuite/affine/store';
/**
 * TODO(@eyhn): Define error to unexpected state together in the future.
 */
export declare class NoPageRootError extends Error {
    page: Store;
    constructor(page: Store);
}
//# sourceMappingURL=no-page-error.d.ts.map