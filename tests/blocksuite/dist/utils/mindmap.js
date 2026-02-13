import { clickView } from './actions/click.js';
export async function createMindMap(page, coords) {
    await page.keyboard.press('m');
    await clickView(page, coords);
    const id = await page.evaluate(() => {
        const edgelessBlock = document.querySelector('affine-edgeless-root');
        if (!edgelessBlock) {
            throw new Error('edgeless block not found');
        }
        const mindmaps = edgelessBlock.gfx.gfxElements.filter(el => 'type' in el && el.type === 'mindmap');
        return mindmaps[mindmaps.length - 1].id;
    });
    return id;
}
export async function getMindMapNode(page, mindmapId, pathOrId) {
    return page.evaluate(({ mindmapId, pathOrId }) => {
        const edgelessBlock = document.querySelector('affine-edgeless-root');
        if (!edgelessBlock) {
            throw new Error('edgeless block not found');
        }
        const mindmap = edgelessBlock.gfx.getElementById(mindmapId);
        if (!mindmap) {
            throw new Error(`Mindmap not found: ${mindmapId}`);
        }
        const node = Array.isArray(pathOrId)
            ? mindmap.getNodeByPath(pathOrId)
            : mindmap.getNode(pathOrId);
        if (!node) {
            throw new Error(`Mindmap node not found at: ${pathOrId}`);
        }
        const rect = edgelessBlock.gfx.viewport.toViewBound(node.element.elementBound);
        return {
            path: mindmap.getPath(node),
            id: node.id,
            text: node.element.text?.toString() ?? '',
            rect: {
                x: rect.x,
                y: rect.y,
                w: rect.w,
                h: rect.h,
            },
        };
    }, {
        mindmapId,
        pathOrId,
    });
}
export async function addMindmapNodes(page, mindmapId, path, newNode) {
    return page.evaluate(({ mindmapId, path, newNode }) => {
        const edgelessBlock = document.querySelector('affine-edgeless-root');
        if (!edgelessBlock) {
            throw new Error('edgeless block not found');
        }
        const mindmap = edgelessBlock.gfx.getElementById(mindmapId);
        if (!mindmap) {
            throw new Error(`Mindmap not found: ${mindmapId}`);
        }
        const parent = mindmap.getNodeByPath(path);
        if (!parent) {
            throw new Error(`Mindmap node not found at: ${path}`);
        }
        const addNode = (mindmap, node, parent) => {
            const newNodeId = mindmap.addNode(parent, undefined, undefined, {
                text: node.text,
            });
            if (node.children) {
                node.children.forEach(child => {
                    addNode(mindmap, child, mindmap.getNode(newNodeId));
                });
            }
            return newNodeId;
        };
        return addNode(mindmap, newNode, parent);
    }, { mindmapId, path, newNode });
}
//# sourceMappingURL=mindmap.js.map