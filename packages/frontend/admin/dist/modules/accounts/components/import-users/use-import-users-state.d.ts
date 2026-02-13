import { type ParsedUser } from '../../utils/csv-utils';
export interface ImportUsersStateProps {
    passwordLimits: {
        minLength: number;
        maxLength: number;
    };
    onClose: () => void;
}
export declare function useImportUsersState({ passwordLimits, onClose, }: ImportUsersStateProps): {
    isImporting: boolean;
    parsedUsers: ParsedUser[];
    isPreviewMode: boolean;
    isFormatError: boolean;
    isImported: boolean;
    handleFileSelected: (file: File) => Promise<void>;
    cancelImport: () => void;
    resetFormatError: () => void;
    handleConfirm: () => void;
    resetState: () => void;
};
//# sourceMappingURL=use-import-users-state.d.ts.map