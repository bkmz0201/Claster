import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@affine/admin/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from '@affine/admin/components/ui/dialog';
export const DiscardChanges = ({ open, onClose, onConfirm, onOpenChange, }) => {
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "sm:w-[460px]", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { className: "leading-7", children: "Discard Changes" }), _jsx(DialogDescription, { className: "leading-6", children: "Changes to this prompt will not be saved." })] }), _jsx(DialogFooter, { className: "mt-6", children: _jsxs("div", { className: "flex justify-end gap-2 items-center w-full", children: [_jsx(Button, { type: "button", onClick: onClose, variant: "outline", children: _jsx("span", { children: "Cancel" }) }), _jsx(Button, { type: "button", onClick: onConfirm, variant: "destructive", children: _jsx("span", { children: "Discard" }) })] }) })] }) }));
};
//# sourceMappingURL=discard-changes.js.map