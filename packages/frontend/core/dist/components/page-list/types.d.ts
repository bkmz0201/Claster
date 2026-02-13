import type { CollectionMeta } from '@affine/core/modules/collection';
import type { DocMeta, Workspace } from '@blocksuite/affine/store';
import type { JSX, PropsWithChildren, ReactNode } from 'react';
import type { To } from 'react-router-dom';
export type ListItem = DocMeta | (CollectionMeta & {
    createDate?: Date | number;
    updatedDate?: Date | number;
}) | TagMeta;
export type TagMeta = {
    id: string;
    name: string;
    color: string;
    pageCount?: number;
    createDate?: Date | number;
    updatedDate?: Date | number;
};
export type PageListItemProps = {
    pageId: string;
    pageIds?: string[];
    icon: JSX.Element;
    title: ReactNode;
    preview?: ReactNode;
    createDate: Date;
    updatedDate?: Date;
    isPublicPage?: boolean;
    to?: To;
    draggable?: boolean;
    selectable?: boolean;
    selected?: boolean;
    operations?: ReactNode;
    onClick?: () => void;
    onSelectedChange?: () => void;
};
export type CollectionListItemProps = {
    collectionId: string;
    icon: JSX.Element;
    title: ReactNode;
    createDate?: Date;
    updatedDate?: Date;
    to?: To;
    draggable?: boolean;
    selectable?: boolean;
    selected?: boolean;
    operations?: ReactNode;
    onClick?: () => void;
    onSelectedChange?: () => void;
};
export type TagListItemProps = {
    tagId: string;
    color: string;
    title: ReactNode;
    createDate?: Date | number;
    updatedDate?: Date | number;
    to?: To;
    draggable?: boolean;
    selectable?: boolean;
    selected?: boolean;
    operations?: ReactNode;
    onClick?: () => void;
    onSelectedChange?: () => void;
};
export interface ItemListHeaderProps {
}
export type ItemGroupByType = 'createDate' | 'updatedDate';
export interface SortBy {
    key: 'createDate' | 'updatedDate';
    order: 'asc' | 'desc';
}
export type DateKey = 'createDate' | 'updatedDate';
export type PageGroupByType = 'createDate' | 'updatedDate' | 'tag' | 'favourites' | 'none';
export interface ListProps<T> {
    items: T[];
    docCollection: Workspace;
    className?: string;
    hideHeader?: boolean;
    groupBy?: ItemGroupDefinition<T>[];
    rowAsLink?: boolean;
    selectable?: 'toggle' | boolean;
    selectedIds?: string[];
    onSelectedIdsChange?: (selected: string[]) => void;
    onSelectionActiveChange?: (active: boolean) => void;
    draggable?: boolean;
    operationsRenderer?: (item: T) => ReactNode;
}
export interface VirtualizedListProps<T> extends ListProps<T> {
    heading?: ReactNode;
    headerRenderer?: (item?: T) => ReactNode;
    itemRenderer?: (item: T) => ReactNode;
    atTopThreshold?: number;
    atTopStateChange?: (atTop: boolean) => void;
}
export interface ItemListHandle {
    toggleSelectable: () => void;
}
export interface ItemGroupDefinition<T> {
    id: string;
    label: ((count: number) => ReactNode) | ReactNode;
    match: (item: T) => boolean;
}
export interface ItemGroupProps<T> {
    id: string;
    label?: ReactNode;
    items: T[];
    allItems: T[];
}
type MakeRecord<T> = {
    [P in keyof T]: T[P];
};
export type MetaRecord<T> = MakeRecord<T>;
export type DraggableTitleCellData = {
    preview: ReactNode;
};
export type HeaderColDef = {
    key: string;
    content: ReactNode;
    flex: ColWrapperProps['flex'];
    alignment?: ColWrapperProps['alignment'];
    sortable?: boolean;
    hideInSmallContainer?: boolean;
    hidden?: boolean;
};
export type ColWrapperProps = PropsWithChildren<{
    flex?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    alignment?: 'start' | 'center' | 'end';
    styles?: React.CSSProperties;
    hideInSmallContainer?: boolean;
}> & React.HTMLAttributes<Element>;
export type PageDisplayProperties = {
    bodyNotes: boolean;
    tags: boolean;
    createDate: boolean;
    updatedDate: boolean;
};
export type DisplayProperties = {
    groupBy: PageGroupByType;
    displayProperties: PageDisplayProperties;
};
export {};
//# sourceMappingURL=types.d.ts.map