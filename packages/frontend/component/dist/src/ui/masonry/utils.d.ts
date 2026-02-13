import type { MasonryGroup, MasonryItem, MasonryItemXYWH, MasonryPX } from './type';
export declare const calcPX: (px: MasonryPX, totalWidth: number) => number;
export declare const calcColumns: (totalWidth: number, itemWidth: number | "stretch", itemWidthMin: number, gapX: number, _paddingX: MasonryPX, columns?: number) => {
    columns: number;
    width: number;
};
export declare const calcLayout: (groups: MasonryGroup[], options: {
    totalWidth: number;
    columns: number;
    width: number;
    gapX: number;
    gapY: number;
    paddingX: MasonryPX;
    paddingY: number;
    groupsGap: number;
    groupHeaderGapWithItems: number;
    collapsedGroups: string[];
}) => {
    layout: Map<string, MasonryItemXYWH>;
    height: number;
};
export declare const calcActive: (options: {
    viewportHeight: number;
    scrollY: number;
    layoutMap: Map<MasonryItem["id"], MasonryItemXYWH>;
    preloadHeight: number;
}) => Map<string, boolean>;
export declare const calcSticky: (options: {
    scrollY: number;
    layoutMap: Map<MasonryItem["id"], MasonryItemXYWH>;
}) => string;
//# sourceMappingURL=utils.d.ts.map