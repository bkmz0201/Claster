import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@affine/admin/components/ui/table';
import { flexRender, getCoreRowModel, useReactTable, } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { DataTablePagination } from './data-table-pagination';
import { DataTableToolbar } from './data-table-toolbar';
export function DataTable({ columns, data, pagination, usersCount, selectedUsers, setMemoUsers, onPaginationChange, }) {
    const [rowSelection, setRowSelection] = useState({});
    const [columnFilters, setColumnFilters] = useState([]);
    const [tableData, setTableData] = useState(data);
    const [rowCount, setRowCount] = useState(usersCount);
    const table = useReactTable({
        data: tableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getRowId: row => row.id,
        manualPagination: true,
        rowCount: rowCount,
        enableFilters: true,
        onPaginationChange: onPaginationChange,
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onColumnFiltersChange: setColumnFilters,
        state: {
            pagination,
            rowSelection,
            columnFilters,
        },
    });
    useEffect(() => {
        setTableData(data);
    }, [data]);
    useEffect(() => {
        setRowCount(usersCount);
    }, [usersCount]);
    return (_jsxs("div", { className: "flex flex-col gap-4 py-5 px-6 h-full overflow-auto", children: [_jsx(DataTableToolbar, { setDataTable: setTableData, data: data, usersCount: usersCount, table: table, selectedUsers: selectedUsers, setRowCount: setRowCount, setMemoUsers: setMemoUsers }), _jsxs("div", { className: "rounded-md border h-full flex flex-col overflow-auto", children: [_jsx(Table, { children: _jsx(TableHeader, { children: table.getHeaderGroups().map(headerGroup => (_jsx(TableRow, { className: "flex items-center", children: headerGroup.headers.map(header => {
                                    let columnClassName = '';
                                    if (header.id === 'select') {
                                        columnClassName = 'w-[40px] flex-shrink-0';
                                    }
                                    else if (header.id === 'info') {
                                        columnClassName = 'flex-1';
                                    }
                                    else if (header.id === 'property') {
                                        columnClassName = 'flex-1';
                                    }
                                    else if (header.id === 'actions') {
                                        columnClassName =
                                            'w-[40px] flex-shrink-0 justify-center mr-6';
                                    }
                                    return (_jsx(TableHead, { colSpan: header.colSpan, className: `${columnClassName} py-2 text-xs flex items-center h-9`, children: header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext()) }, header.id));
                                }) }, headerGroup.id))) }) }), _jsx("div", { className: "overflow-auto flex-1", children: _jsx(Table, { children: _jsx(TableBody, { children: table.getRowModel().rows?.length ? (table.getRowModel().rows.map(row => (_jsx(TableRow, { className: "flex items-center", children: row.getVisibleCells().map(cell => {
                                        let columnClassName = '';
                                        if (cell.column.id === 'select') {
                                            columnClassName = 'w-[40px] flex-shrink-0';
                                        }
                                        else if (cell.column.id === 'info') {
                                            columnClassName = 'flex-1';
                                        }
                                        else if (cell.column.id === 'property') {
                                            columnClassName = 'flex-1';
                                        }
                                        else if (cell.column.id === 'actions') {
                                            columnClassName =
                                                'w-[40px] flex-shrink-0 justify-center mr-6';
                                        }
                                        return (_jsx(TableCell, { className: `${columnClassName} flex items-center`, children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id));
                                    }) }, row.id)))) : (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: columns.length, className: "h-24 text-center", children: "No results." }) })) }) }) })] }), _jsx(DataTablePagination, { table: table })] }));
}
//# sourceMappingURL=data-table.js.map