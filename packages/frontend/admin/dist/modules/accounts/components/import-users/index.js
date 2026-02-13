import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from '@affine/admin/components/ui/dialog';
import { useEffect, useRef } from 'react';
import { useServerConfig } from '../../../common';
import { ImportErrorContent, ImportInitialContent, ImportPreviewContent, } from './import-content';
import { ImportUsersFooter } from './import-footer';
import { useImportUsersState } from './use-import-users-state';
/**
 * Dialog for importing users from a CSV file
 */
export function ImportUsersDialog({ open, onOpenChange, }) {
    const fileUploadRef = useRef(null);
    const serverConfig = useServerConfig();
    const passwordLimits = serverConfig.credentialsRequirement.password;
    const handleUpload = () => fileUploadRef.current?.triggerFileUpload();
    const { isImporting, parsedUsers, isPreviewMode, isFormatError, isImported, handleFileSelected, cancelImport, resetFormatError, handleConfirm, resetState, } = useImportUsersState({
        passwordLimits,
        onClose: () => onOpenChange(false),
    });
    // Reset all states when dialog is opened
    useEffect(() => {
        if (open) {
            resetState();
        }
    }, [open, resetState]);
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: isPreviewMode ? 'sm:max-w-[720px] flex-col' : 'sm:max-w-[480px]', children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: isFormatError
                            ? 'Incorrect import format'
                            : isPreviewMode
                                ? isImported
                                    ? 'Import results'
                                    : 'Confirm import'
                                : 'Import' }) }), _jsx("div", { className: "text-[15px] mt-3", children: isFormatError ? (_jsx(ImportErrorContent, {})) : isPreviewMode ? (_jsx(ImportPreviewContent, { parsedUsers: parsedUsers, isImported: isImported })) : (_jsx(ImportInitialContent, { passwordLimits: passwordLimits, fileUploadRef: fileUploadRef, onFileSelected: handleFileSelected })) }), _jsx(ImportUsersFooter, { isFormatError: isFormatError, isPreviewMode: isPreviewMode, isImporting: isImporting, isImported: isImported, resetFormatError: resetFormatError, cancelImport: cancelImport, handleConfirm: handleConfirm, handleUpload: handleUpload, parsedUsers: parsedUsers })] }) }));
}
//# sourceMappingURL=index.js.map