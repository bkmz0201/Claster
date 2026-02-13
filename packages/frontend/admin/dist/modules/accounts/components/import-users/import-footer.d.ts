import type { FC } from 'react';
import { ImportStatus } from '../../utils/csv-utils';
interface ImportUsersFooterProps {
    isFormatError: boolean;
    isPreviewMode: boolean;
    isImporting: boolean;
    isImported: boolean;
    resetFormatError: () => void;
    cancelImport: () => void;
    handleConfirm: () => void;
    handleUpload: () => void;
    parsedUsers: {
        importStatus?: ImportStatus;
    }[];
}
/**
 * Component for the dialog footer with appropriate buttons based on the import state
 */
export declare const ImportUsersFooter: FC<ImportUsersFooterProps>;
export {};
//# sourceMappingURL=import-footer.d.ts.map