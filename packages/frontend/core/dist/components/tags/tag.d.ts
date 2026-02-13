import type { TagLike } from './types';
export interface TagItemProps {
    tag: TagLike;
    idx?: number;
    maxWidth?: number | string;
    mode: 'inline-tag' | 'list-tag' | 'db-label';
    focused?: boolean;
    onRemoved?: () => void;
    style?: React.CSSProperties;
}
export declare const TagItem: ({ tag, idx, mode, focused, onRemoved, style, maxWidth, }: TagItemProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=tag.d.ts.map