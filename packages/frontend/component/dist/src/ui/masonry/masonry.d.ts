import type { MasonryGroup, MasonryItem, MasonryItemXYWH, MasonryPX } from './type';
export interface MasonryProps extends React.HTMLAttributes<HTMLDivElement> {
    items: MasonryItem[] | MasonryGroup[];
    gapX?: number;
    gapY?: number;
    paddingX?: MasonryPX;
    paddingY?: number;
    groupsGap?: number;
    groupHeaderGapWithItems?: number;
    stickyGroupHeader?: boolean;
    collapsedGroups?: string[];
    onGroupCollapse?: (groupId: string, collapsed: boolean) => void;
    /**
     * Specify the width of the item.
     * - `number`: The width of the item in pixels.
     * - `'stretch'`: The item will stretch to fill the container.
     * @default 'stretch'
     */
    itemWidth?: number | 'stretch';
    /**
     * The minimum width of the item in pixels.
     * @default 100
     */
    itemWidthMin?: number;
    virtualScroll?: boolean;
    locateMode?: 'transform' | 'leftTop' | 'transform3d';
    /**
     * Specify the number of columns, will override the calculated
     */
    columns?: number;
    resizeDebounce?: number;
    preloadHeight?: number;
    onStickyGroupChange?: (groupId?: string) => void;
}
export type MasonryRef = {
    scrollToGroup: (groupId: string) => void;
};
export declare const Masonry: import("react").ForwardRefExoticComponent<MasonryProps & import("react").RefAttributes<MasonryRef>>;
type MasonryItemProps = MasonryItem & Omit<React.HTMLAttributes<HTMLDivElement>, 'id' | 'height'> & {
    locateMode?: 'transform' | 'leftTop' | 'transform3d';
    xywh?: MasonryItemXYWH;
};
declare const MasonryItem: import("react").NamedExoticComponent<Omit<MasonryItemProps, "height" | "ratio">>;
export {};
//# sourceMappingURL=masonry.d.ts.map