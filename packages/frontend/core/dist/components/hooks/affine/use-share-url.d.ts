import type { SerializedXYWH } from '@blocksuite/affine/global/gfx';
import { type DocMode } from '@blocksuite/affine/model';
import { type EditorHost } from '@blocksuite/affine/std';
export type UseSharingUrl = {
    workspaceId: string;
    pageId: string;
    mode?: DocMode;
    blockIds?: string[];
    elementIds?: string[];
    xywh?: SerializedXYWH;
};
/**
 * To generate a url like
 *
 * https://app.affine.pro/workspace/workspaceId/docId?mode=DocMode&elementIds=seletedElementIds&blockIds=selectedBlockIds
 */
export declare const generateUrl: ({ baseUrl, workspaceId, pageId, blockIds, elementIds, mode, xywh, }: UseSharingUrl & {
    baseUrl: string;
}) => string | undefined;
export declare const getSelectedNodes: (host: EditorHost | null, mode?: DocMode) => {
    blockIds: string[];
    elementIds: string[];
};
export declare const useSharingUrl: ({ workspaceId, pageId }: UseSharingUrl) => {
    onClickCopyLink: (mode?: DocMode, blockIds?: string[], elementIds?: string[]) => void;
};
//# sourceMappingURL=use-share-url.d.ts.map