import type { DefaultOpenProperty } from '@affine/core/components/properties';
import type { DocMode } from '@blocksuite/affine/model';
import type { Doc } from '../../doc';
import { type Editor, type EditorSelector } from '../../editor';
export declare const useEditor: (pageId: string, preferMode?: DocMode, preferSelector?: EditorSelector, defaultOpenProperty?: DefaultOpenProperty, canLoad?: boolean) => {
    doc: Doc | null;
    editor: Editor | null;
    workspace: import("../../workspace").Workspace;
    loading: boolean;
};
//# sourceMappingURL=utils.d.ts.map