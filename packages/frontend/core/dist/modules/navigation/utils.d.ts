import type { ReferenceParams } from '@blocksuite/affine/model';
import type { ParsedQuery, ParseOptions } from 'query-string';
export declare const resolveRouteLinkMeta: (href: string, baseUrl?: string) => {
    location: {
        pathname: string;
        search: string;
        hash: string;
    };
    basename: string;
    workspaceId: string;
    moduleName: "all" | "collection" | "trash" | "tag";
    subModuleName: string;
    docId?: undefined;
} | {
    location: {
        pathname: string;
        search: string;
        hash: string;
    };
    basename: string;
    workspaceId: string;
    moduleName: "doc";
    docId: string;
    subModuleName?: undefined;
} | null;
export declare const isLink: (str: string) => boolean;
/**
 * @see /packages/frontend/core/src/router.tsx
 */
export declare const routeModulePaths: readonly ["all", "collection", "tag", "trash"];
export type RouteModulePath = (typeof routeModulePaths)[number];
export declare const resolveLinkToDoc: (href: string, baseUrl?: string) => {
    mode?: "edgeless" | "page" | undefined;
    blockIds?: string[] | undefined;
    elementIds?: string[] | undefined;
    databaseId?: string | undefined;
    databaseRowId?: string | undefined;
    xywh?: `[${number},${number},${number},${number}]` | undefined;
    commentId?: string | undefined;
    refreshKey?: string;
    docId: string;
    workspaceId: string;
} | null;
export declare const preprocessParams: (params: ParsedQuery<string>) => ReferenceParams & {
    refreshKey?: string;
};
export declare const paramsParseOptions: ParseOptions;
export declare function toURLSearchParams(params?: Partial<Record<string, string | string[]>>): URLSearchParams | undefined;
export declare function toDocSearchParams(params?: ReferenceParams & {
    refreshKey?: string;
}): URLSearchParams | undefined;
//# sourceMappingURL=utils.d.ts.map