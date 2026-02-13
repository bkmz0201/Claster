import { SurfaceBlockModel } from '@blocksuite/affine/blocks/surface';
import { MindmapElementModel, NoteBlockModel, RootBlockModel, } from '@blocksuite/affine/model';
import { matchModels } from '@blocksuite/affine/shared/utils';
export function mindMapToMarkdown(mindmap) {
    let markdownStr = '';
    const traverse = (node, indent = 0) => {
        const text = node.element.text?.toString() ?? '';
        markdownStr += `${'  '.repeat(indent)}- ${text}\n`;
        if (node.children) {
            node.children.forEach(node => traverse(node, indent + 2));
        }
    };
    traverse(mindmap.tree, 0);
    return markdownStr;
}
export function isMindMapRoot(ele) {
    const group = ele?.group;
    return group instanceof MindmapElementModel && group.tree.element === ele;
}
export function isMindmapChild(ele) {
    return ele?.group instanceof MindmapElementModel && !isMindMapRoot(ele);
}
export { getEdgelessCopilotWidget } from './get-edgeless-copilot-widget';
export function findNoteBlockModel(blockElement) {
    let curBlock = blockElement;
    while (curBlock) {
        if (matchModels(curBlock.model, [NoteBlockModel])) {
            return curBlock.model;
        }
        if (matchModels(curBlock.model, [RootBlockModel, SurfaceBlockModel])) {
            return null;
        }
        if (!curBlock.parentComponent) {
            break;
        }
        curBlock = curBlock.parentComponent;
    }
    return null;
}
//# sourceMappingURL=edgeless.js.map