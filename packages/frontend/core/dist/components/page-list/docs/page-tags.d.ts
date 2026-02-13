import type { Tag } from '@affine/core/modules/tag';
export interface PageTagsProps {
    tags: Tag[];
    maxItems?: number;
    widthOnHover?: number | string;
    hoverExpandDirection?: 'left' | 'right';
}
interface TagItemProps {
    tag?: Tag;
    idx?: number;
    maxWidth?: number | string;
    mode: 'inline' | 'list-item';
    focused?: boolean;
    onRemoved?: () => void;
    style?: React.CSSProperties;
}
export declare const TagItem: ({ tag, ...props }: TagItemProps) => import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=page-tags.d.ts.map