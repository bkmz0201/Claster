import { MindmapElementModel, NoteBlockModel } from '@blocksuite/affine/model';
import type { BlockComponent } from '@blocksuite/affine/std';
import type { GfxModel } from '@blocksuite/affine/std/gfx';
export declare function mindMapToMarkdown(mindmap: MindmapElementModel): string;
export declare function isMindMapRoot(ele: GfxModel): boolean;
export declare function isMindmapChild(ele: GfxModel): boolean;
export { getEdgelessCopilotWidget } from './get-edgeless-copilot-widget';
export declare function findNoteBlockModel(blockElement: BlockComponent): NoteBlockModel | null;
//# sourceMappingURL=edgeless.d.ts.map