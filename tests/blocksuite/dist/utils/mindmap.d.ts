import type { Page } from '@playwright/test';
export declare function createMindMap(page: Page, coords: [number, number]): Promise<string>;
export declare function getMindMapNode(page: Page, mindmapId: string, pathOrId: number[] | string): Promise<{
    path: number[];
    id: string;
    text: string;
    rect: {
        x: number;
        y: number;
        w: number;
        h: number;
    };
}>;
type NewNodeInfo = {
    text: string;
    children?: NewNodeInfo[];
};
export declare function addMindmapNodes(page: Page, mindmapId: string, path: number[], newNode: NewNodeInfo): Promise<string>;
export {};
//# sourceMappingURL=mindmap.d.ts.map