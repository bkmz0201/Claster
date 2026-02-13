import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@affine/admin/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from '@affine/admin/components/ui/dropdown-menu';
import { AccountBanIcon, DeleteIcon, EditIcon, LockIcon, MoreHorizontalIcon, } from '@blocksuite/icons/rc';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { useRightPanel } from '../../panel/context';
import { DeleteAccountDialog } from './delete-account';
import { DisableAccountDialog } from './disable-account';
import { DiscardChanges } from './discard-changes';
import { EnableAccountDialog } from './enable-account';
import { ResetPasswordDialog } from './reset-password';
import { useDeleteUser, useDisableUser, useEnableUser, useResetUserPassword, } from './use-user-management';
import { UpdateUserForm } from './user-form';
export function DataTableRowActions({ user }) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [resetPasswordDialogOpen, setResetPasswordDialogOpen] = useState(false);
    const [disableDialogOpen, setDisableDialogOpen] = useState(false);
    const [enableDialogOpen, setEnableDialogOpen] = useState(false);
    const [discardDialogOpen, setDiscardDialogOpen] = useState(false);
    const { openPanel, isOpen, closePanel, setPanelContent } = useRightPanel();
    const deleteUser = useDeleteUser();
    const disableUser = useDisableUser();
    const enableUser = useEnableUser();
    const { resetPasswordLink, onResetPassword } = useResetUserPassword();
    const openResetPasswordDialog = useCallback(() => {
        onResetPassword(user.id, () => setResetPasswordDialogOpen(true)).catch(e => {
            console.error(e);
        });
    }, [onResetPassword, user.id]);
    const handleCopy = useCallback(() => {
        navigator.clipboard
            .writeText(resetPasswordLink)
            .then(() => {
            toast('Reset password link copied to clipboard');
            setResetPasswordDialogOpen(false);
        })
            .catch(e => {
            toast.error('Failed to copy reset password link: ' + e.message);
        });
    }, [resetPasswordLink]);
    const handleDeleting = useCallback(() => {
        if (isOpen) {
            closePanel();
        }
        setDeleteDialogOpen(false);
    }, [closePanel, isOpen]);
    const handleDisabling = useCallback(() => {
        if (isOpen) {
            closePanel();
        }
        setDisableDialogOpen(false);
    }, [closePanel, isOpen]);
    const handleEnabling = useCallback(() => {
        if (isOpen) {
            closePanel();
        }
        setEnableDialogOpen(false);
    }, [closePanel, isOpen]);
    const handleDelete = useCallback(() => {
        deleteUser(user.id, handleDeleting);
    }, [deleteUser, handleDeleting, user.id]);
    const handleDisable = useCallback(() => {
        disableUser(user.id, handleDisabling);
    }, [disableUser, handleDisabling, user.id]);
    const handleEnable = useCallback(() => {
        enableUser(user.id, handleEnabling);
    }, [enableUser, handleEnabling, user.id]);
    const openDeleteDialog = useCallback(() => {
        setDeleteDialogOpen(true);
    }, []);
    const closeDeleteDialog = useCallback(() => {
        setDeleteDialogOpen(false);
    }, []);
    const openDisableDialog = useCallback(() => {
        setDisableDialogOpen(true);
    }, []);
    const closeDisableDialog = useCallback(() => {
        setDisableDialogOpen(false);
    }, []);
    const openEnableDialog = useCallback(() => {
        setEnableDialogOpen(true);
    }, []);
    const closeEnableDialog = useCallback(() => {
        setEnableDialogOpen(false);
    }, []);
    const handleDiscardChangesCancel = useCallback(() => {
        setDiscardDialogOpen(false);
    }, []);
    const handleConfirm = useCallback(() => {
        setPanelContent(_jsx(UpdateUserForm, { user: user, onComplete: closePanel, onResetPassword: openResetPasswordDialog, onDeleteAccount: openDeleteDialog }));
        if (discardDialogOpen) {
            handleDiscardChangesCancel();
        }
        if (!isOpen) {
            openPanel();
        }
    }, [
        closePanel,
        discardDialogOpen,
        handleDiscardChangesCancel,
        isOpen,
        openDeleteDialog,
        openPanel,
        openResetPasswordDialog,
        setPanelContent,
        user,
    ]);
    const handleEdit = useCallback(() => {
        if (isOpen) {
            setDiscardDialogOpen(true);
        }
        else {
            handleConfirm();
        }
    }, [handleConfirm, isOpen]);
    return (_jsxs("div", { className: "flex justify-end items-center", children: [_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "ghost", className: "flex h-8 w-8 p-0 data-[state=open]:bg-muted", children: [_jsx(MoreHorizontalIcon, { fontSize: 20 }), _jsx("span", { className: "sr-only", children: "Open menu" })] }) }), _jsxs(DropdownMenuContent, { align: "end", className: "w-[214px] p-[5px] gap-2", children: [_jsxs(DropdownMenuItem, { onSelect: handleEdit, className: "px-2 py-[6px] text-sm font-normal gap-2 cursor-pointer", children: [_jsx(EditIcon, { fontSize: 20 }), "Edit"] }), _jsxs(DropdownMenuItem, { className: "px-2 py-[6px] text-sm font-normal gap-2 cursor-pointer", onSelect: openResetPasswordDialog, children: [_jsx(LockIcon, { fontSize: 20 }), user.hasPassword ? 'Reset Password' : 'Setup Account'] }), user.disabled && (_jsxs(DropdownMenuItem, { className: "px-2 py-[6px] text-sm font-normal gap-2 cursor-pointer", onSelect: openEnableDialog, children: [_jsx(AccountBanIcon, { fontSize: 20 }), "Enable Email"] })), _jsx(DropdownMenuSeparator, {}), !user.disabled && (_jsxs(DropdownMenuItem, { className: "px-2 py-[6px] text-sm font-normal gap-2 text-red-500 cursor-pointer focus:text-red-500", onSelect: openDisableDialog, children: [_jsx(AccountBanIcon, { fontSize: 20 }), "Disable & Delete data"] })), _jsxs(DropdownMenuItem, { className: "px-2 py-[6px] text-sm font-normal gap-2 text-red-500 cursor-pointer focus:text-red-500", onSelect: openDeleteDialog, children: [_jsx(DeleteIcon, { fontSize: 20 }), "Delete"] })] })] }), _jsx(DeleteAccountDialog, { email: user.email, open: deleteDialogOpen, onClose: closeDeleteDialog, onOpenChange: setDeleteDialogOpen, onDelete: handleDelete }), _jsx(DisableAccountDialog, { email: user.email, open: disableDialogOpen, onClose: closeDisableDialog, onOpenChange: setDisableDialogOpen, onDisable: handleDisable }), _jsx(EnableAccountDialog, { email: user.email, open: enableDialogOpen, onClose: closeEnableDialog, onOpenChange: setEnableDialogOpen, onConfirm: handleEnable }), _jsx(ResetPasswordDialog, { link: resetPasswordLink, open: resetPasswordDialogOpen, onOpenChange: setResetPasswordDialogOpen, onCopy: handleCopy }), _jsx(DiscardChanges, { open: discardDialogOpen, onOpenChange: setDiscardDialogOpen, onClose: handleDiscardChangesCancel, onConfirm: handleConfirm })] }));
}
//# sourceMappingURL=data-table-row-actions.js.map