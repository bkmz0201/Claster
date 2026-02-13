import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { cssVarV2 } from '@toeverything/theme/v2';
import { UserTable } from '../user-table';
import { CsvFormatGuidance } from './csv-format-guidance';
import { FileUploadArea } from './file-upload-area';
/**
 * Component for the preview mode content
 */
export const ImportPreviewContent = ({ parsedUsers, isImported, }) => {
    return (_jsxs("div", { className: "grid gap-3", children: [!isImported && (_jsxs("p", { style: { color: cssVarV2('text/secondary') }, children: [parsedUsers.length, " users detected from the CSV file. Please confirm the user list below and import."] })), _jsx(UserTable, { users: parsedUsers })] }));
};
/**
 * Component for the initial import screen
 */
export const ImportInitialContent = ({ passwordLimits, fileUploadRef, onFileSelected, }) => {
    return (_jsxs("div", { className: "grid gap-3", children: [_jsx("p", { style: { color: cssVarV2('text/secondary') }, children: "You need to import the accounts by importing a CSV file in the correct format. Please download the CSV template." }), _jsx(CsvFormatGuidance, { passwordLimits: passwordLimits }), _jsx(FileUploadArea, { ref: fileUploadRef, onFileSelected: onFileSelected })] }));
};
/**
 * Component for displaying import errors
 */
export const ImportErrorContent = ({ message = 'You need to import the accounts by importing a CSV file in the correct format. Please download the CSV template.', }) => {
    return message;
};
//# sourceMappingURL=import-content.js.map