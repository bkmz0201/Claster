import type { Page } from '@playwright/test';
export declare function dragBetweenCoords(page: Page, from: {
    x: number;
    y: number;
}, to: {
    x: number;
    y: number;
}, options?: {
    beforeMouseUp?: () => Promise<void>;
    steps?: number;
    click?: boolean;
    button?: 'left' | 'right' | 'middle';
}): Promise<void>;
export declare function dragBetweenIndices(page: Page, [startRichTextIndex, startVIndex]: [number, number], [endRichTextIndex, endVIndex]: [number, number], startCoordOffSet?: {
    x: number;
    y: number;
}, endCoordOffSet?: {
    x: number;
    y: number;
}, options?: {
    beforeMouseUp?: () => Promise<void>;
    steps?: number;
    click?: boolean;
}): Promise<void>;
export declare function dragOverTitle(page: Page): Promise<void>;
export declare function dragEmbedResizeByTopRight(page: Page): Promise<void>;
export declare function dragEmbedResizeByTopLeft(page: Page): Promise<void>;
export declare function dragHandleFromBlockToBlockBottomById(page: Page, sourceId: string, targetId: string, bottom?: boolean, offset?: number, beforeMouseUp?: () => Promise<void>): Promise<void>;
export declare function dragBlockToPoint(page: Page, sourceId: string, point: {
    x: number;
    y: number;
}): Promise<void>;
export declare function moveToImage(page: Page): Promise<void>;
export declare function popImageMoreMenu(page: Page): Promise<{
    menu: import("playwright-core").Locator;
    copyButton: import("playwright-core").Locator;
    turnIntoCardButton: import("playwright-core").Locator;
    duplicateButton: import("playwright-core").Locator;
    deleteButton: import("playwright-core").Locator;
}>;
export declare function clickBlockDragHandle(page: Page, blockId: string): Promise<void>;
//# sourceMappingURL=drag.d.ts.map