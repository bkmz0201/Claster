export interface ParsedUser {
    name: string | null;
    email: string;
    password?: string;
    valid?: boolean;
    error?: string;
    importStatus?: ImportStatus;
    importError?: string;
}
export declare enum ImportStatus {
    Success = "success",
    Failed = "failed",
    Processing = "processing"
}
export declare const validatePassword: (password: string | undefined, passwordLimits: {
    minLength: number;
    maxLength: number;
}) => {
    valid: boolean;
    error?: string;
};
/**
 * Validates email addresses for duplicates and format
 */
export declare const validateEmails: (users: ParsedUser[]) => ParsedUser[];
/**
 * Filters valid users for import
 */
export declare const getValidUsersToImport: (users: ParsedUser[]) => {
    name: string | undefined;
    email: string;
    password: string | undefined;
}[];
/**
 * Downloads a CSV template for user import
 */
export declare const downloadCsvTemplate: () => void;
/**
 * Exports failed imports to a CSV file
 */
export declare const exportImportResults: (results: ParsedUser[]) => void;
/**
 * Utility function for downloading CSV content with proper UTF-8 encoding for international characters
 */
export declare const downloadCsv: (csvContent: string, filename: string) => void;
/**
 * Processes a CSV file to extract user data
 */
export declare const processCSVFile: (file: File, onSuccess: (users: ParsedUser[]) => void, onError: () => void) => Promise<void>;
/**
 * Validate users
 */
export declare const validateUsers: (users: ParsedUser[], passwordLimits: {
    minLength: number;
    maxLength: number;
}) => ParsedUser[];
//# sourceMappingURL=csv-utils.d.ts.map