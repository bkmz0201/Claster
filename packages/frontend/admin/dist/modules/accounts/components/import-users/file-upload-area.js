import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAsyncCallback } from '@affine/core/components/hooks/affine-async-hooks';
import { UploadIcon } from '@blocksuite/icons/rc';
import { cssVarV2 } from '@toeverything/theme/v2';
import { forwardRef, useCallback, useImperativeHandle, useRef, useState, } from 'react';
import { toast } from 'sonner';
/**
 * Component for CSV file upload with drag and drop support
 */
export const FileUploadArea = forwardRef(({ onFileSelected }, ref) => {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);
    const handleFileUpload = useAsyncCallback(async (event) => {
        const file = event.target.files?.[0];
        if (!file)
            return;
        await onFileSelected(file);
    }, [onFileSelected]);
    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };
    useImperativeHandle(ref, () => ({
        triggerFileUpload: triggerFileInput,
    }));
    const validateAndProcessFile = useAsyncCallback(async (file) => {
        if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
            toast.error('Please upload a CSV file');
            return;
        }
        await onFileSelected(file);
    }, [onFileSelected]);
    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);
    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);
    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length === 0)
            return;
        validateAndProcessFile(files[0]);
    }, [validateAndProcessFile]);
    return (_jsxs("div", { className: `flex justify-center p-8 border-2 border-dashed rounded-[6px] ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`, onDragOver: handleDragOver, onDragEnter: handleDragOver, onDragLeave: handleDragLeave, onDrop: handleDrop, onClick: triggerFileInput, style: {
            borderColor: isDragging
                ? cssVarV2('button/primary')
                : cssVarV2('layer/insideBorder/blackBorder'),
        }, children: [_jsxs("div", { className: "text-center", children: [_jsx(UploadIcon, { fontSize: 24, className: "mx-auto mb-3", style: {
                            color: cssVarV2('selfhost/icon/secondary'),
                        } }), _jsx("div", { className: "text-xs font-medium", style: { color: cssVarV2('text/secondary') }, children: isDragging
                            ? 'Release mouse to upload file'
                            : 'Upload your CSV file or drag it here' }), _jsx("p", { className: "mt-1 text-xs text-gray-500", children: isDragging ? 'Preparing to upload...' : '' })] }), _jsx("input", { type: "file", ref: fileInputRef, onChange: handleFileUpload, accept: ".csv", className: "hidden" })] }));
});
FileUploadArea.displayName = 'FileUploadArea';
//# sourceMappingURL=file-upload-area.js.map