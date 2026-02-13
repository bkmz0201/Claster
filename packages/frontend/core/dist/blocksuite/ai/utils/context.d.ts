import type { SerializedXYWH } from '@blocksuite/affine/global/gfx';
import type { MindmapStyle } from '@blocksuite/affine/model';
import type { GfxModel } from '@blocksuite/affine/std/gfx';
import type { TemplateImage } from '../slides/template';
export interface ContextValue {
    selectedElements?: GfxModel[];
    content?: string;
    width?: number;
    height?: number;
    node?: MindMapNode | null;
    style?: MindmapStyle;
    centerPosition?: SerializedXYWH;
    contents?: Array<{
        blocks: AffineNode;
    }>;
    images?: TemplateImage[][];
}
export interface AffineNode {
    id: string;
    flavour: string;
    children: AffineNode[];
}
type MindMapNode = {
    xywh?: SerializedXYWH;
    text: string;
    children: MindMapNode[];
};
export declare class AIContext {
    private _value;
    constructor(initData?: ContextValue);
    get: () => ContextValue;
    set: (data: ContextValue) => void;
}
export {};
//# sourceMappingURL=context.d.ts.map