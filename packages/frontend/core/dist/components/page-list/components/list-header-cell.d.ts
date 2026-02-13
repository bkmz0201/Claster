import type { ColWrapperProps, ListItem } from '../types';
type HeaderCellProps = ColWrapperProps & {
    sortKey: keyof ListItem;
    sortable?: boolean;
    order?: 'asc' | 'desc';
    sorting?: boolean;
    onSort?: (sortable?: boolean, sortKey?: keyof ListItem) => void;
};
export declare const ListHeaderCell: ({ sortKey, sortable, order, sorting, onSort, alignment, flex, style, hidden, hideInSmallContainer, children, }: HeaderCellProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=list-header-cell.d.ts.map