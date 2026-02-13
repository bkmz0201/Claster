import type { Page } from '@playwright/test';
export declare function getRichTextBoundingBox(page: Page, blockId: string): Promise<DOMRect>;
interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
}
export declare function clickInEdge(page: Page, rect: Rect): Promise<void>;
export declare function clickInCenter(page: Page, rect: Rect): Promise<void>;
export declare function getBoundingRect(page: Page, selector: string): Promise<Rect>;
export {};
//# sourceMappingURL=selection.d.ts.map