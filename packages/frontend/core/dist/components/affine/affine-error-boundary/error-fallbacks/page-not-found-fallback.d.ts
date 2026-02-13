import type { Workspace } from '@blocksuite/affine/store';
declare class PageNotFoundError extends TypeError {
    readonly docCollection: Workspace;
    readonly pageId: string;
    constructor(docCollection: Workspace, pageId: string);
}
export declare const PageNotFoundDetail: import("react").FC<import("..").FallbackProps<PageNotFoundError>>;
export {};
//# sourceMappingURL=page-not-found-fallback.d.ts.map