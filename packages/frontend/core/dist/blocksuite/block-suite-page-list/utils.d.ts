import { type DocMode } from '@blocksuite/affine/model';
import type { Workspace } from '@blocksuite/affine/store';
export declare const usePageHelper: (docCollection: Workspace) => {
    createPage: (mode?: DocMode, options?: {
        at?: "new-tab" | "tail" | "active";
        show?: boolean;
    }) => import("@affine/core/modules/doc").DocRecord;
    createEdgeless: (options?: {
        at?: "new-tab" | "tail" | "active";
        show?: boolean;
    }) => import("@affine/core/modules/doc").DocRecord;
    importFile: () => Promise<{
        isWorkspaceFile: boolean;
        importedCount: number;
    }>;
};
//# sourceMappingURL=utils.d.ts.map