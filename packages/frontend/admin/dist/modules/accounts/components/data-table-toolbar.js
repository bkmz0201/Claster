import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@affine/admin/components/ui/button';
import { Input } from '@affine/admin/components/ui/input';
import { useQuery } from '@affine/admin/use-query';
import { getUserByEmailQuery } from '@affine/graphql';
import { ExportIcon, ImportIcon, PlusIcon } from '@blocksuite/icons/rc';
import { startTransition, useCallback, useEffect, useMemo, useState, } from 'react';
import { useRightPanel } from '../../panel/context';
import { DiscardChanges } from './discard-changes';
import { ExportUsersDialog } from './export-users-dialog';
import { ImportUsersDialog } from './import-users';
import { CreateUserForm } from './user-form';
const useSearch = () => {
    const [value, setValue] = useState('');
    const { data } = useQuery({
        query: getUserByEmailQuery,
        variables: { email: value },
    });
    const result = useMemo(() => data?.userByEmail, [data]);
    return {
        result,
        query: setValue,
    };
};
function useDebouncedValue(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}
export function DataTableToolbar({ data, usersCount, selectedUsers, setDataTable, setRowCount, setMemoUsers, table, }) {
    const [value, setValue] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [exportDialogOpen, setExportDialogOpen] = useState(false);
    const [importDialogOpen, setImportDialogOpen] = useState(false);
    const debouncedValue = useDebouncedValue(value, 1000);
    const { setPanelContent, openPanel, closePanel, isOpen } = useRightPanel();
    const { result, query } = useSearch();
    const handleConfirm = useCallback(() => {
        setPanelContent(_jsx(CreateUserForm, { onComplete: closePanel }));
        if (dialogOpen) {
            setDialogOpen(false);
        }
        if (!isOpen) {
            openPanel();
        }
    }, [setPanelContent, closePanel, dialogOpen, isOpen, openPanel]);
    useEffect(() => {
        query(debouncedValue);
    }, [debouncedValue, query]);
    useEffect(() => {
        startTransition(() => {
            if (!debouncedValue) {
                setDataTable(data);
                setRowCount(usersCount);
            }
            else if (result) {
                setMemoUsers(prev => [...new Set([...prev, result])]);
                setDataTable([result]);
                setRowCount(1);
            }
            else {
                setDataTable([]);
                setRowCount(0);
            }
        });
    }, [
        data,
        debouncedValue,
        result,
        setDataTable,
        setMemoUsers,
        setRowCount,
        usersCount,
    ]);
    const onValueChange = useCallback((e) => {
        setValue(e.currentTarget.value);
    }, []);
    const handleCancel = useCallback(() => {
        setDialogOpen(false);
    }, []);
    const handleOpenConfirm = useCallback(() => {
        if (isOpen) {
            return setDialogOpen(true);
        }
        return handleConfirm();
    }, [handleConfirm, isOpen]);
    const handleExportUsers = useCallback(() => {
        if (!table)
            return;
        const selectedRows = table.getFilteredSelectedRowModel().rows;
        if (selectedRows.length === 0) {
            alert('Please select at least one user to export');
            return;
        }
        setExportDialogOpen(true);
    }, [table]);
    const handleImportUsers = useCallback(() => {
        setImportDialogOpen(true);
    }, []);
    return (_jsxs("div", { className: "flex items-center justify-between gap-y-2 gap-x-4", children: [_jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [_jsxs(Button, { variant: "outline", size: "sm", className: "h-8 px-2 lg:px-3", onClick: handleImportUsers, children: [_jsx(ImportIcon, { fontSize: 20 }), _jsx("span", { className: "ml-2 hidden md:inline-block", children: "Import" })] }), _jsxs(Button, { variant: "outline", size: "sm", className: "h-8 px-2 lg:px-3", onClick: handleExportUsers, disabled: !table || table.getFilteredSelectedRowModel().rows.length === 0, children: [_jsx(ExportIcon, { fontSize: 20 }), _jsx("span", { className: "ml-2 hidden md:inline-block", children: "Export" })] }), table && (_jsx(ExportUsersDialog, { users: selectedUsers, open: exportDialogOpen, onOpenChange: setExportDialogOpen })), _jsx(ImportUsersDialog, { open: importDialogOpen, onOpenChange: setImportDialogOpen })] }), _jsxs("div", { className: "flex items-center gap-y-2 flex-wrap justify-end gap-2", children: [_jsx("div", { className: "flex", children: _jsx(Input, { placeholder: "Search Email", value: value, onChange: onValueChange, className: "h-8 w-[150px] lg:w-[250px]" }) }), _jsxs(Button, { className: "h-8 px-2 lg:px-3 space-x-[6px] text-sm font-medium", onClick: handleOpenConfirm, children: [_jsx(PlusIcon, { fontSize: 20 }), " ", _jsx("span", { children: "Add User" })] })] }), _jsx(DiscardChanges, { open: dialogOpen, onOpenChange: setDialogOpen, onClose: handleCancel, onConfirm: handleConfirm })] }));
}
//# sourceMappingURL=data-table-toolbar.js.map