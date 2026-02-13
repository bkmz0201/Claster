import type { FC, RefObject } from 'react';
import type { ParsedUser } from '../../utils/csv-utils';
import { type FileUploadAreaRef } from './file-upload-area';
interface ImportPreviewContentProps {
    parsedUsers: ParsedUser[];
    isImported: boolean;
}
/**
 * Component for the preview mode content
 */
export declare const ImportPreviewContent: FC<ImportPreviewContentProps>;
interface ImportInitialContentProps {
    passwordLimits: {
        minLength: number;
        maxLength: number;
    };
    fileUploadRef: RefObject<FileUploadAreaRef | null>;
    onFileSelected: (file: File) => Promise<void>;
}
/**
 * Component for the initial import screen
 */
export declare const ImportInitialContent: FC<ImportInitialContentProps>;
interface ImportErrorContentProps {
    message?: string;
}
/**
 * Component for displaying import errors
 */
export declare const ImportErrorContent: FC<ImportErrorContentProps>;
export {};
//# sourceMappingURL=import-content.d.ts.map