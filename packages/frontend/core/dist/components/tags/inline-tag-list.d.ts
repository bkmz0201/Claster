import type { HTMLAttributes, PropsWithChildren } from 'react';
import type { TagLike } from './types';
interface InlineTagListProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    onRemoved?: (id: string) => void;
    tags: TagLike[];
    tagMode: 'inline-tag' | 'db-label';
    focusedIndex?: number;
}
export declare const InlineTagList: ({ children, focusedIndex, tags, onRemoved, tagMode, }: PropsWithChildren<InlineTagListProps>) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=inline-tag-list.d.ts.map