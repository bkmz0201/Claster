interface FileUploadAreaProps {
    onFileSelected: (file: File) => Promise<void>;
}
export interface FileUploadAreaRef {
    triggerFileUpload: () => void;
}
/**
 * Component for CSV file upload with drag and drop support
 */
export declare const FileUploadArea: import("react").ForwardRefExoticComponent<FileUploadAreaProps & import("react").RefAttributes<FileUploadAreaRef>>;
export {};
//# sourceMappingURL=file-upload-area.d.ts.map