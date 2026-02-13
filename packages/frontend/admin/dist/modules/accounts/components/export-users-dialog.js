import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@affine/admin/components/ui/button';
import { Checkbox } from '@affine/admin/components/ui/checkbox';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, } from '@affine/admin/components/ui/dialog';
import { Label } from '@affine/admin/components/ui/label';
import { useAsyncCallback } from '@affine/core/components/hooks/affine-async-hooks';
import { CopyIcon } from '@blocksuite/icons/rc';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { useExportUsers } from './use-user-management';
export function ExportUsersDialog({ users, open, onOpenChange, }) {
    const [isExporting, setIsExporting] = useState(false);
    const [isCopying, setIsCopying] = useState(false);
    const [fields, setFields] = useState([
        {
            id: 'name',
            label: 'Username',
            checked: true,
        },
        {
            id: 'email',
            label: 'Email',
            checked: true,
        },
    ]);
    const handleFieldChange = useCallback((id, checked) => {
        setFields(fields.map(field => (field.id === id ? { ...field, checked } : field)));
    }, [fields]);
    const { exportCSV, copyToClipboard } = useExportUsers();
    const handleExport = useAsyncCallback(async () => {
        setIsExporting(true);
        try {
            await exportCSV(users, fields, () => {
                setIsExporting(false);
                onOpenChange(false);
                toast('Users exported successfully');
            });
        }
        catch (error) {
            console.error('Failed to export users', error);
            toast.error('Failed to export users');
            setIsExporting(false);
        }
    }, [exportCSV, fields, onOpenChange, users]);
    const handleCopy = useAsyncCallback(async () => {
        setIsCopying(true);
        try {
            await copyToClipboard(users, fields, () => {
                setIsCopying(false);
                onOpenChange(false);
                toast('Users copied successfully');
            });
        }
        catch (error) {
            console.error('Failed to copy users', error);
            toast.error('Failed to copy users');
            setIsCopying(false);
        }
    }, [copyToClipboard, fields, onOpenChange, users]);
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "sm:max-w-[425px]", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Export" }) }), _jsx("div", { className: "grid gap-4 py-4", children: fields.map(field => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: `export-${field.id}`, checked: field.checked, onCheckedChange: checked => handleFieldChange(field.id, !!checked) }), _jsx(Label, { htmlFor: `export-${field.id}`, children: field.label })] }, field.id))) }), _jsxs(DialogFooter, { className: "mt-6", children: [_jsx(Button, { type: "button", onClick: handleExport, className: "w-full text-[15px] px-4 py-2 h-10", disabled: isExporting || isCopying, children: isExporting ? 'Exporting...' : 'Download account information' }), _jsx(Button, { variant: "outline", size: "icon", className: "p-5", onClick: handleCopy, disabled: isExporting || isCopying, children: _jsx(CopyIcon, { fontSize: 20 }) })] })] }) }));
}
//# sourceMappingURL=export-users-dialog.js.map