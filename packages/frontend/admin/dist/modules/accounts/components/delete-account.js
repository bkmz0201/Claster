import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@affine/admin/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from '@affine/admin/components/ui/dialog';
import { Input } from '@affine/admin/components/ui/input';
import { useCallback, useEffect, useState } from 'react';
export const DeleteAccountDialog = ({ email, open, onClose, onDelete, onOpenChange, }) => {
    const [input, setInput] = useState('');
    const handleInput = useCallback((event) => {
        setInput(event.target.value);
    }, [setInput]);
    useEffect(() => {
        if (!open) {
            setInput('');
        }
    }, [open]);
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "sm:max-w-[460px]", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Delete Account ?" }), _jsxs(DialogDescription, { children: [_jsx("span", { className: "font-bold", children: email }), " will be permanently deleted. This operation is irreversible. Please proceed with caution."] })] }), _jsx(Input, { type: "text", value: input, onChange: handleInput, placeholder: "Please type email to confirm", className: "placeholder:opacity-50 mt-4 h-9" }), _jsx(DialogFooter, { className: "mt-6", children: _jsxs("div", { className: "flex justify-end gap-2 items-center w-full", children: [_jsx(Button, { type: "button", variant: "outline", size: "sm", onClick: onClose, children: "Cancel" }), _jsx(Button, { type: "button", onClick: onDelete, size: "sm", variant: "destructive", disabled: input !== email, children: "Delete" })] }) })] }) }));
};
//# sourceMappingURL=delete-account.js.map