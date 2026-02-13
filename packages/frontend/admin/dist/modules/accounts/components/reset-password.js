import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@affine/admin/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from '@affine/admin/components/ui/dialog';
import { Input } from '@affine/admin/components/ui/input';
import { CopyIcon } from 'lucide-react';
export const ResetPasswordDialog = ({ link, open, onCopy, onOpenChange, }) => {
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "sm:w-[460px]", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { className: "leading-7", children: "Account Recovery Link" }), _jsx(DialogDescription, { className: "leading-6", children: "Please send this recovery link to the user and instruct them to complete it." })] }), _jsx(DialogFooter, { className: "mt-4", children: _jsxs("div", { className: "flex justify-end gap-2 items-center w-full", children: [_jsx(Input, { type: "text", value: link, placeholder: "Please type email to confirm", className: "placeholder:opacity-50 text-ellipsis overflow-hidden whitespace-nowrap", readOnly: true }), _jsxs(Button, { type: "button", onClick: onCopy, className: "space-x-[10px]", children: [_jsx(CopyIcon, { size: 20 }), " ", _jsx("span", { children: "Copy and Close" })] })] }) })] }) }));
};
//# sourceMappingURL=reset-password.js.map