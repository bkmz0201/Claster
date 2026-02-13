import type { Table } from '@tanstack/react-table';
import type { Dispatch, SetStateAction } from 'react';
import type { UserType } from '../schema';
interface DataTableToolbarProps<TData> {
    data: TData[];
    usersCount: number;
    selectedUsers: UserType[];
    setDataTable: (data: TData[]) => void;
    setRowCount: (rowCount: number) => void;
    setMemoUsers: Dispatch<SetStateAction<UserType[]>>;
    table?: Table<TData>;
}
export declare function DataTableToolbar<TData>({ data, usersCount, selectedUsers, setDataTable, setRowCount, setMemoUsers, table, }: DataTableToolbarProps<TData>): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=data-table-toolbar.d.ts.map