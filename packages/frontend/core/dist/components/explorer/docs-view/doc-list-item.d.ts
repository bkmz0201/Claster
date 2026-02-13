import { type SVGProps } from 'react';
export type DocListItemView = 'list' | 'grid' | 'masonry';
export declare const DocListViewIcon: ({ view, ...props }: {
    view: DocListItemView;
} & SVGProps<SVGSVGElement>) => import("react/jsx-runtime").JSX.Element;
export interface DocListItemProps {
    docId: string;
    groupId: string;
}
export declare const DocListItem: ({ ...props }: DocListItemProps) => import("react/jsx-runtime").JSX.Element;
export declare const ListViewDoc: ({ docId }: DocListItemProps) => import("react/jsx-runtime").JSX.Element | null;
export declare const CardViewDoc: ({ docId }: DocListItemProps) => import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=doc-list-item.d.ts.map