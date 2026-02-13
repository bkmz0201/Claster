import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@affine/admin/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@affine/admin/components/ui/select';
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon, } from 'lucide-react';
import { useCallback, useTransition } from 'react';
export function DataTablePagination({ table, }) {
    const [, startTransition] = useTransition();
    // to handle the error: a component suspended while responding to synchronous input.
    // This will cause the UI to be replaced with a loading indicator.
    // To fix, updates that suspend should be wrapped with startTransition.
    const onPageSizeChange = useCallback((value) => {
        startTransition(() => {
            table.setPageSize(Number(value));
        });
    }, [table]);
    const handleFirstPage = useCallback(() => {
        startTransition(() => {
            table.setPageIndex(0);
        });
    }, [startTransition, table]);
    const handlePreviousPage = useCallback(() => {
        startTransition(() => {
            table.previousPage();
        });
    }, [startTransition, table]);
    const handleNextPage = useCallback(() => {
        startTransition(() => {
            table.nextPage();
        });
    }, [startTransition, table]);
    const handleLastPage = useCallback(() => {
        startTransition(() => {
            table.setPageIndex(table.getPageCount() - 1);
        });
    }, [startTransition, table]);
    return (_jsxs("div", { className: "flex items-center justify-between md:px-2", children: [_jsxs("div", { className: "flex items-center md:space-x-2", children: [_jsx("p", { className: "text-sm font-medium max-md:hidden", children: "Rows per page" }), _jsxs(Select, { value: `${table.getState().pagination.pageSize}`, onValueChange: onPageSizeChange, children: [_jsx(SelectTrigger, { className: "h-8 w-[70px]", children: _jsx(SelectValue, { placeholder: table.getState().pagination.pageSize }) }), _jsx(SelectContent, { side: "top", children: [10, 20, 40, 80].map(pageSize => (_jsx(SelectItem, { value: `${pageSize}`, children: pageSize }, pageSize))) })] })] }), _jsxs("div", { className: "flex items-center space-x-6 lg:space-x-8", children: [_jsxs("div", { className: "flex w-[100px] items-center justify-center text-sm font-medium", children: ["Page ", table.getState().pagination.pageIndex + 1, " of", ' ', table.getPageCount()] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs(Button, { variant: "outline", className: "hidden h-8 w-8 p-0 lg:flex", onClick: handleFirstPage, disabled: !table.getCanPreviousPage(), children: [_jsx("span", { className: "sr-only", children: "Go to first page" }), _jsx(ChevronsLeftIcon, { className: "h-4 w-4" })] }), _jsxs(Button, { variant: "outline", className: "h-8 w-8 p-0", onClick: handlePreviousPage, disabled: !table.getCanPreviousPage(), children: [_jsx("span", { className: "sr-only", children: "Go to previous page" }), _jsx(ChevronLeftIcon, { className: "h-4 w-4" })] }), _jsxs(Button, { variant: "outline", className: "h-8 w-8 p-0", onClick: handleNextPage, disabled: !table.getCanNextPage(), children: [_jsx("span", { className: "sr-only", children: "Go to next page" }), _jsx(ChevronRightIcon, { className: "h-4 w-4" })] }), _jsxs(Button, { variant: "outline", className: "hidden h-8 w-8 p-0 lg:flex", onClick: handleLastPage, disabled: !table.getCanNextPage(), children: [_jsx("span", { className: "sr-only", children: "Go to last page" }), _jsx(ChevronsRightIcon, { className: "h-4 w-4" })] })] })] })] }));
}
//# sourceMappingURL=data-table-pagination.js.map