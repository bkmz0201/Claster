import { Fragment as _Fragment, jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Avatar, AvatarFallback, AvatarImage, } from '@affine/admin/components/ui/avatar';
import { FeatureType } from '@affine/graphql';
import { AccountIcon, EmailIcon, EmailWarningIcon, LockIcon, UnlockIcon, } from '@blocksuite/icons/rc';
import { cssVarV2 } from '@toeverything/theme/v2';
import { useMemo, } from 'react';
import { Checkbox } from '../../../components/ui/checkbox';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
const StatusItem = ({ condition, IconTrue, IconFalse, textTrue, textFalse, }) => (_jsx("div", { className: "flex gap-1 items-center", style: {
        color: condition ? cssVarV2('text/secondary') : cssVarV2('status/error'),
    }, children: condition ? (_jsxs(_Fragment, { children: [IconTrue, textTrue] })) : (_jsxs(_Fragment, { children: [IconFalse, textFalse] })) }));
export const useColumns = ({ setSelectedUserIds, }) => {
    const columns = useMemo(() => {
        return [
            {
                id: 'select',
                header: ({ table }) => (_jsx(Checkbox, { checked: table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && 'indeterminate'), onCheckedChange: value => {
                        if (value) {
                            setSelectedUserIds(prev => new Set([
                                ...prev,
                                ...table
                                    .getFilteredRowModel()
                                    .rows.map(row => row.original.id),
                            ]));
                        }
                        else {
                            // remove selected users in the current page
                            setSelectedUserIds(prev => new Set([...prev].filter(id => !table
                                .getFilteredRowModel()
                                .rows.some(row => row.original.id === id))));
                        }
                        table.toggleAllPageRowsSelected(!!value);
                    }, "aria-label": "Select all", className: "translate-y-[2px]" })),
                cell: ({ row }) => (_jsx(Checkbox, { checked: row.getIsSelected(), onCheckedChange: value => {
                        if (value) {
                            setSelectedUserIds(prev => new Set([...prev, row.original.id]));
                        }
                        else {
                            setSelectedUserIds(prev => new Set([...prev].filter(id => id !== row.original.id)));
                        }
                        row.toggleSelected(!!value);
                    }, "aria-label": "Select row", className: "translate-y-[2px]" })),
                enableSorting: false,
                enableHiding: false,
            },
            {
                accessorKey: 'info',
                header: ({ column }) => (_jsx(DataTableColumnHeader, { className: "text-xs", column: column, title: "Name" })),
                cell: ({ row }) => (_jsxs("div", { className: "flex gap-4 items-center max-w-[50vw] overflow-hidden", children: [_jsxs(Avatar, { className: "w-10 h-10", children: [_jsx(AvatarImage, { src: row.original.avatarUrl ?? undefined }), _jsx(AvatarFallback, { children: _jsx(AccountIcon, { fontSize: 20 }) })] }), _jsxs("div", { className: "flex flex-col gap-1 max-w-full overflow-hidden", children: [_jsxs("div", { className: "text-sm font-medium max-w-full overflow-hidden gap-[6px]", children: [_jsx("span", { children: row.original.name }), row.original.features.includes(FeatureType.Admin) && (_jsx("span", { className: "ml-2 rounded px-2 py-0.5 text-xs h-5 border text-center inline-flex items-center font-normal", style: {
                                                borderRadius: '4px',
                                                backgroundColor: cssVarV2('chip/label/blue'),
                                                borderColor: cssVarV2('layer/insideBorder/border'),
                                            }, children: "Admin" })), row.original.disabled && (_jsx("span", { className: "ml-2 rounded px-2 py-0.5 text-xs h-5 border", style: {
                                                borderRadius: '4px',
                                                backgroundColor: cssVarV2('chip/label/white'),
                                                borderColor: cssVarV2('layer/insideBorder/border'),
                                            }, children: "Disabled" }))] }), _jsx("div", { className: "text-xs font-medium max-w-full overflow-hidden", style: {
                                        color: cssVarV2('text/secondary'),
                                    }, children: row.original.email })] })] })),
                enableSorting: false,
                enableHiding: false,
            },
            {
                accessorKey: 'property',
                header: ({ column }) => (_jsx(DataTableColumnHeader, { className: "text-xs max-md:hidden", column: column, title: "UUID" })),
                cell: ({ row: { original: user } }) => (_jsx("div", { className: "flex items-center gap-2", children: _jsxs("div", { className: "flex flex-col gap-2 text-xs max-md:hidden", children: [_jsx("div", { className: "flex justify-start", children: user.id }), _jsxs("div", { className: "flex gap-3 items-center justify-start", children: [_jsx(StatusItem, { condition: user.hasPassword, IconTrue: _jsx(LockIcon, { fontSize: 16, color: cssVarV2('selfhost/icon/tertiary') }), IconFalse: _jsx(UnlockIcon, { fontSize: 16, color: cssVarV2('toast/iconState/error') }), textTrue: "Password Set", textFalse: "No Password" }), _jsx(StatusItem, { condition: user.emailVerified, IconTrue: _jsx(EmailIcon, { fontSize: 16, color: cssVarV2('selfhost/icon/tertiary') }), IconFalse: _jsx(EmailWarningIcon, { fontSize: 16, color: cssVarV2('toast/iconState/error') }), textTrue: "Email Verified", textFalse: "Email Not Verified" })] })] }) })),
            },
            {
                id: 'actions',
                header: ({ column }) => (_jsx(DataTableColumnHeader, { className: "text-xs", column: column, title: "Actions" })),
                cell: ({ row: { original: user } }) => (_jsx(DataTableRowActions, { user: user })),
            },
        ];
    }, [setSelectedUserIds]);
    return columns;
};
//# sourceMappingURL=columns.js.map