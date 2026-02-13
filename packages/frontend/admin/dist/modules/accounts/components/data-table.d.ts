import type { ColumnDef, PaginationState } from '@tanstack/react-table';
import { type Dispatch, type SetStateAction } from 'react';
import type { UserType } from '../schema';
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    pagination: PaginationState;
    usersCount: number;
    selectedUsers: UserType[];
    setMemoUsers: Dispatch<SetStateAction<UserType[]>>;
    onPaginationChange: Dispatch<SetStateAction<{
        pageIndex: number;
        pageSize: number;
    }>>;
}
export declare function DataTable<TData extends {
    id: string;
}, TValue>({ columns, data, pagination, usersCount, selectedUsers, setMemoUsers, onPaginationChange, }: DataTableProps<TData, TValue>): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=data-table.d.ts.map