import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@affine/admin/components/ui/button';
import { DialogFooter } from '@affine/admin/components/ui/dialog';
import { downloadCsvTemplate, ImportStatus } from '../../utils/csv-utils';
/**
 * Component for the dialog footer with appropriate buttons based on the import state
 */
export const ImportUsersFooter = ({ isFormatError, isPreviewMode, isImporting, isImported, resetFormatError, cancelImport, handleConfirm, handleUpload, parsedUsers, }) => {
    return (_jsx(DialogFooter, { className: `flex-col mt-6 sm:flex-row sm:justify-between items-center ${isPreviewMode ? 'sm:justify-end' : 'sm:justify-between'}`, children: isFormatError ? (_jsx(FormatErrorFooter, { downloadCsvTemplate: downloadCsvTemplate, resetFormatError: resetFormatError })) : isPreviewMode ? (_jsx(PreviewModeFooter, { isImporting: isImporting, isImported: isImported, cancelImport: cancelImport, handleConfirm: handleConfirm, parsedUsers: parsedUsers })) : (_jsx(InitialFooter, { isImporting: isImporting, downloadCsvTemplate: downloadCsvTemplate, handleUpload: handleUpload })) }));
};
/**
 * Footer component when there's a format error
 */
const FormatErrorFooter = ({ downloadCsvTemplate, resetFormatError, }) => (_jsxs(_Fragment, { children: [_jsx("div", { onClick: downloadCsvTemplate, className: "mb-2 sm:mb-0 text-[15px] px-0 py-2 h-10 underline cursor-pointer", children: "CSV template" }), _jsx(Button, { type: "button", variant: "outline", onClick: resetFormatError, className: "w-full sm:w-auto text-[15px] px-4 py-2 h-10", children: "Done" })] }));
/**
 * Footer component for preview mode
 */
const PreviewModeFooter = ({ isImporting, isImported, cancelImport, handleConfirm, parsedUsers, }) => (_jsxs(_Fragment, { children: [_jsx(Button, { variant: "outline", onClick: cancelImport, className: "w-full mb-2 sm:mb-0 sm:w-auto", disabled: isImporting, children: "Cancel" }), _jsx(Button, { type: "button", onClick: handleConfirm, className: "w-full sm:w-auto text-[15px] px-4 py-2 h-10", disabled: isImporting ||
                parsedUsers.some(user => user.importStatus === ImportStatus.Processing), children: isImporting ? 'Importing...' : isImported ? 'Export' : 'Confirm Import' })] }));
/**
 * Footer component for initial state
 */
const InitialFooter = ({ isImporting, downloadCsvTemplate, handleUpload, }) => (_jsxs(_Fragment, { children: [_jsx("div", { onClick: downloadCsvTemplate, className: "mb-2 sm:mb-0 underline text-[15px] cursor-pointer", children: "CSV template" }), _jsx(Button, { type: "button", onClick: handleUpload, className: "w-full sm:w-auto text-[15px] px-4 py-2 h-10", disabled: isImporting, children: isImporting ? 'Parsing...' : 'Choose a file' })] }));
//# sourceMappingURL=import-footer.js.map